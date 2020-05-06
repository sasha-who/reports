const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext('2d');

const BarCoordinate = {
  INIT_X: 400,
  INIT_Y: 50
};

const BarSize = {
  MAX_WIDTH: 300,
  HEIGHT: 50
};

const LabelCoordinate = {
  INIT_X: 80,
  INIT_Y: 80
};

const Font = {
  FAMILY: `Comic Sans MS`,
  SIZE: `25px`
};

const GAP = 20;
const MAX_PERCENTAGE = 100;

export const renderChart = (projectsWithData) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sortedProjects = projectsWithData.slice().sort((a, b) => a.percentage - b.percentage);
  let currentBarY = BarCoordinate.INIT_Y;
  let currentLabelY = LabelCoordinate.INIT_Y;

  for (const project of sortedProjects) {
    const percentage = project.percentage;
    const barWidth = (percentage * BarSize.MAX_WIDTH) / MAX_PERCENTAGE;
    const gap = BarSize.HEIGHT + GAP;

    ctx.fillStyle = project.color;
    ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
    ctx.fillText(`${project.name}`, LabelCoordinate.INIT_X, currentLabelY);
    ctx.fillRect(BarCoordinate.INIT_X, currentBarY, barWidth, BarSize.HEIGHT);

    currentBarY += gap;
    currentLabelY += gap;
  }
};
