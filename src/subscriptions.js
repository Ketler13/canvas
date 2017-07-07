import { save, get, drawPic, greyScaleFilter, invert } from './utils';

export function widthSub(width) {
  this.width = width;
}

export function colorSub(color) {
  this.color = color;
  this.colors.style.backgroundColor = color;
}

export function mdSub(_) {
  this.pauser$$.next(false);
}

export function mdDo(_) {
  this.points = [];
  const line = {
    color: this.color,
    width: this.width,
    points: []
  }
  this.pic.push(line);
}

export function muSub(_) {
  this.pauser$$.next(true);
}

export function muDo(_) {
  this.pic[this.pic.length - 1].points = this.points;
}

export function pausableSub(point) {
  this.points.push(point);
  this.canvas.fillStyle = this.color;
  this.canvas.beginPath();
  this.canvas.arc(point.x, point.y, this.width, 0, Math.PI * 2);
  this.canvas.fill();
}

export function clearSub(_) {
  this.canvas.clearRect(0, 0, this.w, this.h);
  this.pic = [];
  this.points = [];
  this.buffer = [];
}

export function nameSub(name) {
  this.name = name;
}

export function saveSub(_) {
  if (this.name && this.pic.length) {
    save(this.name, this.pic);
  }
  this.pic = [];
  this.points = [];
  this.buffer = [];
}

export function findSub(_) {
  this.canvas.clearRect(0, 0, this.w, this.h);
  this.pic = [];
  this.points = [];
  this.buffer = [];
  if (this.name) {
    const pic = get(this.name);
    pic && drawPic(pic, this.canvas);
    this.pic = pic;
  }
}

export function filterApplySub(_) {
  if (this.pic.length) {
    const raw = this.canvas.getImageData(0, 0, this.canvasBody.width, this.canvasBody.height);
    let filtered;
    if (this.filter === 'invert') {
      filtered = invert(raw);
    }
    if (this.filter === 'greyscale') {
      filtered = greyScaleFilter(raw);
    }
    this.canvas.putImageData(filtered, 0, 0);
  }
}

export function filterChangeSub(filter) {
  this.filter = filter;
}

export function undoSub(_) {
  if (this.pic.length) {
    this.canvas.clearRect(0, 0, this.w, this.h);
    const lastLine = this.pic.pop();
    this.buffer.push(lastLine);
    drawPic(this.pic, this.canvas);
  }
}

export function redoSub(_) {
  if (this.buffer.length) {
    this.canvas.clearRect(0, 0, this.w, this.h);
    const addictiveLine = this.buffer.pop();
    this.pic.push(addictiveLine);
    drawPic(this.pic, this.canvas);
  }
}
