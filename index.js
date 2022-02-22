import ParallaxTilt from './Tilt.js';

function returnModifyCodeAndRenderIt() {
  function computeJavascriptCode({ maxDeflection, scaleOnHover }) {
    return `import ParallaxTilt from './Tilt.js';

// Your target card
const target = document.getElementById('target');

new ParallaxTilt(target, {
  maxDeflection: ${maxDeflection},
  scaleOnHover: ${scaleOnHover}, // Apply your respective scaling value here
});`;
  }

  function cleanAndCreateDemoCard() {
    const demoCardContainer = document.getElementsByClassName('demo-card')[0];
    [...demoCardContainer.children].forEach((child) => {
      demoCardContainer.removeChild(child);
    });

    demoCardContainer.appendChild(
      (function () {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = 'target';

        const contentText = document.createElement('div');

        contentText.innerText = `This random text is added for providing user interface for showcasing
    the viewers a platform to test the functionality.
    
    
    Hover over this card over various points using your mouse to test the
    tilt effect.`;

        const btn = document.createElement('button');
        btn.className = 'button';
        btn.innerText = 'Button';

        card.appendChild(contentText);
        card.appendChild(btn);

        return card;
      })()
    );
  }

  // Setting sample code in UI
  return (function () {
    const jsCode = document.getElementById('js-code');

    document.getElementById(
      'html-code'
    ).innerText = `<div class="card" id="target">
  <div>
    This random text is added for providing user interface for showcasing
    the viewers a platform to test the functionality.
    <br/>
    <br/>
    Hover over this card over various points using your mouse to test the
    tilt effect.
  </div>
  <button class="button">Button</button>
</div>`;

    document.getElementById('css-code').innerText = `.card {
  display: inline-block;
  height: auto;
  width: 30vh;
  max-width: 26ch;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  padding: 20px;
  text-align: center;
}

.button {
  display: inline-block;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  margin: 5vh 0 1vh;
  width: 100%;
  padding: 2vh 0;
}`;

    return function (tiltProps) {
      jsCode.innerText = computeJavascriptCode(tiltProps);
      cleanAndCreateDemoCard();
      const target = document.getElementById('target');
      new ParallaxTilt(target, tiltProps);
    };
  })();
}

window.onload = function () {
  // Props for tilt effect
  const tiltProps = {
      maxDeflection: 10,
      scaleOnHover: 1,
    },
    modifyCodeAndRenderIt = returnModifyCodeAndRenderIt();

  let doHover = false;

  // DOM elements
  const hoverSwitch = document.getElementById('hover-switch'),
    tiltAngleControl = document.getElementById('tiltDegreeControl');

  // Applying the user input to the sample card
  hoverSwitch.addEventListener('click', () => {
    hoverSwitch.children[0].classList.toggle('active');
    doHover = !doHover;
    tiltProps.scaleOnHover = doHover ? 1.075 : 1;
    modifyCodeAndRenderIt(tiltProps);
  });

  tiltAngleControl.addEventListener('input', () => {
    tiltProps.maxDeflection = tiltAngleControl.value;
    modifyCodeAndRenderIt(tiltProps);
  });

  modifyCodeAndRenderIt(tiltProps);
};
