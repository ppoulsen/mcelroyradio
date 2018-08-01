const DEFAULT_OPTIONS = {
  dontRepeatFor: 20,
}

module.exports = class ShuffledPlaylist {
  constructor(items, options = {}) {
    this.items = [...items];
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    }
    this.discard = [];
  }

  nextItem() {
    const randomIndex = Math.floor(Math.random() * this.items.length);
    const result = this.items.splice(randomIndex, 1)[0];
    this.discard.push(result);
    if (this.discard.length > this.options.dontRepeatFor) {
      this.items.push(this.discard.shift());
    }

    return result;
  }
}