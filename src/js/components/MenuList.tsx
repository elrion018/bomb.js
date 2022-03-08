/** @jsx h */

import { Component, Props, Router } from '../cores';
import { Menu } from '../pages/Home';

interface MenuListProps extends Props {
  menu: Menu[];
  removeMenu: (key: string) => void;
  editMenu: (key: string) => void;
}

export class MenuList extends Component {
  declare props: MenuListProps;

  constructor(targetSelector: string, store: null, router: Router | null, props: MenuListProps) {
    super(targetSelector, store, router, props);
  }

  makeTemplate() {
    return (
      <ul id="espresso-menu-list" class="mt-3 pl-0">
        {this.getMenuListItems()}
      </ul>
    );
  }

  initEventListenerSpecs() {
    this.eventListenerSpecs = [
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector('#espresso-menu-list')
            : null,
        eventType: 'click',
        listener: this.itemButtonClickListener.bind(this),
      },
    ];
  }

  getMenuListItems() {
    const { menu } = this.props;

    return menu.map(item => (
      <li class="espresson-menu-item" data-key={item.id}>
        {item.name}
        <button data-purpose="edit">수정</button>{' '}
        <button data-purpose="delete">삭제</button>
      </li>
    ));
  }

  itemButtonClickListener(event: Event) {
    if (!(event.target instanceof HTMLButtonElement)) return;

    const { parentNode, dataset } = event.target;
    const { purpose } = dataset;

    if (!(parentNode instanceof HTMLElement)) return;

    const { key } = parentNode.dataset;

    // 동적으로 개선 예정
    if (purpose === 'delete' && key) {
      this.props.removeMenu(key);
    }

    if (purpose === 'edit' && key) {
      this.props.editMenu(key);
    }
  }
}
