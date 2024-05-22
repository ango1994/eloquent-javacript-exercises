class Vec {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y)
  }
  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y)
  }
  get lenght() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

const vector = new Vec(3, 4)
console.log(vector.__proto__)
