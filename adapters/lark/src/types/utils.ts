export type Pagination<T> = T & { page_size?: number; page_token?: string }

export interface Paginated<T> {
  items: T[]
  has_more: boolean
  page_token: string
}
