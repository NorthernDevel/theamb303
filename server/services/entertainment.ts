import { useHttpClient } from '~/composables/useHttpClient'
import {
  CategoryByType,
  ItemDetail,
  SearchItem,
} from '~/models/entertainment.model'
import {
  RequestCategoryAndItem,
  RequestCategoryByType,
  RequestItemDetail,
  RequestItemListByCategory,
  RequestSearchItem,
} from '~/models/entertainment.model'

export const getCategoryAndItemList = async (
  body: RequestCategoryAndItem
): Promise<ItemDetail> => {
  const { data: response } = await useHttpClient().post<ItemDetail>(
    `/entertainment/get-category-and-item-list`,
    body
  )
  return response
}

export const getCategoryByType = async (
  body: RequestCategoryByType
): Promise<CategoryByType> => {
  const { data: response } = await useHttpClient().post<CategoryByType>(
    `/entertainment/get-category-by-type`,
    body
  )
  return response
}

export const getItemDetail = async (
  body: RequestItemDetail
): Promise<ItemDetail> => {
  const { data: response } = await useHttpClient().post<ItemDetail>(
    `/entertainment/get-item-detail`,
    body
  )
  return response
}

export const getItemListByCategory = async (
  body: RequestItemListByCategory
): Promise<ItemDetail> => {
  const { data: response } = await useHttpClient().post<ItemDetail>(
    `/entertainment/get-item-list-by-category`,
    body
  )
  return response
}

export const searchItem = async (
  body: RequestSearchItem
): Promise<SearchItem> => {
  const { data: response } = await useHttpClient().post<SearchItem>(
    `/entertainment/search-item`,
    body
  )
  return response
}
