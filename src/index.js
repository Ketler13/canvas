// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/switchMap';
//
//
// import {
//   widthChange, colorChange, mouseDown, mouseMove,
//   mouseUp
// } from './observables';
//
// import { opts } from './default';
//
// import { setOptionsToSelect } from './utils';
//
// const controls = document.querySelector('.controls');
//
// const range = document.querySelector('.range');
// const colors = document.querySelector('.colors');
//
// const wrapper = document.querySelector('.wrapper');
// const canvasBody = document.getElementById('canvas');
//
// const canvas = canvasBody.getContext('2d');
// const clearButton = document.querySelector('.button.clear');
//
// const width$ = widthChange(range).startWith(10);
// const color$ = colorChange(colors).startWith('rgb(244,67,54)');
//
// const mouseDown$ = mouseDown();
// const mouseMove$ = mouseMove();
// const mouseUp$ = mouseUp();
//
// setOptionsToSelect(colors);
//
// width$.subscribe(width => {
//   opts.width = width;
// });
//
// color$.subscribe(color => {
//   opts.color = color;
// });

document.body.addEventListener('mousemove', () => {
  console.log(1);
})
