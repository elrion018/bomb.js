import { Router } from '../../cores';
import { ItemManager, ItemAbout } from '../../pages';

export default class ItemRouter extends Router {
  initRoutes() {
    this.routes = {
      itemManager: ItemManager,
      itemAbout: ItemAbout,
    };

    this.replaceState('itemManager');
  }
}
