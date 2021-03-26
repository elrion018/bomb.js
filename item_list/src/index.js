// import App from './App.js';

// new App(document.querySelector('#app'));

// import { Reducer, Store } from './cores';

// class CountReducer extends Reducer {
//   constructor() {
//     super();

//     this.types = {
//       init: function (state, payload) {
//         return {
//           ...state,
//           count: payload.count,
//         };
//       },

//       dec: function (state, payload) {
//         return {
//           ...state,
//           count: state.count - 1,
//         };
//       },

//       inc: function (state) {
//         return {
//           ...state,
//           count: state.count + 1,
//         };
//       },
//     };
//   }
// }

// const countReducer = new CountReducer();
// const store = new Store(countReducer);

// store.dispatch({ type: 'init', payload: { count: 100 } });
// store.dispatch({ type: 'dec' });
// store.dispatch({ type: 'inc' });
