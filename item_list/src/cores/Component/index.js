export default class Component {
  target;
  props;
  state;
  store;

  constructor(target, props, store) {
    this.target = target;
    this.props = props;
    this.store = store;

    this.initState();
    this.setEvent();
    this.render();
  }

  observe(callback) {
    this.store.subscribe(this, callback);
  }

  initState() {}

  mounted() {}

  makeTemplate() {
    return ``;
  }

  render() {
    this.target.innerHTML = this.makeTemplate();

    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
