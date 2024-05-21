function everyWithLoop(array, test) {
  for (el of array) {
    if (!test(el)) {
      return false
    }
  }
  return true
}

function everyWithSome(array, test) {
  return !array.some((el) => !test(el))
}

console.log(everyWithSome([1, 2, 3, 4, 1], (n) => n < 10))
