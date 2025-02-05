interface NewBankList {
  id: string
  label: string
  avatar: { src: string }
}
// stores/bank.ts
export const useBankStore = defineStore('bankStore', () => {
  const profileStore = useProfileStore()
  const popupStore = usePopupStore()
  const lang = useLanguageStore()

  const isLoading = ref(false)
  const bankList = ref<NewBankList[]>([])

  const isCustomerAccount = computed(() => {
    if (profileStore.userData) {
      const { customerBankAccount, customerBankName } = profileStore.userData
      return !!customerBankAccount && !!customerBankName
    }
    return false
  })

  const userBank = computed(() => {
    if (profileStore.userData && bankList.value) {
      const { customerBankAccount, customerBankName } = profileStore.userData
      const bankFiltered = bankList.value.filter(
        (bank) => bank.id === customerBankName
      )
      return {
        account: customerBankAccount,
        label: bankFiltered[0].label,
        avatar: bankFiltered[0].avatar.src,
      }
    }
    return { account: undefined, label: undefined, avatar: undefined }
  })

  const getBankList = async () => {
    try {
      isLoading.value = true
      const { status, data, message } = await useBankList()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data) {
          bankList.value = data.banks.map((bank) => {
            const { shortName, name } = bank
            const label = lang.currentLang == 'th' ? name.th : name.en
            return {
              id: bank.shortName,
              label,
              avatar: { src: `${data.urlImage}${shortName}.svg` },
            }
          })
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
    bankList,
    isCustomerAccount,
    userBank,
    getBankList,
  }
})
