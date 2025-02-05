export interface RequestGenQRCode {
  amount: number
  bankName: string
  serviceId: number
  redirectUrl: string
  type: string
  pin: string
  serial: string
}

export interface ServiceAskmepay {
  code: string
  message: string
  data: ServiceAskmepayData
}

export interface ServiceAskmepayData {
  record: Record[]
}

interface Record {
  method: string
  services: Service[]
  imgProvider: string
  isDepositChannel: boolean
}

interface Service {
  minimumDeposit: number
  maximumDeposit: number
  minimumWithdraw: number
  maximumWithdraw: number
  merchantFee: number
  merchantFeeType: string
  merchantMinimumFeeType: string
  currency: string
  active: boolean
  network: string
  serviceID: number
  imageURL: string
  type: string
  apiurl: string
  provider: string
  providerAliasName: string
  serviceName: string
}

export interface MinMaxAskmepay {
  code: string
  message: string
  data: MinMaxAskmepayData
}

export interface MinMaxAskmepayData {
  min: string
  max: string
}

export interface RequestMinMaxAskmepay {
  serviceId: number
}

export interface QrcodeAskmepay {
  code: string
  message: string
  data: QrcodeAskmepayData
}

export interface QrcodeAskmepayData {
  qr_link: string
  orderId: string
  amount: number
  img: string
  name: string
  currency: string
  representType: string
  value: string
  timeout: TimeoutData
  open_popup: boolean
}

export interface TimeoutData {
  dateTime: string
  days: string
  time: string
}