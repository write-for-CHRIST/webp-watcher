/* global describe, it, before */
const chai = require('chai');
const picpiper = require('../src/index');
const path = require('path');

chai.expect();

const expect = chai.expect;

let dirOut, dirOne, dirTwo, pipe1, pipe2;

describe('core/picpiper.js', () => {
  before(() => {
    dirOut = path.join(__dirname, '/dist');
    dirOne = path.join(__dirname, '../demo/origin/source1/sub/');
    dirTwo = path.join(__dirname, '../demo/origin/source2/sub/');

    pipe1 = new picpiper.Pipe(dirOne, () => {});
    pipe2 = new picpiper.Pipe(dirTwo, () => {});
  });

  it('should run init test', () => {
    picpiper.pipe([pipe1, pipe2], dirOut);
  });

  it('should throw error not a pipe instance', () => {
    let pp = new picpiper.PicPiper(dirOut);

    expect(() => pp.addPipe('not a pipe')).to.throw('Not a pipe instance.');
    pp.stop();
  });

  it('should throw error when piping in progress', done => {
    let pp = new picpiper.PicPiper(dirOut);

    pp.addPipe(pipe1, dirOut);
    pp.start();
    setTimeout(() => {
      expect(() => pp.addPipe(new picpiper.Pipe())).to.throw(
        'Can not add pipe after start the piping process.'
      );
      expect(() => pp.start()).to.throw('Piping already in progress!');
      pp.stop();
      done();
    }, 100);
  });
});
