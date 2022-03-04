import App from "./App";
import { EspressoMenuStore } from "./flux/stores";
import { EspressoMenuReducer } from "./flux/reducers";

const appSelector = "#app";
const espressoMenuStore = new EspressoMenuStore(new EspressoMenuReducer());

new App(appSelector, espressoMenuStore, null);
