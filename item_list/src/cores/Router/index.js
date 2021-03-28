export default class Router {
  routes;
  store;

  constructor(store) {
    this.store = store;
    this.initRoutes();
    this.setEventForPopState();
  }

  initRoutes() {}

  setEventForPopState() {
    window.addEventListener('popstate', event => {
      const page = event.state.page;
      document.title = page;
      this.loadPage(page);
    });
  }

  loadPage(page) {
    const app = document.querySelector('#app');

    if (page in this.routes) {
      new this.routes[page](app, null, this.store, this);
    }
  }

  replaceState(page) {
    document.title = page;
    this.loadPage(page);
    window.history.replaceState({ page }, `${page}`, `#/page/${page}`);
  }

  pushState(page) {
    const nowPage = history.state.page;

    if (nowPage !== page) {
      document.title = page;
      this.loadPage(page);
      window.history.pushState({ page }, `${page}`, `#/page/${page}`);
    }
  }
}
