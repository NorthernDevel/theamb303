export interface AffiliateChildById {
  code: string
  message: string
  total?: number
  data?: AffiliateChildByIdData[]
}

export interface AffiliateChildByIdData {
  username: string
  createdDate: Date
}

export interface LinkAffiliate {
  code: string
  message: string
  data: LinkAffiliateData
}

export interface LinkAffiliateData {
  link: string
}

export interface PreviewTakeAffiliateCredit {
  code: string
  message: string
  data: PreviewTakeAffiliateCreditData
}

export interface PreviewTakeAffiliateCreditData {
  credit?: number
  turnOver: TurnOverPreviewTakeAffiliateCredit
  limitWithdraw?: number
  isBonus?: boolean
  receivedAffiliateDate?: Date
  minWithdraw?: number
  isDisableBtn?: true
}

export interface RecordReportTarnsection {
  child: string
  parent: string
  value: number
  createdDate: Date
  type: string
}

export interface ReportTarnsection {
  code: string
  message: string
  data: ReportTarnsectionData
}

export interface ReportTarnsectionData {
  total: number
  records: RecordReportTarnsection[]
}

export interface RequestAffiliateChildById {
  username: string
  page: number
  size: number
}

export interface RequestLinkAffiliate {
  url: string
}

export interface RequestReportTarnsection {
  startDate: string
  endDate: string
  page: number
  size: number
}

export interface TurnOverPreviewTakeAffiliateCredit {
  turnOverSlot: number
  turnOverHDP: number
  turnOverMixParlay: number
  turnOverMixStep: number
  turnOverCasino: number
  turnOverLottery: number
  turnOverKeno: number
  turnOverMultiPlayer: number
  turnOverPoker: number
  turnOverTrading: number
  turnOverM2: number
  turnOverEsport: number
  turnTypeSlot: string
  turnTypeHDP: string
  turnTypeMixParlay: string
  turnTypeMixStep: string
  turnTypeCasino: string
  turnTypeLottery: string
  turnTypeKeno: string
  turnTypeMultiPlayer: string
  turnTypePoker: string
  turnTypeTrading: string
  turnTypeM2: string
  turnTypeEsport: string
  turnOverCock: number
  turnTypeCock: string
  turnOverSbo: number
  turnTypeSbo: string
  turnOverSaba: number
  turnTypeSaba: string
  turnTypeDbs: string
  turnOverDbs: number
  turnTypeFbs: string
  turnOverFbs: number
  turnTypePlb: string
  turnOverPlb: number
  turnTypeUmb: string
  turnOverUmb: number
  turnTypeVsb: string
  turnOverVsb: number
  turnTypeAfb: string
  turnOverAfb: number
  turnTypeLali: string
  turnOverLali: number
}

export interface RequestFortuneAffiliateTicket {
  customerId: string
  reference: string
  remark: string
}
