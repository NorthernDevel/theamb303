import type { ResoucesData } from "./resource.model"

export interface Prefix {
  code: string
  message: string
  data: PrefixData
}

export interface PrefixData {
  prefix: string
  productName: string
  currency: string
  country: string
  isAffiliate: boolean
  isFortune: boolean
  isVip: boolean
  rate: number
  isMaintenance: boolean
  maintenanceText: string
}

export interface PrefixPermission {
  code: string
  message: string
  data: PrefixPermissionData
  resources: ResoucesData
}

export interface PrefixPermissionData {
  prefix: string
  isActive: boolean
  isDeposit: IsDeposit
  isWithdraw: IsWithdraw
  isPromotion: IsPromotion
  isOther: IsOther
  themeName: string
  defaultCurrency: string
  product: string
  currency: Currency[]
  isEntertainment: boolean
  isExternal: boolean
  isGame: boolean
  isCommission: boolean
  isVip: boolean
  isAV: boolean
  isAnime: boolean
  isMovie: boolean
  contact: Contact
  isMiniGame: boolean
  isDisplayAutoPromotion: boolean
  isRegister: boolean
}

export interface Contact {
  line: Line
  telegram: Line
}

export interface Line {
  isActive: boolean
}

export interface Currency {
  name: string
  isActive: boolean
}

export interface IsDeposit {
  isAskmepay: boolean
  isAuto: boolean
  isAutoSlip: boolean
  isDecimal: boolean
  isManualSlip: boolean
  isPeer2Pay: boolean
  isScbAPI: boolean
  isTrueWallet: boolean
}

export interface IsOther {
  isAffiliate: boolean
  isEmergency: boolean
  isVip: boolean
  isAffiliateBonus: boolean
}

export interface IsPromotion {
  isShowPromotion: boolean
  isManyPromotion: boolean
  isCashBack: boolean
  isCoupon: boolean
  isReward: boolean
  isCommission: boolean
  isReceiveBonus: boolean
}

export interface IsWithdraw {
  isAutoWithdraw: boolean
  isSpecifyWithdrawAmount: boolean
  isDecimalWithdraw: boolean
}