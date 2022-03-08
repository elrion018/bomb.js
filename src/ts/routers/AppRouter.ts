import { Router } from "../cores";
import { Home, Frappuccino } from "../pages";

export class AppRouter extends Router {
  initRoutes() {
    this.routes = {
      Home,
      Frappuccino,
    };
  }
}
