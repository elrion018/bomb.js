import { Component } from '../../cores';
import { ItemTopNavigator } from '../../components';

export default class ItemAbout extends Component {
  makeTemplate() {
    console.log('...rerendering', 'ItemAbout');
    return `
      <header id="header-container">
        <div id="top-navigator-container"></div>
      </header>
      <main id="main-container">
        <div>itemAbout</div>
      </main>
      <footer id="footer-container">
      </footer>
    `;
  }

  mounted() {
    const itemTopNavigator = this.target.querySelector(
      '#top-navigator-container'
    );

    new ItemTopNavigator(itemTopNavigator, null, null, this.router);
  }
}
