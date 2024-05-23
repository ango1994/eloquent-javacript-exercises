class Group {
  group = []

  add(member) {
    this.group.includes(member) ? null : this.group.push(member)
  }
  delete(member) {
    this.group = this.group.filter((element) => {
      return element !== member
    })
  }
  has(member) {
    return this.group.includes(member)
  }

  static from(iterable) {
    const newGroup = new Group()
    for (let element of iterable) {
      newGroup.add(element)
    }
    return newGroup
  }

  [Symbol.iterator] = function () {
    return new GroupIterator(this)
  }
}

class GroupIterator {
  i = 0
  constructor(group) {
    this.group = group
  }

  next() {
    if (this.group.group[this.i] === undefined) {
      return { done: true }
    }
    return { value: this.group.group[this.i++], done: false }
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value)
}
