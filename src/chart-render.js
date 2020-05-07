const GAP = 20;
const MAX_PERCENTAGE = 100;
const INITIAL_DPI = 96;

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

const Font = {
  FAMILY: `Comic Sans MS`,
  SIZE: `25px`
};

const chartButton = document.querySelector(`.chart__button`);
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext('2d');

const changeDPI = (canvas, dpi) => {
  canvas.style.width = canvas.style.width || canvas.width + 'px';
  canvas.style.height = canvas.style.height || canvas.height + 'px';

  const width = parseFloat(canvas.style.width);
  const height = parseFloat(canvas.style.height);

  const scaleFactor = dpi / INITIAL_DPI;
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

export const renderChart = (projectsWithData) => {
  changeDPI(canvas, 300);
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

  chartButton.addEventListener(`click`, () => {
    const imgURI = canvas.toDataURL();
    chartButton.href = imgURI;
  });
};
