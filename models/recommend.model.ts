import type { Currency } from './bank-list.model'

export interface RecommendList {
  code: string
  message: string
  data: RecommendData
}

interface RecommendData {
  recommend: Recommend[]
}

export interface Recommend {
  name: string
  value: string
  currency: Currency
  code: number
}
