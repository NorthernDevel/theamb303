import * as services from "~/server/services/affiliate";
import type {
  RequestLinkAffiliate,
  RequestAffiliateChildById,
  RequestReportTarnsection,
} from "~/models/affiliate.model";

export const AffiliateChildById = async (body: RequestAffiliateChildById) => {
  const { code, message, data, total } = await services.getAffiliateChildById(
    body
  );
  if (!code || code != "0") return { status: false, message, data: undefined, total: undefined};
  return { status: true, total, data, message };
};

export const ReportTarnsection = async (body: RequestReportTarnsection) => {
  const { code, message, data } = await services.getReportTarnsection(body);
  if (!code || code != "0") return { status: false, data: undefined, message };
  return { status: true, data: data, message };
};

export const useLinkAffiliate = async (body: RequestLinkAffiliate) => {
  const { code, message, data } = await services.getLinkAffiliate(body);
  if (!code || code != "0") return { status: false, data: undefined, message };
  return { status: true, data: data, message };
};

export const usePreviewTakeAffiliateCredit = async () => {
  const { code, message, data } =
    await services.getPreviewTakeAffiliateCredit();
  if (!code || code != "0") return { status: false, data: undefined, message };
  return { status: true, data: data, message };
};