import { useHttpClient } from '~/composables/useHttpClient'
import {
  DefaultResponse,
  RequestGameListByCode,
  RequestGameListByType,
} from '~/models/default.model'
import { GameLogin, GamesProviderList, GameSport } from '~/models/games.model'
import { RequestGameSport } from '~/models/default.model'

export const getGamesProviderList = async (): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().get<GamesProviderList>(
    `/games/provider-list`
  )
  return response
}

export const getGamesRecommened = async (): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().get<GamesProviderList>(
    `/games/recommended`
  )
  return response
}

export const getGamesListByType = async (
  body: RequestGameListByType
): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().post<GamesProviderList>(
    `/games/list-by-type`,
    body
  )
  return response
}

export const getGamesListByCode = async (
  body: RequestGameListByCode
): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().post<GamesProviderList>(
    `/games/list-by-code`,
    body
  )
  return response
}

export const getGamesAllSports = async (): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().get<GamesProviderList>(
    `/games/all-sports`
  )
  return response
}

export const playGame = async (
  body: RequestGameListByCode
): Promise<GameLogin> => {
  const { data: response } = await useHttpClient().post<GameLogin>(
    `/games/login`,
    body
  )
  return response
}

export const getGamesSport = async (): Promise<GameSport> => {
  const { data: response } = await useHttpClient().get<GameSport>(
    `/games/sport`
  )
  return response
}

export const getGamesSportPost = async (
  body: RequestGameSport
): Promise<GameSport> => {
  const { data: response } = await useHttpClient().post<GameSport>(
    `/games/sportPost`,
    body
  )
  return response
}

export const getGamesRecently = async (): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().get<GamesProviderList>(
    `/games/recently`
  )
  return response
}

export const getGamesFavorites = async (): Promise<GamesProviderList> => {
  const { data: response } = await useHttpClient().get<GamesProviderList>(
    `/games/fav`
  )
  return response
}

export const addFavorite = async (id: string): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/games/fav/add/${id}`,
    {}
  )
  return response
}

export const deleteFavorite = async (id: string): Promise<DefaultResponse> => {
  const { data: response } = await useHttpClient().post<DefaultResponse>(
    `/games/fav/del/${id}`,
    {}
  )
  return response
}