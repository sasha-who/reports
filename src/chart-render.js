const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext('2d');

const BarCoordinates = {
  INIT_X: 350,
  INIT_Y: 50
};

const BarSize = {
  WIDTH: 300,
  HEIGHT: 50
};

export const renderChart = (projectData) => {
  ctx.fillStyle = 'green';
  ctx.fillRect(BarCoordinates.INIT_X, BarCoordinates.INIT_Y, BarSize.WIDTH, BarSize.HEIGHT);
};
