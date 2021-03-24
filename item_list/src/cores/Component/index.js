export default class Component {
  $target;
  $props;
  $state;

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initState();
    this.setEvent();
    this.render();
  }

  initState() {}

  mounted() {}

  makeTemplate() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.makeTemplate();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
