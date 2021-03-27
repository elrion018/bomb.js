import App from './App.js';
import { ItemStore, ItemReducer } from './flux';

const itemReducer = new ItemReducer();
const itemStore = new ItemStore(itemReducer);

new App(document.querySelector('#app'), null, itemStore);
