import {render, remove} from "./utils.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";
import {renderChart} from "./chart-render.js";
import {html1Projects} from "./data.js";

renderChart(html1Projects);

const dataFormElement = document.querySelector(`.data__form`);
const coursesRadioButtons = dataFormElement
  .querySelectorAll(`.data__course-selection-item[name="course"]`);

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    const dataStatElement = dataFormElement.querySelector(`.data__statistics`);
    const dataSubmitButton = dataFormElement.querySelector(`.data__submit-button`);

    dataStatElement && dataStatElement.remove();
    dataSubmitButton && dataSubmitButton.remove();

    const statisticsComponent = new StatisticsComponent(button.value);
    const generateButtonComponent = new GenerateButtonComponent();

    render(statisticsComponent, dataFormElement);
    render(generateButtonComponent, dataFormElement);

    dataFormElement.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const projectWithData = statisticsComponent.getProjectStatistics();
      renderChart(projectWithData);
      dataFormElement.reset();
      remove(statisticsComponent);
      remove(generateButtonComponent);
    });
  });
}
