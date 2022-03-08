/** @jsx h */

import { Component, Props, State } from '../cores/Component';

import { MenuList, MenuListInput } from '../components';
import { EspressoMenuStore } from '../flux/stores';
import { Router } from '../cores';

export interface Menu {
  name: string;
  id: number;
}

interface FrappuccinoState extends State {
  menu: Menu[];
  menuId: number;
}

interface FrappuccinoProps extends Props { }

export class Frappuccino extends Component {
  declare state: FrappuccinoState;
  store: EspressoMenuStore;

  constructor(
    targetSelector: string,
    store: EspressoMenuStore,
    router: Router | null,
    props: FrappuccinoProps
  ) {
    super(targetSelector, store, router, props);
    this.store = store;
  }

  makeTemplate() {
    return (
          <main class="mt-10 d-flex justify-center">
            <div class="wrapper bg-white p-10">
              <div class="heading d-flex justify-between">
                <h2 class="mt-1">☕ 프라푸치노 메뉴 관리</h2>
              </div>
              <div id="espresso-menu-form-wrapper"></div>
              <div id="espresso-menu-list-wrapper"></div>
            </div>
          </main>
    );
  }

  initState() {
    this.state = {
      menu: [],
      menuId: 1,
    };
  }

  initComponentSpecs() {
    this.componentSpecs = [
      {
        constructor: MenuList,
        targetSelector: '#espresso-menu-list-wrapper',
        props: {
          menu: this.state.menu,
          removeMenu: this.removeMenu.bind(this),
          editMenu: this.editMenu.bind(this),
        },
      },
      {
        constructor: MenuListInput,
        targetSelector: '#espresso-menu-form-wrapper',
        props: {
          menu: this.state.menu,
          addMenu: this.addMenu.bind(this),
        },
      },
    ];
  }

  addMenu(newMenu: string) {
    if (newMenu.trim() === '') {
      alert('빈 값은 추가할 수 없습니다.');

      return;
    }

    this.setState<FrappuccinoState>({
      ...this.state,
      menu: this.state.menu.concat({ name: newMenu, id: this.state.menuId }),
      menuId: this.state.menuId + 1,
    });
  }

  removeMenu(key: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const targetMenuIndex = this.state.menu.findIndex(
      item => item.id === Number(key)
    );

    const copiedMenu = [...this.state.menu];

    copiedMenu.splice(targetMenuIndex, 1);

    this.setState<FrappuccinoState>({
      ...this.state,
      menu: copiedMenu,
    });
  }

  editMenu(key: string) {
    const targetMenuIndex = this.state.menu.findIndex(
      item => item.id === Number(key)
    );

    if (targetMenuIndex === -1) return;

    const newName = prompt('메뉴명을 수정하세요.');

    if (newName === null) return

    if (newName.trim() === '')
      return alert('빈 값으로 수정할 수 없습니다.');

    const copiedMenu = [...this.state.menu];

    copiedMenu[targetMenuIndex].name = newName.toLocaleLowerCase();

    this.setState<FrappuccinoState>({
      ...this.state,
      menu: copiedMenu,
    });
  }
}
