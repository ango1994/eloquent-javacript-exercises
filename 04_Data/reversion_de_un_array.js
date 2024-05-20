function reverseArray(arr) {
  const arrayToReturn = []
  for (let i = arr.length - 1; i >= 0; i--) {
    arrayToReturn.push(arr[i])
  }
  return arrayToReturn
}

function reverseArrayInPlace(arr) {
  const middleArray = []
  for (let i = arr.length - 1; i >= 0; i--) {
    const element = arr.pop()
    middleArray.push(element)
  }
  arr.unshift(...middleArray)
  return arr
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5]))
