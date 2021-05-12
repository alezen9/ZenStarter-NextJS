import { ZenRoute, ZenRouteID, ZenSection } from "../types";

export const privateRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.DASHBOARD,
      section: ZenSection.DASHBOARD,
      isSectionEntryPoint: true,
      isPrivate: true,
      title: 'Dashboard',
      path: '/'
   },
   // ============================ //
   {
      _id: ZenRouteID.USERS,
      section: ZenSection.USERS,
      isSectionEntryPoint: true, // false if sub route es: users/:_id
      isPrivate: true,
      title: 'Users',
      path: '/users'
   }
   // ============================ //
]