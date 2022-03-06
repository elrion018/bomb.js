import { Component } from "./";

interface RouterRoutes extends Object {
  [route: string]: Component;
}

export class Router {
  routes: RouterRoutes;
  targetSelector: string;

  /**
   * 페이지 route들을 init 하는 메소드
   */
  initRoutes() {}

  /**
   * 라우팅의 대상을 설정하는 메소드
   */
  setTargetSelector(targetSelector: string) {
    this.targetSelector = targetSelector;
  }

  /**
   * history API popstate 이벤트에 대한 이벤트 리스너를 추가하는 메소드
   */
  setEventListnerPopState() {
    window.addEventListener("popstate", (event: PopStateEvent) => {
      const { route } = event.state;
    });
  }

  loadRoute(route: string) {
    if (this.routes.hasOwnProperty(route)) {
    }
  }
}
