/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chart-render.js":
/*!*****************************!*\
  !*** ./src/chart-render.js ***!
  \*****************************/
/*! exports provided: renderChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderChart", function() { return renderChart; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/const.js");


const chartButton = document.querySelector(`.chart__button`);
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext('2d');

const changeDPI = (canvas, dpi) => {
  canvas.style.width = canvas.style.width || canvas.width + 'px';
  canvas.style.height = canvas.style.height || canvas.height + 'px';

  const width = parseFloat(canvas.style.width);
  const height = parseFloat(canvas.style.height);

  const scaleFactor = dpi / _const_js__WEBPACK_IMPORTED_MODULE_0__["INITIAL_DPI"];
  const oldScale = canvas.width / width;
  const backupScale = scaleFactor / oldScale;
  const backup = canvas.cloneNode(false);

  backup.getContext('2d').drawImage(canvas, 0, 0);

  const ctx = canvas.getContext('2d');

  canvas.width = Math.ceil(width * scaleFactor);
  canvas.height = Math.ceil(height * scaleFactor);
  ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
  ctx.drawImage(backup, 0, 0);
  ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);
}

const renderChart = (projectsWithData) => {
  changeDPI(canvas, 300);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sortedProjects = projectsWithData.slice().sort((a, b) => a.percentage - b.percentage);
  let currentBarY = _const_js__WEBPACK_IMPORTED_MODULE_0__["BarCoordinate"].INIT_Y;
  let currentLabelY = _const_js__WEBPACK_IMPORTED_MODULE_0__["LabelCoordinate"].INIT_Y;
  let currentPercentageY = _const_js__WEBPACK_IMPORTED_MODULE_0__["PercentageCoordinate"].INIT_Y;

  for (const project of sortedProjects) {
    const percentage = project.percentage;
    const barWidth = (percentage * _const_js__WEBPACK_IMPORTED_MODULE_0__["BarSize"].MAX_WIDTH) / _const_js__WEBPACK_IMPORTED_MODULE_0__["MAX_PERCENTAGE"];
    const gap = _const_js__WEBPACK_IMPORTED_MODULE_0__["BarSize"].HEIGHT + _const_js__WEBPACK_IMPORTED_MODULE_0__["GAP"];

    ctx.fillStyle = project.color;
    ctx.font = `${_const_js__WEBPACK_IMPORTED_MODULE_0__["Font"].SIZE} ${_const_js__WEBPACK_IMPORTED_MODULE_0__["Font"].FAMILY}`;
    ctx.fillText(`${project.name}`, _const_js__WEBPACK_IMPORTED_MODULE_0__["LabelCoordinate"].INIT_X, currentLabelY);
    ctx.fillRect(_const_js__WEBPACK_IMPORTED_MODULE_0__["BarCoordinate"].INIT_X, currentBarY, barWidth, _const_js__WEBPACK_IMPORTED_MODULE_0__["BarSize"].HEIGHT);
    ctx.fillStyle = _const_js__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COLOR"];

    switch (true) {
      case percentage < _const_js__WEBPACK_IMPORTED_MODULE_0__["MIN_PERCENTAGE_FOR_RENDER"]:
        ctx.fillStyle = project.color;
        ctx.fillText(`${percentage}%`, _const_js__WEBPACK_IMPORTED_MODULE_0__["PercentageCoordinate"].INIT_X + barWidth, currentPercentageY);
        break;

      default:
        ctx.fillText(`${percentage}%`, _const_js__WEBPACK_IMPORTED_MODULE_0__["PercentageCoordinate"].INIT_X, currentPercentageY);
        break;
    }

    currentBarY += gap;
    currentLabelY += gap;
    currentPercentageY += gap;
  }

  chartButton.addEventListener(`click`, () => {
    const imgURI = canvas.toDataURL();
    chartButton.href = imgURI;
  });
};


/***/ }),

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


class AbstractComponent {
  constructor() {
    if(new.target === AbstractComponent) {
      throw new Error(`Abstract method not implemented: getTemplate`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/alert.js":
/*!*********************************!*\
  !*** ./src/components/alert.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Alert; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


class Alert extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return (
      `<p class="data__alert">Сумма должна быть равна 100%</p>`
    );
  }
}


/***/ }),

/***/ "./src/components/generate-button.js":
/*!*******************************************!*\
  !*** ./src/components/generate-button.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GenerateButton; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


class GenerateButton extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return (
      `<input class="data__submit-button button" type="submit" value="Сгенерировать график">`
    );
  }
}


/***/ }),

/***/ "./src/components/statistics.js":
/*!**************************************!*\
  !*** ./src/components/statistics.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Statistics; });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data.js */ "./src/data.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



class Statistics extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (courseType) {
    super();

