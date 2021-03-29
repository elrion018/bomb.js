import { Router } from '../../cores';
import { ItemManager, ItemAbout } from '../../pages';
import App from '../../App.js';

export default class ItemRouter extends Router {
  initRoutes() {
    this.routes = {
      home: App,
      itemManager: ItemManager,
      itemAbout: ItemAbout,
    };

    this.replaceState('home');
  }
}
