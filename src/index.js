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
  nameChange, savePic, findPic, filterApply, filterChange, undo, redo
} from './observableCreators';

import {
  widthSub, colorSub, mdSub, mdDo, muSub, muDo, pausableSub, clearSub, nameSub,
  saveSub, findSub, filterApplySub, filterChangeSub, undoSub, redoSub, undoRedoSub
} from './subscriptions';

import { setOptionsToSelect, setFilters } from './utils';

const controls = document.querySelector('.controls');
const range = document.querySelector('.range');
const colors = document.querySelector('.colors');
const example = document.querySelector('.example');
const wrapper = document.querySelector('.wrapper');
const canvasBody = document.getElementById('canvas');
const clearButton = document.querySelector('.button.clear');
const undoButton = document.querySelector('.button.undo');
const redoButton = document.querySelector('.button.redo');
const nameInput = document.querySelector('.name');
const saveButton = document.querySelector('.button.save');
const findButton = document.querySelector('.button.find');
const filters = document.querySelector('.filters');
const filterButton = document.querySelector('.button.filter');

const canvas = canvasBody.getContext('2d');
const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight;

const app = {
// DOM elements

  controls,
  range,
  colors,
  example,
  wrapper,
  canvasBody,
  clearButton,
  undoButton,
  redoButton,
  nameInput,
  saveButton,
  findButton,
  filters,
  filterButton,
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
  undo$: null,
  redo$: null,
  filter$: null,
  filterApply$: null,
  filterChange$: null,
  pausable$: null,
  pauser$$: null,
  undoRedoSource$$: null,

// variables

  name: null,
  width: null,
  color: null,
  pic: [],
  point: [],
  buffer: [],
  filter: null,

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
    this.undo$ = undo.call(this);
    this.redo$ = redo.call(this);
    this.filterApply$ = filterApply.call(this);
    this.filterChange$ = filterChange.call(this).startWith('invert');
    this.pauser$$ = new Subject();
    this.undoRedoSource$$ = new Subject();
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

    this.undo$.subscribe(undoSub.bind(this));

    this.redo$.subscribe(redoSub.bind(this));

    this.name$.subscribe(nameSub.bind(this));

    this.save$.subscribe(saveSub.bind(this));

    this.find$.subscribe(findSub.bind(this));

    this.filterApply$.subscribe(filterApplySub.bind(this));
    this.filterChange$.subscribe(filterChangeSub.bind(this));
    this.undoRedoSource$$.subscribe(undoRedoSub.bind(this));
  },
  start() {
    setOptionsToSelect.call(this);
    setFilters.call(this);
    this.createSubscriptions();
  }

}

app.start();
