import Pipe from './core/pipe';
import PicPiper from './core/picpiper';

function pipe(pipes, dest, options) {
  let picpiper = new PicPiper(dest, options);

  for (let i = 0; i < pipes.length; i++) {
    picpiper.addPipe(pipes[i]);
  }

  return picpiper.start();
}

export default { Pipe, PicPiper, pipe };
