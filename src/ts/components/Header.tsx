/** @jsx h */

import { Component } from "../cores";

export class Header extends Component {

  makeTemplate() {
    return (<header class="my-4">
        <h1 class="text-center font-bold">메뉴 관리</h1>
      <nav class="d-flex justify-center flex-wrap">
        <button
          data-category-name="Home"
          class="cafe-category-name btn bg-white shadow mx-1"
        >
          ☕ 에스프레소
        </button>
        <button
          data-category-name="Frappuccino"
          class="cafe-category-name btn bg-white shadow mx-1"
        >
          🥤 프라푸치노
        </button>
        <button
          data-category-name="Blended"
          class="cafe-category-name btn bg-white shadow mx-1"
        >
          🍹 블렌디드
        </button>
        <button
          data-category-name="Teavana"
          class="cafe-category-name btn bg-white shadow mx-1"
        >
          🫖 티바나
        </button>
        <button
          data-category-name="Desert"
          class="cafe-category-name btn bg-white shadow mx-1"

        >
          🍰 디저트
        </button>
      </nav>
    </header>)
  }

  initEventListenerSpecs() {
    this.eventListenerSpecs = [
      {
        eventTarget:
          this.targetElement !== null
            ? this.targetElement.querySelector('.my-4')
            : null,
        eventType: 'click',
        listener: this.handleButtonClick.bind(this),
      },
    ];
  }

  handleButtonClick(event: Event) {
    const { dataset } = event.target as HTMLElement

    if (dataset.categoryName) this.router?.pushRoute(dataset.categoryName as string)
  }
}