export enum ZenRouteID {
   DASHBOARD = 'DASHBOARD',
   PROFILE = 'PROFILE'
}

export type ZenSubRoute = {
   title: string,
   path: string
}

export type ZenRoute = {
   _id: string
   title: string
   path: string
   subpaths?: ZenSubRoute[]
}

export const routes: ZenRoute[] = [
   {
      _id: ZenRouteID.DASHBOARD,
      title: 'Dashboard',
      path: '/'
   },
   {
      _id: ZenRouteID.PROFILE,
      title: 'Profile',
      path: '/profile'
   }
]
