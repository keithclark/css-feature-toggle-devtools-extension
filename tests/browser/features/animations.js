/**
 * Test shorthand animation syntax by executing a 0s animation that turns the
 * indicator element from red to green. If the browser doesn't support CSS 
 * animations the indicator will remain red.
 */
addTest({
  name: 'animation',
  group: 'Animations',
  css: `<indicator-selector> {
    animation: 0s test forwards;
    background: <unsupported-color>
  }
  @keyframes test {
    100% {
      background: <supported-color>
    }
  }`
});

/**
 * Test animations that only contain an `animation-name` value. This case will
 * use the default duration of 0s, which will cause the animation to run
 * instantly. `animation-fill-mode: forwards` is used to force the 100% keyframe
 * to once the animation has completed.
 */
addTest({
  name: 'animation-name',
  group: 'Animations',
  css: `<indicator-selector> {
    animation-name: test2;
    animation-fill-mode: forwards;
  }
  @keyframes test2 {
    100% {
      background: <supported-color>
    }
  }`
});

/**
 * Same as the `animation` test above, only for browsers that support the
 * -webkit vendor prefx.
 */
addTest({
  name: '-webkit-animation',
  group: 'Animations',
  css: `<indicator-selector> {
    -webkit-animation: 0s test3 forwards;
    background: <unsupported-color>
  }
  @-webkit-keyframes test3 {
    100% {
      background: <supported-color>
    }
  }`
});

/**
 * Same as the `animation-name` test above, only for browsers that support the
 * -webkit vendor prefx.
 */
addTest({
  name: '-webkit-animation-name',
  group: 'Animations',
  css: `<indicator-selector> {
    -webkit-animation-name: test4;
    -webkit-animation-fill-mode: forwards;
  }
  @-webkit-keyframes test4 {
    100% {
      background: <supported-color>
    }
  }`
});
