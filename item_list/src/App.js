import { Items, ItemAppender, ItemFilter } from './components';
import { Component } from './cores';

export default class App extends Component {
  makeTemplate() {
    console.log('...rerendering', 'App');
    return `
      <header id="appender-container"></header>
      <main id="items-container"></main>
      <footer id="filter-container"></footer>
    `;
  }

  mounted() {
    const $itemAppender = this.target.querySelector('#appender-container');
    const $items = this.target.querySelector('#items-container');
    const $itemFilter = this.target.querySelector('#filter-container');

    new ItemAppender($itemAppender, null, this.store);
    new Items($items, null, this.store);
    new ItemFilter($itemFilter, null, this.store);
  }
}
