import {setValuesToPointer} from './utils';
import { subscribePointer, unsubscribePointer } from './subscriptions';

const pointer = document.querySelector('.pointer');
const controls = document.querySelector('.controls');
const wrapper = document.querySelector('.wrapper');
const canvasBody = document.getElementById('canvas');
const canvas = canvasBody.getContext('2d');
const clearButton = document.querySelector('.button.clear');

const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight;

const opts = {
  width: 30,
  color: 'rgb(233, 30, 99)'
};
setValuesToPointer(pointer, opts);


let painting = false;

let pictureCache = [];
let lineCache = [];

subscribePointer(canvasBody, pointer);
unsubscribePointer(controls, pointer);
