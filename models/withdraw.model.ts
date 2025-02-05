export interface Withdraw {
  code: string
  message: string
  data: WithdrawData
}

export interface WithdrawData {
  isPeer2Pay: boolean
}
