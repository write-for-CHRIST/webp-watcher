// External
const path = require('path');
const mkdirp = require('mkdirp');
const isImage = require('is-image');
const isArray = require('is-array');
const { Observable, Subject } = require('rxjs');

require('rxjs/add/operator/merge');
require('rxjs/add/operator/filter');

// Internal
const samuel = require('@write-for-christ/prophet-samuel');
const Pipe = require('./pipe');
const Convert = require('./convert');

module.exports = class PicPiper {
  constructor(outputPath, options) {
    this.outputPath = outputPath;
    this.options = options;

    this.pipers = [];
    this.watchers$ = [];
    this.samuels = [];
    this.isPiping = false;
    this.combine$ = null;
    this.onConvertSource = new Subject();
    this.onConvert$ = this.onConvertSource.asObservable();
  }

  get onConvert() {
    return this.onConvert$;
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
          return isImage(payload.path) && payload.event === 'update';
        })
        .subscribe(payload => {
          // Path resolved from consumer
          // Should include `dir` and `filename` property
          let pathData = payload.pipe.resolve(payload);
          let destDir = path.join(this.outputPath, pathData.dir);

          if (destDir) {
            let _this = this;

            mkdirp(destDir, (err) => {
              if (err) {
                throw new TypeError('Could not create path: ', destDir);
              }
              let convertTo = _this.options.convertTo;

              if (isArray(convertTo)) {
                let i = convertTo.length;

                while (i--) {
                  let toPath = path.join(
                    destDir,
                    `${pathData.filename}.${convertTo[i].type}`
                  );

                  this._doConvert(payload.path, toPath, convertTo[i]);
                }
              } else {
                let toPath = path.join(
                  destDir,
                  `${pathData.filename}.${convertTo.type}`
                );

                this._doConvert(payload.path, toPath, convertTo);
              }
            });
          }
        });
    }
    return this.combine$;
  }

  _doConvert(fromPath, toPath, options) {
    let converter = new Convert(fromPath, toPath, options);

    converter.make();
    return converter;
  }
};
