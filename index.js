const canvasBody = document.getElementById('canvas');
const canvas = canvasBody.getContext('2d');
const clearButton = document.getElementById('clear');

const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight - 50;

const opts = {
  width: 10,
  color: '#aaa'
};

let paintIsOn = false;

const cache = [];

canvasBody.addEventListener('mousedown', (ev) => {
  paintIsOn = true;
});

canvasBody.addEventListener('mouseup', (ev) => {
  paintIsOn = false;
});

canvasBody.addEventListener('mousemove', (ev) => {
  if (paintIsOn) {
    const x = ev.pageX;
    const y = ev.pageY;
    cache.push({x, y});

    canvas.fillStyle = opts.color;
    canvas.beginPath();
    canvas.arc(x, y, opts.width, 0, Math.PI * 2);
    canvas.fill();
  }
});

clearButton.addEventListener('click', (ev) => {
  canvas.clearRect(0, 0, canvasBody.width, canvasBody.height);
  setTimeout(() => {
    drawFromCache();
  }, 500);
});

const drawFromCache = () => {
  cache.forEach(({x, y}) => {
    canvas.fillStyle = opts.color;
    canvas.beginPath();
    canvas.arc(x, y, opts.width, 0, Math.PI * 2);
    canvas.fill();
  });
}
