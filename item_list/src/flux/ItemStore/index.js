import { Store } from '../../cores';

export default class ItemStore extends Store {
  constructor() {
    this.state = {};
    this.subscribers = [];
  }
}
