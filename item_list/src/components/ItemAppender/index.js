import { Component } from '../../cores';

export default class ItemAppender extends Component {
  initState() {
    if (this.store) {
      this.$state = this.store.state;
    }
  }

  makeTemplate() {
    console.log('...rerendering', 'appender');
    return `<input type="text" id="appender" data-action="addItem" placeholder="아이템 내용 입력"></input>`;
  }

  setEvent() {
    this.$target.addEventListener('keyup', event => {
      const { dataset } = event.target;
      const contents = event.target.value;

      if (dataset.action === 'addItem' && event.key === 'Enter') {
        this.store.dispatch(
          this.store.createAction(dataset.action, { contents })
        );
      }
    });
  }
}
