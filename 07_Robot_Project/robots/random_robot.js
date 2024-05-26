import { roadGraph } from "../utils/build_graph.js"
import { randomPick } from "../utils/random_pick.js"
export function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) }
}
