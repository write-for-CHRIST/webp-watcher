const Pipe = require('./core/pipe');
const PicPiper = require('./core/picpiper');
const Convert = require('./core/convert');

function pipe(pipes, dest, options) {
  let picpiper = new PicPiper(dest, options);

  for (let i = 0; i < pipes.length; i++) {
    picpiper.addPipe(pipes[i]);
  }

  return picpiper.start();
}

module.exports = { Pipe, PicPiper, pipe, Convert };
