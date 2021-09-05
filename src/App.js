import { Component } from './cores';
import { ItemTopNavigator } from './components';

export default class App extends Component {
  makeTemplate() {
    return `
      <header id="header-container">
        <div id="top-navigator-container"></div>
      </header>
      <main id="main-container">
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
