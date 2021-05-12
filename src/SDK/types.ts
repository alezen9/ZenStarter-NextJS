export class Pagination {
	skip?: number
	limit?: number
}

export type ListResponse<T> = {
   paginated: T[]
   totalCount: number
}