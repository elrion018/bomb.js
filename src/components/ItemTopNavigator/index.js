import { Component } from '../../cores';

export default class ItemTopNavigator extends Component {
  makeTemplate() {
    return `
      <button data-page='home'>home</button>
      <button data-page='itemManager'>itemManager</button>
      <button data-page='itemAbout'>itemAbout</button>
    `;
  }

  setEvent() {
    this.target.addEventListener('click', event => {
      const { dataset } = event.target;

      if (dataset.page) {
        this.router.pushState(dataset.page);
      }
    });
  }
}
