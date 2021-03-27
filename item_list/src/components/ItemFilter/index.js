import { Component } from '../../cores';

export default class ItemFilter extends Component {
  initState() {
    if (this.store) {
      this.state = { ...this.store.state };
    }
  }
  makeTemplate() {
    console.log('...rerendering', 'filter');
    return `<button data-action='filterItem' data-filterMode='0'>전체 보기</button>
    <button data-action='filterItem' data-filterMode='1'>활성 보기</button>
    <button data-action='filterItem' data-filterMode='2'>비활성 보기</button>`;
  }

  setEvent() {
    this.target.addEventListener('click', event => {
      const { dataset } = event.target;

      if (dataset.action === 'filterItem') {
        const filterMode = parseInt(dataset.filtermode);

        this.store.dispatch(
          this.store.createAction('FILTER_ITEM', { filterMode })
        );
      }
    });
  }
}
