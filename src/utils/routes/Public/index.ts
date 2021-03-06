import { ZenRoute, ZenRouteID } from "../types";

export const publicRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.ERROR,
      isPrivate: false,
      title: 'Error',
      path: '/error'
   },
   // ============================ //
   {
      _id: ZenRouteID.LOGIN,
      isPrivate: false,
      title: 'Login',
      path: '/auth/login'
   },
   // ============================ //
]