export interface History {
  code: string
  message: string
  data: HistoryData
}

export interface HistoryData {
  records: Record[]
  totalRecord: number
}

export interface Record {
  id: string
  amount: string
  channel: string
  date: string
  status: string
  type: string
  isReceive: boolean
  isRejectTrans?: boolean
}

export interface RequestHistory {
  transactionType: string // "DEPOSIT" & "WITHDRAW"
  page: number
  limit: number
}
