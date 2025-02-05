export interface RequestUpdatePeer2PayUID {
  isAutoPromotion: boolean
  peer2PayUID: string
}

export interface UpdatePeer2PayUID {
  code: string
  message: string
}

export interface Peer2PayInfo {
  code: string
  message: string
  data: Peer2PayInfoData
}

export interface Peer2PayInfoData {
  minimumDeposit: number
  maximumDeposit: number
}
