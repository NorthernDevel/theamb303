import { useHttpClient } from '~/composables/useHttpClient'
import {
  DefaultResponse,
  RequestConfigAutoPromotion,
  RequestUser,
} from '~/models/default.model'
import {
  AutoPromotionProfile,
  PromotionListByType,
} from '~/models/promotion.model'

export const getListPromotionByType =
  async (): Promise<PromotionListByType> => {
    const { data: response } = await useHttpClient().get<PromotionListByType>(
      `/promotion/getListPromotionByType`
    )
    return response
  }

export const getAutoPromotionCustomers = async (
  body: RequestUser
): Promise<AutoPromotionProfile> => {
  const { data: response } = await useHttpClient().post<AutoPromotionProfile>(
    `/promotion/getAutoPromotionCustomers`,
    body
  )
  return response
}

export const createAutoPromotionCustomers = async (
  body: RequestConfigAutoPromotion
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/promotion/createAutoPromotionCustomers`,
    body
  )
  return response
}

export const updateAutoPromotionCustomers = async (
  body: RequestConfigAutoPromotion
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/promotion/updateAutoPromotionCustomers`,
    body
  )
  return response
}
