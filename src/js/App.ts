import { Component } from "./cores";
import Home from "./pages/Home";

export default class App extends Component {
  makeTemplate() {
    return `<div id="home"></div>`;
  }

  initComponents() {
    this.components = [
      {
        constructor: Home,
        targetSelector: "#home",
        props: null,
      },
    ];
  }
}