    this._course = courseType;
    this._courseProjects = _data_js__WEBPACK_IMPORTED_MODULE_0__["allCourses"][this._course];
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
            name="${project.value}"
            min="0"
            max="100">
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


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: GAP, MAX_PERCENTAGE, MIN_PERCENTAGE_FOR_RENDER, INITIAL_DPI, DEFAULT_COLOR, BarCoordinate, BarSize, LabelCoordinate, PercentageCoordinate, Font */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAP", function() { return GAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_PERCENTAGE", function() { return MAX_PERCENTAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_PERCENTAGE_FOR_RENDER", function() { return MIN_PERCENTAGE_FOR_RENDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_DPI", function() { return INITIAL_DPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COLOR", function() { return DEFAULT_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarCoordinate", function() { return BarCoordinate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarSize", function() { return BarSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelCoordinate", function() { return LabelCoordinate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PercentageCoordinate", function() { return PercentageCoordinate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Font", function() { return Font; });
const GAP = 20;
const MAX_PERCENTAGE = 100;
const MIN_PERCENTAGE_FOR_RENDER = 15;
const INITIAL_DPI = 96;
const DEFAULT_COLOR = `#ffffff`;

const BarCoordinate = {
  INIT_X: 320,
  INIT_Y: 60
};

const BarSize = {
  MAX_WIDTH: 400,
  HEIGHT: 50
};

const LabelCoordinate = {
  INIT_X: 20,
  INIT_Y: 90
};

const PercentageCoordinate = {
  INIT_X: 330,
  INIT_Y: 95
}

const Font = {
  FAMILY: `Comic Sans MS`,
  SIZE: `25px`
};


/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: allCourses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allCourses", function() { return allCourses; });
const html1Projects = [
  {name: `Нёрдс`, value: `nerds`, color: `#94c4e0`},
  {name: `Седона`, value: `sedona`, color: `#389c9c`},
  {name: `Техномарт`, value: `technomart`, color: `#d6ae72`},
  {name: `Глейси`, value: `gllacy`, color: `#997165`},
  {name: `Девайс`, value: `device`, color: `#eb8888`}
];

const html2Projects = [
  {name: `Пинк`, value: `pink`, color: `#de739a`},
  {name: `Седона`, value: `sedona`, color: `#69c2bc`},
  {name: `Кэт энерджи`, value: `cat-energy`, color: `#eda15a`},
  {name: `Мишка`, value: `mishka`, color: `#332b8f`},
  {name: `Погнали`, value: `pognali`, color: `#e0d780`}
];

const js1Projects = [
  {name: `Кекстаграм`, value: `kekstagram`, color: `#7751e0`},
  {name: `Кексобукинг`, value: `keksobooking`, color: `#789c78`}
];

const js2Projects = [
  {name: `Киноман`, value: `cinemaddict`, color: `#6393bf`},
  {name: `Большое путешествие`, value: `big-trip`, color: `#e5c470`}
];

const allCourses = {
  html1: html1Projects,
  html2: html2Projects,
  js1: js1Projects,
  js2: js2Projects
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _chart_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-render.js */ "./src/chart-render.js");
/* harmony import */ var _components_statistics_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/statistics.js */ "./src/components/statistics.js");
/* harmony import */ var _components_generate_button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/generate-button.js */ "./src/components/generate-button.js");
/* harmony import */ var _components_alert_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/alert.js */ "./src/components/alert.js");






const dataFormElement = document.querySelector(`.data__form`);
const coursesRadioButtons = dataFormElement
  .querySelectorAll(`.data__course-selection-item[name="course"]`);

let statisticsComponent = null;
let generateButtonComponent = null;
let alertComponent = null;

for (const button of coursesRadioButtons) {
  button.addEventListener(`change`, () => {
    statisticsComponent && Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(statisticsComponent);
    generateButtonComponent && Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(generateButtonComponent);
    alertComponent && Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(alertComponent);

    statisticsComponent = new _components_statistics_js__WEBPACK_IMPORTED_MODULE_2__["default"](button.value);
    generateButtonComponent = new _components_generate_button_js__WEBPACK_IMPORTED_MODULE_3__["default"]();

    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["render"])(statisticsComponent, dataFormElement);
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["render"])(generateButtonComponent, dataFormElement);
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

    alertComponent = new _components_alert_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["render"])(alertComponent, dataFormElement);

    return;
  }

  Object(_chart_render_js__WEBPACK_IMPORTED_MODULE_1__["renderChart"])(projectsWithData);
  dataFormElement.reset();
  statisticsComponent.reset();
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(statisticsComponent);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(generateButtonComponent);
  alertComponent && Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(alertComponent);
});


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: createElement, render, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
const createElement = (temlate) => {
  const container = document.createElement(`div`);

  container.innerHTML = temlate;

  return container.firstChild;
};

const render = (component, container) => {
  container.append(component.getElement());
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map