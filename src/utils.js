export const setValuesToPointer = (pointer, opts) => {
  pointer.style.width = opts.width + 'px';
  pointer.style.height = opts.width + 'px';
  pointer.style.backgroundColor = opts.color;

}
