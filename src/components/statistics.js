import {allCourses} from "../data.js";
import AbstractComponent from "./abstract-component.js";

export default class Statistics extends AbstractComponent {
  constructor (courseType) {
    super();

    this._course = courseType;
  }

  getTemplate() {
    const courseProjects = allCourses[this._course];

    const projectTemplate = courseProjects
      .map((project) => {
        return (
          `<div class="chart__statistics-group">
            <label class="chart__project-name" for="${project.value}">${project.name}</label>
            <input class="chart__percentage-number"
            id="${project.value}"
            type="number"
            name="${project.value}">
            <span class="chart__percentage-sign">%</span>
          </div>`
        );
      })
      .join(`\n`);

    return (
      `<fieldset class="chart__statistics">
        ${projectTemplate}
      </fieldset>`
    );
  }
}
