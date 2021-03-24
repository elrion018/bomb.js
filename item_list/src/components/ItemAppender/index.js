import { Component } from '../../cores';

export default class ItemAppender extends Component {
  makeTemplate() {
    return `<input type="text" id="appender" data-action="addItem" placeholder="아이템 내용 입력"></input>`;
  }

  setEvent() {
    const { addItem } = this.$props;

    this.$target.addEventListener('keyup', event => {
      const { dataset } = event.target;
      const value = event.target.value;

      if (dataset.action === 'addItem' && event.key === 'Enter') {
        addItem(value);
      }
    });
  }
}
