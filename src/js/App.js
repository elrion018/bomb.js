import Component from "./cores/Component.js";
import Home from "./pages/Home.js";

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
