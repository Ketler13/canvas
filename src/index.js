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
} from './observableCreators';

import {
  widthSub, colorSub, mdSub, mdDo, muSub, muDo, pausableSub, clearSub, nameSub,
  saveSub, findSub
} from './subscriptions';

import { _setOptionsToSelect } from './utils';

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

const app = {
// DOM elements

  controls,
  range,
  colors,
  wrapper,
  canvasBody,
  clearButton,
  nameInput,
  saveButton,
  findButton,
  canvas,
  w,
  h,

// event streams

  width$: null,
  color$: null,
  mousemove$: null,
  mousedown$: null,
  mouseup$: null,
  name$: null,
  save$: null,
  find$: null,
  clear$: null,
  pausable$: null,
  pauser$$: null,

// variables

  name: null,
  width: null,
  color: null,
  pic: [],
  point: [],

//methods

  createObservables() {
    this.width$ = widthChange.call(this).startWith(15);
    this.color$ = colorChange.call(this).startWith('rgb(244,67,54)');
    this.mousedown$ = mouseDown.call(this);
    this.mousemove$ = mouseMove.call(this);
    this.mouseup$ = mouseUp.call(this);
    this.name$ = nameChange.call(this);
    this.save$ = savePic.call(this);
    this.find$ = findPic.call(this);
    this.clear$ = clearCanvas.call(this);
    this.pauser$$ = new Subject();
    this.pausable$ = this.pauser$$
      .switchMap(paused => paused ? Observable.never() : this.mousemove$);
  },

  createSubscriptions() {
    this.createObservables();

    this.width$.subscribe(widthSub.bind(this));

    this.color$.subscribe(colorSub.bind(this));

    this.mousedown$
      .do(mdDo.bind(this))
      .subscribe(mdSub.bind(this));

    this.mouseup$
      .do(muDo.bind(this))
      .subscribe(muSub.bind(this));

    this.pausable$.subscribe(pausableSub.bind(this));

    this.clear$.subscribe(clearSub.bind(this));

    this.name$.subscribe(nameSub.bind(this));

    this.save$.subscribe(saveSub.bind(this));

    this.find$.subscribe(findSub.bind(this));
  },
  start() {
    _setOptionsToSelect.call(this);
    this.createSubscriptions()
  }

}

app.start();
