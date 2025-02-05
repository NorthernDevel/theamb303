import * as services from '~/server/services/prefix'

export const usePrefixPermission = async () => {
  const { code, message, data } = await services.getPrefixPermission()
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useResurces = async () => {
  const { code, message, data, resources } = await services.getResources()
  if (!code || code != '0')
    return { status: false, data: undefined, message, resources: undefined }
  return { status: true, data, resources, message }
}
