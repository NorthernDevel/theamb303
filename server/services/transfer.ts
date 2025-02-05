import { useHttpClient } from '~/composables/useHttpClient'
import { DefaultResponse } from '~/models/default.model'
import {
  RequestAutoWithdraw,
  TransferWallet,
  RequestSumTurn,
} from '~/models/transfer.model'

export const transferWallet = async (): Promise<TransferWallet> => {
  const { data: response } = await useHttpClient().post<TransferWallet>(
    `/transfer-wallet`,
    {}
  )
  return response
}

export const transferAutoWithdraw = async (
  body: RequestAutoWithdraw
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/transfer-auto-withdraw`,
    body
  )
  return response
}

export const transferSumTurn = async (
  body: RequestSumTurn
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/transfer-sum-turn`,
    body
  )
  return response
}
