export const h = (type: string, props: any, ...children: any[]) => {
  return { type, props, children: children.flat() };
};

export const createElement = (node: any) => {
  console.log(node);
};
