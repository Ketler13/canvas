import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';


export const pointerMove = elem => {
  return Observable
    .fromEvent(elem, 'mousemove')
    .map(e => {
      return {
        x: e.clientX,
        y: e.clientY
      }
    });
}

export const pointerLeave = elem => {
  const onControlsEnter = Observable.fromEvent(elem, 'mouseenter');
  const onBodyLeave = Observable.fromEvent(document.body, 'mouseleave');

  return Observable.merge(
    onControlsEnter,
    onBodyLeave);
}

export const widthChange = range => Observable
                                      .fromEvent(range, 'change')
                                      .map(ev => ev.target.value);

export const colorChange = colors => Observable
                                       .fromEvent(colors, 'change')
                                       .map(ev => ev.target.value);
