/** @jsx h */

import { Router, Store } from './';
import { doms, VirtualDom } from './doms';

declare global {
  interface Window {
    h: typeof doms.h;
  }
}

window.h = doms.h;

export interface Props {
  [key: string]: any;
}

export interface State {
  [key: string]: any;
}

interface EventListenerSpec {
  eventTarget: HTMLElement | null;
  eventType: string;
  listener: EventListener;
}

export interface ComponentSpec<T extends typeof Component> {
  constructor: T;
  name: string;
  targetSelector: string;
  props: Props;
}

export default class Component {
  private componentInstances: Component[];
  targetElement: HTMLElement | null;
  props: Props;
  targetSelector: string;
  store: Store | null;
  router: Router | null;
  state: State;
  oldVirtualDom: VirtualDom | undefined;
  componentSpecs: ComponentSpec<typeof Component>[];
  eventListenerSpecs: EventListenerSpec[];

  constructor(
    targetSelector: string,
    store: Store | null,
    router: Router | null,
    props: Props
  ) {
    this.targetSelector = targetSelector;
    this.targetElement = document.querySelector(targetSelector);
    this.store = store;
    this.router = router;
    this.state = {};
    this.props = props;
    this.componentSpecs = [];
    this.componentInstances = [];
    this.eventListenerSpecs = [];

    this.created();
    this.beforeMounted();
    this.mounted();
  }

  /**
   * state를 초기화하는 메소드
   */
  initState() {}

  /**
   * state의 getter 메소드
   */
  getState() {
    return { ...this.state };
  }

  /**
   * state를 setter 메소드
   */
  setState<T extends State>(this: Component, state: T) {
    // 태스크 큐의 맨 뒤로 밀어버리기 위해 사용

    setTimeout(() => {
      // 불변성 유지
      this.state = { ...this.state, ...state };

      this.beforeUpdated();
      // state 변경 후 업데이트 반영
      this.updated();
    });
  }

  /**
   * props를 set하는 메소드
   */
  private setProps(props: Props) {
    setTimeout(() => {
      this.props = { ...props };

      this.beforeUpdated();
      this.updated();
    });
  }

  /**
   * eventListenerSpecs를 초기화하는 메소드
   */
  initEventListenerSpecs() {}

  /**
   *  componentSpecs를 초기화하는 메소드
   */
  initComponentSpecs() {}

  /**
   * componentSpecs의 정보에 따라 component의 인스턴스들을 set하는 메소드
   */
  private setComponentInstances() {
    this.componentInstances = this.componentSpecs.map((componentSpec) => {
      const { constructor: Constructor, targetSelector, props } = componentSpec;

      return new Constructor(targetSelector, this.store, this.router, props);
    });
  }

  /**
   * event target에 이벤트 리스너들을 추가하기 위한 메소드
   */
  private addEventListeners() {
    this.eventListenerSpecs.forEach(
      ({ eventTarget, eventType, listener }: EventListenerSpec) => {
        if (eventTarget !== null)
          eventTarget.addEventListener(eventType, listener);
      }
    );
  }

  /**
   * event target에 이벤트 리스너들을 제거하기 위한 메소드
   */
  clearEventListeners() {
    this.eventListenerSpecs.forEach(({ eventTarget, eventType, listener }) => {
      if (eventTarget !== null)
        eventTarget.removeEventListener(eventType, listener);
    });
  }

  /**
   * 맨 처음 state에 따라 템플릿을 렌더링하거나 state 변화 이후 템플릿을 재렌더링하는 메소드
   */
  private render() {
    if (this.targetElement === null) return;

    this.clearEventListeners();

    const newVirtualDom = this.makeTemplate();

    if (newVirtualDom && newVirtualDom.children)
      newVirtualDom.children = newVirtualDom.children.filter((child) => child);

    !this.oldVirtualDom
      ? doms.updateElement(this.targetElement, newVirtualDom)
      : doms.updateElement(
          this.targetElement,
          newVirtualDom,
          this.oldVirtualDom
        );

    this.oldVirtualDom = newVirtualDom;

    this.initEventListenerSpecs();
    this.addEventListeners();
  }

  /**
   * created 라이프사이클. state 초기화, 템플릿 렌더링, 컴포넌트 등록, 인스턴스 생성을 수행한다.
   */
  created() {
    this.initState();
    this.initComponentSpecs();
    this.render();
    this.setComponentInstances();
  }

  /**
   * beforeMounted 라이프사이클. 상호작용 이전에 event listner들을 추가한다.
   */
  beforeMounted() {
    this.addEventListeners();
  }

  /**
   * mounted 라이프사이클
   */
  mounted() {}

  /**
   * beforeUpdated 라이프사이클
   */
  beforeUpdated() {}

  /**
   * updated 라이프사이클. 자신의 템플릿을 리렌더링하고 자식 컴포넌트들을 리렌더링시킨다.
   */
  updated() {
    this.targetElement = document.querySelector(this.targetSelector);
    this.initComponentSpecs();
    this.render();

    // props를 새롭게 갱신하고 인스턴스들에 update를 유발한다.
    if (!this.componentInstances.length) return;

    this.componentInstances.forEach((componentInstance) => {
      const componentSpec = this.componentSpecs.find((componentSpec) => {
        return componentInstance.constructor === componentSpec.constructor;
      });

      if (!componentSpec) return;

      // props를 재설정하고 리렌더링 유발
      componentInstance.setProps(componentSpec.props);
    });
  }

  /**
   * 컴포넌트의 템플릿을 만든 메소드
   */
  makeTemplate(): VirtualDom | undefined {
    return undefined;
  }
}
