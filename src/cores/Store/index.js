/**
 * Store 코어. 상태를 유지하고, 리듀서를 사용하여 상태에 변화를 준다.
 */
export default class Store {
  state;
  reducer;
  subscribers;
  middlewares;

  constructor(reducer) {
    this.state = {};
    this.reducer = reducer;
    this.subscribers = [];

    this.initState();
  }

  initState() {}

  //필요한 미들웨어를 등록할 수 있는 메서드. 커링을 활용한다.
  applyMiddlewares(middlewares) {
    this.middlewares = middlewares;
    this.middlewares.reverse();
    let dispatch = this.dispatch.bind(this);

    middlewares.forEach(middleware => {
      dispatch = middleware(this)(dispatch);
    });

    this.dispatch = dispatch;
  }

  // 자신을 구독하는 컴포넌트들을 subscribers 배열에 콜백과 함께 추가하는 메소드.
  register(subscriber, callback = null) {
    this.subscribers.push({
      subscriber,
      callback,
    });
  }

  // 호출시 subscribers 배열에 있는 컴포넌트들이 자신의 상태를 갖고 콜백을 실행하게하는 메소드
  publish() {
    this.subscribers.forEach(subscriber => {
      subscriber.callback(this.state);
    });
  }

  // store의 상태를 반환하는 메소드. 불변성을 지키기 위해 복사하여 반환.
  getState() {
    return { ...this.state };
  }

  // action을 리듀서에 전달하는 메소드. 리듀서가 작동한 이후 상태를 publish 한다.
  dispatch(action) {
    this.state = this.reducer.reduce(this.state, action);
    this.publish();
  }

  // action을 만드는 함수.
  createAction(type, payload = {}) {
    return {
      type,
      payload,
    };
  }
}
