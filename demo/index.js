const path = require('path');

const picpiper = require('../lib/pic-piper');
// const picpiper = require('../src/index');
// import picpiper from '../src/index';

const dirOut = path.join(__dirname, '/dist');
const dirOne = path.join(__dirname, '/origin/source1/');
const dirTwo = path.join(__dirname, '/origin/source2/');

const pipe1 = new picpiper.Pipe(dirOne, { recursive: true }, p => {
  return {
    dir: p.rel,
    filename: p.name
  };
});
const pipe2 = new picpiper.Pipe(dirTwo, { recursive: true }, p => {
  return {
    dir: p.rel,
    filename: p.name
  };
});

picpiper.pipe([pipe1, pipe2], dirOut, {
  convertTo: [
    {
      type: 'webp',
      size: [400, 255],
      quality: 80
    },
    {
      type: 'jpeg',
      size: [400, 255],
      quality: 50
    }
  ]
});
