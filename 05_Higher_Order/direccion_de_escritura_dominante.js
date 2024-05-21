require("./scripts")

function countBy(items, groupName) {
  let counts = []
  for (let item of items) {
    let script = groupName(item)
    let known = counts.find((c) => c.script.name == script.name)
    if (!known) {
      counts.push({ script, count: 1 })
    } else {
      known.count++
    }
  }
  return counts
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to
      })
    ) {
      return script
    }
  }
  return null
}

function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0))
    return script ? script : "none"
  }).filter(({ name }) => name != "none")

  const result = scripts.reduce((a, b) => {
    return a.count < b.count ? b : a
  })

  return result.script.direction
}

console.log(textScripts("Hey, مساء الخير"))
