import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skipUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/never';

import {
  widthChange, colorChange, mouseDown, mouseMove, mouseUp, clearCanvas,
  nameChange, savePic, findPic
} from './observables';
import { setOptionsToSelect, drawPic, save, get } from './utils';
import { opts, defaultLine } from './default';

const controls = document.querySelector('.controls');
const range = document.querySelector('.range');
const colors = document.querySelector('.colors');
const wrapper = document.querySelector('.wrapper');
const canvasBody = document.getElementById('canvas');
const clearButton = document.querySelector('.button.clear');
const nameInput = document.querySelector('.name');
const saveButton = document.querySelector('.button.save');
const findButton = document.querySelector('.button.find');

const canvas = canvasBody.getContext('2d');
const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight;

setOptionsToSelect(colors);

const width$ = widthChange(range);
const color$ = colorChange(colors);

const mousemove$ = mouseMove();
const mousedown$ = mouseDown();
const mouseup$ = mouseUp();

const name$ = nameChange(nameInput);
const save$ = savePic(saveButton);
const find$ = findPic(findButton);
let name = null;

const clear$ = clearCanvas(clearButton);

let pic = [];
let line = defaultLine;

const pauser$$ = new Subject();
const pausable$ = pauser$$.switchMap(paused => paused ? Observable.never() : mousemove$);
mousedown$.subscribe(_ => pauser$$.next(false));
mouseup$.subscribe(_ => pauser$$.next(true));
pausable$.subscribe(pos => {
  console.log(opts);
});

width$.subscribe(width => {
  opts.width = width;
});

color$.subscribe(color => {
  opts.color = color;
  colors.style.backgroundColor = color;
});

clear$.subscribe(x => {
  canvas.clearRect(0, 0, w, h);
  pic = [];
  line = defaultLine;
})

name$.subscribe(value => name = value);

save$.subscribe(ev => {
  if (name && pic.length) {
    console.log('--saving', pic);
    save(name, pic);
  }
});

find$.subscribe(_ => {
  if (name) {
    const pic = get(name);
    console.log(pic);
    pic && drawPic(pic, canvas);
  }
});
