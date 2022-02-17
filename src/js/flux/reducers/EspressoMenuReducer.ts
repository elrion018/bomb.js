import Reducer from "../../cores/Reducer.js";

const ADD_MENU = "addMenu";
const EDIT_MENU = "editMenu";
const REMOVE_MENU = "removeMenu";

export default class EspressoMenuReducer extends Reducer {
  constructor() {
    super();

    this.setActionTypes({
      [ADD_MENU]: function (state, payload) {
        const { newMenu } = payload;

        return {
          ...state,
          menu: [...state.menu, { name: newMenu, id: state.menuId }],
          menuId: state.menuId + 1,
        };
      },

      [EDIT_MENU]: function (state, payload) {
        const { targetMenuIndex, newName } = payload;
        const copiedMenu = [...state.menu];
        copiedMenu[targetMenuIndex].name = newName.toLowerCase();

        return {
          ...state,
          menu: copiedMenu,
        };
      },

      [REMOVE_MENU]: function (state, payload) {
        const { targetMenuIndex } = payload;
        const copiedMenu = [...state.menu];

        copiedMenu.splice(targetMenuIndex, 1);

        return {
          ...state,
          menu: copiedMenu,
        };
      },
    });
  }
}
