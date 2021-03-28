import App from './App.js';
import { ItemStore, ItemReducer } from './flux';
import { ItemRouter } from './components';

const itemReducer = new ItemReducer();
const itemStore = new ItemStore(itemReducer);
const itemRouter = new ItemRouter(itemStore);
// const app = document.querySelector('#app');

// new App(app, null, itemStore, itemRouter);
