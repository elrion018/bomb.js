import Store from "../../cores/Store.js";

export default class EspressoMenuStore extends Store {
  constructor(reducer) {
    super(reducer);

    this.setState({
      menu: [],
      menuId: 0,
      test: "",
    });
  }
}
