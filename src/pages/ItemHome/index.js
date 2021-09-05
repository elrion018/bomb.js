import { Component } from '../../cores';

export default class ItemHome extends Component {
  makeTemplate() {
    console.log('...rerendering', 'ItemHome');
    return `
      <div>ItemHome</div>
    `;
  }

  mounted() {}
}
