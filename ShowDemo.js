/******************************** Copy from Tilt.js *********************************/

function setCardAngles(xAngle, yAngle) {
  const cssStyleObj = this.style;
  cssStyleObj.setProperty('--vertical-angle', `${xAngle}deg`);
  cssStyleObj.setProperty('--horizontal-angle', `${yAngle}deg`);
}

function tilt(mouse, maxDeflection) {
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

/************************************************************************************/

class ShowDemo {
  #cardBody;
  #points;

  constructor(cardBody) {
    this.#cardBody = cardBody;
    this.#points = this.#createPoints();

    // Adding Scale prop for demo
    const existingTransformValue = this.#cardBody.style.transform,
      scaleProp = 'scale(var(--scale-value, 1))';
    if (!existingTransformValue.includes(scaleProp)) {
      this.#cardBody.style.setProperty(
        'transform',
        `${existingTransformValue} ${scaleProp}`
      );
    }

    this.demoTimeOuts = [];
    this.presetValues = { maxDeflection: 10, scaleOnHover: 0 };
  }

  #createPoints() {
    const { left, top, height, width, bottom, right } =
        this.#cardBody.getBoundingClientRect(),
      heightPartitions = 10,
      widthPartitions = 10,
      singleStepX = width / widthPartitions,
      singleStepY = height / heightPartitions;

    const horizontalOffset = 10,
      verticalOffset = 10;

    const points = [];

    // Left to right
    for (let i = 0; i < widthPartitions; i++)
      points.push({ x: left + singleStepX * i, y: top + verticalOffset });

    // Top to Bottom
    for (let i = 0; i < heightPartitions; i++)
      points.push({ y: top + singleStepY * i, x: right - horizontalOffset });

    // Right to Left
    for (let i = widthPartitions - 1; i >= 0; i--)
      points.push({ x: left + singleStepX * i, y: bottom - verticalOffset });

    // Bottom to Top
    for (let i = heightPartitions - 1; i >= 0; i--)
      points.push({ y: top + singleStepY * i, x: left + horizontalOffset });

    return points;
  }

  updatePoints() {
    this.#points = this.#createPoints();
  }

  show({ maxDeflection, scaleOnHover }) {
    this.presetValues = { maxDeflection, scaleOnHover };

    const cardBody = this.#cardBody,
      delayTiming = 100;

    cardBody.style.setProperty('--scale-value', `${scaleOnHover}`);

    // Continue with ongoing demo loop
    if (this.demoTimeOuts.length !== 0) {
      return;
    }

    this.stopOngoingDemo();

    this.#points.forEach((_, idx) => {
      this.demoTimeOuts.push(
        setTimeout(() => {
          const { maxDeflection } = this.presetValues;
          tilt.call(cardBody, this.#points[idx], maxDeflection);
          // End of the demo
          if (idx == this.#points.length - 1) {
            // Resetting to default values
            setCardAngles.call(cardBody, 0, 0);
            cardBody.style.setProperty('--scale-value', '1');
            this.demoTimeOuts = [];
          }
        }, delayTiming * idx)
      );
    }, this);
  }

  stopOngoingDemo() {
    this.demoTimeOuts.forEach(clearTimeout);
    this.demoTimeOuts = [];
  }
}

export default ShowDemo;
