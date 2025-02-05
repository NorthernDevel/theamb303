import { defineStore } from 'pinia'
import type {
  ReportExchangeRewardList,
  RequestReportExchangeReward,
} from '~/models/reward.model'

export const useRewardStore = defineStore('rewardStore', () => {
  const profileStore = useProfileStore()
  const popupStore = usePopupStore()

  const isLoading = ref(false)
  const exchangeRewardList = ref<ReportExchangeRewardList[]>([])
  const exchangeRewardTotal = ref<number>(0)

  const getReportExchangeReward = async (body: RequestReportExchangeReward) => {
    try {
      isLoading.value = true
      const { status, data, message } = await useReportExchangeReward({
        ...body,
        username: profileStore.userData?.username!,
      })
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data && data.list) {
          exchangeRewardList.value = data.list
          exchangeRewardTotal.value = data.total
        } else {
          exchangeRewardList.value = []
          exchangeRewardTotal.value = 0
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    exchangeRewardList,
    exchangeRewardTotal,
    getReportExchangeReward,
  }
})
