class SpotSet {
  constructor() {
    this._spots = new Set();
  }

  key(x, y) {
    return '' + x + ',' + y;
  }

  add(x, y) {
    this._spots.add(this.key(x, y));
  }

  has(x, y) {
    return this._spots.has(this.key(x, y));
  }

  size() {
    return this._spots.size;
  }

  // Iterable
  spots() {
    return this._spots.keys();
  }
}

export default SpotSet;
