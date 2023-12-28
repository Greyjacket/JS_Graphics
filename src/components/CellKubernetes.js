import React, { useState, useEffect, useCallback, useRef } from 'react';
import p5 from 'p5';
//import {Ca} from './Ca';
import { cellGenerator, cellGrapher } from './Ca';

const CellKubernetes = () => {
  // Function to define the sketch
  const [p5Instance, setP5Instance] = useState({});
  const [windowWidth, setWindowWidth] = useState(900);
  const [windowHeight, setwindowHeight] = useState(450);
  const [resolution, setResolution] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [grid, setGrid] = useState([[]]);
  const [generation, setGeneration] = useState([]);
  const [emptySet, setEmptySet] = useState([]);
  const [ruleset, setRuleset] = useState([0,1,0,1,1,0,1,0]); //rule 90, sierpinski triangle
  const [isGridInitialized, setIsGridInitialized] = useState(false);

  const p5Ref = useRef();

  let cg = cellGenerator();
  let ca;

  function toggleDraw() {
    setIsDrawing(!isDrawing);
  }

  function initialize() {
    let cols = Math.floor(windowWidth/resolution)
    let rows = Math.floor(windowHeight/resolution)
    let newEmptySet = new Array(cols).fill(0);
    let newGrid = cg.generateMultiDimensionalMatrix([cols, rows]);
    let newGeneration = cg.generateFirstVector(cols, false);
    newGrid.shift()
    newGrid.push(newGeneration)
    setEmptySet(newEmptySet);
    setGrid(newGrid);
    setGeneration(newGeneration);
  }
  
  function reinitialize() {
    let cols = Math.floor(windowWidth/resolution)
    let rows = Math.floor(windowHeight/resolution)
    let newGrid = cg.generateMultiDimensionalMatrix([cols, rows]);
    let newGeneration = cg.generateFirstVector(cols, true);
    newGrid.shift()
    newGrid.push(newGeneration)
    setGrid(newGrid);
    setGeneration(newGeneration);
  }

  function drawRow(p, row_number){
    let cols = Math.floor(windowWidth/resolution)
    for (let j = 0; j < cols; j++) {
      //console.log(j + ':' + grid[row_number][j])
      let x = j * resolution;
      let y = row_number * resolution;
      if (grid[row_number][j]['onState'] === 1) {
        let rgb1 = grid[row_number][j]['color'][0]
        let rgb2 = grid[row_number][j]['color'][1]
        let rgb3 = grid[row_number][j]['color'][2]
        p.fill(rgb1, rgb2, rgb3);
        p.stroke(0);
        p.rect(x, y, resolution - 1, resolution - 1);
      } 
    }
  };

  function drawRows(p){
    let rows = Math.floor(windowHeight/resolution)
    let newRow = cg.generateVector(generation, ruleset, false)
    //console.log(newRow)
    grid.shift()
    grid.push(newRow)
    for (let i = 0; i < rows; i++) {
      drawRow(p, i);
    }
  }

  const sketch = useCallback((p) => {
    p.setup = () => {
      console.log('Setup...')

      let canvas = p.createCanvas(windowWidth, windowHeight);
      canvas.parent("sketch-container"); 
    };
    
    p.draw = () => {
      //console.log('Drawing...')
      //console.log(grid)
      p.background(220);
      p.fill(1);
      //drawRows(p);
    };
  }, [windowWidth, windowHeight]);  // Add any other dependencies of sketch here
  
  useEffect(() => {
    console.log('Mounting...')
    initialize();
    setIsGridInitialized(true);

    //const instance = new p5(sketch);
    //setP5Instance(instance);
    //p5Ref.current = new p5(sketch);

  
    return () => {
      console.log('Unmounting...')
      //instance && instance.remove();
      //p5Ref.current && p5Ref.current.remove();
    };
  }, []);  // Now sketch is a dependency of useEffect // Empty dependency array ensures useEffect runs once on mount

  useEffect(() => {
    if (isGridInitialized) {
      console.log('Creating p5 instance...')
      console.log(isGridInitialized)
      console.log(grid)

      const instance = new p5(sketch);
      setP5Instance(instance);
      p5Ref.current = instance;
    }
  }, [isGridInitialized, sketch]);

  return (
    <div>
      {/* Container for the p5 canvas */}
      <div id="sketch-container"></div>
    </div>
  );
};

export default CellKubernetes;

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