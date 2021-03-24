export default class Component {
  $target;
  $state;

  constructor($target) {
    this.$target = $target;
    this.initState();
    this.render();
  }

  initState() {}

  makeTemplate() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.makeTemplate();
    this.setEvent();
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
