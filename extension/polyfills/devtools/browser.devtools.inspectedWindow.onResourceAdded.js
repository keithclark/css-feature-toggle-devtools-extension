/**
 * Polyfills `onResourceAdded` using the `onRequestFinished` event. When a
 * network request completes it's examined and converted into a Resource object
 * before being passed to the resource added event handler.
 */

import { Resource } from './Resource.js';
import { Event } from './Event.js'

export const polyfill = () => {

  const onResourceAdded = new Event('onResourceAdded');

  browser.devtools.network.onRequestFinished.addListener(event => {

    let url = event.request.url;
    let contentTypeHeader = event.response.content.mimeType;
    let type;

    // TODO: Not all responses return a content type so we should also check the
    // `accept` request header for `text/css` too.
    if (!contentTypeHeader) {
      return false;
    }

    if (contentTypeHeader.includes('text/css')) {
      type = 'stylesheet';
    } else if (contentTypeHeader.includes('text/html')) {
      type = 'document';
    }

    if (!type) {
      return false;
    }

    onResourceAdded.dispatch(new Resource(type, url));

  });

  return onResourceAdded;
}

