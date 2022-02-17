interface Actions {
  [action: string]: (state: object, payload: object) => object;
}

interface Action {
  type: string;
  payload: any;
}

export class Reducer {
  actions: Actions;

  constructor() {
    this.actions = {};
  }

  // reducer가 다룰 actionTypes를 set 하는 메소드. actions는 key, value를 가지며 value는 함수인 객체여야 한다.
  setActions(actions: Actions) {
    try {
      // object 검증
      if (actions.constructor !== Object)
        throw new Error("actionTypes는 객체여야 합니다.");

      const isValuesAllFunction = Object.values(actions).every(
        (actionTypeValue) => {
          return actionTypeValue.constructor === Function;
        }
      );

      if (!isValuesAllFunction)
        throw new Error("actionTypes의 프로퍼티의 value는 함수여야 합니다.");

      this.actions = actions;
    } catch (error) {
      console.error(error);
    }
  }

  // reduce 메소드 actionType과 payload로 이루어져 있는 action을 받아 불변성을 지키며 상태에 변화를 준다.
  reduce(state: object, { type, payload }: Action) {
    if (this.actions.hasOwnProperty(type))
      return this.actions[type](state, payload);

    // 새롭게 상태생성해서 반환
    return state;
  }
}
