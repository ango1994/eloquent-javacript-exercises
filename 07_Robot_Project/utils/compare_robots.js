import { runRobotAnimation } from "../animatevillage.js"
import { VillageState } from "../robot.js"

export function compareRobots(robot1, memory1, robot2, memory2) {
  function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn
      }
      let action = robot(state, memory)
      state = state.move(action.direction)
      memory = action.memory
    }
  }

  let counter1 = 0,
    counter2 = 0
  for (let i = 0; i < 100; i++) {
    const state = VillageState.random()
    counter1 += runRobot(state, robot1, memory1)
    counter2 += runRobot(state, robot2, memory2)
  }

  console.log(`Robot 1 took ${counter1 / 100} steps per task`)
  console.log(`Robot 2 took ${counter2 / 100} steps per task`)
}

export function compareRobotsWithAnimation(robot1, memory1, robot2, memory2) {
  const state = VillageState.random(100)
  runRobotAnimation(state, robot1, memory1)
  runRobotAnimation(state, robot2, memory2)
}
