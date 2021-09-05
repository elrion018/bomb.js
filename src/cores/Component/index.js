/**
 * 컴포넌트 코어. state 변경에 반응하여 render 한다.
 */
export default class Component {
  target;
  props;
  state;
  store;
  router;

  constructor(target, props, store, router) {
    // Component 대상이 되는 element, props, store, router 주입
    this.target = target;
    this.props = props;
    this.store = store;
    this.router = router;

    this.initState();
    this.setEvent();
    this.render();
  }

  // store의 변화를 관찰하는 메소드
  observe(callback) {
    this.store.register(this, callback);
  }

  // state를 초기화하는 메소드
  initState() {}

  // mounted 라이프사이클 메소드
  mounted() {}

  // 템플릿을 만드는 메소드
  makeTemplate() {
    return ``;
  }

  // 렌더 메소드. 현재는 렌더 후 mounted를 실행하고 있으나, 수정 예정
  render() {
    this.target.innerHTML = this.makeTemplate();
    this.mounted();
  }

  // 컴포넌트에 필요한 event를 설정하는 메소드.
  setEvent() {}

  // state에 변경을 주는 메소드. 불변성을 지켜준다. 변경이 생기면 render 메소드 호출
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
