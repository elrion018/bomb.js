interface JsxProps {
  [key: string]: any;
}

interface VirtualDomObject {
  type: string;
  props: JsxProps | null;
  children: VirtualDomObject[];
}

export const h = (
  type: string,
  props: JsxProps | null,
  ...children: VirtualDomObject[]
): VirtualDomObject => {
  return { type, props, children: children.flat() };
};

export const createElement = (node: VirtualDomObject | string) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const element = <HTMLElement>document.createElement(node.type);

  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => element.setAttribute(attr, value));

  const children = node.children.map(createElement);

  children.forEach((child) => element.appendChild(child));

  return element;
};

/**
 * oldNode와 newNode를 비교하여 parent element를 업데이트하는 함수
 */
export const updateElement = (
  parent: HTMLElement | ChildNode,
  newNode?: VirtualDomObject,
  oldNode?: VirtualDomObject,
  index: number = 0
) => {
  if (!newNode && oldNode) return parent.removeChild(parent.childNodes[index]);

  if (newNode && !oldNode) return parent.appendChild(createElement(newNode));

  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) return;

    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    );
  }

  if (!newNode || !oldNode) return;

  if (newNode.type !== oldNode.type) {
    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    );
  }

  updateAttributes(
    parent.childNodes[index] as HTMLElement,
    newNode.props || {},
    oldNode.props || {}
  );

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

const updateAttributes = (
  target: HTMLElement,
  newProps: JsxProps,
  oldProps: JsxProps
) => {
  for (const [attr, value] of Object.entries(newProps)) {
    if (newProps[attr] === oldProps[attr]) continue;

    target.setAttribute(attr, value);
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;

    target.removeAttribute(attr);
  }
};
