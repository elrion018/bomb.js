/**
 * reducer 코어. store 내 state의 변화를 관리한다.
 */
export default class Reducer {
  types;

  constructor() {
    this.initTypes();
  }

  // reducer가 다룰 types를 선언하는 메소드. types는 type(action)을 key, value로 해당하는 함수를 가진 객체로 선언해야한다.
  initTypes() {}

  reduce(state = {}, { type, payload }) {
    // 등록된 type(action) 인지 확인하고 맞다면 type에 해당하는 메소드 실행
    if (this.types.hasOwnProperty(type)) {
      return this.types[type](state, payload);
    }

    // 그렇지 않다면 원래 복사하여 state 반환.
    return { ...state };
  }
}
