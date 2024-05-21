function deepEqual(x, y) {
  if (x === y) {
    return true
  }

  if (x === null || y === null) {
    return x === y
  }

  if (typeof x !== "object" || typeof y !== "object") {
    return x === y
  }

  const keysX = Object.keys(x)
  const keysY = Object.keys(y)

  if (keysX.length !== keysY.length) {
    return false
  }

  for (let i = 0; i < keysX.length; i++) {
    let key = keysX[i]
    if (!keysY.includes(key) || !deepEqual(x[key], y[key])) {
      return false
    }
  }

  return true
}

let obj = { here: {}, object: 2 }
console.log(deepEqual(obj, { object: 2, here: {} }))
