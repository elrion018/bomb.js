import App from "./App.js";
import EspressoMenuStore from "./flux/stores/EspressoMeunStore.js";
import EspressoMenuReducer from "./flux/reducers/EspressoMenuReducer.js";

const appSelector = "#app";
const espressoMenuStore = new EspressoMenuStore(new EspressoMenuReducer());

new App(appSelector, espressoMenuStore, null);
