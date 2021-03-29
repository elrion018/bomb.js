import { ItemStore, ItemReducer } from './flux';
import { ItemRouter } from './components';
import { logger } from './middlewares';

const itemReducer = new ItemReducer();
const itemStore = new ItemStore(itemReducer);
itemStore.applyMiddlewares([logger]);
const itemRouter = new ItemRouter(itemStore);
