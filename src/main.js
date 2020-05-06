import {render, remove} from "./utils.js";
import {renderChart} from "./chart-render.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";
import AlertComponent from "./components/alert.js";

const dataFormElement = document.querySelector(`.data__form`);
const coursesRadioButtons = dataFormElement
  .querySelectorAll(`.data__course-selection-item[name="course"]`);

  let statisticsComponent = null;
  let generateButtonComponent = null;

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    const dataStatElement = dataFormElement.querySelector(`.data__statistics`);
    const dataSubmitElement = dataFormElement.querySelector(`.data__submit-button`);
    const alertElement = dataFormElement.querySelector(`.data__alert`);

    dataStatElement && dataStatElement.remove();
    dataSubmitElement && dataSubmitElement.remove();
    alertElement && alertElement.remove();

    statisticsComponent = new StatisticsComponent(button.value);
    generateButtonComponent = new GenerateButtonComponent();

    render(statisticsComponent, dataFormElement);
    render(generateButtonComponent, dataFormElement);
  });
}

dataFormElement.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  const projectsWithData = statisticsComponent.getProjectsStatistics();
  const percentageSum = projectsWithData
    .reduce((sum, current) => sum + Number(current.percentage), 0);

  if (percentageSum !== 100) {
    // Добавить отмену отрисовку надписи, если одна уже есть
    const alertComponent = new AlertComponent();
    render(alertComponent, dataFormElement);
    statisticsComponent.reset();
    return;
  }

  renderChart(projectsWithData);
  statisticsComponent.reset();
  dataFormElement.reset();
  remove(statisticsComponent);
  remove(generateButtonComponent);
});
