export interface TransferWallet {
  code: string
  message: string
  data: TurnOverData
}

export interface TurnOverData {
  credit: number
  productName: string
  limitWithdrawAmount: number
  promotionId: string
  sumTurn?: boolean
  sumCredit: number
  isTurn: boolean
  sumCreditFormular?: string
  game?: Game[]
  walletCash: number
  limitWithdraw?: number
}

export interface Game {
  type: string
  turn?: number
  amount?: number
  turnType?: string
}

export interface RequestAutoWithdraw {
  amount: number
}

export interface RequestSumTurn {
  amount: number
  outstanding: number
}
