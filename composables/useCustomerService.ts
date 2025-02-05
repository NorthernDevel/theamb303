import * as services from '~/server/services/customer'
import type { RequestBonus, RequestBonusDetail } from '~/models/bonus.model'
import type { RequestCashbackType } from '~/models/cashback.model'
import type { RequestCommissionTurnOverDetail } from '~/models/commission.model'
import type { RequestUpdatePeer2PayUID } from '~/models/peer-to-pay.model'

export const useBonus = async (body: RequestBonus) => {
    const { code, message, data } = await services.getBonus(body)
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useBonusDetail = async (body: RequestBonusDetail) => {
    const { code, message, data } = await services.getBonusDetail(body)
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useCashback = async () => {
    const { code, message, data } = await services.getCashback()
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useCashbackTurnOverDetail = async (body: RequestCashbackType) => {
    const { code, message, data } = await services.getCashbackTurnOverDetail(body)
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useCommission = async () => {
    const { code, message, data } = await services.getCommission()
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useCommissionTurnOverDetail = async (body: RequestCommissionTurnOverDetail) => {
    const { code, message, data } = await services.getCommissionTurnOverDetail(body)
    if (!code || code != '0') return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useUpdatePeer2PayUID = async (body: RequestUpdatePeer2PayUID) => {
    const { code, message } = await services.getUpdatePeer2PayUID(body)
    if (!code || code != '0') return { status: false, message }
    return { status: true, message }
}