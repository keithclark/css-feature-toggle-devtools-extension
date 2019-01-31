# CSS Feature Toggle Extension

This devtools extension provides the ability to toggle-off CSS features, allowing developers to see how their pages and applications render and fallback in browsers that don't support modern CSS features.

Available for Chrome via the [Chrome Web Store](https://chrome.google.com/webstore/detail/css-feature-toggles/aeinmfddnniiloadoappmdnffcbffnjg).

![Screengrab of the CSS Feature Toggle extension](screengrab.png)

## Supported features

* **Box Layout**
  * Grid layout — *Disable support for the grid layout model*
  * Flexbox layout — *Disable support for the flexible box layout model*
  * Box model sizing — *Disable support for the `box-sizing` property*
  * Sticky positioning — *Disable support for `position: sticky`*
  * Multi-column layout — *Disable support for columns*
* **Visual Rendering**
  * Transforms — *Disable support for 2D and 3D transforms*
  * Compositing and blending — *Disable background and content blending modes*
  * Clipping paths — *Disable region clipping via `clip-path`*
  * Masking — *Disable masking via `mask` and `mask-image`*
  * Transitions — *Disable support for transitions*
  * Animations — *Disable support for animations*
* **Content Layout**
  * Shapes — *Disable support for `shape-inside` and `shape-outside`*
  * Object sizing — *Disable support for the `object-fit` property*
* **Other**
  * Feature detection — *Disable `@supports` feature detection*
  * Custom properties — *Disable support for the `var()` function*
  * Mathematical expressions — *Disable support for the `calc()` function*
  * Custom fonts — *Disable loading of custom fonts with `@font-face`*

## Supported browsers 

* Chrome — installable via [Chrome Web Store](https://chrome.google.com/webstore/detail/css-feature-toggles/aeinmfddnniiloadoappmdnffcbffnjg)
* Opera

This extension uses devtools API features that aren't supported in Firefox yet:

  * `devtools.inspectedWindow.getResources()`
  * `devtools.inspectedWindow.onResourceAdded`
  * `resource.getContent()`
  * `resource.setContent()`

## Limitations

Toggling CSS features isn't supported everywhere *yet* so you should be aware of these caveats:

* Inline styles (`<div style="...">`) will not be disabled.
* Changes made to a stylesheet via the CSSOM will not be disabled.

---

# Contributing

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

The extension uses `browser.devtools.inpectedWindow.getResources()` to fetch the content of stylesheet and document resources loaded in the current window. For stylesheet resources, `resource.getContent()` is used to extract the style content. For document resources, a script is injected into the document which extracts the CSS content from `<style>` elements.

Extracted style content is passed through a series of regular expressions that rename the feature property/value/identifiers. The original content is then replaced with the modified CSS using either `resource.setContent`, for stylesheets or - for document styles - by injecteding a script to update the relevant `<style>` elements. For example:

* `display: flex` becomes `display: -disabled-flex`
* `@supports (...) {}` becomes `@-disabled-supports (...) {}`
* `transform: ...` becomes `@-disabled-transform: ... {}`
* `width: calc(...)` becomes `width: -disabled-calc(...)`
