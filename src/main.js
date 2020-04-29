import {render} from "./utils.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";

const chartElement = document.querySelector(`.chart`);

const coursesRadioButtons = document.querySelectorAll(`input[name="course"]`);

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    const chartStatElement = chartElement.querySelector(`.chart__statistics`);
    const chartSubmitButton = chartElement.querySelector(`.chart__submit-button`);

    chartStatElement && chartStatElement.remove();
    chartSubmitButton && chartSubmitButton.remove();

    render(new StatisticsComponent(button.value), chartElement);
    render(new GenerateButtonComponent(), chartElement);
  });
}
