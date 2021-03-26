export default class Store {
  state;
  reducer;

  constructor(reducer) {
    this.reducer = reducer;
  }

  getState() {
    return { ...this.state };
  }

  dispatch(action) {
    this.state = this.reducer.setState(this.state, action);
  }
}
