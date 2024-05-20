// Imprimir números del uno al cien
// Los numeros divisibles por 3 imprimen fizz
// Los sibisibles por 5 pero no por 3 imprimen buzz
// Los números dividibles entre 5 y 3 imprimer Fizzbuz
function fizzBuzzWithSwitch() {
  for (let i = 1; i <= 100; i++) {
    let output
    switch (true) {
      case i % 3 == 0 && i % 5 == 0:
        output = "Fizzbuz"
        break
      case i % 5 == 0:
        output = "Buzz"
        break
      case i % 3 == 0:
        output = "Fizz"
        break
      default:
        output = i
    }
    console.log(output)
  }
}

function fizzBuzzWithIf() {
  for (let num = 1; num <= 100; num++) {
    if (!(num % 15)) console.log("Fizzbuzz!")
    else if (!(num % 5)) console.log("Buzz!")
    else if (!(num % 3)) console.log("Fizz!")
    else console.log(num)
  }
}

function fizBuzzWitOperators() {
  for (let i = 0; i <= 100; i++) {
    let output = ""
    if (i % 3) output += "Fizz"
    if (i % 5) output += "Buzz"
    console.log(output || i)
  }
}

function oneLineFizzBuzz() {
  for (let i = 0; i < 100; )
    console.log((++i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i)
}

oneLineFizzBuzz()
