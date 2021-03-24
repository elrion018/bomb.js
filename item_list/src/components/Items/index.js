import { Component } from '../../cores';

export default class Items extends Component {
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

  setEvent() {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;

      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}
