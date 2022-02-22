function setCardAngles(xAngle, yAngle) {
  const cssStyleObj = this.style;
  cssStyleObj.setProperty('--vertical-angle', `${xAngle}deg`);
  cssStyleObj.setProperty('--horizontal-angle', `${yAngle}deg`);
}

function tilt(mouse, { maxDeflection }) {
  const referenceObject = this.getBoundingClientRect();

  const center = {
      x: referenceObject.width / 2,
      y: referenceObject.height / 2,
    },
    coordInCard = {
      x: mouse.x - referenceObject.left,
      y: mouse.y - referenceObject.top,
    };

  const dx = (center.x - coordInCard.x) / (referenceObject.width / 2),
    dy = (coordInCard.y - center.y) / (referenceObject.height / 2);

  const xAngle = dy * maxDeflection,
    yAngle = dx * maxDeflection;

  setCardAngles.call(this, xAngle, yAngle);
}

class ParallaxTilt {
  constructor(element, options = {}) {
    if (!(element instanceof Node)) {
      throw new Error("Tilt effect can't be applied on a non-node element");
    }

    const presetOptions = {
      maxDeflection: 30,
      childrenProjectionDistance: '50px',
      scaleOnHover: 1,
    };

    for (const [key, value] of Object.entries(options))
      presetOptions[key] = value ?? presetOptions[key];

    this.setView(element, presetOptions);
  }

  setView(
    cardBody,
    { maxDeflection, childrenProjectionDistance, scaleOnHover }
  ) {
    const transformProps = [
      'perspective(1000px)',
      'rotateY(var(--horizontal-angle, 0))',
      'rotateX(var(--vertical-angle, 0))',
      'skew(var(--skew-x-angle, 0), var(--skew-y-angle, 0))',
    ];

    if (scaleOnHover !== 1) {
      transformProps.push('scale(var(--scale-value, 1))');
    }

    // Adding CSS styles for 3d effect
    const styles = cardBody.style;
    styles['-webkit-transition'] = styles['transition'] = 'all 0.25s linear';
    styles['-webkit-transform-style'] = styles['transform-style'] =
      'preserve-3d';
    styles['-webkit-transform'] = styles['transform'] =
      transformProps.join(' ');

    // Adding Parallax effect for child elements
    const childrenElements = cardBody.children;

    for (let idx = 0; idx < childrenElements.length; idx++) {
      childrenElements[idx].style[
        '-webkit-transform'
      ] = `translateZ(${childrenProjectionDistance})`;
      childrenElements[idx].style[
        'transform'
      ] = `translateZ(${childrenProjectionDistance})`;
    }

    // Mounting mouse events for tilt effects
    cardBody.addEventListener('mousemove', function (event) {
      event.stopPropagation();
      tilt.call(this, event, { maxDeflection });
    });

    cardBody.addEventListener('mouseleave', function (event) {
      event.stopPropagation();
      setCardAngles.call(this, 0, 0);
    });

    if (scaleOnHover !== 1) {
      const cssStyleObj = cardBody.style;

      cardBody.addEventListener('mouseenter', () => {
        cssStyleObj.setProperty('--scale-value', `${scaleOnHover}`);
      });

      cardBody.addEventListener('mouseleave', function (event) {
        cssStyleObj.setProperty('--scale-value', '1');
      });
    }
  }
}

export default ParallaxTilt;
