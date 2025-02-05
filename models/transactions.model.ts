export interface DepositSpecialTransactions {
  code: string
  message: string
  data: DepositSpecialTransactionsData
}

export interface DepositSpecialTransactionsData {
  records: DepositSpecialTransRecord[]
}

export interface RejectTrans {
  code: string
  message: string
  data: RejectTransData
}

export interface RejectTransData {
  records: RejectTransRecord[]
}

export interface RejectTransRecord {
  createdDate: string
  updatedDate: string
  amount: number
  id: string
  receiveDate: string
  isReceive: boolean
}

export interface DepositSpecialTransRecord {
  date: string
  transactionChannel: TransactionChannel
  wallet: string
  amount?: number
}

export enum SlipType {
  MANUAL_SLIP = 0,
  AUTO_SLIP = 1,
}

export enum TransactionChannel {
  'ALLAUTOTRANS' = 0,
  'BANK' = 1,
  'TRUEWALLET' = 2,
  'WIWALLET' = 3,
  'ASKMEPAY' = 4,
  'ASKMEPAYCOIN' = 5,
  'ALLMANUALTRANS' = 6,
  'NOSLIP' = 7,
  'ADDCREDIT' = 8,
  'REMOVECREDIT' = 9,
  'ALLSPECIALTRANS' = 10,
  'BONUS' = 11,
  'CASHBACK' = 12,
  'COUPON' = 13,
  'ENET' = 14,
  'DEPOSIT_POINT' = 15,
  'AFFILIATE' = 16,
  'COMMISSION' = 17,
}

// --------------- REQUEST ---------------
export interface ConditionAddCreditSpecialType {
  code: string
  message: string
  data: ConditionAddCreditData
}

export interface ConditionAddCreditData {
  isDisableBtn: boolean
  message: string
}

export interface RequestDepositSpecialTransactions {
  transactionChannel: TransactionChannel
}

export interface RequestUploadSlip {
  imgSlip: string
  amount: number
  dateTime: string
  type: SlipType
}

export interface RequestReceiveRejectTrans {
  rejectTransId: string
}
