import { Component } from '../../cores';

export default class ItemFilter extends Component {
  makeTemplate() {
    return `<button data-action='filterItem' data-filterMode='0'>전체 보기</button>
    <button data-action='filterItem' data-filterMode='1'>활성 보기</button>
    <button data-action='filterItem' data-filterMode='2'>비활성 보기</button>`;
  }

  setEvent() {
    const { filterItem } = this.$props;

    this.$target.addEventListener('click', event => {
      const { dataset } = event.target;

      if (dataset.action === 'filterItem') {
        filterItem(parseInt(dataset.filtermode));
      }
    });
  }
}
