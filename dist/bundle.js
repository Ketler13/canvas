/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const canvasBody = document.getElementById('canvas');
const canvas = canvasBody.getContext('2d');
const clearButton = document.getElementById('clear');

const w = canvasBody.width = window.innerWidth;
const h = canvasBody.height = window.innerHeight - 50;

const opts = {
  width: 10,
  color: '#aaa'
};

let paintIsOn = false;

let pictureCache = [];
let lineCache = [];

canvasBody.addEventListener('mousedown', (ev) => {
  paintIsOn = true;
});

canvasBody.addEventListener('mouseup', (ev) => {
  pictureCache.push(lineCache);
  lineCache = [];
  paintIsOn = false;
});

canvasBody.addEventListener('mousemove', (ev) => {
  if (paintIsOn) {
    const x = ev.pageX;
    const y = ev.pageY;
    lineCache.push({x, y});

    canvas.fillStyle = opts.color;
    canvas.beginPath();
    canvas.arc(x, y, opts.width, 0, Math.PI * 2);
    canvas.fill();
  }
});

clearButton.addEventListener('click', (ev) => {
  canvas.clearRect(0, 0, canvasBody.width, canvasBody.height);
});

const drawFromCache = () => {
  cache.forEach(({x, y}) => {
    canvas.fillStyle = opts.color;
    canvas.beginPath();
    canvas.arc(x, y, opts.width, 0, Math.PI * 2);
    canvas.fill();
  });
}

function concatAll(array) {
  return array.reduce((prev, next) => prev.concat(next));
}


/***/ })
/******/ ]);