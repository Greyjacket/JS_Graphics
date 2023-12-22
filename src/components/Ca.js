import React from 'react';
import { useState } from "react";

const Ca = ({ ruleset, size }) => {
    const [generation, setGeneration] = useState([]);
  
    const processFirstGen = (random = false) => {
      const createObject = () => ({
        onState: 0,
        color: [0, 0, 0],
      });
  
      let a = Array.from({ length: size }, (_) => createObject());
  
      if (random) {
        for (let i = 0; i < size; i++) {
          const randomBit = Math.round(Math.random());
          a[i]['onState'] = randomBit;
          a[i] = generateColor(a[i]);
        }
      } else {
          let halfway = Math.floor(size) / 2;
          a[halfway]['onState'] = 1;
          a[halfway] = generateColor(a[halfway]);
      }
  
      return a;
    };
  
    const set_rules = (ruleset) => {
      ruleset = ruleset
    };
  
    const createRule = () => {
      //   createRule(){
        const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 2));
        ruleset = randomArray;
    };
  
    const rules = (a, b, c) => {
      let s = '' + a + b + c;
      let index = parseInt(s, 2);
      return ruleset[7 - index];
    };
  
    const getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
  
    const generateColor = (cell) => {
      let noiseLevel = 255;
      let noiseScale = 0.1;
      let nt = noiseScale;
  
      let rgb1 = getRandomInteger(0, 255);
      let rgb2 = getRandomInteger(0, 255);
      let rgb3 = getRandomInteger(0, 255);
  
      cell['color'] = [rgb1, rgb2, rgb3];
      return cell;
    };
  
    const generate = () => {
      const createObject = () => ({
        onState: 0,
        color: [0, 0, 0],
      });
  
      let nextgen = Array.from({ length: size }, (_) => createObject());
  
      for (let i = 1; i < size - 1; i++) {
        let left = generation[i - 1]['onState'];
        let me = generation[i]['onState'];
        let right = generation[i + 1]['onState'];
        let state = rules(left, me, right);
        nextgen[i]['onState'] = state;
  
        if (state == 1) {
          nextgen[i] = generateColor(nextgen[i]);
        }
        
      }
      setGeneration(nextgen);
      return nextgen;
    };
  
    return (
      <div>
        {/* Render your React components here */}
      </div>
    );
  };

  export { Ca }; // Named export

const caAutomaton = (ruleset, size, dim) => {
  const generation = createMultiDimensionalMatrix(size, dim);
    
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
            firstVector[i] = generateColor(a[i]);
        }
    } else {
        let halfway = Math.floor(size) / 2;
        firstVector[halfway]['onState'] = 1;
        firstVector[halfway] = generateColor(firstVector[halfway]);
    }
    return firstVector;
  };

  const set_ruleset = (ruleset) => {
    ruleset = ruleset;
  };

  const createRule = () => {
      const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 2));
      ruleset = randomArray;
  };

  const rules = (a, b, c) => {
    let s = '' + a + b + c;
    let index = parseInt(s, 2);
    return ruleset[7 - index];
  };

  const getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
  };

  const generateColor = (cell) => {
    let noiseLevel = 255;
    let noiseScale = 0.1;
    let nt = noiseScale;

    let rgb1 = getRandomInteger(0, 255);
    let rgb2 = getRandomInteger(0, 255);
    let rgb3 = getRandomInteger(0, 255);
1
    cell['color'] = [rgb1, rgb2, rgb3];
    return cell;
  };

  const generateVector = (vector) => {
    const createObject = () => ({
        onState: 0,
        color: [0, 0, 0],
    });
    size = vector.length;
    if(vector.every(num => num === 0)){
      generateFirstVector(size, random = false)
    }
    let nextgen = Array.from({ length: size }, (_) => createObject());

    for (let i = 1; i < size - 1; i++) {
      let left = vector[i - 1]['onState'];
      let me = vector[i]['onState'];
      let right = vector[i + 1]['onState'];
      let state = rules(left, me, right);
      nextgen[i]['onState'] = state;
    }
    return nextgen;
  };

  return {
    processFirstGen,
    set_rules,
    createRule,
    rules,
    getRandomInteger,
    generateColor,
    generate,
  };
};

const caKubernetes = (ruleset, size, dim) => {
  const generation = createMultiDimensionalMatrix(size, dim);
  
  function createMultiDimensionalMatrix(size, dim) {
    if(dim === 0) {
        return 0;
    } else {
        let arr = new Array(size);
        for(let i = 0; i < size; i++) {
            arr[i] = createMultiDimensionalMatrix(size, dim - 1);
        }
        return arr;
    }
  }
};

export { caFunction };
