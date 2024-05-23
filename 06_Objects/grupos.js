class Group {
  group = ["casa", "piso"]

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
}

const set = new Group()
