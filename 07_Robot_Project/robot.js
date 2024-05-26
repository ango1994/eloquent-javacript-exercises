import { roadGraph } from "./utils/build_graph.js"
import { randomPick } from "./utils/random_pick.js"
import { goalOrientedRobot } from "./robots/goal_oriented_robot.js"
import { randomRobot } from "./robots/random_robot.js"
import { routeRobot } from "./robots/route_robot.js"

export const parcels = [
  { place: "Marketplace", address: "Cabin" },
  { place: "Marketplace", address: "Ernie's House" },
  { place: "Town Hall", address: "Grete's House" },
  { place: "Cabin", address: "Post Office" },
  { place: "Shop", address: "Grete's House" },
]

export class VillageState {
  // The place property defines where the robot is located
  // The parcels define an array of objects (paquetes) con su localización actual y su destinop
  constructor(place, parcels) {
    this.place = place
    this.parcels = parcels
  }

  move(destination) {
    //Si el lugar en el que nos encontramos actualmente es el destino devuelve el estado actual
    if (!roadGraph[this.place].includes(destination)) {
      return this
    } else {
      // Actualizamos el estado de los paquetes
      let parcels = this.parcels
        .map((p) => {
          //Si el paquete no se encuentra en nuestra posiición no lo movemos
          if (p.place != this.place) return p
          // Si el paquete se encuentra en nuestra posición lo movemos con nosotros
          return { place: destination, address: p.address }
          // Si el paquete se encuentra en su destino lo dejamos y no lo llevamos con nosotros
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

// state se refiere al estado actual de la villa (VillageState)
// robot es una función qué decide a qué lugar tiene que moverse
// memory es un listado de los movimientos anteriores del robot
export function runRobot(state, robot, memory) {
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
