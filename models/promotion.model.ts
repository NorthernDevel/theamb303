export interface AutoPromotionProfile {
  code: string
  message: string
  data: AutoPromotionData
}

export interface AutoPromotionData {
  prefix?: string
  username?: string
  isCreateAutoPromotion?: boolean
  listPromotion: PromotionList[]
  isActive?: boolean
}

export interface PromotionListByType {
  code: string
  message: string
  data: PromotionListData[]
}

export interface PromotionListData {
  type: string
  nameType: string
  promotionList: PromotionList[]
}

export interface PromotionList {
  promotionName: string
  minReceive: number
  maxReceive: number
  typeBonus: string
  description?: string
  percentCalBonus?: number
  active: boolean
  maxBonus: number
  turnOverSlot: number
  turnOverHDP: number
  turnOverMixParlay: number
  turnOverMixStep: number
  turnOverCasino: number
  turnOverThaiLottery: number
  turnOverM2Sport: number
  turnOverMultiPlayer: number
  turnOverESport: number
  turnOverKeno: number
  turnOverPoker: number
  turnOverTrading: number
  limitWithdraw: number
  type: string
  id: string
  limitWithdrawNo: number
  turnTypeSlot: string
  turnTypeHDP: string
  turnTypeMixParlay: string
  turnTypeMixStep: string
  turnTypeCasino: string
  turnTypeThaiLottery: string
  turnTypeM2Sport: string
  turnTypeMultiPlayer: string
  turnTypeESport: string
  turnTypeKeno: string
  turnTypePoker: string
  turnTypeTrading: string
  turnOverCock: number
  turnTypeCock: string
  turnOverSbo: number
  turnTypeSbo: string
  turnOverSaba: number
  turnTypeSaba: string
  seq: number
  isPromotionActive: boolean
  turnOverDbs: number
  turnOverFbs: number
  turnOverPlb: number
  turnOverUmb: number
  turnOverVsb: number
  turnTypeDbs: string
  turnTypeFbs: string
  turnTypePlb: string
  turnTypeUmb: string
  turnTypeVsb: string
  bonus?: number
  img?: string
  imgAds?: string
  turnOverAfb?: number
  turnTypeAfb?: string
  turnOverLali?: number
  turnTypeLali?: string
}

export interface RequestTakePromotion {
  promotionId: string
}

// ============================= Form Protal =============================
export interface Promotion {
  code: number
  message: string
  data: PromotionData[]
}

export interface PromotionData {
  id: string
  promotionId: string
  image: string
  title: string
  shortContent: string
  content: string
  slug: string
}