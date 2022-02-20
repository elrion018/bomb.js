import { Store, Reducer } from "../../cores";

export interface EspressoMenuStoreState {
  menu: any[];
  menuId: number;
}

export class EspressoMenuStore extends Store {
  state: EspressoMenuStoreState;

  constructor(reducer: Reducer) {
    super(reducer);

    this.state = {
      menu: [],
      menuId: 0,
    };
  }
}
