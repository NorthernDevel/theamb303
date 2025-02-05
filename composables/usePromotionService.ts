import type {
  RequestConfigAutoPromotion,
  RequestUser,
} from '~/models/default.model'
import * as services from '~/server/services/promotion'

export const useListPromotionByType = async () => {
  const { code, message, data } = await services.getListPromotionByType()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useAutoPromotionCustomers = async (body: RequestUser) => {
  const { code, message, data } = await services.getAutoPromotionCustomers(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useConfigAutoPromotionCustomers = async (
  isCreate: Ref<boolean>,
  body: RequestConfigAutoPromotion
) => {
  const serviceConfigAutoPromotion = isCreate.value
    ? services.createAutoPromotionCustomers(body)
    : services.updateAutoPromotionCustomers(body)
  const { code, message } = await serviceConfigAutoPromotion
  if (!code || code != '0') return { status: false, message }
  return { status: true, message }
}
