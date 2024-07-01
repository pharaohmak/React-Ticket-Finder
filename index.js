const loadingState = document.getElementById('loading__state');
const svg = loadingState.querySelector('svg');

svg.style.animation = 'rotate 5s linear infinite';

// Add the @keyframes rule to the stylesheet
const stylesheet = document.styleSheets[0];
stylesheet.insertRule('@keyframes rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }');