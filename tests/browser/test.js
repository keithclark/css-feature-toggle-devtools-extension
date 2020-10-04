(() => {

  const testTemplate = document.getElementById('test-template');
  const groupTemplate = document.getElementById('group-template');
  const groups = {};


  const resolveCssTemplate = (cssText, id) => {
    cssText = cssText.replace(/<supported-color>/g, '#9c9');
    cssText = cssText.replace(/<unsupported-color>/g, '#d30');
    cssText = cssText.replace(/<indicator-selector>/g, `#${id}`);
    return cssText;
  };


  const createTemplate = (template, data) => {
    let clone = document.importNode(template.content, true);
    Object.keys(data).forEach(selector => {
      let elem = clone.querySelector(selector);
      let config = data[selector];
      if (elem) {
        if (config.html) {
          elem.innerHTML = config.html;
        } else if (config.text) {
          elem.textContent = config.text;
        }
        if (config.attrs) {
          Object.keys(config.attrs).forEach(attr => {
            elem.setAttribute(attr, config.attrs[attr]);
          });
        }
      }
    });
    return clone;
  };


  const addTest = config => {
    let groupName = config.group || "Other";
    let id = `test-${config.name.replace(/:/g,'')}`;
    let groupElem = groups[groupName];

    let testElem = createTemplate(testTemplate, {
      '.test__indicator':{
        attrs: {
          id: id,
          title: config.name,
        },
        html: config.html
      },
      '.test__title': {
        text: config.name
      },
      '.test__style': {
        text: resolveCssTemplate(config.css, id)
      }
    });

    if (!groupElem) {
      groupElem = createTemplate(groupTemplate, {
        '.testGroup__title':{
          text: groupName
        }
      });
      groups[groupName] = groupElem;
    }

    groupElem.querySelector('.testGroup__tests').appendChild(testElem);
  };


  const runTests = () => {
    Object.keys(groups).forEach(group => {
      document.body.appendChild(groups[group]);
    });
  };


  window.addTest = addTest;
  window.addEventListener('load', runTests);

})();
