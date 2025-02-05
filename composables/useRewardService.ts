import * as services from '~/server/services/reward'
import type { RequestExchangeReward, RequestReportExchangeReward, RequestRewardListPlayer } from '~/models/reward.model'

export const useExchangeReward = async (body: RequestExchangeReward) => {
    const { code, message } = await services.exchangeReward(body)
    if (!code || code != '0') return { status: false, message }
    return { status: true, message }
}

export const useReportExchangeReward = async (body: RequestReportExchangeReward) => {
  const { code, data, message } = await services.reportExchangeReward(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useRewardListPlayer = async (body: RequestRewardListPlayer) => {
  const { code, data, message } = await services.getRewardListPlayer(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}