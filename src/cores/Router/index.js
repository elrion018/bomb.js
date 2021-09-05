/**
 * Router 코어. history API를 활용하여 새로고침없이 페이지 라우팅한다.
 */
export default class Router {
  target;
  routes;
  store;

  constructor(store) {
    this.store = store;
    this.initRoutes();
    this.setEventForPopState();
  }

  // routes를 초기화하는 메소드. routes는 페이지 name을 key로 하고, 컴포넌트를 value로 하는 property들의 객체로 선언한다.
  initRoutes() {}

  // Router의 타겟 element 를 정하는 메소드.
  setTarget(target) {
    this.target = target;
  }

  // popstate 이벤트에 리스너를 거는 메소드. 콜백은 상응하는 페이지를 로드한다.
  setEventForPopState() {
    window.addEventListener('popstate', event => {
      const { page } = event.state;
      document.title = page;

      this.loadPage(page);
    });
  }

  // routes 객체에서 page에 해당하는 컴포넌트를 로드하는 메소드
  loadPage(page) {
    if (this.routes.hasOwnProperty(page)) {
      new this.routes[page](this.target, null, this.store, this);
    }
  }

  // 페이지를 load하고 history stack 최상단을 해당 page route로 바꾸는 메소드
  replaceState(page) {
    document.title = page;
    this.loadPage(page);

    window.history.replaceState({ page }, `${page}`, `#/page/${page}`);
  }

  // 페이지를 load하고 history stack에 page route를 push하는 메소드
  pushState(page) {
    const nowPage = history.state.page;

    if (nowPage !== page) {
      document.title = page;
      this.loadPage(page);

      window.history.pushState({ page }, `${page}`, `#/page/${page}`);
    }
  }
}
