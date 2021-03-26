export default class Reducer {
  types;

  constructor() {
    this.types = {};
  }

  setState(state = {}, { type, payload }) {
    if (type in this.types) {
      return this.types[type](state, payload);
    }

    return { ...state };
  }
}
