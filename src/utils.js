export const createElement = (temlate) => {
  const container = document.createElement(`div`);

  container.innerHTML = temlate;

  return container.firstChild;
};

export const render = (component, container) => {
  container.append(component.getElement());
};
