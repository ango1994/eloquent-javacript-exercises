let string = ""
const grid = 8
for (let i = 0; i <= grid; i++) {
  for (let x = 0; x <= grid + 1; x++) {
    if ((i + x) % 2 == 0) {
      string += " "
    } else {
      string += "#"
    }
  }
  string += "\n"
}

console.log(string)
