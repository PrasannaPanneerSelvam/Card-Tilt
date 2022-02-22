import ParallaxTilt from './Tilt.js';

window.onload = function () {
  const target = document.getElementById("target");
  new ParallaxTilt(target, { maxDeflection: 10 });
};
