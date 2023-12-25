import React, { useState, useEffect } from 'react';
import p5 from 'p5';
//import {Ca} from './Ca';
import { cellGenerator, cellGrapher, cellKubernetes } from './Ca';

const P5Canvas = () => {
  // Function to define the sketch
  let ruleset = [0,1,0,1,1,0,1,0]; //rule 90, sierpinski triangle
  const [generation, setGeneration] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(600);
  const [windowHeight, setwindowHeight] = useState(300);
  let grid = [[]];
  let cols = 0;
  let rows = 0;
  let resolution = 20;
  let new_row = [];

  function toggleDraw() {
    setIsDrawing(!isDrawing);
  }

  function initialize() {
    cols = Math.floor(windowWidth/resolution)
    rows = Math.floor(windowHeight/resolution)
    grid = cellGenerator.generateMultiDimensionalMatrix(rows, cols);
    new_row = cellGenerator.generateFirstVector(cols, random=false);
    grid.shift()
    grid.push(new_row)
    //ca.processFirstGen(randomBit=false);
    //createComponents()
  }
  
  function reinitialize() {
    //let ca = new Ca(ruleset, cols, randomBit=true);
    grid = cellGenerator.generateMultiDimensionalMatrix(rows, cols);    
    new_row = cellGenerator.generateFirstVector(cols, random=false);
    grid.shift()
    grid.push(new_row)
  }

  function drawRow(row_number){
    for (let j = 0; j < cols; j++) {
      let x = j * resolution;
      let y = row_number * resolution;
      if (grid[row_number][j]['onState'] == 1) {
        rgb1 = grid[row_number][j]['color'][0]
        rgb2 = grid[row_number][j]['color'][1]
        rgb3 = grid[row_number][j]['color'][2]
        fill(rgb1, rgb2, rgb3);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      } 
    }
  };

  function drawRows(){
    newRow = ca.generate()
    grid.shift()
    grid.push(newRow)
    for (let i = 0; i < rows; i++) {
      drawRow(i);
    }
  }

  const sketch = (p) => {
    p.setup = () => {
      let canvas = p.createCanvas(windowWidth, windowHeight);
      //let ca = Ca(ruleset, 370);
      canvas.parent("sketch-container");      
    };
    
    p.draw = () => {
      p.background(220);
      p.fill(0);
      p.ellipse(p.width / 2, p.height / 2, 50, 50);
    };
  };

  // useEffect to create and clean up the sketch
  useEffect(() => {
    // Create a new p5 instance
    const myP5 = new p5(sketch);

    // Clean up the sketch on component unmount
    return () => {
      console.log('Unmounting...')
      myP5.remove();
    };
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return (
    <div>
      {/* Container for the p5 canvas */}
      <div id="sketch-container"></div>
    </div>
  );
};

export default P5Canvas;

//import React, { useEffect } from 'react';
// import p5 from 'p5';

// const Sketch = () => {
//   // Function to define the sketch
//   const sketch = (p) => {
//     p.setup = () => {
//       p.createCanvas(400, 200);
//     };

//     p.draw = () => {
//       p.background(220);
//       p.fill(0);
//       p.ellipse(p.width / 2, p.height / 2, 50, 50);
//     };
//   };

//   // useEffect to create and clean up the sketch
//   useEffect(() => {
//     // Create a new p5 instance
//     const myP5 = new p5(sketch);

//     // Clean up the sketch on component unmount
//     return () => {
//       myP5.remove();
//     };
//   }, []); // Empty dependency array ensures useEffect runs once on mount

//   return (
//     <div>
//       {/* Container for the p5 canvas */}
//       <div id="sketch-container"></div>
//     </div>
//   );
// };

// export default Sketch;