import { goalOrientedRobot } from "./robots/goal_oriented_robot.js"
import { routeRobot } from "./robots/route_robot.js"
import {
  compareRobots,
  compareRobotsWithAnimation,
} from "./utils/compare_robots.js"
import { runRobotAnimation } from "./animatevillage.js"
import { VillageState } from "./robot.js"
import { smartGoalOrientedRobot } from "./robots/smart_goal_oriented_robot.js"

// compareRobotsWithAnimation(routeRobot, [], goalOrientedRobot, [])
runRobotAnimation(VillageState.random(), smartGoalOrientedRobot, [])
