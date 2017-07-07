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
import { setOptionsToSelect, drawPic, save, get, _setOptionsToSelect } from './utils';
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
    this.width$ = _widthChange.call(this).startWith(15);
    this.color$ = _colorChange.call(this).startWith('rgb(244,67,54)');
    this.mousedown$ = _mouseDown.call(this);
    this.mousemove$ = _mouseMove.call(this);
    this.mouseup$ = _mouseUp.call(this);
    this.name$ = _nameChange.call(this);
    this.save$ = _savePic.call(this);
    this.find$ = _findPic.call(this);
    this.clear$ = _clearCanvas.call(this);
    this.pauser$$ = new Subject();
    this.pausable$ = this.pauser$$
      .switchMap(paused => paused ? Observable.never() : this.mousemove$);
  },
  createSubscriptions() {
    this.createObservables();

    this.width$.subscribe(width => {
      this.width = width;
    });

    this.color$.subscribe(color => {
      this.color = color;
    });

    this.mousedown$
      .do(_ => {
        this.points = [];
        const line = {
          color: this.color,
          width: this.width,
          points: []
        }
        this.pic.push(line);
      })
      .subscribe(_ => this.pauser$$.next(false));

    this.mouseup$
      .do(_ => {
        this.pic[this.pic.length - 1].points = this.points;
      })
      .subscribe(_ => this.pauser$$.next(true));

    this.pausable$.subscribe(point => {
      this.points.push(point);
      this.canvas.fillStyle = this.color;
      this.canvas.beginPath();
      this.canvas.arc(point.x, point.y, this.width, 0, Math.PI * 2);
      this.canvas.fill();
    });

    this.clear$.subscribe(x => {
      this.canvas.clearRect(0, 0, w, h);
      this.pic = [];
      this.points = [];
    })

    this.name$.subscribe(value => this.name = value);

    this.save$.subscribe(ev => {
      if (this.name && this.pic.length) {
        save(name, pic);
      }
      this.pic = [];
      this.points = [];
    });

    this.find$.subscribe(_ => {
      this.canvas.clearRect(0, 0, w, h);
      this.pic = [];
      this.points = [];
      if (this.name) {
        const pic = get(this.name);
        pic && drawPic(pic, this.canvas);
      }
    });
  },
  start() {
    _setOptionsToSelect.call(this);
    this.createSubscriptions()
  }

}

app.start();
