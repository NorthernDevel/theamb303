import type { RequestDecimalDepositTransCreate } from '~/models/bank-deposit.model'
import type { RequestBankDeposit, RequestSeviceArkmepay, RequestWithdraw } from '~/models/default.model'
import type { RequestExchangeRate } from '~/models/exchange'
import type { RequestHistory } from '~/models/history.model'
import * as services from '~/server/services/depositWithdraw'
import type {
  RequestGenQRCode,
  RequestMinMaxAskmepay,
} from '~/models/service-ask.model'

// NOTE: -------------- ASKMEPAY --------------
export const useAllServiceAskmepay = async (body: RequestSeviceArkmepay) => {
  const { code, message, data } = await services.getAllServiceAskmepay(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useMinMaxAskmepay = async (body: RequestMinMaxAskmepay) => {
  const { code, message, data } = await services.getMinMaxAskmepay(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useGenerateQrcodeAskmepay = async (body: RequestGenQRCode) => {
  const { code, message, data } = await services.generateQrcodeAskmepay(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

// NOTE: -------------- DEPOSIT --------------
export const useBankDeposit = async (body: RequestBankDeposit) => {
  const { code, message, data } = await services.getBankDeposit(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useDecimalDepositInfo = async () => {
  const { code, message, data } = await services.getDecimalDepositInfo()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useDecimalDepositTransCreate = async (body: RequestDecimalDepositTransCreate) => {
  const { code, message, data } = await services.createDecimalDepositTrans(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useDecimalDepositTrans = async () => {
  const { code, message, data } = await services.getDecimalDepositTrans()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

// NOTE: -------------- WITHDRAW --------------
export const useConditionWithdraw = async () => {
  const { code, message, data } = await services.checkConditionWithdraw()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useWithdraw = async (body: RequestWithdraw) => {
  const { code, message, data } = await services.withdraw(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

// NOTE: -------------- EXCHANGE --------------
export const useExchangeRate = async (body: RequestExchangeRate) => {
  const { code, message, data } = await services.getExchangeRate(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

// NOTE: -------------- HISTORY --------------
export const useHistory = async (body: RequestHistory) => {
  const { code, message, data } = await services.getHistory(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}