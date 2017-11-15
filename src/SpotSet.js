class SpotSet {
  constructor() {
    this.spots = new Set();
  }

  key(x, y) {
    return '' + x + ',' + y;
  }

  add(x, y) {
    this.spots.add(this.key(x, y));
  }

  has(x, y) {
    return this.spots.has(this.key(x, y));
  }

  size() {
    return this.spots.size;
  }
}

export default SpotSet;
