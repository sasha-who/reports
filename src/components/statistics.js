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
}
