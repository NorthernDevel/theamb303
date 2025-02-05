export interface BankDeposit {
  code: string
  message: string
  data: BankDepositData[]
}

export interface BankDepositData {
  accountBankName: string
  accountName: string
  accountNumber: string
  accountSet: number
  bankName: string
}

export interface DecimalDepositInfo {
  code: string
  message: string
  data: DecimalDepositInfoData
}

export interface DecimalDepositInfoData {
  decimalShortCutAmount: string[]
  maxDepositDecimal: number
}

export interface DecimalDepositTransCreate {
  code: string
  message: string
  data: DecimalDepositTransCreateData
}

export interface DecimalDepositTransCreateData {
  bankName: string
  accountNumber: string
  accountName: string
  amount: number
  expireDate: string
}

export interface RequestDecimalDepositTransCreate {
  amount: number
}

export interface DecimalDepositTrans {
  code: string
  message: string
  data: DecimalDepositTransData
}

export interface DecimalDepositTransData {
  amount: number
  expireDate: string
}
