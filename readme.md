# CSS Feature Toggle Extension

This devtools extension provides the ability to toggle-off CSS features, allowing developers to see how their pages and applications render and fallback in browsers that don't support modern CSS features.

Available for Chrome via the [Chrome Web Store](https://chrome.google.com/webstore/detail/css-feature-toggles/aeinmfddnniiloadoappmdnffcbffnjg).

![Screengrab of the CSS Feature Toggle extension](screengrab.png)

## Supported browsers

* Chrome — installable via [Chrome Web Store](https://chrome.google.com/webstore/detail/css-feature-toggles/aeinmfddnniiloadoappmdnffcbffnjg)
* Opera
* Edge (Chromium)
* Firefox - See limitations


## Limitations

Toggling CSS features isn't supported everywhere *yet* so you should be aware of these caveats:

* Inline styles (`<div style="...">`) will not be disabled.
* Changes made to a stylesheet via the CSSOM will not be disabled.

### Firefox

This extension uses API features that aren't yet supported in Firefox Developer Tools. There is [a ticket to add the missing API methods](https://bugzilla.mozilla.org/show_bug.cgi?id=1361121) but there is no active development on it. Therefore, to allow developers to use this extension in Firefox, I've had to implement (polyfill) the following devtools API methods directly in the extension:

  * `devtools.inspectedWindow.getResources()`
  * `devtools.inspectedWindow.onResourceAdded`
  * `resource.getContent()`
  * `resource.setContent()`

These methods attempt to mirror the Chromium behaviour but are not a 1:1 map because DOM APIs don't give access to raw content and tend to strip out invalid data at parse time. This means that the extension will work but you should be aware of the following limitations in Firefox:

  * Only the top level document will be affected. Content in iframes won't be toggled.
  * Only stylesheets from the same origin as the document can be feature toggled.
  * Toggling CSS features _and_ changing styles in the CSS inspector will cause conflicts because of polyfill caching. If you get into a mess close devtools, reload the page and re-open.

---

# Contributing

1. Clone this repo.

## Installing extension in Chrome for development

1. Start Chrome, open the **Extensions** manager and enable **Developer Mode**.
2. Click **Load unpacked extension** and select the repo folder (the one containing `manifest.json`)
3. Open devtools and click the **CSS Features** tab to use the extension.

## Installing extension in Firefox for development

1. Start Firefox, browse to "about:debugging" and click **"This Firefox"**.
2. Click **Load Temporary Add-on** and select the `manifest.json` in the repo folder.
3. Open devtools and click the **CSS Features** tab to use the extension.


## Making code changes

1. Update code
2. Close/re-open devtools to see your changes

## Testing

In the `/tests/browser` directory you'll find a test page which can be opened in a supported browser. The page contains one or more tests for each toggle. If you make changes and want to submit a pull request, please ensure the tests behave first. If you're adding a new toggle, please try to update the page with relevant tests or ask for assistance in your pull request.

---

## How it works

The extension uses `browser.devtools.inpectedWindow.getResources()` to fetch the content of stylesheet and document resources loaded in the current window. For stylesheet resources, `resource.getContent()` is used to extract the style content. For document resources, a script is injected into the document which extracts the CSS content from `<style>` elements.

Extracted style content is passed through a series of regular expressions that rename the feature property/value/identifiers. The original content is then replaced with the modified CSS using either `resource.setContent`, for stylesheets or - for document styles - by injecteding a script to update the relevant `<style>` elements. For example:

* `display: flex` becomes `display: -disabled-flex`
* `@supports (...) {}` becomes `@-disabled-supports (...) {}`
* `transform: ...` becomes `@-disabled-transform: ... {}`
* `width: calc(...)` becomes `width: -disabled-calc(...)`
