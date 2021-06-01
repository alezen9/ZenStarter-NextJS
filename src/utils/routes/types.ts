export enum ZenRouteID {
   ERROR = 'ERROR',
   LOGIN = 'LOGIN',
   HOME = 'HOME'
}

export enum ZenSection {
   HOME = 'HOME'
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
}