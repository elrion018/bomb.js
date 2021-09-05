import { Store } from '../../cores';

export default class ItemStore extends Store {
  initState() {
    this.state = {
      filterMode: 0,
      items: [
        { itemId: 1, contents: 'item1', active: false },
        { itemId: 2, contents: 'item2', active: true },
      ],
    };
  }
}
