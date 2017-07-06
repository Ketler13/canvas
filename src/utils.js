import { colors } from './default';

export const setOptionsToSelect = select => {
  colors.forEach((color, i) => {
    const opt = document.createElement('option');
    opt.value = color;
    opt.style.backgroundColor = color;
    if (i === 0) { select.style.backgroundColor = color }
    select.appendChild(opt);
  });
}
