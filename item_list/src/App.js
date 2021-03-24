import { Items, ItemAppender } from './components';
import { Component } from './cores';

export default class App extends Component {
  initState() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, contents: 'item1', active: false },
        { seq: 2, contents: 'item2', active: true },
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
    const { addItem } = this;
    const $itemAppender = this.$target.querySelector('#appender-container');
    const $items = this.$target.querySelector('#items-container');

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, this.$state);
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map(item => item.seq)) + 1;
    const active = false;

    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex(item => item.seq),
      1
    );

    this.setState({ items });
  }
}
