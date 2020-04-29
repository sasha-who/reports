import {render} from "./utils.js";
import StatisticsComponent from "./components/statistics.js";
import GenerateButtonComponent from "./components/generate-button.js";

const chartElement = document.querySelector(`.chart`);

render(new StatisticsComponent(`html1`), chartElement);
render(new GenerateButtonComponent(), chartElement);
