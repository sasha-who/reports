import {render, remove} from "./utils.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";
import {renderChart} from "./chart-render.js";

const dataFormElement = document.querySelector(`.data__form`);
const coursesRadioButtons = dataFormElement
  .querySelectorAll(`.data__course-selection-item[name="course"]`);

  let statisticsComponent = null;
  let generateButtonComponent = null;

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    const dataStatElement = dataFormElement.querySelector(`.data__statistics`);
    const dataSubmitButton = dataFormElement.querySelector(`.data__submit-button`);

    dataStatElement && dataStatElement.remove();
    dataSubmitButton && dataSubmitButton.remove();

    statisticsComponent = new StatisticsComponent(button.value);
    generateButtonComponent = new GenerateButtonComponent();

    render(statisticsComponent, dataFormElement);
    render(generateButtonComponent, dataFormElement);
  });
}

dataFormElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  const projectsWithData = statisticsComponent.getProjectsStatistics();
  renderChart(projectsWithData);

  statisticsComponent.reset();
  dataFormElement.reset();
  remove(statisticsComponent);
  remove(generateButtonComponent);
});
