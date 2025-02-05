export interface Otp {
  code: string
  message: string
  data: OtpData
}

interface OtpData {
  expired: string
  ref: string
}

export interface RequestOtp {
  phone: string
  ref: string
  otp: string
}
