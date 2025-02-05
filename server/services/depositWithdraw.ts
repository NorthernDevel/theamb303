import { useHttpClient } from '~/composables/useHttpClient'
import {
  BankDeposit,
  DecimalDepositInfo,
  DecimalDepositTrans,
  DecimalDepositTransCreate,
  RequestDecimalDepositTransCreate,
} from '~/models/bank-deposit.model'
import { ExchangeRate, RequestExchangeRate } from '~/models/exchange'
import { ConditonWithdraw } from '~/models/condition-withdraw.model'
import {
  RequestBankDeposit,
  RequestSeviceArkmepay,
  RequestWithdraw,
} from '~/models/default.model'
import { History, RequestHistory } from '~/models/history.model'
import {
  ServiceAskmepay,
  MinMaxAskmepay,
  RequestMinMaxAskmepay,
  QrcodeAskmepay,
  RequestGenQRCode,
} from '~/models/service-ask.model'

export const getAllServiceAskmepay = async (
  body: RequestSeviceArkmepay
): Promise<ServiceAskmepay> => {
  const { data: response } = await useHttpClient().post<ServiceAskmepay>(
    `/get-all-service-askmepay`,
    body
  )
  return response
}

export const getMinMaxAskmepay = async (
  body: RequestMinMaxAskmepay
): Promise<MinMaxAskmepay> => {
  const { data: response } = await useHttpClient().post<MinMaxAskmepay>(
    `/get-min-max-askmepay`,
    body
  )
  return response
}

export const generateQrcodeAskmepay = async (
  body: RequestGenQRCode
): Promise<QrcodeAskmepay> => {
  const { data: response } = await useHttpClient().post<QrcodeAskmepay>(
    `/gen-qrcode-askmepay`,
    body
  )
  return response
}

// NOTE: -------------- Deposit --------------
export const getBankDeposit = async (
  body: RequestBankDeposit
): Promise<BankDeposit> => {
  const { data: response } = await useHttpClient().post<BankDeposit>(
    `/get-bank-deposit`,
    body
  )
  return response
}

export const getDecimalDepositInfo = async (): Promise<DecimalDepositInfo> => {
  const { data: response } = await useHttpClient().post<DecimalDepositInfo>(
    `/get-decimal-deposit-info`,
    {}
  )
  return response
}

export const createDecimalDepositTrans = async (
  body: RequestDecimalDepositTransCreate
): Promise<DecimalDepositTransCreate> => {
  const { data: response } =
    await useHttpClient().post<DecimalDepositTransCreate>(
      `/create-decimal-deposit-trans`,
      body
    )
  return response
}

export const getDecimalDepositTrans =
  async (): Promise<DecimalDepositTrans> => {
    const { data: response } = await useHttpClient().post<DecimalDepositTrans>(
      `/get-decimal-deposit-trans`,
      {}
    )
    return response
  }

// NOTE: -------------- WITHDRAW --------------
export const checkConditionWithdraw = async (): Promise<ConditonWithdraw> => {
  const { data: response } = await useHttpClient().post<ConditonWithdraw>(
    `/check-condition-withdraw`,
    {}
  )
  return response
}

export const withdraw = async (
  body: RequestWithdraw
): Promise<ConditonWithdraw> => {
  const { data: response } = await useHttpClient().post<ConditonWithdraw>(
    `/withdraw`,
    body
  )
  return response
}

// NOTE: -------------- EXCHANGE --------------
export const getExchangeRate = async (
  body: RequestExchangeRate
): Promise<ExchangeRate> => {
  const { data: response } = await useHttpClient().post<ExchangeRate>(
    `/get-exchange-rate`,
    body
  )
  return response
}

// NOTE: -------------- HISTORY --------------
export const getHistory = async (body: RequestHistory): Promise<History> => {
  const { data: response } = await useHttpClient().post<History>(
    `/get-player-transaction`,
    body
  )
  return response
}
