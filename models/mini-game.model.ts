// ---------- GENERIC TYPE ----------
export interface V2 {
  code: string
  message: string
  data: V2Data
}

export interface GameList {
  code: string
  message: string
  data: GameListData[]
}

export interface StatusReceiveFortuneTicket {
  code: string
  message: string
  data: StatusReceiveFortuneTicketData
}

export interface Fortune {
  code: string
  message: string
  data: FortuneData
}

export interface FortuneHonorBoard {
  code: string
  message: string
  data: FortuneHonorBoardData
}

// ---------- DATA ----------
export interface V2Data {
  value: number
  reward: number
}

export interface GameListData {
  name: string
  icon: string
  banner: string
  description: string
  gameUrl: string
}

export interface StatusReceiveFortuneTicketData {
  affiliate: boolean
  daily: boolean
  free: boolean
}

export interface FortuneData {
  segments: string[]
  segColors: SegColor[]
}

export enum SegColor {
  Ab191F = '#ab191f',
  F5Da76 = '#f5da76',
  The75Ecf5 = '#75ECF5',
}

export interface FortuneHonorBoardData {
  total: number
  list: FortuneHonorBoardList[]
}

export interface FortuneHonorBoardList {
  username: string
  prize: number
  timestamp: string
  seq?: number
}

// ---------- REQUEST ----------
export interface RequestV2 {
  amount: number
  game: string
}

export interface RequestFortuneDailyTicket {
  reference: string
  remark: string
}

export interface RequestGameList {
  prefix: string
}

export interface RequestFortune {
  game: string
}

export interface RequestFortuneHonorBoard {
  limit: number
}

export interface RequestPredictAll {
  isActive: number
  limit: number
  name: number
  page: number
}
