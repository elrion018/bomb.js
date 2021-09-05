import { Component } from '../../cores';

export default class ItemAbout extends Component {
  makeTemplate() {
    console.log('...rerendering', 'ItemAbout');
    return `
      <div>itemAbout</div>
    `;
  }

  mounted() {}
}
