import { pointerMove, pointerLeave, widthChange, colorChange } from './observables';
import { setOptionsToSelect } from './utils';

const pointer = document.querySelector('.pointer');
const controls = document.querySelector('.controls');

const range = document.querySelector('.range');
const colors = document.querySelector('.colors');

const wrapper = document.querySelector('.wrapper');
const canvasBody = document.getElementById('canvas');


const canvas = canvasBody.getContext('2d');
const clearButton = document.querySelector('.button.clear');

setOptionsToSelect(colors);

const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight;

const pointerMove$ = pointerMove(canvasBody);
const pointerLeave$ = pointerLeave(controls);

const width$ = widthChange(range);
const color$ = colorChange(colors);

pointerMove$.subscribe(value => {
  pointer.style.left = value.x + 'px';
  pointer.style.top = value.y + 'px';
});

pointerLeave$.subscribe(ev => {
  pointer.style.left = '-50px';
  pointer.style.top = '-50px';
});

width$.subscribe(width => {
  pointer.style.width = width + 'px';
  pointer.style.height = width + 'px';
});

color$.subscribe(color => {
  pointer.style.backgroundColor = color;
});
