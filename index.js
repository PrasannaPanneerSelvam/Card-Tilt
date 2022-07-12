import ParallaxTilt from './Tilt.js';

function returnModifyCodeAndRenderIt() {
  function computeJavascriptCode({ maxDeflection, scaleOnHover }) {
    return `import ParallaxTilt from './Tilt.js';

// Your target card
const target = document.getElementById('target-card');
                                                                    
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

        contentText.appendChild(
          document.createTextNode(
            'This random text is added for providing user interface for showcasing the viewers a platform to test the functionality.'
          )
        );

        contentText.appendChild(document.createElement('br'));
        contentText.appendChild(document.createElement('br'));

        const cardHighLightedText = document.createElement('span');
        cardHighLightedText.innerText = 'Hover over this card';
        contentText.appendChild(cardHighLightedText);

        contentText.appendChild(
          document.createTextNode(
            ' over various points using your mouse to test the tilt effect.'
          )
        );

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
  return function (tiltProps) {
    const { maxDeflection, scaleOnHover } = tiltProps;
    document.getElementById('scaleOnBoolean').innerText = scaleOnHover;
    document.getElementById('maxDeflection').innerText = maxDeflection;
    cleanAndCreateDemoCard();
    const target = document.getElementById('target');
    new ParallaxTilt(target, tiltProps);
  };
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
