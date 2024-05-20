function contarBs(input) {
  return contarCaracter(input, "B")
}

function contarCaracter(input, caracter) {
  let counter = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] === caracter) counter++
  }
  return counter
}

console.log(contarBs("BaiBbblonia"))
console.log(contarCaracter("EsterNoCleidomastoideo", "o"))
