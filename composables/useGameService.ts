import * as services from '~/server/services/game'
import type {
  GameType,
  RequestGameListByCode,
  RequestGameListByType,
  RequestGameLogin,
  RequestGameSport,
} from '~/models/default.model'

export const useGamesProviderList = async () => {
  const { code, message, data } = await services.getGamesProviderList()
  if (!code || code != '0') return { status: false, data: undefined, gamesList:[], message }

  return { status: true, data, gamesList: data.gamesList }
}

export const useGamesRecommened = async () => {
  const { code, message, data } = await services.getGamesRecommened()
  if (!code || code != '0') return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const useGamesListByType = async (gameType: GameType) => {
  const body: RequestGameListByType = { gameType, showGames: true }
  const { code, message, data } = await services.getGamesListByType(body)
  if (!code || code != '0') return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const useGamesListByCode = async (body: RequestGameListByCode) => {
  const { code, message, data } = await services.getGamesListByCode(body)
  if (!code || code != '0') return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const useGamesAllSports = async () => {
  const { code, message, data } = await services.getGamesAllSports()
  if (!code || code != '0') return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const usePlayGame = async (body: RequestGameLogin) => {
  const { code, url, message } = await services.playGame(body)
  if (!code || code != '0') return { status: false, url: undefined, message }

  return { status: true, url, message }
}

export const useGameSport = async () => {
  const { code, message, urlWebProduct, urlMobileProduct } =
    await services.getGamesSport()
  if (!code || code != '0') return {
    status: false,
    urlWebProduct: undefined,
    urlMobileProduct: undefined,
    message,
  }

  return { status: true, urlWebProduct, urlMobileProduct, message }
}

export const useGameSportPost = async (body: RequestGameSport) => {
  const { code, message, urlWebProduct, urlMobileProduct } =
    await services.getGamesSportPost(body)
  if (!code || code != '0')
    return {
      status: false,
      urlWebProduct: undefined,
      urlMobileProduct: undefined,
      message,
    }

  return { status: true, urlWebProduct, urlMobileProduct, message }
}

export const useGameRecently = async () => {
  const { code, message, data } = await services.getGamesRecently()
  if (!code || code != '0') return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const useGameFavorites = async () => {
  const { code, message, data } = await services.getGamesFavorites()
  if (!code || code != '0')
    return { status: false, data: undefined, gamesList: [], message }

  return { status: true, data, gamesList: data.gamesList, message }
}

export const useAddGameFavorite = async (id: string) => {
  const { code, message } = await services.addFavorite(id)
  if (!code || code != '0')
    return { status: false, message }

  return { status: true, message }
}

export const useDeleteGameFavorite = async (id: string) => {
  const { code, message } = await services.deleteFavorite(id)
  if (!code || code != '0') return { status: false, message }

  return { status: true, message }
}