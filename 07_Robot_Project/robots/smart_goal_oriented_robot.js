import { roadGraph } from "../utils/build_graph.js"

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

function findNearestParcel(place, parcels) {
  const routes = [[]]
  for (let i = 0; i < parcels.length; i++) {
    const newRoute = findRoute(roadGraph, parcels[i].place, parcels[i].address)
    console.log(newRoute)
    const index = routes.findIndex((route) => route?.length > newRoute.length)
    routes.splice(index, 0, newRoute)
  }
  return routes
}

export function smartGoalOrientedRobot({ place, parcels }, route) {
  console.log(findNearestParcel(place, parcels))
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
