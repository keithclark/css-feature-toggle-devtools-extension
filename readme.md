# CSS Feature Toggle Extension

This devtools extension provides the ability to toggle-off CSS features, allowing developers to see how their pages and applications render and fallback in browsers that don't support modern CSS features.

![Screengrab of the CSS Feature Toggle extension](screengrab.png)

## Limitations

Toggling CSS features isn't supported everywhere *yet* so you should be aware of these caveats:

* CSS features will only be disabled in external stylesheets and `<style>` elements of the top-level document.
* Styles in `<iframes>` will not be disabled.
* Inline styles (`<div style="...">`) will not be disabled.
* Changes made to a stylesheet via the CSSOM will not be disabled.


## Supported browsers 

* Chrome
* Opera

This extension uses devtools API features that aren't supported in Firefox yet:

  * `devtools.inpectedWindow.getResources()`
  * `devtools.inspectedWindow.onResourceAdded`
  * `resource.getContent()`
  * `resource.setContent()`

---


## Installing for development

1. Clone this repo.
2. Start Chrome, open the **Extensions** manager and enable **Developer Mode**.
3. Click **Load unpacked extension** and select the repo folder (the one containing `manifest.json`)
4. Open devtools and click the **CSS Features** tab to use the extension.

## Making code changes

1. Update code
2. Close/re-open devtools to see your changes

---

## How it works

The extension uses `browser.devtools.inpectedWindow.getResources()` to fetch the content of stylesheet resources loaded by the current document. The `getResources` method is also used to extract the content of `<style>` elements in the top-level document.

Extracted style content is passed through a series of regular expressions that rename the feature property/value/identifiers. The original content is then replaced with the modified CSS using `resource.setContent`. For example:

* `display: flex` becomes `display: -disabled-flex`
* `@supports (...) {}` becomes `@-disabled-supports (...) {}`
* `transform: ...` becomes `@-disabled-transform: ... {}`
