import type { PromotionList } from "./promotion.model"

export interface DefaultResponse {
  code: string
  message: string
}

export interface RequestUser {
  username: string
}

export interface RequestPhone {
  phone: string
}

export interface RequestChangePassword {
  oldPassword: string
  password: string
}

export interface RequestUpdateBank {
  bankName?: string
  accountNo?: string
  firstName?: string
  lastName?: string
  middleName: string
  isAutoPromotion: boolean
}

export interface RequestSeviceArkmepay {
  type: string
}

export interface RequestBankDeposit {
  limit: number
  accountType?: string
}

export interface RequestWithdraw {
  amount?: number
}

export interface RequestGameLogin {
  gameType: GameType
  productCode: string
  code: string
  redirect: string
  isMobile: boolean
}

export interface RequestGameSport {
  redirect: string
}

export interface RequestGameListByType {
  gameType: GameType
  showGames: boolean
}

export interface RequestGameListByCode {
  gameType: GameType
  productCode: string
}

export enum GameType {
  'AFB' = 18,
  'CARD' = 3,
  'COCK' = 10, // cockfight
  'DBS' = 13,
  'ESPORT' = 5,
  'FBS' = 14,
  'FISH' = 6, // fishing
  'KENO' = 7,
  'LALI' = 19,
  'LIVE' = 2, // casino
  'LOTTERY' = 4,
  'PLB' = 15,
  'POKER' = 8,
  'SABA' = 12,
  'SBO' = 11,
  'SLOT' = 1,
  'TRADING' = 9,
  'UMB' = 16,
  'VSB' = 17,
}

export interface RequestConfigAutoPromotion {
  username: string
  isActive: boolean
  listPromotion: RequestListPromotion[]
}
export interface RequestListPromotion {
  promotionId: string
  promotionName: string
  type: string
  seq: number
  isPromotionActive: boolean
}

export interface RequsetCommission {
  commissionType: number
}

export interface RequestForgotPass {
  phone?: string
}

export interface RequestCouponToProduct{
  recordId: string
}
