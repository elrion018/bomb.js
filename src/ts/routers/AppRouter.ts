import { Router } from "../cores";
import { Home } from "../pages";

export class AppRouter extends Router {
  initRoutes() {
    this.routes = {
      Home,
    };
  }
}
