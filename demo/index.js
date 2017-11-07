const path = require('path');
const picpiper = require('../lib/pic-piper');

const dirOut = path.join(__dirname, '/dist');
const dirOne = path.join(__dirname, '/origin/source1/');
const dirTwo = path.join(__dirname, '/origin/source2/');

const pipe1 = new picpiper.Pipe(dirOne, (path) => {});
const pipe2 = new picpiper.Pipe(dirTwo, (path) => {});

picpiper.pipe([pipe1, pipe2], dirOut);
