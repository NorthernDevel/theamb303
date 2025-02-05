export interface Captcha {
  code: string
  message: string
  data: CaptchaData
}

export interface CaptchaData {
  recId: string
  image: string
}
