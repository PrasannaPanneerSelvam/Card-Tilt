import ParallaxTilt from './Tilt.js';
import ShowDemo from './ShowDemo.js';

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
    demoObject.show(tiltProps);
  });

  tiltAngleControl.addEventListener('input', () => {
    tiltProps.maxDeflection = tiltAngleControl.value;
    modifyCodeAndRenderIt(tiltProps, parallaxEffect);
    demoObject.show(tiltProps);
  });

  const target = document.getElementById('target'),
    parallaxEffect = new ParallaxTilt(target, tiltProps);

  const demoObject = new ShowDemo(target);

  target.addEventListener('mousemove', () => demoObject.stopOngoingDemo());
  target.addEventListener('mouseenter', () => demoObject.stopOngoingDemo());

  window.addEventListener('resize', demoObject.updatePoints.bind(demoObject));
};
