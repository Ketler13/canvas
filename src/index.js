import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';

import {
  widthChange, colorChange, mouseDown, mouseMove, mouseUp
} from './observables';
import { setOptionsToSelect } from './utils';
import { opts } from './default';

const controls = document.querySelector('.controls');

const range = document.querySelector('.range');
const colors = document.querySelector('.colors');

const wrapper = document.querySelector('.wrapper');
const canvasBody = document.getElementById('canvas');

const canvas = canvasBody.getContext('2d');
canvasBody.width = window.innerWidth;
canvasBody.height = window.innerHeight;

const clearButton = document.querySelector('.button.clear');

setOptionsToSelect(colors);

const width$ = widthChange(range);
const color$ = colorChange(colors);

const mousemove$ = mouseMove();
const mousedown$ = mouseDown();
const mouseup$ = mouseUp();

const draw = () => {
  mousedown$
    .switchMap(x => mousemove$)
    .takeUntil(mouseup$)
    .subscribe(pos => {
      canvas.fillStyle = opts.color;
      canvas.beginPath();
      canvas.arc(pos.x, pos.y, opts.width, 0, Math.PI * 2);
      canvas.fill();
    });
}

draw();
mouseup$.subscribe(x => draw());

width$.subscribe(width => {
  opts.width = width;
});

color$.subscribe(color => {
  opts.color = color;
  colors.style.backgroundColor = color;
});
