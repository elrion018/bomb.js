import { Component } from '../../cores';

export default class Items extends Component {
  initState() {
    if (this.store) {
      this.observe(this.setState.bind(this));
      this.state = { ...this.store.state };
    }
  }

  makeTemplate() {
    console.log('...rerendering', 'items');
    const { items, filterMode } = this.state;

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
    this.target.addEventListener('click', event => {
      const { dataset } = event.target;
      const { parentNode } = event.target;
      const itemId = parseInt(parentNode.dataset.itemid);

      if (dataset.action === 'deleteItem') {
        this.store.dispatch(this.store.createAction('DELETE_ITEM', { itemId }));
      }

      if (dataset.action === 'changeStatusOfItem') {
        this.store.dispatch(
          this.store.createAction('CHANGE_STATUS_OF_ITEM', { itemId })
        );
      }
    });
  }
}
