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
let alertComponent = null;

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    statisticsComponent && remove(statisticsComponent);
    generateButtonComponent && remove(generateButtonComponent);
    alertComponent && remove(alertComponent);

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


    if (alertComponent) {
      return;
    }

    alertComponent = new AlertComponent();
    render(alertComponent, dataFormElement);

    return;
  }

  renderChart(projectsWithData);
  dataFormElement.reset();
  statisticsComponent.reset();
  remove(statisticsComponent);
  remove(generateButtonComponent);
  alertComponent && remove(alertComponent);
});
