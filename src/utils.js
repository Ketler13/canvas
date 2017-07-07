import { colors, filters } from './default';

export function setOptionsToSelect() {
  colors.forEach((color, i) => {
    const opt = document.createElement('option');
    opt.value = color;
    opt.style.backgroundColor = color;
    if (i === 0) { this.colors.style.backgroundColor = color }
    this.colors.appendChild(opt);
  });
}

export function setFilters() {
  filters.forEach(filter => {
    const opt = document.createElement('option');
    opt.value = filter;
    opt.innerHTML = filter;
    this.filters.appendChild(opt);
  });
}

export const save = (name, pic) => {
  localStorage.removeItem(name);
  localStorage.setItem(name, JSON.stringify(pic));
}

export const get = (name) => {
  const item = localStorage.getItem(name);
  return JSON.parse(item);
}

export const drawPic = (lines, canvas) => {
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

export const greyScaleFilter = pixels => {
  const d = pixels.data;
  for (let i=0; i<d.length; i+=4) {
    const r = d[i];
    const g = d[i+1];
    const b = d[i+2];
    const v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
}

export const invert = pixels => {
  const d = pixels.data
  for (let i = 0; i < d.length; i += 4) {
    d[i]     = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
  return pixels;
};
