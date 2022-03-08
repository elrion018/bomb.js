/** @jsx h */

import { Component } from './cores';
import { Header } from './components'
import { Home } from './pages';

export default class App extends Component {
  makeTemplate() {
    return (
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <div id="header"></div>
          <div id="main"></div>
        </div>
      </div>);
  }

  initComponentSpecs() {
    this.componentSpecs = [
      { constructor: Header, targetSelector: "#header", props: null },
      {
        constructor: Home,
        targetSelector: '#home',
        props: null,
      },
    ];
  }
}
