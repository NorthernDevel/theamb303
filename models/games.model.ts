export interface GamesProviderList {
  code: string
  message: string
  data: GamesProviderListData
}

interface GamesProviderListData {
  gamesList: GamesList[]
  productName: string
}

export interface GamesList {
  productCode: string
  type?: GameType
  productName: string
  active: boolean
  logo: Logo
  games?: GameData[]
  gameName?: string
  loginCode?: string
  isFavorite?: boolean
  rtp?: number
}

export interface GameData {
  productCode: string
  type?: GameType
  productName: string
  active: boolean
  logo: Logo
  gameName: string
  loginCode: string
  isFavorite: boolean
  rtp?: number
}

export interface Logo {
  default: string
  banner: string
  mobile?: string
  transparent?: string
  askmepage?: string
  vertical?: string
  horizontal?: string
}

type GameType =
  | 'AFB'
  | 'CARD'
  | 'COCK'
  | 'DBS'
  | 'ESPORT'
  | 'FBS'
  | 'FISH'
  | 'KENO'
  | 'LALI'
  | 'LIVE'
  | 'LOTTERY'
  | 'PLB'
  | 'POKER'
  | 'SABA'
  | 'SBO'
  | 'SLOT'
  | 'TRADING'
  | 'UMB'
  | 'VSB'

export interface GameLogin {
  code: string
  message: string
  url: string
}

export interface GamesProvider {
  id: string
  label: string
  avatar: {
    src: string | undefined
  }
}

export interface GameSport {
  code: string
  message: string
  urlWebProduct: string
  urlMobileProduct: string
}