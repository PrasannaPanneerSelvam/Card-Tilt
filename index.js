import ParallaxTilt from './Tilt.js';

function modifyCodeAndRenderIt(tiltProps, parallaxEffect) {
  const { maxDeflection, scaleOnHover } = tiltProps;
  document.getElementById('scaleOnBoolean').innerText = scaleOnHover;
  document.getElementById('maxDeflection').innerText = maxDeflection;

  parallaxEffect.updateProps(tiltProps);
}

window.onload = function () {
  // Props for tilt effect
  const tiltProps = {
    maxDeflection: 10,
    scaleOnHover: 1,
  };

  let doHover = false;

  // DOM elements
  const hoverSwitch = document.getElementById('hover-switch'),
    tiltAngleControl = document.getElementById('tiltDegreeControl');

  // Applying the user input to the sample card
  hoverSwitch.addEventListener('click', () => {
    hoverSwitch.children[0].classList.toggle('active');
    doHover = !doHover;
    tiltProps.scaleOnHover = doHover ? 1.075 : 1;
    modifyCodeAndRenderIt(tiltProps, parallaxEffect);
  });

  tiltAngleControl.addEventListener('input', () => {
    tiltProps.maxDeflection = tiltAngleControl.value;
    modifyCodeAndRenderIt(tiltProps, parallaxEffect);
  });

  const target = document.getElementById('target'),
    parallaxEffect = new ParallaxTilt(target, tiltProps);
};
