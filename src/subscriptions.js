import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';

export const subscribePointer = (el, pointer) => {
  return Observable
    .fromEvent(el, 'mousemove')
    .map(e => {
      return {
        x: e.clientX,
        y: e.clientY
      }
    })
    .subscribe(value => {
      pointer.style.left = value.x + 'px';
      pointer.style.top = value.y + 'px';
    });
}

export const unsubscribePointer = (elem, pointer) => {
  const onControlsEnter = Observable.fromEvent(elem, 'mouseenter');
  const onBodyLeave = Observable.fromEvent(document.body, 'mouseleave');

  return Observable.merge(
    onControlsEnter,
    onBodyLeave)
    .subscribe(e => {
      pointer.style.left = '-50px';
      pointer.style.top = '-50px';
    });
}
