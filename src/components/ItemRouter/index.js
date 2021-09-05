import { Router } from '../../cores';
import { ItemManager, ItemAbout, ItemHome } from '../../pages';
import App from '../../App.js';

export default class ItemRouter extends Router {
  initRoutes() {
    this.routes = {
      home: ItemHome,
      itemManager: ItemManager,
      itemAbout: ItemAbout,
    };
  }
}
