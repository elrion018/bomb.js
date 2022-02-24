import { StoreState } from "./Store";

interface ActionTypes<T extends StoreState> {
  [action: string]: (state: T, payload: any) => StoreState;
}

interface Action {
  type: string;
  payload: any;
}

export class Reducer {
  actionTypes: ActionTypes<any>;

  constructor() {
    this.actionTypes = {};
  }

  // reducer가 다룰 actionTypes를 set 하는 메소드. ActionTypes는 key, value를 가지며 value는 함수인 객체여야 한다.
  setActionTypes<T>(actionTypes: ActionTypes<T>) {
    try {
      // object 검증
      if (actionTypes.constructor !== Object)
        throw new Error("actionTypes는 객체여야 합니다.");

      const isValuesAllFunction = Object.values(actionTypes).every(
        (actionTypeValue) => {
          return actionTypeValue.constructor === Function;
        }
      );

      if (!isValuesAllFunction)
        throw new Error("actionTypes의 프로퍼티의 value는 함수여야 합니다.");

      this.actionTypes = actionTypes;
    } catch (error) {
      console.error(error);
    }
  }

  // reduce 메소드 actionType과 payload로 이루어져 있는 action을 받아 불변성을 지키며 상태에 변화를 준다.
  reduce(state: object, { type, payload }: Action) {
    if (this.actionTypes.hasOwnProperty(type))
      return this.actionTypes[type](state, payload);

    // 새롭게 상태생성해서 반환
    return state;
  }
}
