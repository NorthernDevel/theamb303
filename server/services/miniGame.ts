import { useHttpClient } from '~/composables/useHttpClient'
import { RequestFortuneAffiliateTicket } from '~/models/affiliate.model'
import { DefaultResponse } from '~/models/default.model'
import {
  V2,
  GameList,
  StatusReceiveFortuneTicket,
  Fortune,
  FortuneHonorBoard,
} from '~/models/mini-game.model'
import {
  RequestV2,
  RequestFortuneDailyTicket,
  RequestGameList,
  RequestFortune,
  RequestFortuneHonorBoard,
} from '~/models/mini-game.model'

export const receiveFortuneAffiliateTicket = async (
  body: RequestFortuneAffiliateTicket
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/minigame/receiveFortuneAffiliateTicket`,
    body
  )
  return response
}

export const spinV2 = async (body: RequestV2): Promise<V2> => {
  const { data: response } = await useHttpClient().post<V2>(
    `/minigame/spinV2`,
    body
  )
  return response
}

export const receiveFortuneDailyTicket = async (
  body: RequestFortuneDailyTicket
): Promise<V2> => {
  const { data: response } = await useHttpClient().post<V2>(
    `/minigame/receiveFortuneDailyTicket`,
    body
  )
  return response
}

export const getGameList = async (): Promise<GameList> => {
  const { data: response } = await useHttpClient().get<GameList>(
    `/minigame/getGameList`
  )
  return response
}

export const getStatusReceiveFortuneTicket =
  async (): Promise<StatusReceiveFortuneTicket> => {
    const { data: response } =
      await useHttpClient().get<StatusReceiveFortuneTicket>(
        `/minigame/getStatusReceiveFortuneTicket`,
        {}
      )
    return response
  }

export const getFortune = async (body: RequestFortune): Promise<Fortune> => {
  const { data: response } = await useHttpClient().get<Fortune>(
    `/minigame/getFortune`
  )
  return response
}

export const getFortunePost = async (
  body: RequestFortune
): Promise<Fortune> => {
  const { data: response } = await useHttpClient().post<Fortune>(
    `/minigame/getFortunePost`,
    body
  )
  return response
}

export const getFortuneHonorBoard = async (
  body: RequestFortuneHonorBoard
): Promise<FortuneHonorBoard> => {
  const { data: response } = await useHttpClient().get<FortuneHonorBoard>(
    `/minigame/getFortuneHonorBoard`
  )
  return response
}

export const getFortuneHonorBoardPost = async (
  body: RequestFortuneHonorBoard
): Promise<FortuneHonorBoard> => {
  const { data: response } = await useHttpClient().post<FortuneHonorBoard>(
    `/minigame/getFortuneHonorBoardPost`,
    body
  )
  return response
}
