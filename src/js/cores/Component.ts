import { Store } from "./";

interface Constructor {
  new (targetSelector: string, store: Store, props: object | null): Component;
}

interface ComponentSpec {
  constructor: Constructor;
  targetSelector: string;
  props: object | null;
}

interface ListenerSpec {
  eventTarget: HTMLElement | null;
  eventType: string;
  listener: EventListener;
}

export class Component {
  props: object | null;
  state: object;
  store: Store;
  listenerInfos: ListenerSpec[];
  targetSelector: string;
  targetElement: HTMLElement | null;
  components: ComponentSpec[];
  componentInstances: Component[];

  constructor(targetSelector: string, store: Store, props: object | null) {
    this.props = props;
    this.state = {};
    this.components = [];
    this.componentInstances = [];
    this.listenerInfos = [];
    this.store = store;
    this.targetSelector = targetSelector;
    this.targetElement = document.querySelector(targetSelector);

    this.created();
    this.beforeMounted();
    this.mounted();
  }

  // listenerInfos를 초기화하는 메소드
  initListenerInfos() {
    // console.log("initListenerInfos");
  }

  // components들을 init 하는 메소드
  initComponents() {}

  // state를 초기화하는 메소드
  initState() {
    // console.log("initState");
    if (this.store === null) return;

    this.state = this.store.getState();
  }

  // store를 구독하는 메소드
  observeStore() {}

  // state에 변화를 주는 메소드
  setState(this: Component, state: object) {
    try {
      // state parameter 는 object만 허용
      if (state.constructor !== Object)
        throw new Error("state 파라미터로 객체만 넣을 수 있습니다.");

      // 이벤트 큐의 뒤로 밀어버리기 위해 사용

      setTimeout(() => {
        // 불변성 유지
        this.state = { ...this.state, ...state };

        this.beforeUpdated();
        // state 변경 후 업데이트 반영
        this.updated();
      }, 0);
    } catch (error) {
      console.error(error);
    }
  }

  setProps(props: object | null) {
    if (props === null) return;

    this.props = props;
  }

  setComponentInstances() {
    this.componentInstances = this.components.map((component) => {
      let { constructor: Constructor, targetSelector, props } = component;

      return new Constructor(targetSelector, this.store, props);
    });
  }

  // event targets에 이벤트 리스너들을 달기위한 메소드
  setEventListeners() {
    this.listenerInfos.forEach(
      ({ eventTarget, eventType, listener }: ListenerSpec) => {
        if (eventTarget !== null)
          eventTarget.addEventListener(eventType, listener);
      }
    );
  }

  getState() {
    return { ...this.state };
  }

  // event targets에 이벤트 리스너들을 제거하기 위한 메소드
  clearEventListeners() {
    this.listenerInfos.forEach(({ eventTarget, eventType, listener }) => {
      if (eventTarget !== null)
        eventTarget.removeEventListener(eventType, listener);
    });
  }

  // 맨 처음 컨텐츠를 렌더링하거나 state 변화 이후 컨텐츠를 재렌더링하는 메소드
  render() {
    if (this.targetElement === null) return;

    this.targetElement.innerHTML = this.makeTemplate();

    this.initListenerInfos();
  }

  // 기초적인 created 라이프사이클
  created() {
    // console.log("created ...");

    this.observeStore();
    this.initState();
    this.initComponents();
    this.render();
    this.setComponentInstances();
  }

  // 기초적인 beforeMounted 라이프사이클
  beforeMounted() {
    // console.log("beforeMounted...");
    this.setEventListeners();
  }

  // 기초적인 mounted 라이프사이클
  mounted() {
    // console.log("mounted...");
  }

  // 기초적인 beforeUpdated 라이프사이클
  beforeUpdated() {
    // console.log("beforeUpdated");
  }

  // 기초적인 updated 라이프사이클.
  // 완벽히 구현하려면 ... 나중에 virtual dom 추가해서 구현해보기
  updated() {
    this.targetElement = document.querySelector(this.targetSelector);
    this.render();
    this.setEventListeners();
    this.initComponents();

    // props를 새롭게 갱신하고 인스턴스들에 update를 유발한다.
    if (!this.componentInstances.length) return;

    this.componentInstances.forEach((componentInstance) => {
      const component = this.components.find((component) => {
        return componentInstance.constructor === component.constructor;
      });

      if (!component) return;

      componentInstance.setProps(component.props);
      componentInstance.updated();
    });
  }

  // 컴포넌트의 템플릿을 만드는 메소드. todo : 나중에 Virtual dom 적용해볼 것
  makeTemplate() {
    return ``;
  }
}
