import { Component } from "./";

interface RouterRoutes {
  [route: string]: typeof Component;
}

type RouterRoutesFromObject = RouterRoutes & Object;

export class Router {
  routes: RouterRoutesFromObject;
  targetSelector: string;
  targetElement: HTMLElement | null;

  constructor() {
    this.initRoutes();
    this.setEventListnerPopState();
  }

  /**
   * 페이지 route들을 init 하는 메소드
   */
  initRoutes() {}

  /**
   * 라우팅의 대상을 설정하는 메소드
   */
  setTarget(targetSelector: string) {
    this.targetSelector = targetSelector;
    this.targetElement = document.querySelector(targetSelector);
  }

  /**
   * history API popstate 이벤트에 대한 이벤트 리스너를 추가하는 메소드
   */
  setEventListnerPopState() {
    window.addEventListener("popstate", (event: PopStateEvent) => {
      const { route } = event.state;

      this.loadRoute(route);
    });
  }

  /**
   * 매개변수로 받은 route에 따라 대응하는 컴포넌트 인스턴스를 만드는 메소드
   */
  loadRoute(route: string) {
    if (this.targetElement !== null) this.targetElement.innerHTML = "";

    if (this.routes.hasOwnProperty(route))
      new this.routes[route](this.targetSelector, null, this, null);
  }

  /**
   * 매겨변수로 받은 route로 replace하고 이에 따라 라우팅하는 메소드
   */
  replaceRoute(route: string) {
    window.history.replaceState({ route }, route, `#/${route}`);

    this.loadRoute(route);
  }

  /**
   * 매개변수로 받은 route를 push하고 이에 따라 라우팅하는 메소드
   */
  pushRoute(route: string) {
    const nowRoute = history.state.route;

    window.history.pushState({ route }, route, `#/${route}`);

    if (nowRoute !== route) {
      this.loadRoute(route);
    }
  }
}
