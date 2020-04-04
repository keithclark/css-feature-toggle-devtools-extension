import { getResourceContent, setResourceContent } from './browser.devtools.inspectedWindow.getResources.js';

export class Resource {

  constructor(type, url) {
    this._type = type;
    this._url = url;
  }

  getContent(callback) {
    getResourceContent(this).then(callback);
  }

  setContent(content, commit, callback) {
    setResourceContent(this, content).then(callback);
  }

  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }

  get name() {
    let url = this.url;
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url.substr(url.lastIndexOf('/') + 1);
  }
};
