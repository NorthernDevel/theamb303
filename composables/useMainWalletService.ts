import * as services from "~/server/services/mainWallet"
import type { RequestReceiveBonus } from "~/models/bonus.model"
import type { RequestCashbackType } from "~/models/cashback.model"
import type { RequestCommissionTurnOverDetail } from "~/models/commission.model"
import type { RequestCouponToProduct } from "~/models/default.model"
import type { RequestTakePromotion } from "~/models/promotion.model"
import type { RequestGenerateQr } from "~/models/qr.model"
import type { RequestDepositSpecialTransactions, RequestUploadSlip, RequestReceiveRejectTrans } from "~/models/transactions.model"
import type { RequestCustomerTurnOverDetail } from "~/models/turn-over.model"

export const useCashbackToProduct = async (body: RequestCashbackType) => {
  const { code, message } = await services.addCashbackToProduct(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useCommissionToProduct = async (body: RequestCommissionTurnOverDetail) => {
  const { code, message } = await services.addCommissionToProduct(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useDepositSpecialTransactions = async (body: RequestDepositSpecialTransactions) => {
  const { code, message, data } = await services.getDepositSpecialTransactions(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useTakePromotion = async (body: RequestTakePromotion) => {
  const { code, message } = await services.takePromotion(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useCouponToProduct = async (body: RequestCouponToProduct) => {
  const { code, message } = await services.addCouponToProduct(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useConditionAddCreditSpecialType = async () => {
  const { code, message, data } = await services.checkConditionAddCreditSpecialType()
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useDepositAffiliate = async () => {
  const { code, message } = await services.getDepositAffiliate()
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useFortuneToProduct = async () => {
  const { code, message } = await services.addFortuneToProduct()
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const usePreviewFortuneTurnOver = async () => {
  const { code, message, data } = await services.getPreviewFortuneTurnOver()
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useCustomerTurnOverDetail = async (body: RequestCustomerTurnOverDetail) => {
  const { code, message, data } = await services.getCustomerTurnOverDetail(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useUploadSlip = async (body: RequestUploadSlip) => {
  const { code, message } = await services.uploadSlip(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useRejectTrans = async () => {
  const { code, message, data } = await services.getRejectTrans()
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useReceiveRejectTrans = async (
  body: RequestReceiveRejectTrans
) => {
  const { code, message } = await services.receiveRejectTrans(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useGenerateQr = async (body: RequestGenerateQr) => {
  const { code, message } = await services.getGenerateQr(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}

export const useReceiveBonus = async (body: RequestReceiveBonus) => {
  const { code, message } = await services.receiveBonus(body)
  if (!code || code != "0") return { status: false, message }
  return { status: true, message }
}