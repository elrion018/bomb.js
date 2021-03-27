export default class Store {
  state;
  reducer;
  subscribers;

  constructor(reducer) {
    this.reducer = reducer;
    this.subscribers = [];
  }

  subscribe = (subscriber, callback = null) => {
    this.subscribers.push({
      subscriber,
      callback,
    });
  };

  publish = () => {
    this.subscribers.forEach(({ subscriber, callback }) => {
      subscriber[callback]();
    });
  };

  getState = () => {
    return { ...this.state };
  };

  dispatch = action => {
    this.state = this.reducer.setState(this.state, action);
    this.publish();
  };

  createAction = (type, payload = {}) => {
    return {
      type,
      payload: { ...payload },
    };
  };
}
