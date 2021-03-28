import { Component } from '../../cores';
import {
  Items,
  ItemAppender,
  ItemFilter,
  ItemTopNavigator,
} from '../../components';

export default class ItemManager extends Component {
  makeTemplate() {
    console.log('...rerendering', 'ItemManager');
    return `
      <header id="header-container">
        <div id="top-navigator-container"></div>
      </header>
      <main id="main-container">
        <div id="appender-container"></div>
        <div id="items-container"></div>
        <div id="filter-container"></div>
      </main>
      <footer id="footer-container">
      </footer>
    `;
  }

  mounted() {
    const itemAppender = this.target.querySelector('#appender-container');
    const itemTopNavigator = this.target.querySelector(
      '#top-navigator-container'
    );
    const items = this.target.querySelector('#items-container');
    const itemFilter = this.target.querySelector('#filter-container');

    new ItemAppender(itemAppender, null, this.store);
    new ItemTopNavigator(itemTopNavigator, null, null, this.router);
    new Items(items, null, this.store);
    new ItemFilter(itemFilter, null, this.store);
  }
}
