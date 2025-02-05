import * as services from '~/server/services/report'
import type { RequestRunningList, RequestWinLoseGroupByDate, RequestWinLoseListByDate, RequestWinLoseFindByPreCalId } from '~/models/report.model'

export const useRunningList = async (body: RequestRunningList) => {
  const { code, data, footer, message } = await services.getRunningList(body)
  if (!code || code != '0') return { status: false, data: undefined, footer: undefined, message }
  return { status: true, data: data, footer: footer, message }
}

export const useWinLoseFindByPreCalId = async (body: RequestWinLoseFindByPreCalId) => {
  const { code, data, message } = await services.getWinLoseFindByPreCalId(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useWinLoseGroupByDate = async (body: RequestWinLoseGroupByDate) => {
  const { code, data, message } = await services.getWinLoseGroupByDate(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data: data, message }
}

export const useWinLoseListByDate = async (body: RequestWinLoseListByDate) => {
  const { code, data, footer, message } = await services.getWinLoseListByDate(body)
  if (!code || code != '0') return { status: false, data: undefined, footer: undefined, message }
  return { status: true, data: data, footer: footer, message }
}