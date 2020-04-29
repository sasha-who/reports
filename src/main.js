import {render} from "./utils.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";

const dataElement = document.querySelector(`.data`);

const coursesRadioButtons = document.querySelectorAll(`input[name="course"]`);

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    const dataStatElement = dataElement.querySelector(`.data__statistics`);
    const dataSubmitButton = dataElement.querySelector(`.data__submit-button`);

    dataStatElement && dataStatElement.remove();
    dataSubmitButton && dataSubmitButton.remove();

    render(new StatisticsComponent(button.value), dataElement);
    render(new GenerateButtonComponent(), dataElement);
  });
}
