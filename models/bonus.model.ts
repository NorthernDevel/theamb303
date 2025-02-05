export interface Bonus {
  code: string
  message: string
  data: BonusData
}

export interface BonusData {
  list: ListBonus[]
  total: number
}

export interface BonusDetail {
  code: string
  message: string
  data: BonusDetailData
}

export interface BonusDetailData {
  isDisableBtn: boolean
  amount: number
  maxWithdraw: number
  message? : string
  turn: { [key: string]: TurnBonus }
  reference: string
}

export interface TurnBonus {
  turnover: number
  turnoverType: TurnoverTypeBonus
  name: string
}

export enum TurnoverTypeBonus {
  Turnover = 'TURNOVER',
}

export interface ListBonus {
  amount: number
  startDate: Date
  endDate: Date
  username: string
  turn: { [key: string]: TurnBonus }
  maxWithdraw: number
  serial: string
  isActive: boolean
  usernameProduct: string
  status: string
  createBy: string
}

export interface RequestBonus {
  page: number
  size: number
}

export interface RequestBonusDetail {
  serial: string
}

export interface RequestReceiveBonus {
  serial: string
  reference: string
}
