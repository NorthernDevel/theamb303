import type { RequestChangePassword } from '~/models/default.model'
import type { User } from '~/models/profile.model'

// stores/profiule.ts
export const useProfileStore = defineStore('profileStore', () => {
  const { useNumberWithComma, useCurrency } = useFormatter()
  const authStore = useAuthStore()
  const popupStore = usePopupStore()

  const userData = ref<User>()
  const isLoading = ref(false)
  const isAutoPromotion = ref(false)

  const userId = computed(() => {
    if (!userData.value) return undefined
    return userData.value.id
  })

  const balance = computed(() => {
    let rawData = 0
    if (userData.value) {
      rawData = userData.value.balance
    }
    const { currency } = useCurrency(rawData)
    return currency
  })

   const diamond = computed(() => {
     let rawData = 0
     if (userData.value) {
       rawData = userData.value.walletDiamond
     }
     const { amount } = useNumberWithComma(rawData)
     return amount
   })

  const currency = computed(() => {
    if (!userData.value) return 'THB'
    return userData.value.currency
  })

 

  const getProfile = async () => {
    try {
      isLoading.value = true
      const { status, data, message } = await useProfile()
      if (!status) {
        authStore.signOut()
        popupStore.alertError({ message })
        // code: "8017"  multiple login
      } else {
        if (data) {
          userData.value = data
          isAutoPromotion.value = userData.value.isAutoPromotion
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  const clear = () => {
    userData.value = undefined
  }

  return {
    userData,
    userId,
    balance,
    diamond,
    isLoading,
    currency,
    isAutoPromotion,
    getProfile,
    clear,
  }
})
