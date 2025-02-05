import * as services from '~/server/services/external'
import type { RequestAuth } from '~/models/auth.model'
import type {
  RequestChangePassword,
  RequestPhone,
  RequestUpdateBank,
  RequestUser,
  RequestForgotPass,
} from '~/models/default.model'
import type { RequestOtp } from '~/models/otp.model'
import type {
  RequestRegister,
  RequestRegisterMigration,
} from '~/models/register.model'

export const useSignIn = async (body: RequestAuth) => {
  const { code, message, data } = await services.authenticateUser(body)
  if (!code || code != '0') return { status: false, token: undefined, message }
  const { token } = data
  return { status: true, token }
}

export const useSignOut = async () => {
  const { code, message } = await services.signOut()
  if (!code || code != '0') return { status: false, data: undefined, message }

  return { status: true, message }
}

export const useRecommendList = async () => {
  const { code, message, data } = await services.recommendList()
  if (!code || code != '0') return { status: false, data: undefined, message }
  const names = data.recommend.map((item) => item.name)

  return { status: true, data: data.recommend, names }
}

export const useCaptcha = async () => {
  const { code, message } = await services.getCaptcha()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, message }
}

export const useUserValidate = async (body: RequestUser) => {
  const { code, message } = await services.checkUser(body)
  const validated = code == '0'

  return { validated, message }
}

export const usePhoneValidate = async (body: RequestPhone) => {
  const { code, message } = await services.checkPhone(body)
  const validated = code == '0'

  return { validated, message }
}

export const useRequestOtp = async (body: RequestPhone) => {
  const { code, message, data } = await services.requestOTP(body)
  if (!code || code != '0') return { status: false, data: undefined, message }

  return { status: true, data: data }
}

export const useVerifyOtp = async (body: RequestOtp) => {
  const { code, message } = await services.checkOTP(body)
  const validated = code == '0'

  return { validated, message }
}

export const useRegister = async (body: RequestRegister) => {
  const { code, message, data } = await services.register(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data }
}

export const useRegisterMigration = async (body: RequestRegisterMigration) => {
  const { code, message, data } = await services.registerMigration(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data }
}

export const useProfile = async () => {
  const { code, message, data } = await services.getUserProfile()
  if (!code || code != '0')
    return { status: false, code, data: undefined, message }
  return { status: true, code, data: data }
}

export const useChangePassword = async (body: RequestChangePassword) => {
  const { code, message } = await services.changePassword(body)
  if (!code || code != '0') return { status: false, code, message }
  return { status: true, code, message }
}

export const useForgotPassword = async (body: RequestForgotPass) => {
  const { code, message } = await services.getForgotPassword(body)
  if (!code || code != '0') return { status: false, code, message }
  return { status: true, code, message }
}

// NOTE: -------------- DEPOSIT --------------
export const useBankList = async () => {
  const { code, message, data } = await services.getBankList()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useUpdateBank = async (body: RequestUpdateBank) => {
  const { code, message, data } = await services.updateBank(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const usePrefix = async () => {
  const { code, message, data } = await services.getPrefix()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const usePeer2PayInfo = async () => {
  const { code, message, data } = await services.getPeer2PayInfo()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}
