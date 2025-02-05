import { useHttpClient } from '~/composables/useHttpClient'
import { DefaultResponse } from '~/models/default.model'
import { Vip, RequestVipReceive, VipExtGet, CheckVip } from '~/models/vip.model'

export const getVip = async (): Promise<Vip> => {
  const { data: response } = await useHttpClient().get<Vip>(`/vip/get`)
  return response
}

export const receiveVip = async (
  body: RequestVipReceive
): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/vip/receive`,
    body
  )
  return response
}

export const getVipExtGet = async (): Promise<VipExtGet> => {
  const { data: response } = await useHttpClient().get<VipExtGet>(
    `/vip/get/ext`
  )
  return response
}

export const checkVip = async (): Promise<CheckVip> => {
  const { data: response } = await useHttpClient().get<CheckVip>(
    `/vip/check-vip`
  )
  return response
}
