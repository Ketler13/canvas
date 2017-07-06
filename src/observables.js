import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


export const widthChange = range => Observable
  .fromEvent(range, 'change')
  .map(ev => ev.target.value);

export const colorChange = colors => Observable
  .fromEvent(colors, 'change')
  .map(ev => ev.target.value);

export const mouseDown = () => Observable
  .fromEvent(document.body, 'mousedown')
  .map(ev => {
    return {
      x: ev.clientX,
      y: ev.clientY
    }
  })
  .filter(point => point.y > 50)

export const mouseMove = () => Observable
  .fromEvent(document.body, 'mousemove')
  .map(ev => {
    return {
      x: ev.clientX,
      y: ev.clientY
    }
  })
  .filter(point => point.y > 50)

export const mouseUp = () => Observable
  .fromEvent(document.body, 'mouseup')
  .map(ev => {
    return {
      x: ev.clientX,
      y: ev.clientY
    }
  })
  .filter(point => point.y > 50)

export const clearCanvas = button => Observable.fromEvent(button, 'click');

export const nameChange = input => Observable.fromEvent(input, 'input')
  .map(ev => ev.target.value);

export const savePic = button => Observable.fromEvent(button, 'click');

export const findPic = button => Observable.fromEvent(button, 'click');
