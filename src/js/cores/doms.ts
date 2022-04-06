interface JsxProps {
  [key: string]: any;
}

export interface VirtualDom {
  type: string;
  props: JsxProps | null;
  children: VirtualDom[];
}

/**
 * virtual dom를 만드는 함수. jsx에 적용
 */
const h = (
  type: string,
  props: JsxProps | null,
  ...children: VirtualDom[]
): VirtualDom => {
  return { type, props, children: children.flat() };
};

/**
 * virtual dom를 받아 real dom를 만든 함수
 */
const createElement = (virtualDom: VirtualDom | string | number) => {
  if (typeof virtualDom === 'string' || typeof virtualDom === 'number') {
    return document.createTextNode(String(virtualDom));
  }

  const element = <HTMLElement>document.createElement(virtualDom.type);

  Object.entries(virtualDom.props || {})
    .filter(([attr, value]) => value || value === '' || value === 0)
    .forEach(([attr, value]) => element.setAttribute(attr, value));

  const children = virtualDom.children.map(createElement);

  children.forEach((child) => {
    if (!child) return;

    element.appendChild(child);
  });

  return element;
};

/**
 * oldNode와 newNode를 비교하여 parent element를 업데이트하는 함수
 */
const updateElement = (
  parent: HTMLElement | ChildNode,
  newNode?: VirtualDom | number | string,
  oldNode?: VirtualDom | number | string,
  index: number = 0
) => {
  if (!parent) return;

  if (newNode === undefined && oldNode) {
    if (index > parent.childNodes.length - 1)
      return parent.removeChild(
        parent.childNodes[parent.childNodes.length - 1]
      );

    return parent.removeChild(parent.childNodes[index]);
  }

  if (newNode && oldNode === undefined) {
    const newDom = createElement(newNode);

    return parent.appendChild(newDom);
  }

  if (
    (typeof newNode === 'string' || typeof newNode === 'number') &&
    (typeof oldNode === 'string' || typeof newNode === 'number')
  ) {
    if (newNode === oldNode) return;

    const newDom = createElement(newNode);

    return parent.replaceChild(newDom, parent.childNodes[index]);
  }

  if (newNode === undefined || oldNode === undefined) return;

  if (
    typeof newNode !== 'number' &&
    typeof newNode !== 'string' &&
    typeof oldNode !== 'number' &&
    typeof oldNode !== 'string' &&
    newNode.type !== oldNode.type
  ) {
    const newDom = createElement(newNode);

    return parent.replaceChild(newDom, parent.childNodes[index]);
  }

  if (
    typeof newNode !== 'number' &&
    typeof newNode !== 'string' &&
    typeof oldNode !== 'number' &&
    typeof oldNode !== 'string' &&
    newNode.type === oldNode.type
  ) {
    updateAttributes(
      parent.childNodes[index] as HTMLElement,
      newNode.props || {},
      oldNode.props || {}
    );
  }

  if (
    typeof newNode === 'number' ||
    typeof newNode === 'string' ||
    typeof oldNode === 'number' ||
    typeof oldNode === 'string'
  )
    return;

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }

  return;
};

/**
 * newNode와 oldNode를 비교하여 바뀐 props가 있으면 반영하는 함수
 */
const updateAttributes = (
  target: HTMLElement | string | number,
  newProps: JsxProps,
  oldProps: JsxProps
) => {
  if (!target) return;

  if (typeof target === 'string' || typeof target === 'number') return;

  if (target.tagName === 'TEXT') return;

  for (const [attr, value] of Object.entries(newProps)) {
    if (newProps[attr] === oldProps[attr]) continue;

    if (target.tagName === 'INPUT') (target as HTMLInputElement).value = value;
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;

    target.removeAttribute(attr);
  }
};

export const doms = {
  h,
  createElement,
  updateElement,
};
