// ---------- GENERIC TYPE ----------
export interface Vip {
  code: string
  message: string
  data: VipData
}

export interface VipExtGet {
  code: string
  message: string
  data: VipData
}

export interface CheckVip {
  code: string
  message: string
  data: CheckVipData[]
}

// ---------- DATA ----------
export interface VipData {
  id: string
  type: string
  isActive: boolean
  vip: VipDetail[]
  description: Description
}

export interface VipDetail {
  tier: string
  img: string
  description: Description
  config: Config[]
}

export interface Description {
  en: string
  any: string
}

export interface Config {
  level: number
  totalValidAmt: number
  bonus: number
}

export interface CheckVipData {
  level: number
  isActive: boolean
  updateDate?: string
}

// ---------- REQUEST ----------
export interface RequestVipReceive {
  level: number
  totalValidAmt: number
  bonus: number
  username: string
  tier: string
}
