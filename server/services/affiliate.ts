import { useHttpClient } from '~/composables/useHttpClient'
import {
  PreviewTakeAffiliateCredit,
  LinkAffiliate,
  RequestLinkAffiliate,
  AffiliateChildById,
  RequestAffiliateChildById,
  ReportTarnsection,
  RequestReportTarnsection,
} from '~/models/affiliate.model'

export const getAffiliateChildById = async (
  body: RequestAffiliateChildById
): Promise<AffiliateChildById> => {
  const { data: response } = await useHttpClient().post<AffiliateChildById>(
    `/affiliate/getAffiliateChildById`,
    body
  )
  return response
}

export const getLinkAffiliate = async (
  body: RequestLinkAffiliate
): Promise<LinkAffiliate> => {
  const { data: response } = await useHttpClient().post<LinkAffiliate>(
    `/affiliate/linkAffiliate`,
    body
  )
  return response
}

export const getPreviewTakeAffiliateCredit =
  async (): Promise<PreviewTakeAffiliateCredit> => {
    const { data: response } =
      await useHttpClient().get<PreviewTakeAffiliateCredit>(
        `/affiliate/previewTakeAffiliateCredit`
      )
    return response
  }

export const getReportTarnsection = async (
  body: RequestReportTarnsection
): Promise<ReportTarnsection> => {
  const { data: response } = await useHttpClient().post<ReportTarnsection>(
    `/affiliate/reportTarnsection`,
    body
  )
  return response
}
