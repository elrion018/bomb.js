/**
 * @jest-environment jsdom
 */

import Reducer from '../../../cores/Reducer';
import { Component, Store } from '../../../cores';

jest.mock('../../../cores/Reducer');

describe('Store 클래스 테스트', () => {
  let reducer: Reducer;
  let store: Store;

  beforeEach(() => {
    reducer = new Reducer();
    store = new Store(reducer);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('registerSubscriber 메소드는 store를 구독하는 컴포넌트를 subscribers에 추가한다.', () => {
    const component1 = new Component('#app', store, null, {});
    const component2 = new Component('#app', store, null, {});

    store.registerSubscriber(component1, []);
    store.registerSubscriber(component2, []);

    expect(store['subscribers']).toEqual([
      {
        subscriber: component1,
        subscribingStates: [],
      },
      {
        subscriber: component2,
        subscribingStates: [],
      },
    ]);
  });

  test('clearSubscribers 메소드는 store의 subscribers를 빈 배열로 대체한다.', () => {
    const component1 = new Component('#app', store, null, {});
    const component2 = new Component('#app', store, null, {});

    store.registerSubscriber(component1, []);
    store.registerSubscriber(component2, []);
    store.clearSubscribers();

    expect(store['subscribers']).toEqual([]);
  });

  test('notifyChanges 메소드는 changedStates를 받고 subscribers 내의 원소의 subscribingStates와 비교하고 state 변화가 있는 경우 원소의 컴포넌트의 updated 라이프사이클을 호출한다.', (done) => {
    const updatedSpy = jest.spyOn(Component.prototype, 'updated');
    const component1 = new Component('#app', store, null, {});
    const component2 = new Component('#app', store, null, {});

    store.registerSubscriber(component1, ['test1']);
    store.registerSubscriber(component2, ['test2']);
    store.notifyChanges([['test1', 'test value']]);

    expect(updatedSpy).toHaveBeenCalledTimes(1);

    done();
  });

  test('setState 메소드는 store의 state를 설정(변화)한다.', (done) => {
    store.setState({
      test1: 'test1',
    });

    setTimeout(() => {
      expect(store.state).toEqual({
        test1: 'test1',
      });

      done();
    });
  });

  test('setState 메소드는 내부적으로 notifyChanges메소드를 호출한다.', (done) => {
    const notifyChangesSpy = jest.spyOn(Store.prototype, 'notifyChanges');

    store.setState({
      test1: 'test1',
    });

    setTimeout(() => {
      expect(notifyChangesSpy).toHaveBeenCalled();

      done();
    });
  });
});
