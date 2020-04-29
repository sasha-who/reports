import AbstractComponent from "./abstract-component.js";

export default class GenerateButton extends AbstractComponent {
  getTemplate() {
    return (
      `<input class="chart__submit-button" type="submit" value="Сгенерировать график">`
    );
  }
}
