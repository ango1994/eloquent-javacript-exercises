const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
]

function buildGraph(edges) {
  let graph = Object.create(null)
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to)
    } else {
      graph[from] = [to]
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to)
    addEdge(to, from)
  }
  return graph
}

const roadGraph = buildGraph(roads)

class VillageState {
  constructor(place, parcels) {
    this.place = place
    this.parcels = parcels
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) {
            return p
          }
          return { place: destination, address: p.address }
        })
        .filter((p) => p.place != p.address)
      return new VillageState(destination, parcels)
    }
  }

  static random(parcelCount = 5) {
    let parcels = []
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph))
      let place
      do {
        place = randomPick(Object.keys(roadGraph))
      } while (place == address)
      parcels.push({ place, address })
    }
    return new VillageState("Post Office", parcels)
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`)
      break
    }
    let action = robot(state, memory)
    state = state.move(action.direction)
    memory = action.memory
    console.log(`Moved to ${action.direction}`)
  }
}

// Random Robot

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length)
  return array[choice]
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) }
}

// Fixed path Robot

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
]

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute
  }
  return { direction: memory[0], memory: memory.slice(1) }
}

// Goal oriented Robot

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }]
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i]
    for (let place of graph[at]) {
      if (place == to) return route.concat(place)
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) })
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0]
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place)
    } else {
      route = findRoute(roadGraph, place, parcel.address)
    }
  }
  return { direction: route[0], memory: route.slice(1) }
}

// My Robot

function findNearestParcel(roadGraph, from, to) {}

function myRobot({ place, parcels }, route) {
  let routes = []
  if (route.length == 0) {
    for (let i = 0; i < parcels.length; i++) {
      routes.push({
        place: parcels[i].place,
        destination: parcels[i].address,
        route: findRoute(roadGraph, place, parcels[i].place),
      })
    }
    routes.sort((a, b) => a.route.length - b.route.length)
    let parcel = routes[0]
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place)
    } else {
      route = findRoute(roadGraph, place, parcel.destination)
    }
  }

  return { direction: route[0], memory: route.slice(1) }
}

// Lazy Robot

function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        }
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        }
      }
    })

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route
  }

  return { direction: route[0], memory: route.slice(1) }
}

// Function to compare Robots

function runRobotCompare(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn
    }
    let action = robot(state, memory)
    state = state.move(action.direction)
    memory = action.memory
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let movementsRobot1 = 0
  let movementsRobot2 = 0
  for (let i = 0; i < 100; i++) {
    const village = VillageState.random()
    movementsRobot1 += runRobotCompare(village, robot1, memory1)
    movementsRobot2 += runRobotCompare(village, robot2, memory2)
  }
  console.log(
    `Robot ${robot1.name} took an average of ${
      movementsRobot1 / 100
    } movements to finish`
  )
  console.log(
    `Robot ${robot2.name} took an average of ${
      movementsRobot2 / 100
    } movements to finish`
  )
}
console.time("myRobot")
console.time("lazyRobot")

compareRobots(myRobot, [], lazyRobot, [])
console.timeEnd("myRobot")
console.timeEnd("lazyRobot")
