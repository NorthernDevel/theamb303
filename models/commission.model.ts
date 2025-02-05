export interface Commission {
  code: string
  message: string
  data: CommissionData
  CommissionTurnOverDetailData: CommissionTurnOverDetailData
}

export interface CommissionData {
  isDisableBtn: boolean
  amount?: number
  details?: CommissionDataDetails
  message?: string
}

export interface CommissionDataDetails {
  card: DetailClassCommission
  casino: DetailClassCommission
  cock: DetailClassCommission
  esport: DetailClassCommission
  hdp: DetailClassCommission
  keno: DetailClassCommission
  lotto: DetailClassCommission
  mixParlay: DetailClassCommission
  mixStep: DetailClassCommission
  poker: DetailClassCommission
  saba: DetailClassCommission
  sbo: DetailClassCommission
  slot: DetailsSlotCommission
  trade: DetailClassCommission
}

export interface DetailClassCommission {
  name: string
  key: string
  type: string
  percent?: number
}

export interface DetailsSlotCommission {
  name: string
  key: string
  type: string
  amount: number
  winLose: number
  validAmount: number
  percent: number
}

export interface CommissionTurnOverDetail {
  code: string
  message: string
  data: CommissionTurnOverDetailData
}

export interface CommissionTurnOverDetailData {
  commissionType: string
  amount: number
  isDisableBtn: boolean
  beforeConvertDiamond: number
  turn: TurnCommission
  turnOverCasino: number
  turnOverThaiLottery: number
  turnOverM2Sport: number
  turnOverMultiPlayer: number
  turnOverESport: number
  turnOverKeno: number
  turnOverPoker: number
  turnOverTrading: number
  turnTypeSlot: TurnTypeCommission
  turnTypeHDP: TurnTypeCommission
  turnTypeMixParlay: TurnTypeCommission
  turnTypeMixStep: TurnTypeCommission
  turnTypeCasino: TurnTypeCommission
  turnTypeThaiLottery: TurnTypeCommission
  turnTypeMultiPlayer: TurnTypeCommission
  turnTypeESport: TurnTypeCommission
  turnTypeKeno: TurnTypeCommission
  turnTypePoker: TurnTypeCommission
  turnTypeTrading: TurnTypeCommission
  turnOverCock: number
  turnTypeCock: TurnTypeCommission
  turnOverSbo: number
  turnTypeSbo: TurnTypeCommission
  turnOverSaba: number
  turnTypeSaba: TurnTypeCommission
  turnOverSlot: number
  turnOverHDP: number
  turnOverMixParlay: number
  turnOverMixStep: number
  cashbackType: string
  type: string
}

export interface TurnCommission {
  card: TurnCardCommission
  casino: TurnCardCommission
  cock: TurnCardCommission
  esport: TurnCardCommission
  hdp: TurnCardCommission
  keno: TurnCardCommission
  lotto: TurnCardCommission
  mixParlay: TurnCardCommission
  mixStep: TurnCardCommission
  poker: TurnCardCommission
  saba: TurnCardCommission
  sbo: TurnCardCommission
  slot: TurnSlotCommission
  trade: TurnCardCommission
}

export interface TurnCardCommission {
  turnOver: number
  turnType: TurnTypeCommission
  detail: DetailClassCommission
}

export enum TurnTypeCommission {
  Turnover = 'TURNOVER',
}

export interface TurnSlotCommission {
  turnOver: number
  turnType: TurnTypeCommission
  detail: DetailsSlotCommission
}

export interface RequestCommissionTurnOverDetail {
  commissionType: number
}
