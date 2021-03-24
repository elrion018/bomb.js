import Component from './cores/Component';

export default class App extends Component {
  initState() {
    this.$state = { items: ['item1', 'item2'] };
  }

  makeTemplate() {
    const { items } = this.$state;
    return `<ul>
    ${items
      .map(item => {
        return `<li>${item}</li>`;
      })
      .join('')}
    </ul>
    <button>추가</button>
    `;
  }
}
