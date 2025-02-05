import { useHttpClient } from '~/composables/useHttpClient'
import { DefaultResponse } from '~/models/default.model'
import { ReportExchangeReward, RewardListPlayer } from '~/models/reward.model'
import {
  RequestExchangeReward,
  RequestRewardListPlayer,
  RequestReportExchangeReward,
} from '~/models/reward.model'

export const exchangeReward = async (
  body: RequestExchangeReward
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/reward/exchangeReward`,
    body
  )
  return response
}

export const getRewardListPlayer = async (
  body: RequestRewardListPlayer
): Promise<RewardListPlayer> => {
  const { data: response } = await useHttpClient().post<RewardListPlayer>(
    `/reward/getRewardListPlayer`,
    body
  )
  return response
}

export const reportExchangeReward = async (
  body: RequestReportExchangeReward
): Promise<ReportExchangeReward> => {
  const { data: response } = await useHttpClient().post<ReportExchangeReward>(
    `/reward/reportExchangeReward`,
    body
  )
  return response
}
