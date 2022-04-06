import { Reducer, Component } from './';

interface SubscriberSpec {
  subscriber: Component;
  subscribingStates: string[];
}

interface Action {
  type: string;
  payload: any;
}

export interface StoreState {
  [key: string]: any;
}

export default class Store {
  private prevState: StoreState;
  private subscribers: SubscriberSpec[];
  private reducer: Reducer;
  state: StoreState;

  constructor(reducer: Reducer) {
    this.prevState = {};
    this.state = {};
    this.subscribers = [];
    this.reducer = reducer;
  }

  // 자신을 구독하는 컴포넌트를 등록하는 메서드
  registerSubscriber(subscriber: Component, subscribingStates: string[]) {
    this.subscribers.push({ subscriber, subscribingStates });
  }

  clearSubscribers() {
    this.subscribers = [];
  }

  // action을 받아 상태변경을 리듀서에 요청하는 메소드
  // 변경 후 변경 사항을 notify 한다.
  dispatch(action: Action) {
    setTimeout(async () => {
      this.prevState = this.state;
      this.state = await this.reducer.reduce(this.state, action);

      // 기존 상태들과 새로운 상태들을 비교해서 바뀐 상태 값을 확인
      const changedStates = Object.entries(this.state).filter(
        ([key, value]) => {
          return Object.entries(this.prevState).some(([prevKey, prevValue]) => {
            return Object.is(prevKey, key) && !Object.is(prevValue, value);
          });
        }
      );

      this.notifyChanges(changedStates);
    });
  }

  // state 변경사항을 알리는 메소드
  notifyChanges(changedStates: [string, any][]) {
    this.subscribers.forEach(({ subscriber, subscribingStates }) => {
      const isSubscribingStateChanged = changedStates.some(([key, value]) => {
        return subscribingStates.includes(key);
      });

      if (isSubscribingStateChanged) subscriber['updated']();
    });
  }

  // data setter 메소드
  setState(state: object) {
    setTimeout(() => {
      this.prevState = this.state;
      this.state = { ...state };

      const changedStates = Object.entries(this.state).filter(
        ([key, value]) => {
          return Object.entries(this.prevState).some(([prevKey, prevValue]) => {
            return Object.is(prevKey, key) && !Object.is(prevValue, value);
          });
        }
      );

      this.notifyChanges(changedStates);
    });
  }
}
