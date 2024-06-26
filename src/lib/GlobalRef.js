export class GlobalRef {
  constructor(uniqueName) {
    this.sym = Symbol.for(uniqueName);
  }

  get value() {
    return global[this.sym];
  }

  set value(value) {
    global[this.sym] = value;
  }
}
