import type { Currency } from './bank-list.model'

export interface Profile {
  code: string
  message: string
  data: User
}

export interface User {
  id: string
  customerBankAccount?: string
  customerBankName?: string
  createDate: Date
  lastIpLogin: string
  lastLoginDate: Date
  username: string
  prefix: string
  balance: number
  currency: Currency
  phoneNo: string
  link: string
  firstName?: string
  lastName?: string
  usernameGameProfile: string
  rank: Rank
  walletCash: number
  walletAffiliate: number
  walletWithdraw: number
  totalValidAmt: number
  isRejected: boolean
  rejectedPending: number
  walletDiamond: number
  walletReward: number
  isDeposit: IsDeposit
  middleName?: string
  isSyncPeer2Pay: boolean
  lastestGatewayChannel: string
  isAutoPromotion: boolean
}

export interface Rank {
  rank: string
  level: number
  exp: number
  totalExp: number
  season: number
  imageRank: string
}

export interface IsDeposit {
  isAskmepay: boolean
  isAuto: boolean
  isCrypto: boolean
  isDecimal: boolean
  isWiWallet: boolean
  isDecimalBank: boolean
  isScbAPI: boolean
  isTrueWallet: boolean
  isPeer2Pay: boolean
  isManualSlip: boolean
  isAutoSlip: boolean
}
