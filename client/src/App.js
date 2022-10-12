import React, { createElement, useLayoutEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';

const generator = rough.generator();

function shapeSelector(x1, y1, x2, y2, type) {
  if (type === 'line') {
    return generator.line(x1, y1, x2, y2)
  }
  if (type === 'rectangle') {
    return generator.rectangle(x1, y1, x2 - x1, y2 - y1)
  }
  if (type === 'arc') {
    return generator.ellipse(x1, y1, x2, y2, 2 * Math.PI, false)
  }
}


function createNewElement(x1, y1, x2, y2, type) {
  const roughElement = shapeSelector(x1, y1, x2, y2, type)
  console.log('rough', roughElement);
  return { x1, y1, x2, y2, roughElement };
}

function App() {
  const [elements, setElements] = useState([]);
  const [elementType, setElementType] = useState('line');
  const [drawing, setDrawing] = useState(false);


  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);


  const handleMouseDown = (event) => {
    setDrawing(true);

    const { clientX, clientY } = event;
    const newElement = createNewElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    );

    setElements([...elements, newElement]);
  };

  const handleMouseMove = (event) => {
    if (!drawing) {
      return;
    }
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];

    const updatedElement = createNewElement(
      x1,
      y1,
      clientX,
      clientY,
      elementType,
    );

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseUp = (event) => {
    setDrawing(false);
  };

  return (
    <div>
      <div style={{ position: 'fixed' }}>
        <input
          type='radio'
          id='line'
          checked={elementType === 'line'}
          onChange={() => setElementType('line')}
        />
        <label htmlFor='line'>Line</label>
        <input
          type='radio'
          id='rectangle'
          checked={elementType === 'rectangle'}
          onChange={() => setElementType('rectangle')}
        />
        <label htmlFor='rectangle'>Rectangle</label>
        <input
          type='radio'
          id='arc'
          checked={elementType === 'arc'}
          onChange={() => setElementType('arc')}
        />
        <label htmlFor='line'>Circle</label>
      </div>

      <canvas
        id='canvas'
        style={{ backgroundColor: 'lightgrey' }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
}

export default App;
