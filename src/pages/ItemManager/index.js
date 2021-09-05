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
        <div id="appender-container"></div>
        <div id="items-container"></div>
        <div id="filter-container"></div>
    `;
  }

  mounted() {
    const itemAppender = this.target.querySelector('#appender-container');
    const items = this.target.querySelector('#items-container');
    const itemFilter = this.target.querySelector('#filter-container');

    new ItemAppender(itemAppender, null, this.store);
    new Items(items, null, this.store);
    new ItemFilter(itemFilter, null, this.store);
  }
}
