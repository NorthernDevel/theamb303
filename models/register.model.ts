export interface Register {
  code: string
  message: string
  data: RegisterData
}

interface RegisterData {
  username: string
  password: string
}

export interface RequestRegister {
  firstName?: string | undefined
  lastName?: string | undefined
  username: string | undefined
  password: string | undefined
  tel: string | undefined
  verifyType: number | undefined
  verifyRef1: string | undefined
  verifyRef2: string | undefined
  refId?: string | undefined
  recommend: string | undefined
  recommendOther?: string | undefined
  isTelegram?: boolean | undefined
  middleName?: string | undefined
  marketingId?: string | undefined
}

export interface RegisterMigration {
  code: string
  message: string
  data: RegisterData
}

export interface RequestRegisterMigration {
  firstName?: string | undefined
  lastName?: string | undefined
  username: string | undefined
  password: string | undefined
  tel: string | undefined
  bankName?: string | undefined
  bankAccount?: string | undefined
  affiliateRef?: string | undefined
}
