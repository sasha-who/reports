import AbstractComponent from "./abstract-component.js";

export default class Alert extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="data__alert">Сумма должна быть равна 100%</p>`
    );
  }
}
