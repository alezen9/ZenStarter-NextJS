import { Pagination } from "../../types"

export type User = {
   _id: string
   fullName: string
   // rest here
}


export type FiltersUser = Pagination & {
  ids?: string[]
  searchText?: string
}