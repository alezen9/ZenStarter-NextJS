import { privateRoutes } from "./Private"
import { publicRoutes } from "./Public"
import { ZenRoute, ZenRouteID } from "./types"

export const routes: ZenRoute[] = [
   ...privateRoutes,
   ...publicRoutes
]

export const routesPaths: Record<ZenRouteID, ZenRoute> = routes.reduce((acc, route) => {
   acc[route._id] = route
   return acc
}, {} as Record<ZenRouteID, ZenRoute>)