import * as services from "~/server/services/entertainment"
import type { RequestCategoryAndItem, RequestCategoryByType, RequestItemDetail, RequestItemListByCategory, RequestSearchItem } from "~/models/entertainment.model"

export const useCategoryAndItem = async (body: RequestCategoryAndItem) => {
  const { code, message, data } = await services.getCategoryAndItemList(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useCategoryByType = async (body: RequestCategoryByType) => {
  const { code, message, data } = await services.getCategoryByType(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useItemDetail = async (body: RequestItemDetail) => {
  const { code, message, data } = await services.getItemDetail(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useItemListByCategory = async (body: RequestItemListByCategory) => {
  const { code, message, data } = await services.getItemListByCategory(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useSearchItem = async (body: RequestSearchItem) => {
  const { code, message, data } = await services.searchItem(body)
  if (!code || code != "0") return { status: false, data: undefined, message }
  return { status: true, data, message }
}