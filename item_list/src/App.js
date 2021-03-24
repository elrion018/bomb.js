import { Items } from './components';

export default class App {
  constructor() {
    const $app = document.querySelector('#app');
    new Items($app);
  }
}
