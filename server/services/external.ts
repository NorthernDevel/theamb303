import { useHttpClient } from '~/composables/useHttpClient'
import { Auth, RequestAuth } from '~/models/auth.model'
import { Captcha } from '~/models/captcha.model'
import { BankList } from '~/models/bank-list.model'
import {
  DefaultResponse,
  RequestChangePassword,
  RequestPhone,
  RequestUpdateBank,
  RequestUser,
  RequestForgotPass,
} from '~/models/default.model'
import { Otp, RequestOtp } from '~/models/otp.model'
import { Peer2PayInfo } from '~/models/peer-to-pay.model'
import { Prefix } from '~/models/prefix.model'
import { Profile } from '~/models/profile.model'
import { RecommendList } from '~/models/recommend.model'
import {
  Register,
  RequestRegister,
  RegisterMigration,
  RequestRegisterMigration,
} from '~/models/register.model'

// NOTE: -------------- AUTH --------------
export const authenticateUser = async (body: RequestAuth): Promise<Auth> => {
  const { data: response } = await useHttpClient().post<Auth>(`/signin`, body)
  return response
}

export const signOut = async (): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/signout`,
    {}
  )
  return response
}

export const getUserProfile = async (): Promise<Profile> => {
  const { data: response } = await useHttpClient().post<Profile>(`/profile`, {})
  return response
}

export const register = async (body: RequestRegister): Promise<Register> => {
  const { data: response } = await useHttpClient().post<Register>(
    `/register`,
    body
  )
  return response
}

export const registerMigration = async (
  body: RequestRegisterMigration
): Promise<RegisterMigration> => {
  const { data: response } = await useHttpClient().post<RegisterMigration>(
    `/register-migration`,
    body
  )
  return response
}

export const getCaptcha = async (): Promise<Captcha> => {
  const { data: response } = await useHttpClient().post<Captcha>(`/captcha`, {})
  return response
}

export const recommendList = async (): Promise<RecommendList> => {
  const { data: response } = await useHttpClient().post<RecommendList>(
    `/recommend-list`,
    {}
  )
  return response
}

export const checkUser = async (
  body: RequestUser
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/check-use`,
    body
  )
  return response
}

export const checkPhone = async (
  body: RequestPhone
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/check-phone`,
    body
  )
  return response
}

export const changePassword = async (
  body: RequestChangePassword
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/update-pass`,
    body
  )
  return response
}

export const getForgotPassword = async (
  body: RequestForgotPass
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/forgot-pass`,
    body
  )
  return response
}

// NOTE: -------------- OTP --------------
export const requestOTP = async (body: RequestPhone): Promise<Otp> => {
  const { data: response } = await useHttpClient().post<Otp>(
    `/request-otp`,
    body
  )
  return response
}

export const checkOTP = async (body: RequestOtp): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/check-otp`,
    body
  )
  return response
}

// NOTE: -------------- DEPOSIT --------------
export const getBankList = async (): Promise<BankList> => {
  const { data: response } = await useHttpClient().post<BankList>(
    `/bank-list`,
    {}
  )
  return response
}

export const updateBank = async (
  body: RequestUpdateBank
): Promise<BankList> => {
  const { data: response } = await useHttpClient().post<BankList>(
    `/update-bank`,
    body
  )
  return response
}

export const getPrefix = async (): Promise<Prefix> => {
  const { data: response } = await useHttpClient().post<Prefix>(`/prefix`, {})
  return response
}

export const getPeer2PayInfo = async (): Promise<Peer2PayInfo> => {
  const { data: response } = await useHttpClient().get<Peer2PayInfo>(
    `/getPeer2PayInfo`,
    {}
  )
  return response
}
