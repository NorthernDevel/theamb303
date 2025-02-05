export interface CustomerTurnOverDetail {
  code: string
  message: string
  data: CustomerTurnOverDetailData
}

export interface CustomerTurnOverDetailData {
  bankAccount: string
  bankName: string
  remainingNumberOfTimes: number
  remainingAmount: number
  credit: number
  turn: string
  limit: number
  name: string
  phoneNo: string
  disableBtn: boolean
  message: string
  minWithdrawAmount: number
  maxWithdrawAmount: number
}

export interface PreviewFortuneTurnOver {
  code: string
  message: string
  data: PreviewFortuneTurnOverData
}

export interface PreviewFortuneTurnOverData {
  amount: number
  turnOverSlot: number
  turnOverHDP: number
  turnOverMixParlay: number
  turnOverCock: number
  turnOverMixStep: number
  turnOverCasino: number
  turnOverThaiLottery: number
  turnOverMultiPlayer: number
  turnOverESport: number
  turnOverKeno: number
  turnOverPoker: number
  turnOverTrading: number
  turnOverSbo: number
  turnOverSaba: number
  turnTypeSlot: TurnType
  turnTypeHDP: TurnType
  turnTypeMixParlay: TurnType
  turnTypeCock: TurnType
  turnTypeMixStep: TurnType
  turnTypeCasino: TurnType
  turnTypeThaiLottery: TurnType
  turnTypeMultiPlayer: TurnType
  turnTypeESport: TurnType
  turnTypeKeno: TurnType
  turnTypePoker: TurnType
  turnTypeTrading: TurnType
  turnTypeSbo: TurnType
  turnTypeSaba: TurnType
  turnOverDbs: number
  turnOverFbs: number
  turnOverPlb: number
  turnOverUmb: number
  turnOverVsb: number
  turnTypeDbs: TurnType
  turnTypeFbs: TurnType
  turnTypePlb: TurnType
  turnTypeUmb: TurnType
  turnTypeVsb: TurnType
}

export enum TurnType {
  Turnover = 'TURNOVER',
}

export interface RequestCustomerTurnOverDetail {
  username: string
}
