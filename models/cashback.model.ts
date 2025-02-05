export interface Cashback {
  code: string
  message: string
  data: CashbackData
}

export interface CashbackData {
  img: string
  isDisableBtn: boolean
  amount?: number
  details?: CashbackDataDetails
  message?: string
}

export interface CashbackDataDetails {
  card: DetailClassCashBack
  casino: DetailClassCashBack
  cock: DetailClassCashBack
  esport: DetailClassCashBack
  hdp: DetailClassCashBack
  keno: DetailClassCashBack
  lotto: DetailClassCashBack
  mixParlay: DetailClassCashBack
  mixStep: DetailClassCashBack
  poker: DetailClassCashBack
  saba: DetailClassCashBack
  sbo: DetailClassCashBack
  slot: DetailsSlotCashBack
  trade: DetailClassCashBack
}

export interface CashbackTurnOverDetail {
  code: string
  message: string
  data: CashbackTurnOverDetailData
}

export interface CashbackTurnOverDetailData {
  cashbackType: string
  amount: number
  limitWithdrawAmount: number
  isDisableBtn: boolean
  beforeConvertDiamond: number
  turn: TurnCashBack
  turnOverCasino: number
  turnOverThaiLottery: number
  turnOverM2Sport: number
  turnOverMultiPlayer: number
  turnOverESport: number
  turnOverKeno: number
  turnOverPoker: number
  turnOverTrading: number
  turnTypeSlot: TurnTypeCashBack
  turnTypeHDP: TurnTypeCashBack
  turnTypeMixParlay: TurnTypeCashBack
  turnTypeMixStep: TurnTypeCashBack
  turnTypeCasino: TurnTypeCashBack
  turnTypeThaiLottery: TurnTypeCashBack
  turnTypeMultiPlayer: TurnTypeCashBack
  turnTypeESport: TurnTypeCashBack
  turnTypeKeno: TurnTypeCashBack
  turnTypePoker: TurnTypeCashBack
  turnTypeTrading: TurnTypeCashBack
  turnOverCock: number
  turnTypeCock: TurnTypeCashBack
  turnOverSbo: number
  turnTypeSbo: TurnTypeCashBack
  turnOverSaba: number
  turnTypeSaba: TurnTypeCashBack
  turnOverSlot: number
  turnOverHDP: number
  turnOverMixParlay: number
  turnOverMixStep: number
  type: string
}

export interface DetailClassCashBack {
  name: string
  key: string
  type: string
  percent: number
}

export interface DetailsSlotCashBack {
  name: string
  key: string
  type: string
  amount: number
  winLose: number
  validAmount: number
  percent: number
}

export interface RequestCashbackType {
  cashbackType: number
}

export interface TurnCashBack {
  card: TurnCardCashBack
  casino: TurnCardCashBack
  cock: TurnCardCashBack
  esport: TurnCardCashBack
  hdp: TurnCardCashBack
  keno: TurnCardCashBack
  lotto: TurnCardCashBack
  mixParlay: TurnCardCashBack
  mixStep: TurnCardCashBack
  poker: TurnCardCashBack
  saba: TurnCardCashBack
  sbo: TurnCardCashBack
  slot: TurnSlotCashBack
  trade: TurnCardCashBack
}

export interface TurnCardCashBack {
  turnOver: number
  turnType: TurnTypeCashBack
  detail: DetailClassCashBack
}

export interface TurnSlotCashBack {
  turnOver: number
  turnType: TurnTypeCashBack
  detail: DetailsSlotCashBack
}

export enum TurnTypeCashBack {
  Turnover = 'TURNOVER',
}

export enum CashbackType {
  CREDIT = 0,
  DIAMOND = 1,
}