import { ItemStore, ItemReducer } from './flux';
import { ItemRouter } from './components';
import { logger } from './middlewares';
import App from './App.js';

window.addEventListener('DOMContentLoaded', function () {
  const app = document.querySelector('#app');
  const itemReducer = new ItemReducer();
  const itemStore = new ItemStore(itemReducer);
  itemStore.applyMiddlewares([logger]);
  const itemRouter = new ItemRouter(itemStore);

  new App(app, null, itemStore, itemRouter);
});
