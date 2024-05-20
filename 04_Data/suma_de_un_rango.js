function range(x, y, z = 1) {
  const newArray = []
  if (x < y) {
    for (let i = x; i <= y; i += z) {
      newArray.push(i)
    }
  } else {
    for (let i = x; i >= y; i += z) {
      newArray.push(i)
    }
  }

  return newArray
}

function sum(arr) {
  let output = 0
  for (num of arr) {
    output += num
  }
  return output
}

console.log(range(5, 2, -2))
