import {allCourses} from "../data.js";
import AbstractComponent from "./abstract-component.js";

export default class Statistics extends AbstractComponent {
  constructor (courseType) {
    super();

    this._course = courseType;
    this._courseProjects = allCourses[this._course];
  }

  getTemplate() {
    const projectTemplate = this._courseProjects
      .map((project) => {
        return (
          `<div class="data__statistics-group">
            <label class="data__project-name" for="${project.value}">${project.name}</label>
            <input class="data__percentage-number"
            id="${project.value}"
            type="number"
            name="${project.value}">
            <span class="data__percentage-sign">%</span>
          </div>`
        );
      })
      .join(`\n`);

    return (
      `<fieldset class="data__statistics">
        ${projectTemplate}
      </fieldset>`
    );
  }

  getProjectStatistics() {
    for (const project of this._courseProjects) {
      const percentageInput = this.getElement().querySelector(`#${project.value}`);

      const projectWithData = Object.assign({}, project);
      projectWithData.percentage = percentageInput.value;

      return projectWithData;
    }
  }

  // Сбросить статистику после отрисовки графика
  resetStatistics() {
    for (const project of this._courseProjects) {
      project.percentage = null;
    }

    console.log(this._courseProjects);
  }
}
