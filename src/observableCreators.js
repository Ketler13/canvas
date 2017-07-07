import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export function widthChange() {
  return Observable
    .fromEvent(this.range, 'change')
    .map(ev => ev.target.value);
}

export function colorChange() {
  return Observable
    .fromEvent(this.colors, 'change')
    .map(ev => ev.target.value);
}

export function mouseDown() {
  return Observable
    .fromEvent(document.body, 'mousedown')
    .map(ev => {
      return {
        x: ev.clientX,
        y: ev.clientY
      }
    })
    .filter(point => point.y > 50)
}

export function mouseMove() {
  return Observable
    .fromEvent(document.body, 'mousemove')
    .map(ev => {
      return {
        x: ev.clientX,
        y: ev.clientY
      }
    })
    .filter(point => point.y > 50)
}

export function mouseUp() {
  return Observable
    .fromEvent(document.body, 'mouseup')
    .map(ev => {
      return {
        x: ev.clientX,
        y: ev.clientY
      }
    })
    .filter(point => point.y > 50)
}

export function clearCanvas() {
  return Observable.fromEvent(this.clearButton, 'click');
}

export function nameChange() {
  return Observable.fromEvent(this.nameInput, 'input')
    .map(ev => ev.target.value);
}

export function  savePic() {
  return Observable.fromEvent(this.saveButton, 'click');
}

export function findPic() {
  return Observable.fromEvent(this.findButton, 'click');
}