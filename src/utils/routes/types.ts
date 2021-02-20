export enum ZenRouteID {
   ERROR = 'ERROR',
   LOGIN = 'LOGIN',
   DASHBOARD = 'DASHBOARD',
   ME = 'ME'
}

export enum ZenSection {
   DASHBOARD = 'DASHBOARD',
   ME = 'ME'
}

export type ZenSubRoute = {
   title: string
   path: string
}

export type ZenRoute = {
   _id: ZenRouteID
   title: string
   path: string
   as?: (...args: any) => string
   displayBack?: boolean
   backRouteID?: ZenRouteID
   isPrivate: boolean
   section?: ZenSection
   subpaths?: ZenSubRoute[]
}