import AbstractComponent from "./abstract-component.js";

export default class GenerateButton extends AbstractComponent {
  getTemplate() {
    return (
      `<input class="data__submit-button button" type="submit" value="Сгенерировать график">`
    );
  }
}
