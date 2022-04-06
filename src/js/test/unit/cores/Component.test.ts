/**
 * @jest-environment jsdom
 */

import { Component } from '../../../cores';

// 공개 API 들은 input에 따른 output을 직접적으로 테스트하고
// 비공개 API 들은 호출여부를 확인한다.
// virtual dom 관련 로직은 유닛 테스트에서 제외

describe('Component 클래스 테스트', () => {
  let component: Component;

  beforeEach(() => {
    component = new Component('#app', null, null, {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getState 메소드는 자신의 state를 반환한다.', () => {
    // state를 초기화하는 initState 모킹
    jest
      .spyOn(Component.prototype, 'initState')
      .mockImplementation(function (this: Component) {
        this.state = {
          test: 'test',
        };
      });

    component.initState();

    expect(component.getState()).toEqual({
      test: 'test',
    });
  });

  test('setState 메소드는 자신의 state를 설정(변화)한다.', (done) => {
    jest
      .spyOn(Component.prototype, 'initState')
      .mockImplementation(function (this: Component) {
        this.state = {
          test: 'before',
        };
      });

    component.initState();

    // setState는 비동기적으로 내부 state를 바꾼다.
    component.setState({
      test: 'after',
    });

    setTimeout(() => {
      expect(component.getState()).toEqual({
        test: 'after',
      });
      done();
    });
  });

  test('setProps 메소드는 자신의 state를 설정(변화)하고 beforeUpdated, updated 라이프사이클을 호출한다.', (done) => {
    const beforeUpdatedSpy = jest.spyOn(Component.prototype, 'beforeUpdated');
    const updatedSpy = jest.spyOn(Component.prototype, 'updated' as any);

    component['setProps']({
      test: 'after',
    });

    setTimeout(() => {
      expect(component['props']).toEqual({
        test: 'after',
      });
      done();
    });
  });

  test('setState 메소드는 내부적으로 beforeUpdated, updated 라이프사이클을 호출한다.', (done) => {
    const beforeUpdatedSpy = jest.spyOn(Component.prototype, 'beforeUpdated');
    const updatedSpy = jest.spyOn(Component.prototype, 'updated' as any);

    component.setState({});

    setTimeout(() => {
      expect(beforeUpdatedSpy).toHaveBeenCalled();
      expect(updatedSpy).toHaveBeenCalled();
      done();
    });
  });

  test('setComponentInstances 메소드는 componentSpecs의 원소를 순회하여 componentInstances을 설정한다.', () => {
    const initComponentSpecsSpy = jest
      .spyOn(component, 'initComponentSpecs')
      .mockImplementation(function (this: Component) {
        this.componentSpecs = [
          {
            constructor: Component,
            name: 'component1',
            targetSelector: 'test1',
            props: {},
          },
          {
            constructor: Component,
            name: 'component2',
            targetSelector: 'test2',
            props: {},
          },
          {
            constructor: Component,
            name: 'component3',
            targetSelector: 'test3',
            props: {},
          },
        ];
      });

    component['setComponentInstances']();

    expect(
      component['componentInstances'].every(
        (instance, index) =>
          instance instanceof Component &&
          instance.targetSelector === `test${index + 1}`
      )
    ).toBe(true);
  });

  test('created 라이프사이클은 내부적으로 반드시 initState, initComponentSpecs, render, setComponentInstances 메소드를 호출한다.', () => {
    const initStateSpy = jest.spyOn(Component.prototype, 'initState');
    const initComponentSpecsSpy = jest.spyOn(
      Component.prototype,
      'initComponentSpecs'
    );
    const renderSpy = jest.spyOn(Component.prototype, 'render' as any);
    const setComponentInstances = jest.spyOn(
      component,
      'setComponentInstances' as any
    );

    component.created();

    expect(initStateSpy).toHaveBeenCalled();
    expect(initComponentSpecsSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalled();
    expect(setComponentInstances).toHaveBeenCalled();
  });

  test('created 라이프사이클은 호출되면 initState를 통해 정의된대로 자신의 state를 초기화한다.', () => {
    const initStateSpy = jest
      .spyOn(Component.prototype, 'initState')
      .mockImplementation(function (this: Component) {
        this.state = {
          test: 'test',
        };
      });

    component.created();

    expect(initStateSpy).toHaveBeenCalled();
    expect(component.getState()).toEqual({
      test: 'test',
    });
  });

  test('created 라이프사이클은 호출되면 initComponentSpecs을 통해 정의된대로 자신의 ComponentSpecs을 초기화한다.', () => {
    const initComponentSpecsSpy = jest
      .spyOn(component, 'initComponentSpecs')
      .mockImplementation(function (this: Component) {
        this.componentSpecs = [
          {
            constructor: Component,
            name: 'component1',
            targetSelector: 'test1',
            props: {},
          },
        ];
      });

    component.created();

    expect(component['componentSpecs']).toEqual([
      {
        constructor: Component,
        name: 'component1',
        targetSelector: 'test1',
        props: {},
      },
    ]);
    expect(initComponentSpecsSpy).toHaveBeenCalled();
  });

  test('created 라이프사이클은 호출되면 setComponentInstances를 통해 componentSpecs의 원소를 순회하여 componentInstances을 설정한다.', () => {
    const initComponentSpecsSpy = jest
      .spyOn(component, 'initComponentSpecs')
      .mockImplementation(function (this: Component) {
        this.componentSpecs = [
          {
            constructor: Component,
            name: 'component1',
            targetSelector: 'test1',
            props: {},
          },
          {
            constructor: Component,
            name: 'component2',
            targetSelector: 'test2',
            props: {},
          },
          {
            constructor: Component,
            name: 'component3',
            targetSelector: 'test3',
            props: {},
          },
        ];
      });
    const setComponentInstancesSpy = jest.spyOn(
      component,
      'setComponentInstances' as any
    );

    component.created();

    expect(
      component['componentInstances'].every(
        (instance, index) =>
          instance instanceof Component &&
          instance.targetSelector === `test${index + 1}`
      )
    ).toBe(true);
    expect(setComponentInstancesSpy).toHaveBeenCalled();
  });

  test('render 메소드는 targetElement가 존재한다면 내부적으로 반드시 clearEventListeners, makeTemplate, initEventListenerSpecs, addEventListeners 메소드를 호출한다.', () => {
    component['targetElement'] = document.createElement('div');

    const clearEventListenersSpy = jest.spyOn(
      Component.prototype,
      'clearEventListeners' as any
    );
    const makeTemplateSpy = jest.spyOn(Component.prototype, 'makeTemplate');
    const initEventListenerSpecsSpy = jest.spyOn(
      Component.prototype,
      'initEventListenerSpecs'
    );
    const addEventListenersSpy = jest.spyOn(
      Component.prototype,
      'addEventListeners' as any
    );

    component['render']();

    expect(clearEventListenersSpy).toHaveBeenCalled();
    expect(makeTemplateSpy).toHaveBeenCalled();
    expect(initEventListenerSpecsSpy).toHaveBeenCalled();
    expect(addEventListenersSpy).toHaveBeenCalled();
  });

  test('render 메소드는 호출되면 initEventListenerSpecs를 통해 정의된대로 eventListenerSpecs를 초기화한다.', () => {
    component['targetElement'] = document.createElement('div');

    const mockedEventTarget = document.createElement('div');
    const mockedListener = (event: Event) => {};
    const initEventListenerSpecsSpy = jest
      .spyOn(Component.prototype, 'initEventListenerSpecs')
      .mockImplementation(function (this: Component) {
        this.eventListenerSpecs = [
          {
            eventTarget: mockedEventTarget,
            eventType: 'click',
            listener: mockedListener,
          },
        ];
      });

    component['render']();

    expect(component.eventListenerSpecs).toEqual([
      {
        eventTarget: mockedEventTarget,
        eventType: 'click',
        listener: mockedListener,
      },
    ]);
  });

  test('beforeMounted 라이프사이클은 내부적으로 반드시 addEventListeners를 호출한다.', () => {
    const addEventListenersSpy = jest.spyOn(
      Component.prototype,
      'addEventListeners' as any
    );

    component.beforeMounted();

    expect(addEventListenersSpy).toHaveBeenCalled();
  });

  test('updated 라이프사이클은 내부적으로 반드시 initComponentSpecs, render를 호출하고 componentInstance의 length 만큼 setProps를 호출한다.', () => {
    const initComponentSpecsSpy = jest
      .spyOn(component, 'initComponentSpecs')
      .mockImplementation(function (this: Component) {
        this.componentSpecs = [
          {
            constructor: Component,
            name: 'component1',
            targetSelector: 'test1',
            props: {},
          },
          {
            constructor: Component,
            name: 'component2',
            targetSelector: 'test2',
            props: {},
          },
          {
            constructor: Component,
            name: 'component3',
            targetSelector: 'test3',
            props: {},
          },
        ];
      });
    const renderSpy = jest.spyOn(component, 'render' as any);
    const setPropsSpy = jest.spyOn(Component.prototype, 'setProps' as any);

    component.initComponentSpecs();
    component['setComponentInstances']();
    component['updated']();

    expect(initComponentSpecsSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalled();
    expect(setPropsSpy).toHaveBeenCalledTimes(
      component['componentInstances'].length
    );
  });
});
