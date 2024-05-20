function isEven(num) {
  if (num == 1) return false
  if (num == 0) return true
  return isEven(num < 0 ? (num += 2) : (num -= 2))
}

console.log(isEven(-1))
