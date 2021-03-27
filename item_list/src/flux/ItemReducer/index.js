import { Reducer } from '../../cores';

export default class ItemReducer extends Reducer {
  initTypes() {
    this.types = {
      ADD_ITEM: this.addItemReducerFunction,
      DELETE_ITEM: this.deleteItemReducerFunction,
      CHANGE_STATUS_OF_ITEM: this.changeStatusOfItemReducerFunction,
      FILTER_ITEM: this.filterItemReducerFunction,
    };
  }

  addItemReducerFunction(state, payload) {
    const items = [...state.items];
    const itemId = Math.max(0, ...items.map(item => item.itemId)) + 1;
    const active = false;
    const contents = payload.contents;

    items.push({ itemId, contents, active });

    return { ...state, items };
  }

  deleteItemReducerFunction(state, payload) {
    const items = [...state.items];
    const itemId = payload.itemId;

    const targetIndex = items.findIndex(item => item.itemId === itemId);
    items.splice(targetIndex, 1);

    return { ...state, items };
  }

  changeStatusOfItemReducerFunction(state, payload) {
    const items = [...state.items];
    const itemId = payload.itemId;

    const targetIndex = items.findIndex(item => item.itemId === itemId);

    items[targetIndex].active = !items[targetIndex].active;

    return { ...state, items };
  }

  filterItemReducerFunction(state, payload) {
    const filterMode = payload.filterMode;
    return { ...state, filterMode };
  }
}
