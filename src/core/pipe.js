export default class Pipe {
  constructor(rootPath, pathResolverFunc) {
    this._root = rootPath;
    this._options = {};
    this.pathResolverFunc = pathResolverFunc;
  }

  get root() {
    return this._root;
  }

  get options() {
    return this._options;
  }

  set options(opts) {
    this._options = opts;
  }

  resolve(path) {
    return this.pathResolverFunc(path);
  }
}
