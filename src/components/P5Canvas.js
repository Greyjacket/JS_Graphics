import React, { useEffect } from 'react';
import p5 from 'p5';
import {Ca} from './Ca';

const P5Canvas = () => {
  // Function to define the sketch
  let ruleset = [0,1,0,1,1,0,1,0]; //rule 90, sierpinski triangle

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(600, 300);
      let ca = Ca(ruleset, 370);
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