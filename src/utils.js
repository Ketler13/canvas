import { colors } from './default';

export const setOptionsToSelect = select => {
  colors.forEach((color, i) => {
    const opt = document.createElement('option');
    opt.value = color;
    opt.style.backgroundColor = color;
    if (i === 0) { select.style.backgroundColor = color }
    select.appendChild(opt);
  });
}

export const save = (name, pic) => {
  localStorage.setItem(name, JSON.stringify(pic));
}

export const get = (name) => {
  return JSON.parse(localStorage.getItem(name));
}

export const drawPic = (lines, canvas) => {
  canvas.clearRect(0, 0, canvas.width, canvas.heigth);
  lines.forEach(line => {
    const { color, width, points } = line;
    points.forEach(point => {
      canvas.fillStyle = color;
      canvas.beginPath();
      canvas.arc(point.x, point.y, width, 0, Math.PI * 2);
      canvas.fill();
    });
  });
}
