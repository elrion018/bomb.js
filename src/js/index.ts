import App from "./App";
import EspressoMenuStore from "./flux/stores/EspressoMeunStore";
import EspressoMenuReducer from "./flux/reducers/EspressoMenuReducer";

const appSelector = "#app";
const espressoMenuStore = new EspressoMenuStore(new EspressoMenuReducer());

new App(appSelector, espressoMenuStore, null);
