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

  getProjectsStatistics() {
    const projectsWithData = this._courseProjects.slice();

    for (const project of projectsWithData) {
      const percentageInput = this.getElement().querySelector(`#${project.value}`);

      project.percentage = percentageInput.value;
    }

    return projectsWithData;
  }

  reset() {
    const projectsWithData = this.getProjectsStatistics();

    for (const project of projectsWithData) {
      project.percentage = null;
    }
  }
}
