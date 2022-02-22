import { Component } from "../cores";
import { EspressoMenuStore } from "../flux/stores";

interface MenuListInputProps {
  addMenu: (newMenu: string) => void;
}

export default class MenuListInput extends Component {
  props: MenuListInputProps;
  state = {
    inputValue: "",
  };

  constructor(
    targetSelector: string,
    store: EspressoMenuStore,
    props: MenuListInputProps
  ) {
    super(targetSelector, store, props);
    this.props = props;
  }

  makeTemplate() {
    return `<form id="espresso-menu-form">
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        에스프레소 메뉴 이름
      </label>
      <input
              type="text"
              id="espresso-menu-name"
              name="espressoMenuName"
              class="input-field"
              placeholder="에스프레소 메뉴 이름"
              autocomplete="off"
              value="${this.state.inputValue}"
      />
      <button
              type="button"
              name="submit"
              id="espresso-menu-submit-button"
              class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>`;
  }

  initListenerInfos() {
    super.initListenerInfos();

    this.listenerInfos = [
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector("#espresso-menu-form")
            : null,
        eventType: "submit",
        listener: this.formSubmitListener.bind(this),
      },
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector("#espresso-menu-submit-button")
            : null,
        eventType: "click",
        listener: this.submitButtonClickListener.bind(this),
      },
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector("#espresso-menu-name")
            : null,
        eventType: "change",
        listener: this.inputValueChangeListener.bind(this),
      },
    ];
  }

  inputValueChangeListener(event: Event) {
    // console.log("inputValueChangeListener");

    if (!(event.target instanceof HTMLInputElement)) return;

    this.setState({
      inputValue: event.target.value,
    });
  }

  formSubmitListener(this: MenuListInput, event: Event) {
    event.preventDefault();
    // console.log("formSubmitListener");

    /**
     * @todo form submit을 위한 비동기 메소드 하나 만들 것.
     */
    setTimeout(() => {
      this.props.addMenu(this.state.inputValue);

      this.setState({
        inputValue: "",
      });
    }, 0);
  }

  submitButtonClickListener() {}
}
