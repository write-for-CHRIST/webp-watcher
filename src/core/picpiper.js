// External
import path from 'path';
import mkdirp from 'mkdirp';
import isImage from 'is-image';
import sharp from 'sharp';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';

// Internal
import samuel from '@write-for-christ/prophet-samuel';
import Pipe from './pipe';

export default class PicPiper {
  constructor(outputPath, options) {
    this.outputPath = outputPath;
    this.options = options;

    this.pipers = [];
    this.watchers$ = [];
    this.samuels = [];
    this.isPiping = false;
    this.combine$ = null;
  }

  addPipe(pipe) {
    if (!this.isPiping) {
      if (pipe instanceof Pipe) {
        this.pipers.push(pipe);
      } else {
        throw new TypeError('Not a pipe instance.');
      }
    } else {
      throw new TypeError('Can not add pipe after start the piping process.');
    }
  }

  start() {
    if (!this.isPiping) {
      for (let i = 0; i < this.pipers.length; i++) {
        let sam$ = samuel();
        let obs$ = Observable.from(
          sam$.watch(this.pipers[i].root, this.pipers[i].options)
        ).map(data => {
          return Object.assign({}, data, { priority: i, pipe: this.pipers[i] });
        });

        this.watchers$.push(obs$);
        this.samuels.push(sam$);
      }
      this.isPiping = true;
      this.combine$ = Observable.merge(...this.watchers$);
      this._watch();
    } else {
      throw new TypeError('Piping already in progress!');
    }
    return this;
  }

  stop() {
    let i = this.samuels.length;

    while (i--) {
      this.samuels[i].stop();
    }
    this.isPiping = false;
  }

  _watch() {
    if (this.combine$) {
      this.combine$
        .filter(payload => {
          let isImg = isImage(payload.path);
          let event = payload.event === 'update';

          console.log('is img: ', isImg, ' event: ', event);
          return isImg && event;
        })
        .subscribe(payload => {
          let pathToCheck = payload.pipe.resolve(payload);
          let destDir = path.join(this.outputPath, pathToCheck);

          console.log('destDir: ', destDir, 'typeof: ', typeof destDir);
          if (destDir) {
            mkdirp(destDir, function (err) {
              if (err) {
                throw new TypeError('Could not create path: ', destDir);
              }
              let outPath = path.join(destDir, payload.name + '.webp');

              console.log('outpath: ', outPath);
              sharp(payload.path)
                .toFile(outPath)
                .then(() => {
                  console.log('Write to: ', outPath);
                });
            });
          }
        });
    }
    return this.combine$;
  }
}
