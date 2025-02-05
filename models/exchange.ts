export interface RequestExchangeRate {
  baseCurrency: string
  pairCurrency: string
}

export interface ExchangeRate {
  code: string
  message: string
  data: ExchangeRateData
}

export interface ExchangeRateData {
  rate: number
}
