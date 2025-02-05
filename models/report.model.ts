// ---------- GENERIC TYPE ----------
export interface RunningList {
  code: string
  data: RunningListData
  footer: any[]
  message: string
}

export interface WinLoseFindByPreCalId {
  code: string
  data: any[]
  message: string
}

export interface WinLoseGroupByDate {
  code: string
  data: WinLoseGroupByDateData[]
  message: string
}

export interface WinLoseListByDate {
  code: string
  data: WinLoseListByDateData
  footer: any[]
  message: string
}

// ---------- DATA ----------
export interface BetAmt {
  $numberDecimal: string
}

export interface Doc {
  __v: number
  _id: string
  afterCredit: number
  beForCredit: number
  betAmt: BetAmt
  betId: string
  commAmt: number
  commRate: number
  createDate: Date
  currency: string
  dayPreCalId: string
  game: Game
  gameDate: Date
  gameId: string[]
  gameName: string
  ip: string
  isAddRedis: boolean
  isAddValue: boolean
  isBetWithPayout: boolean
  isCancelSuccess: boolean
  isRobot: boolean
  lastPaymentID: string
  liveCasino: Game
  memberId: string
  moveEs: boolean
  payOutAmt: BetAmt
  poInc: number
  preCal: string
  preCalId: string
  provider: string
  ptAgent: PtAgent[]
  ptMember: PtMember
  realBetAmt: BetAmt
  ref1: string
  rollId: string
  sh: Sh[]
  sport: any[]
  stake: number
  status: string
  summaryOdds: number
  type: string
  updateDate: Date
  username: string
  validAmt: BetAmt
  winLose: BetAmt
}

export interface Game {
  betPosition: any[]
}

export interface PtAgent {
  _id: string
  betLimit: number
  comm: number
  force: number
  position: string
  receive: number
  remain: number
  userId: string
  username: string
}

export interface PtMember {
  betLimit: number
  comm: number
  force: number
  receive: number
  remain: number
}

export interface RunningListData {
  docs: any[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: null
  page: number
  pagingCounter: number
  prevPage: null
  totalDocs: number
  totalPages: number
}

export interface Sh {
  _id: string
  agUser: string
  agentId: string
  betToTop: number
  betValue: number
  getCommissionRate: number
  getPayComFormTop: number
  getPayFormTopTotal: number
  getPayFormTopUserId: string
  getPayOutFormTop: number
  getPayOutRate: number
  grossCom: number
  payComToUnder: number
  payOutComRateToUnder: number
  payOutRateToUnder: number
  payOutToUnder: number
  payOutTotalToUnder: number
  payToUnderId: string
  payToUsername: string
  position: string
  ptAmt: number
  ptPayComToUnder: number
  ptPayOutToUnder: number
  ptPayTotalToUnder: number
  ptPercent: number
}

export interface Stake {
  $numberDecimal: string
}

export interface WinLoseGroupByDateData {
  _id: string
  comm: number
  stake: Stake
  stakeCount: number
  winLose: Stake
}

export interface WinLoseListByDateData {
  docs: Doc[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number
  page: number
  pagingCounter: number
  prevPage: null
  totalDocs: number
  totalPages: number
}

// ---------- REQUEST ----------
export interface RequestRunningList {
  type: string[]
  criteriaDate: string
  limit: number
  page: number
}

export interface RequestWinLoseFindByPreCalId {
  id: string
}

export interface RequestWinLoseGroupByDate {
  type: string[]
  startDate: string
  endDate: string
}

export interface RequestWinLoseListByDate {
  type: string[]
  startDate: string
  endDate: string
  limit: number
  page: number
}
