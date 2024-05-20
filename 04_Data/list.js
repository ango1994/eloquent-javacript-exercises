//Implementación sin ver la pista
function arrayToList(arr) {
  let ref = null
  for (let i = arr.length - 1; i >= 0; i--) {
    const obj = { value: arr[i], rest: ref }
    ref = obj
  }
  return ref
}

//Implementación después de ver la pista
function arrayToListHint(arr) {
  let lista = null
  for (let i = arr.length - 1; i >= 0; i--) {
    lista = { value: arr[i], rest: lista }
  }
  return lista
}

function listToArray(list) {
  const arr = []
  for (let i = list; i; i = i.rest) {
    arr.push(i.value)
  }
  return arr
}

function prepend(element, list) {
  const listToReturn = {}
  listToReturn.value = element
  listToReturn.rest = list
  return listToReturn
}

function nth(list, index) {
  let element = undefined
  let searched = list
  for (let i = index; i >= 0; i--) {
    element = searched?.value
    searched = searched?.rest
  }
  return element
}

function nthRecursive(list, index) {
  if (index == 0) return list?.value
  return nthRecursive(list?.rest, --index)
}
console.log(nthRecursive(arrayToList([10, 20, 30]), 1))
