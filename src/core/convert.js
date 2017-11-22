const fs = require('fs');
const sharp = require('sharp');

const SUPPORTED_TYPE = ['jpeg', 'png', 'webp', 'tiff'];
const DEFAULT_CONFIG = {
  type: 'webp',
  size: [280, 110],
  quality: 100
};

module.exports = class Convert {
  constructor(fromPath, toPath, config = DEFAULT_CONFIG) {
    this.fromPath = fromPath;
    this.toPath = toPath;
    this.config = config;
  }

  make() {
    return new Promise((resolve, reject) => {
      fs.exists(this.fromPath, exists => {
        if (exists /* ? */) {
          let sharper = sharp(this.fromPath);

          if (SUPPORTED_TYPE.indexOf(this.config.type) > -1) {
            sharper = sharper[this.config.type](this.config); /* ?.*/
            sharper = sharper.toFile(this.toPath); /* ?.*/
            sharper
              .then((data /* ? */) => {
                resolve(data);
              })
              .catch(e => reject(e));
          } else {
            reject('Not supported this type: ', this.config.type);
          }
        } else {
          reject('Input path is not existed.');
        }
      });
    });
  }
};
