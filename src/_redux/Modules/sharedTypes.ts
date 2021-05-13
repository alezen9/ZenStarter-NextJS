export type Pagination = {
  skip: number
  limit: number
}


// usually when we make a request we send n+1 as limit and if:
// results.length === n+1 => disableNext = false
// results < n+1 => disableNExt = true
// *Note: we always show at max n elemente regardless of the n+1 requested
export type ListOf<T> = {
  data: T[]
  disableNext?: boolean
}

export type ReduxAction<T> = {
  type: T
  payload?: any
}