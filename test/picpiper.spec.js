/* global describe, it, before */

import chai from 'chai';
import picpiper from '../src/index';
import path from 'path';

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
});
