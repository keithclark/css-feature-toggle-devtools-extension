import './browser.devtools.inspectedWindow.eval.js';
import { polyfill as onResourceAddedPolyfill } from './browser.devtools.inspectedWindow.onResourceAdded.js';
import { polyfill as getResourcesPolyfill } from './browser.devtools.inspectedWindow.getResources.js';

if (!('onResourceAdded' in browser.devtools.inspectedWindow)) {
  browser.devtools.inspectedWindow.onResourceAdded = onResourceAddedPolyfill();
}

if (!('getResources' in browser.devtools.inspectedWindow)) {
  browser.devtools.inspectedWindow.getResources = getResourcesPolyfill();
}
