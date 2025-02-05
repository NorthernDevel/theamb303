import * as services from '~/server/services/transfer'
import type { RequestAutoWithdraw, RequestSumTurn } from "~/models/transfer.model"

export const useTransferWallet = async () => {
  const { code, message, data } = await services.transferWallet()
  if (!code || code != '0') return { status: false, message, data: undefined }
  return { status: true, message, data: data }
}

export const useAutoWithdraw = async (body: RequestAutoWithdraw) => {
    const { code, message } = await services.transferAutoWithdraw(body)
    if (!code || code != '0') return { status: false, message }
    return { status: true, message }
}

export const useSumTurn = async (body: RequestSumTurn) => {
    const { code, message } = await services.transferSumTurn(body)
    if (!code || code != '0') return { status: false, message }
    return { status: true, message }
}