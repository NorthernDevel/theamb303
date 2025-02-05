export interface BankList {
  code: string
  message: string
  data: BankListData
}

export interface BankListData {
  banks: Bank[]
  urlImage: string
}

export interface Bank {
  shortName: string
  shortNameSMS: string
  currency: Currency
  name: Name
}

export type Currency = 'THB'

export interface Name {
  th: string
  en: string
  my?: string
  lo: string
  km: string
}
