import { defineStore } from 'pinia'
import type {
  DepositSpecialTransRecord,
  RequestDepositSpecialTransactions,
} from '~/models/transactions.model'

export const useTransactionStore = defineStore('transactionStore', () => {
  const popupStore = usePopupStore()

  const isLoading = ref(false)
  const records = ref<DepositSpecialTransRecord[]>([])

  const getDepositSpecialTransactions = async (
    body: RequestDepositSpecialTransactions
  ) => {
    try {
      isLoading.value = true
      records.value = []
      const { status, data, message } = await useDepositSpecialTransactions(
        body
      )
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data && data.records) {
          records.value = data.records
        } else {
          records.value = []
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, records, getDepositSpecialTransactions }
})
