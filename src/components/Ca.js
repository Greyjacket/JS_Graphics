// import React from 'react';
// import { useState } from "react";

// const Ca = ({ ruleset, size }) => {
//     const [generation, setGeneration] = useState([]);
  
//     const processFirstGen = (random = false) => {
//       const createObject = () => ({
//         onState: 0,
//         color: [0, 0, 0],
//       });
  
//       let a = Array.from({ length: size }, (_) => createObject());
  
//       if (random) {
//         for (let i = 0; i < size; i++) {
//           const randomBit = Math.round(Math.random());
//           a[i]['onState'] = randomBit;
//           a[i] = generateColor(a[i]);
//         }
//       } else {
//           let halfway = Math.floor(size) / 2;
//           a[halfway]['onState'] = 1;
//           a[halfway] = generateColor(a[halfway]);
//       }
  
//       return a;
//     };
  
//     const set_rules = (ruleset) => {
//       ruleset = ruleset
//     };
  
//     const createRule = () => {
//       //   createRule(){
//         const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 2));
//         ruleset = randomArray;
//     };
  
//     const rules = (a, b, c) => {
//       let s = '' + a + b + c;
//       let index = parseInt(s, 2);
//       return ruleset[7 - index];
//     };
  
//     const getRandomInteger = (min, max) => {
//       return Math.floor(Math.random() * (max - min) + min);
//     };
  
//     const generateColor = (cell) => {
//       let noiseLevel = 255;
//       let noiseScale = 0.1;
//       let nt = noiseScale;
  
//       let rgb1 = getRandomInteger(0, 255);
//       let rgb2 = getRandomInteger(0, 255);
//       let rgb3 = getRandomInteger(0, 255);
  
//       cell['color'] = [rgb1, rgb2, rgb3];
//       return cell;
//     };
  
//     const generate = () => {
//       const createObject = () => ({
//         onState: 0,
//         color: [0, 0, 0],
//       });
  
//       let nextgen = Array.from({ length: size }, (_) => createObject());
  
//       for (let i = 1; i < size - 1; i++) {
//         let left = generation[i - 1]['onState'];
//         let me = generation[i]['onState'];
//         let right = generation[i + 1]['onState'];
//         let state = rules(left, me, right);
//         nextgen[i]['onState'] = state;
  
//         if (state == 1) {
//           nextgen[i] = generateColor(nextgen[i]);
//         }
        
//       }
//       setGeneration(nextgen);
//       return nextgen;
//     };
  
//     return (
//       <div>
//         {/* Render your React components here */}
//       </div>
//     );
//   };

//   export { Ca }; // Named export

export const cellGenerator = () => {

  /**
   * Generates a multi-dimensional matrix of given size and dimensions.
   * @param {number} size - The size of the matrix.
   * @param {number} dim - The number of dimensions.
   * @returns {Array} - The generated matrix.
   */
  const generateMultiDimensionalMatrix = (dimensions) => {
    const createObject = () => ({
      onState: 0,
      color: [0, 0, 0],
    });
  
    if(dimensions.length === 0) {
      return createObject();
    } else {
      let size = dimensions[0];
      let vector = new Array(size);
      for(let i = 0; i < size; i++) {
        vector[i] = generateMultiDimensionalMatrix(dimensions.slice(1));
      }
      return vector;
    }
  };

  /**
   * Generates the first vector of cells.
   * @param {number} size - The size of the vector.
   * @param {boolean} random - Whether to randomly initialize the vector.
   * @returns {Array} - The generated vector.
   */
  const generateFirstVector = (size, random = false) => {
    const createObject = () => ({
        onState: 0,
        color: [0, 0, 0],
    });

    let firstVector = Array.from({ length: size }, (_) => createObject());
    if (random) {
        for (let i = 0; i < size; i++) {
            const randomBit = Math.round(Math.random());
            firstVector[i]['onState'] = randomBit;
        }
    } else {
        let halfway = Math.floor(size / 2);
        firstVector[halfway]['onState'] = 1;
        firstVector[halfway]['color'] = [0, 0, 0];
    }
    console.log("FirstVector:")
    console.log(firstVector)
    return firstVector;
  };

  /**
   * Generates the state of a cell based on a ruleset and the states of its neighbors.
   * @param {Array} ruleset - The ruleset to use.
   * @param {number} a - The state of the left neighbor.
   * @param {number} b - The state of the cell itself.
   * @param {number} c - The state of the right neighbor.
   * @returns {number} - The new state of the cell.
   */
  const generateState = (ruleset, a, b, c) => {
    let s = '' + a + b + c;
    let index = parseInt(s, 2);
    return ruleset[7 - index];
  };

  /**
   * Generates the next generation of a vector of cells based on a ruleset.
   * @param {Array} vector - The current generation of cells.
   * @param {Array} ruleset - The ruleset to use.
   * @returns {Array} - The next generation of cells.
   */
  const generateVector = (vector, ruleset) => {
    const createObject = () => ({
        onState: 0,
        color: [0, 0, 0],
    });
    let size = vector.length;
    let nextgen = Array.from({ length: size }, (_) => createObject());
    for (let i = 1; i < size - 1; i++) {
      let left = vector[i - 1]['onState'];
      let me = vector[i]['onState'];
      let right = vector[i + 1]['onState'];
      let state = generateState(ruleset, left, me, right);
      console.log("State:" + state)
      nextgen[i]['onState'] = state;
    }
    console.log("Nextgen:" + nextgen)
    return nextgen;
  };

  return {
    generateMultiDimensionalMatrix,
    generateFirstVector,
    generateState,
    generateVector,
  };
};

export const cellGrapher = () => {
  const generateColor = (cell) => {
    let noiseLevel = 255;
    let noiseScale = 0.1;
    let nt = noiseScale;
    const getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    let rgb1 = getRandomInteger(0, 255);
    let rgb2 = getRandomInteger(0, 255);
    let rgb3 = getRandomInteger(0, 255);

    cell['color'] = [rgb1, rgb2, rgb3];
    return cell;
  };
}

// export const cellKubernetes = (size, dim) => {
//   let ruleset = [0,1,0,1,1,0,1,0]; //rule 90, sierpinski triangle
//   const generation = cellGenerator.createMultiDimensionalMatrix(size, dim);
  
//   const set_ruleset = (ruleset) => {
//     ruleset = ruleset;
//   };

//   const createRule = () => {
//     const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 2));
//     ruleset = randomArray;
//   };

//   const getRandomInteger = (min, max) => {
//       return Math.floor(Math.random() * (max - min) + min);
//   };
// };

//export { caFunction };
