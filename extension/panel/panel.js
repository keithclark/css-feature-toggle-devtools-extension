import {
  getStylesheets,
  getDocuments,
  getStyleElementStyles,
  setStyleElementStyles
} from './resource-helpers.js';
import {encodeCssText} from './utils.js';
import features from './feature-list.js';


const optionsTemplate = document.getElementById('option');
const optionGroupsTemplate = document.getElementById('optionGroup');
const containerOptions = document.getElementById('optionsContainer');


let paused = false;

/**
 * Applies the extension settings to any documents in the currently inspected
 * window.
 */
const updateInspectedWindow = () => {
  return Promise.all([
    updateInspectedWindowStylesheets(),
    updateInspectedWindowStyleElements()
  ]);
};


/**
 * Applies the current extension settings to any stylesheet resources in the
 * inspected window.
 */
const updateInspectedWindowStylesheets = async () => {
  let stylesheets = await getStylesheets();
  return stylesheets.map(updateDocumentStylesheet);
};


/**
 * Applies the current extension settings to any <style> elements in document
 * resources in the inspected window.
 */
const updateInspectedWindowStyleElements = async () => {
  let documents = await getDocuments();
  return documents.map(updateDocumentStyleElements);
};


/**
 * Updates the cssText of the passed stylesheet resource
 *
 * @param {Resource} resource
 */
const updateDocumentStylesheet = resource => {
  return new Promise(resolve => {
    resource.getContent(content => {
      let newContent = updateCssText(content);
      if (newContent !== content) {
        resource.setContent(newContent, true, resolve);
      } else {
        resolve();
      }
    });
  });
}


/**
 * Updates <style> elements of a document resource.
 *
 * @param {Resource} resource
 */
const updateDocumentStyleElements = async resource => {
  let styles = await getStyleElementStyles(resource);
  styles = styles.map(encodeCssText).map(updateCssText);
  return setStyleElementStyles(resource, styles);
};


/**
 * Update the passed CSS text with the relvant settings
 *
 * @param {string} cssText
 */
const updateCssText = cssText => {
  features.forEach(feature => {
    if (!paused && feature.disabled) {
      cssText = feature.disable(cssText);
    } else {
      cssText = feature.enable(cssText);
    }
  });
  return cssText;
};


/**
 * Checks to see if all features are enabled (toggled on).
 */
const allFeaturesEnabled = () => features.every(feature => !feature.disabled);


/**
 * Creates UI options
 */
const createOptions = () => {

  let optionGroups = {};

  features.forEach((feature, i) => {
    let optionTemplate = document.importNode(optionsTemplate.content, true);
    let id = `feature-${i}`;
    let inputElem = optionTemplate.querySelector('input');
    let labelElem = optionTemplate.querySelector('label');
    let nameElem = optionTemplate.querySelector('.option__name');
    let helpElem = optionTemplate.querySelector('.option__help');
    let group = feature.group || 'Default';

    nameElem.textContent = feature.name;
    helpElem.textContent = feature.help;
    labelElem.setAttribute('for', id);
    inputElem.setAttribute('id', id);
    inputElem.addEventListener('click', () => {
      let onResourceAdded = browser.devtools.inspectedWindow.onResourceAdded;

      if (inputElem.checked && allFeaturesEnabled()) {
        onResourceAdded.addListener(resourceAddedListener);
      }

      feature.disabled = inputElem.checked;

      if (!inputElem.checked && allFeaturesEnabled()) {
        onResourceAdded.removeListener(resourceAddedListener);
      }

      updateInspectedWindow();

    });


    if (!optionGroups[group]) {
      let optionGroupTemplate = document.importNode(optionGroupsTemplate.content, true);
      optionGroupTemplate.querySelector('.optionGroup__name').textContent = group;
      optionGroups[group] = optionGroupTemplate;
    }

    optionGroups[group].querySelector('.optionGroup__options').appendChild(optionTemplate);

  });

  Object.values(optionGroups).forEach(group => containerOptions.appendChild(group));

}


/**
 * Refreshes the UI with the current theme
 */
const updateTheme = () => {
  document.documentElement.classList.add(`theme--${browser.devtools.panels.themeName}`);
}

/**
 * Reset all extension options
 */
const resetOptions = () => {
  if (!allFeaturesEnabled()) {
    document.querySelectorAll('.optionGroup__options input').forEach(elem => elem.checked = false);
    features.forEach(feature => feature.disabled = false);
    browser.devtools.inspectedWindow.onResourceAdded.removeListener(resourceAddedListener);
    updateInspectedWindow();
  }
}

/**
 * Pause the extension
 */
const pause = () => {
  paused = !paused;
  document.getElementById('pause').classList.toggle('button--active', paused);
  document.querySelectorAll('.optionGroup__options input').forEach(elem => elem.disabled = paused);
  updateInspectedWindow();
}


/**
 * Event handler for `onResourceAdded`, which is dynamically bound when the user
 * sets/unsets any of the panel options
 *
 * @param {*} resource
 */
const resourceAddedListener = resource => {
  if (resource.type === 'document') {
    updateDocumentStyleElements(resource);
  } else if (resource.type === 'stylesheet') {
    updateDocumentStylesheet(resource);
  }
}


/**
 * Initialise the extension
 */
const init = () => {

  updateTheme();

  // Chrome 71 doesn't support the `onThemeChanged` event as it restarts devtools
  // when the user changes theme.
  if ('onThemeChanged' in browser.devtools.panels) {
    browser.devtools.panels.onThemeChanged.addListener(updateTheme);
  }

  // Firefox 64 doesn't support the `onResourceAdded` event so we can't start
  // the extension.
  if ('onResourceAdded' in browser.devtools.inspectedWindow) {
    createOptions();
  }
}


init();

  // Reset options button
  document.getElementById('reset').addEventListener('click', resetOptions);

  // Reset options button
  document.getElementById('pause').addEventListener('click', pause);


  // Mimic the keyboard-only focus hilighting used in Chrome devtools
  document.addEventListener('keydown', e => {
    if (e.keyCode === 9) {
      document.documentElement.classList.add('keyboard-focus');
    }
  });

  document.addEventListener('mousedown', e => {
    document.documentElement.classList.remove('keyboard-focus');
  });

