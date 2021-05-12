export enum ZenRouteID {
   ERROR = 'ERROR',
   LOGIN = 'LOGIN',
   DASHBOARD = 'DASHBOARD',
   ADMINS = 'ADMINS',
   ADMIN_CREATE = 'ADMIN_CREATE',
   ADMIN_DETAIL = 'ADMIN_DETAIL',
   USERS = 'USERS',
   SUPPLIERS = 'SUPPLIERS',
   SUPPLIER_CREATE = 'SUPPLIER_CREATE',
   SUPPLIER_DETAIL = 'SUPPLIER_DETAIL',
   REGISTERED_SERVICES = 'REGISTERED_SERVICES',
   EXTERNAL_SERVICES = 'EXTERNAL_SERVICES',
   IMPORT_EXPORT = 'IMPORT_EXPORT',
   BANKS = 'BANKS'
}

export enum ZenSection {
   DASHBOARD = 'DASHBOARD',
   ME = 'ME',
   ADMINS = 'ADMINS',
   USERS = 'USERS',
   SUPPLIERS = 'SUPPLIERS',
   REGISTERED_SERVICES = 'REGISTERED_SERVICES',
   EXTERNAL_SERVICES = 'EXTERNAL_SERVICES',
   IMPORT_EXPORT = 'IMPORT_EXPORT',
   BANKS = 'BANKS'
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
   isSectionEntryPoint?: boolean
   subpaths?: ZenSubRoute[]
}