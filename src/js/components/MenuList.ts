import { Component } from "../cores";
import { EspressoMenuStore } from "../flux/stores";

interface Props {
  menu: any[];
  removeMenu: Function;
  editMenu: Function;
}

export default class MenuList extends Component {
  props: Props;

  constructor(targetSelector: string, store: EspressoMenuStore, props: Props) {
    super(targetSelector, store, props);

    this.props = props;
  }

  makeTemplate() {
    return `<ul id="espresso-menu-list" class="mt-3 pl-0">
      ${this.getMenuListItems().join("")}
    
    </ul>`;
  }

  initListenerInfos() {
    this.listenerInfos = [
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector("#espresso-menu-list")
            : null,
        eventType: "click",
        listener: this.itemButtonClickListener.bind(this),
      },
    ];
  }

  getMenuListItems() {
    const { menu } = this.props;

    return menu.map(
      (item) =>
        `<li class="espresson-menu-item" data-key="${item.id}">${item.name}<button data-purpose="edit">수정</button> <button data-purpose="delete">삭제</button></li>`
    );
  }

  itemButtonClickListener(event: Event) {
    if (!(event.target instanceof HTMLButtonElement)) return;

    const { parentNode, dataset } = event.target;
    const { purpose } = dataset;

    if (!(parentNode instanceof HTMLElement)) return;

    const { key } = parentNode.dataset;

    // 동적으로 개선 예정
    if (purpose === "delete") {
      this.props.removeMenu(key);
    }

    if (purpose === "edit") {
      this.props.editMenu(key);
    }
  }
}
