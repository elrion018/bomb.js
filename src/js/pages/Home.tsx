/** @jsx h */

import { Component } from '../cores';
import { Props, State } from '../cores/Component';

import MenuListInput from '../components/MenuListInput';
import MenuList from '../components/MenuList';
import { EspressoMenuStore } from '../flux/stores';

export interface Menu {
  name: string;
  id: number;
}

interface HomeState extends State {
  menu: Menu[];
  menuId: number;
}

interface HomeProps extends Props {}

export class Home extends Component {
  declare state: HomeState;
  store: EspressoMenuStore;

  constructor(
    targetSelector: string,
    store: EspressoMenuStore,
    props: HomeProps
  ) {
    super(targetSelector, store, props);
    this.store = store;
  }

  makeTemplate() {
    return (
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4">
            <a href="#" class="text-black">
              <h1 class="text-center font-bold">메뉴 관리</h1>
            </a>
            <nav class="d-flex justify-center flex-wrap">
              <button
                data-category-name="espresso"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                ☕ 에스프레소
              </button>
              <button
                data-category-name="frappuccino"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🥤 프라푸치노
              </button>
              <button
                data-category-name="blended"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🍹 블렌디드
              </button>
              <button
                data-category-name="teavana"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🫖 티바나
              </button>
              <button
                data-category-name="desert"
                class="cafe-category-name btn bg-white shadow mx-1"
              >
                🍰 디저트
              </button>
            </nav>
          </header>
          <main class="mt-10 d-flex justify-center">
            <div class="wrapper bg-white p-10">
              <div class="heading d-flex justify-between">
                <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
                <span class="mr-2 mt-4 menu-count">총 개</span>
              </div>
              <div id="espresso-menu-form-wrapper"></div>
              <div id="espresso-menu-list-wrapper"></div>
            </div>
          </main>
        </div>
      </div>
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

    this.setState<HomeState>({
      ...this.state,
      menu: this.state.menu.concat({ name: newMenu, id: this.state.menuId }),
      menuId: this.state.menuId + 1,
    });
  }

  removeMenu(key: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const targetMenuIndex = this.state.menu.findIndex(
      (item) => item.id === Number(key)
    );

    const copiedMenu = [...this.state.menu];

    copiedMenu.splice(targetMenuIndex, 1);

    this.setState<HomeState>({
      ...this.state,
      menu: copiedMenu,
    });
  }

  editMenu(key: string) {
    const targetMenuIndex = this.state.menu.findIndex(
      (item) => item.id === Number(key)
    );

    if (targetMenuIndex === -1) return;

    const newName = prompt('메뉴명을 수정하세요.');

    if (newName === null) return;

    if (newName.trim() === '') return alert('빈 값으로 수정할 수 없습니다.');

    const copiedMenu = [...this.state.menu];

    copiedMenu[targetMenuIndex].name = newName.toLocaleLowerCase();

    this.setState<HomeState>({
      ...this.state,
      menu: copiedMenu,
    });
  }
}
