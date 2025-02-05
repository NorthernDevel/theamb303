import { useHttpClient } from '~/composables/useHttpClient'
import { RequestReceiveBonus } from '~/models/bonus.model'
import { RequestCashbackType } from '~/models/cashback.model'
import { RequestCommissionTurnOverDetail } from '~/models/commission.model'
import { DefaultResponse, RequestCouponToProduct } from '~/models/default.model'
import { RequestGenerateQr } from '~/models/qr.model'
import { RequestTakePromotion } from '~/models/promotion.model'
import {
  RequestDepositSpecialTransactions,
  DepositSpecialTransactions,
  ConditionAddCreditSpecialType,
  RejectTrans,
  RequestUploadSlip,
  RequestReceiveRejectTrans,
} from '~/models/transactions.model'
import {
  CustomerTurnOverDetail,
  PreviewFortuneTurnOver,
  RequestCustomerTurnOverDetail,
} from '~/models/turn-over.model'

export const addCashbackToProduct = async (
  body: RequestCashbackType
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/addCashbackToProduct`,
    body
  )
  return response
}

export const addCommissionToProduct = async (
  body: RequestCommissionTurnOverDetail
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/addCommissionToProduct`,
    body
  )
  return response
}

export const getDepositSpecialTransactions = async (
  body: RequestDepositSpecialTransactions
): Promise<DepositSpecialTransactions> => {
  const { data: response } =
    await useHttpClient().post<DepositSpecialTransactions>(
      `/mainwallet/getDepositSpecialTransactions`,
      body
    )
  return response
}

export const takePromotion = async (
  body: RequestTakePromotion
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/takePromotion`,
    body
  )
  return response
}

export const addCouponToProduct = async (
  body: RequestCouponToProduct
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/addCouponToProduct`,
    body
  )
  return response
}

export const checkConditionAddCreditSpecialType =
  async (): Promise<ConditionAddCreditSpecialType> => {
    const { data: response } =
      await useHttpClient().get<ConditionAddCreditSpecialType>(
        `/mainwallet/checkConditionAddCreditSpecialType`,
        {}
      )
    return response
  }

export const getDepositAffiliate = async (): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().get<DefaultResponse>(
    `/mainwallet/depositAffiliate`,
    {}
  )
  return response
}

export const addFortuneToProduct = async (): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().get<DefaultResponse>(
    `/mainwallet/addFortuneToProduct`,
    {}
  )
  return response
}

export const getPreviewFortuneTurnOver =
  async (): Promise<PreviewFortuneTurnOver> => {
    const { data: response } =
      await useHttpClient().get<PreviewFortuneTurnOver>(
        `/mainwallet/previewFortuneTurnOver`,
        {}
      )
    return response
  }

export const getCustomerTurnOverDetail = async (
  body: RequestCustomerTurnOverDetail
): Promise<CustomerTurnOverDetail> => {
  const { data: response } = await useHttpClient().post<CustomerTurnOverDetail>(
    `/mainwallet/getCustomerTurnOverDetail`,
    body
  )
  return response
}

export const uploadSlip = async (
  body: RequestUploadSlip
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/uploadSlip`,
    body
  )
  return response
}

export const getRejectTrans = async (): Promise<RejectTrans> => {
  const { data: response } = await useHttpClient().get<RejectTrans>(
    `/mainwallet/getRejectTrans`,
    {}
  )
  return response
}

export const receiveRejectTrans = async (
  body: RequestReceiveRejectTrans
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/receiveRejectTrans`,
    body
  )
  return response
}

export const getGenerateQr = async (
  body: RequestGenerateQr
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/p2pGenerateQr`,
    body
  )
  return response
}

export const receiveBonus = async (
  body: RequestReceiveBonus
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/mainwallet/receiveBonus`,
    body
  )
  return response
}
