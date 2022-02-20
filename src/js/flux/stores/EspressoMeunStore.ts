import { Store, Reducer } from "../../cores";

export default class EspressoMenuStore extends Store {
  constructor(reducer: Reducer) {
    super(reducer);

    this.setState({
      menu: [],
      menuId: 0,
      test: "",
    });
  }
}
