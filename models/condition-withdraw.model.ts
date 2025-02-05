export interface ConditonWithdraw {
  code: string
  message: string
  data: ConditonWithdrawData
}

interface ConditonWithdrawData {
  remainingAmount: number
  turn: string
  name: string
  phoneNo: string
  disableBtn: boolean
  message?: string
  minWithdrawAmount: number
  maxWithdrawAmount: number
}
