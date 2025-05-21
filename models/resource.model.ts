export interface ResoucesData {
  _id: string
  info: InfoSetting
  contacts: ContactData[]
  registerType: RegisterTypes
  tags: string[]
  theme: string
  announcement: Announcement
  banners: imageLuancherData[]
  promotions: imageLuancherData[]
  popups: PopupData[]
  imageUrl: ImageURL
  url: string
  createAt: Date
  updatedAt: Date
}

export type RegisterTypes =
  | 'OTP_PHONE_SHORT'
  | 'OTP_REQUIRE_BANK'
  | 'CAPTCHA_NO_PHONE'
  | 'CAPTCHA_REQUIRE_BANK'
  | 'USER_BY_PHONE'

export interface Announcement {
  display: DisplayData
  isActive: boolean
}

export interface ContactData {
  provider: string
  display: DisplayData
  options: Options
}

export interface Options {
  link: string
  lineId: string
}

export interface InfoSetting {
  language: LanguageSetting
  title: DisplayData
  description: DisplayData
}

export interface LanguageSetting {
  en: boolean
  th: boolean
}

export interface CantactOption {
  link: string
  lineId?: string
}

export interface FooterDescription {
  title: DisplayData
  description: DisplayData
}

export interface DisplayData {
  en: string
  th: string
}

export interface ApkFile {
  active: boolean
  source?: string
}

export interface imageLuancherData {
  image: string
  isActive: boolean
}

export interface ImageURL {
  appIcon: string
  banner: string
  icon: string
  logo: string
  popup: string
  promotion: string
}

export interface PopupData {
  image: string
  route: string
  isInternal: boolean
  isLogin: boolean
  isActive: boolean
  isFlash: boolean
}