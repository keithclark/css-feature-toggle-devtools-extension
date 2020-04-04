// Load the host specific stylesheet
let sheet = 'chrome.css';

if (/Firefox/.test(navigator.userAgent)) {
  sheet = 'firefox.css';
}

let link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `/panel/css/${sheet}`;
document.body.appendChild(link);



// Mimic the keyboard-only focus hilighting used in Chrome devtools
document.addEventListener('keydown', e => {
  if (e.keyCode === 9) {
    document.documentElement.classList.add('keyboard-focus');
  }
});

document.addEventListener('mousedown', e => {
  document.documentElement.classList.remove('keyboard-focus');
});
