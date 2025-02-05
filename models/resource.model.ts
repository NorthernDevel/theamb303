export interface ResoucesData {
  _id: string
  info: InfoSetting
  contacts: ContactData[]
  registerType: string
  tags: string[]
  theme: string
  announcement: Announcement
  banners: imageLuancherData[]
  promotions: imageLuancherData[]
  imageUrl: ImageURL
  url: string
  createAt: Date
  updatedAt: Date
}

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
