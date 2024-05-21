let arrays = [[1, 2, 3], [4, 5], [6]]

function aplanar(arr) {
  return arr.reduce((acumulator, currentValue) => {
    return acumulator.concat(currentValue)
  }, [])
}

console.log(aplanar(arrays))
