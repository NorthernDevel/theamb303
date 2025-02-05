import { useHttpClient } from '~/composables/useHttpClient'
import {
  RunningList,
  WinLoseGroupByDate,
  WinLoseListByDate,
  WinLoseFindByPreCalId,
} from '~/models/report.model'
import {
  RequestRunningList,
  RequestWinLoseGroupByDate,
  RequestWinLoseListByDate,
  RequestWinLoseFindByPreCalId,
} from '~/models/report.model'

export const getRunningList = async (
  body: RequestRunningList
): Promise<RunningList> => {
  const { data: response } = await useHttpClient().post<RunningList>(
    `/runningList`,
    body
  )
  return response
}

export const getWinLoseFindByPreCalId = async (
  body: RequestWinLoseFindByPreCalId
): Promise<WinLoseFindByPreCalId> => {
  const { data: response } = await useHttpClient().post<WinLoseFindByPreCalId>(
    `/winLoseFindByPreCalId`,
    body
  )
  return response
}

export const getWinLoseGroupByDate = async (
  body: RequestWinLoseGroupByDate
): Promise<WinLoseGroupByDate> => {
  const { data: response } = await useHttpClient().post<WinLoseGroupByDate>(
    `/winLoseGroupByDate`,
    body
  )
  return response
}

export const getWinLoseListByDate = async (
  body: RequestWinLoseListByDate
): Promise<WinLoseListByDate> => {
  const { data: response } = await useHttpClient().post<WinLoseListByDate>(
    `/winLoseListByDate`,
    body
  )
  return response
}
