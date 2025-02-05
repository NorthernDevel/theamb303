// ---------- GENERIC TYPE ----------
export interface ReportExchangeReward {
  code: string
  message: string
  data: ReportExchangeRewardData
}

export interface RewardListPlayer {
  code: string
  message: string
  data: RewardListPlayerData
}

// ---------- DATA ----------
export interface ReportExchangeRewardData {
  list: ReportExchangeRewardList[]
  total: number
}

export interface ReportExchangeRewardList {
  nameReward: string
  amount: number
  productType: string
  username: string
  createdDate: string
  rewardId: string
  productCode?: string
  serialCode?: string
  nameCoupon: string
  beforeDiamond: number
  afterDiamond: number
}

export interface RewardListPlayerData {
  list: RewardListPlayerList[]
  total: number
}

export interface RewardListPlayerList {
  nameReward: string
  count: number
  limitToUser: string
  productType: string
  groupReward: string
  amount: number
  img: string
  isActive: boolean
  productCode: string
  description: string
  id: string
  couponGroupName: string
  fullImg: string
}

// ---------- REQUEST ----------f
export interface RequestExchangeReward {
  id: string
}

export interface RequestReportExchangeReward {
  endDate: string
  startDate: string
  page: number
  size: number
  username: string
  isPlayer: boolean
}

export interface RequestRewardListPlayer {
  name: string
  page: number
  size: number
  type: string
}
