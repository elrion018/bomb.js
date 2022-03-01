interface JsxProps {
  [key: string]: any;
}

export const h = (
  type: string,
  props: JsxProps | null,
  ...children: JSX.Element[]
): JSX.Element => {
  return { type, props, children: children.flat() };
};

export const createElement = (node: ReturnType<typeof h>) => {
  console.log(node);

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
