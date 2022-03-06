/** @jsx h */

import { Component } from './cores';
import { Home } from './pages';

export default class App extends Component {
  makeTemplate() {
    return <div id="home"></div>;
  }

  initComponentSpecs() {
    this.componentSpecs = [
      {
        constructor: Home,
        targetSelector: '#home',
        props: null,
      },
    ];
  }
}
