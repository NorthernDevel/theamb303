import * as services from "~/server/services/miniGame"
import type { RequestFortuneAffiliateTicket } from "~/models/affiliate.model"
import type { RequestV2, RequestFortuneDailyTicket, RequestGameList, RequestFortune, RequestFortuneHonorBoard } from "~/models/mini-game.model";

export const useFortuneAffiliateTicket = async (body: RequestFortuneAffiliateTicket) => {
    const { code, message } = await services.receiveFortuneAffiliateTicket(body)
    if (!code || code != "0") return { status: false, message }
    return { status: true, message }
}

export const useV2 = async (body: RequestV2) => {
    const { code, message, data } = await services.spinV2(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useFortuneDailyTicket = async (body: RequestFortuneDailyTicket) => {
    const { code, message, data } = await services.receiveFortuneDailyTicket(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useMiniGameList = async () => {
    const { code, message, data } = await services.getGameList()
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useStatusReceiveFortuneTicket = async () => {
    const { code, message, data } = await services.getStatusReceiveFortuneTicket()
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useFortune = async (body: RequestFortune) => {
    const { code, message, data } = await services.getFortune(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useFortunePost = async (body: RequestFortune) => {
    const { code, message, data } = await services.getFortunePost(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useFortuneHonorBoard = async (body: RequestFortuneHonorBoard) => {
    const { code, message, data } = await services.getFortuneHonorBoard(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}

export const useFortuneHonorBoardPost = async (body: RequestFortuneHonorBoard) => {    
    const { code, message, data } = await services.getFortuneHonorBoardPost(body)
    if (!code || code != "0") return { status: false, data: undefined, message }
    return { status: true, data: data, message }
}
