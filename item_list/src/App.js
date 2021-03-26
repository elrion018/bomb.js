import { Items, ItemAppender } from './components';
import { Component } from './cores';

export default class App extends Component {
  initState() {
    this.$state = {
      isFilter: 0,
      items: [
        { itemId: 1, contents: 'item1', active: false },
        { itemId: 2, contents: 'item2', active: true },
      ],
    };
  }

  makeTemplate() {
    return `
      <header id="appender-container"></header>
      <main id="items-container"></main>
      <footer id="filter-container"></footer>
    `;
  }

  mounted() {
    const { addItem, changeStatusOfItem, deleteItem } = this;
    const $itemAppender = this.$target.querySelector('#appender-container');
    const $items = this.$target.querySelector('#items-container');

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, {
      items: this.$state.items,
      changeStatusOfItem: changeStatusOfItem.bind(this),
      deleteItem: deleteItem.bind(this),
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const itemId = Math.max(0, ...items.map(item => item.itemId)) + 1;
    const active = false;

    this.setState({
      items: [...items, { itemId, contents, active }],
    });
  }

  deleteItem(itemId) {
    const items = [...this.$state.items];

    const targetIndex = items.findIndex(item => item.itemId === itemId);
    items.splice(targetIndex, 1);

    this.setState({ items });
  }

  changeStatusOfItem(itemId) {
    const items = [...this.$state.items];

    const targetIndex = items.findIndex(item => item.itemId === itemId);
    items[targetIndex].active = !items[targetIndex].active;

    this.setState({ items });
  }
}
