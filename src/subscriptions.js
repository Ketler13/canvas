export function widthSub(width) {
  this.width = width;
}

export function colorSub(color) {
  this.color = color;
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
}

export function nameSub(name) {
  this.name = name;
}

export function saveSub(_) {
  if (this.name && this.pic.length) {
    save(name, pic);
  }
  this.pic = [];
  this.points = [];
}

export function findSub(_) {
  this.canvas.clearRect(0, 0, w, h);
  this.pic = [];
  this.points = [];
  if (this.name) {
    const pic = get(this.name);
    pic && drawPic(pic, this.canvas);
  }
}
