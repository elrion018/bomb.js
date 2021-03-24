import { Component } from '../../cores';

export default class Items extends Component {
  makeTemplate() {
    const { items } = this.$props;
    console.log(items);
    return `<ul>
    ${items
      .map(item => {
        return `<li>${item.contents}</li>`;
      })
      .join('')}
    </ul>
    `;
  }

  setEvent() {}
}
