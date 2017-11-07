import samuel from '@write-for-christ/prophet-samuel';
// import images from 'images';
import Pipe from './pipe';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/merge';

export default class PicPiper {
  constructor() {
    this.pipers = [];
    this.watchers$ = [];
    this.isPiping = false;
    this.combine$ = null;
  }

  addPipe(pipe) {
    if (!this.isPiping) {
      if (pipe instanceof Pipe) {
        this.pipers.push(pipe);
      } else {
        throw new Error('Not a pipe instance.');
      }
    } else {
      throw new Error('Can not add pipe after start the piping process.');
    }
  }

  start() {
    if (!this.isPiping) {
      for (let i = 0; i < this.pipers.length; i++) {
        let sam$ = samuel().watch(this.pipers[i].root);
        let obs$ = Observable.from(sam$).map(data => {
          return Object.assign({}, data, { priority: i });
        });

        this.watchers$.push(obs$);
      }
      this.combine$ = Observable.merge(...this.watchers$);
      this._watch();
    } else {
      throw new Error('Piping already in progress!');
    }
    return this;
  }

  _watch() {
    if (this.combine$) {
      this.combine$.subscribe(datas => {
        console.log(JSON.stringify(datas, null, 2));
      });
      this.isPiping = true;
    }
  }
}
