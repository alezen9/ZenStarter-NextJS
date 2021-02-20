// generic types used in multiple moduless
export interface List<T> {
	totalCount: number
	result: T[]
}
export class Pagination {
	skip: number
	limit?: number
}
