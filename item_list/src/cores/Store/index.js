export default class Store {
  state;

  getState() {
    return { ...state };
  }
}
