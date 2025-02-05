import * as services from "~/server/services/vip";
import type { RequestVipReceive } from "~/models/vip.model";

export const useVipGet = async () => {
  const { code, message, data } = await services.getVip();
  if (!code || code != "0") return { status: false, message, data: undefined };
  return { status: true, message, data: data };
};

export const useVipReceive = async (body: RequestVipReceive) => {
  const { code, message } = await services.receiveVip(body);
  if (!code || code != "0") return { status: false, message };
  return { status: true, message };
};

export const useVipExtGet = async () => {
  const { code, message, data } = await services.getVipExtGet();
  if (!code || code != "0") return { status: false, message, data: undefined };
  return { status: true, message, data: data };
};

export const useCheckVip = async () => {
  const { code, message, data } = await services.checkVip();
  if (!code || code != "0") return { status: false, message, data: undefined };
  return { status: true, message, data: data };
};
