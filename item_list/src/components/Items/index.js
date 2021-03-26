import { Component } from '../../cores';

export default class Items extends Component {
  makeTemplate() {
    const { items, filterMode } = this.$props;
    return `<ul>
    ${items
      .map(item => {
        if (
          filterMode === 0 ||
          (filterMode === 1 && item.active === true) ||
          (filterMode === 2 && item.active === false)
        ) {
          return `<li data-itemId='${item.itemId}'>${item.contents}
        ${
          item.active
            ? `<button data-action='changeStatusOfItem'>활성</button>`
            : `<button data-action='changeStatusOfItem'>비활성</button>`
        }
        <button data-action='deleteItem'>삭제</button>
        </li>`;
        }
      })
      .join('')}
    </ul>
    `;
  }

  setEvent() {
    const { changeStatusOfItem, deleteItem } = this.$props;

    this.$target.addEventListener('click', event => {
      const { dataset } = event.target;
      const { parentNode } = event.target;

      if (dataset.action === 'deleteItem') {
        const itemId = parseInt(parentNode.dataset.itemid);

        deleteItem(itemId);
      }

      if (dataset.action === 'changeStatusOfItem') {
        const itemId = parseInt(parentNode.dataset.itemid);

        changeStatusOfItem(itemId);
      }
    });
  }
}
