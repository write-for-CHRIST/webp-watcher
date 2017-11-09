export default class Pipe {
  constructor(rootPath, opts = {}, resolver = p => p.path) {
    this._root = rootPath;
    this._options = opts;
    this.resolver = resolver;
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
    return this.resolver(path);
  }
}
