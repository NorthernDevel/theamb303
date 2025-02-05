import { useHttpClient } from '~/composables/useHttpClient'
import { PrefixPermission } from '~/models/prefix.model'

export const getPrefixPermission = async (): Promise<PrefixPermission> => {
  const { data: response } = await useHttpClient().get<PrefixPermission>(
    `/prefix/permission`
  )
  return response
}

export const getResources = async (): Promise<PrefixPermission> => {
  const { data: response } = await useHttpClient().get<PrefixPermission>(
    `/resources`
  )
  return response
}
