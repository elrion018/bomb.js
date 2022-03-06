/** @jsx h */

import { Component, Props, State } from '../cores';
import { Menu } from '../pages/Home';

interface MenuListInputProps extends Props {
  menu: Menu[];
  addMenu: (newMenu: string) => void;
}

interface MenuListInputState extends State {
  inputValue: string;
}

export default class MenuListInput extends Component {
  declare state: MenuListInputState;
  declare props: MenuListInputProps;

  constructor(targetSelector: string, store: null, props: MenuListInputProps) {
    super(targetSelector, store, props);
  }

  makeTemplate() {
    return (
      <form id="espresso-menu-form">
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
            value={this.state.inputValue}
          />
        </div>
      </form>
    );
  }

  initState() {
    this.state = {
      inputValue: "",
    };
  }

  initEventListenerSpecs() {
    super.initEventListenerSpecs();

    this.eventListenerSpecs = [
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector('#espresso-menu-form')
            : null,
        eventType: 'submit',
        listener: this.formSubmitListener.bind(this),
      },
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector('#espresso-menu-name')
            : null,
        eventType: 'change',
        listener: this.inputValueChangeListener.bind(this),
      },
    ];
  }

  inputValueChangeListener(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;


    this.setState({
      ...this.state,
      inputValue: event.target.value,
    });
  }

  formSubmitListener(this: MenuListInput, event: Event) {
    event.preventDefault();

    /**
     * @todo form submit을 위한 비동기 메소드 하나 만들 것.
     */
    setTimeout(() => {
      this.setState({
        ...this.state,
        inputValue: '',
      });

      this.props.addMenu(this.state.inputValue);
    }, 0);
  }
}
