import boxLayout from './features/boxLayout.js';
import contentLayout from './features/contentLayout.js';
import visualRendering from './features/visualRendering.js';
import selectors from './features/selectors.js';
import other from './features/other.js';
import media from './features/media.js';

export default [
  ...boxLayout,
  ...visualRendering,
  ...contentLayout,
  ...other,
  ...selectors,
  ...media
];
