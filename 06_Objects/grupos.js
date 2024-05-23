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
set.add("apartamento")
set.add("apartamento")
console.log(set.group)
set.delete("casa")
console.log(set.group)
console.log(set.has("casa"))
const sym = Symbol("fo")
console.log(sym)
