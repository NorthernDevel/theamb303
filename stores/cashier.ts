import type { ServiceAskmepayData } from '~/models/service-ask.model'

// stores/cashier.ts
export const useCashierStore = defineStore('CashierStore', () => {
  const { t } = useI18n()
  const popupStore = usePopupStore()

  const defaultTitle = t('menu_cashier')
  const title = ref(defaultTitle)
  const activeTab = ref<number>(0)
  const tabList = [
    {
      name: 'deposit',
      label: t('deposit'),
      icon: 'i-heroicons-arrow-down-on-square',
    },
    {
      name: 'withdraw',
      label: t('withdraw'),
      icon: 'i-heroicons-arrow-up-on-square',
    },
    {
      name: 'history',
      label: t('history_short'),
      icon: 'i-heroicons-clock',
    },
  ]
  const activeTabHistory = ref<number>(0)
  const tabListHistory = [
    {
      name: 'deposit',
      label: t('history_deposit'),
    },
    {
      name: 'withdraw',
      label: t('history_withdraw'),
    },
  ]
  const isSelectedChannel = ref(false)
  const idSelect = ref()
  const askmepayData = ref<ServiceAskmepayData>()

  const askmepaySerivce = computed(() => {
    if (!askmepayData.value) return undefined
    if (!askmepayData.value.record) return undefined
    if (!askmepayData.value.record.length) return undefined
    if (!askmepayData.value.record[0].services.length) return undefined
    return askmepayData.value.record[0].services[0]
  })

  const askmepayIsDepositChannel = computed(() => {
    if (!askmepayData.value) return false
    if (!askmepayData.value.record) return false
    if (!askmepayData.value.record.length) return false
    return askmepayData.value.record[0].isDepositChannel
  })

  const askmepayMinMaxDeposit = computed(() => {
    if (!askmepayData.value) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record.length) return { minimum: 0, maximum: 0 }
    if (!askmepayData.value.record[0].services.length)
      return { minimum: 0, maximum: 0 }
    const { minimumDeposit, maximumDeposit } =
      askmepayData.value.record[0].services[0]
    return { minimum: minimumDeposit, maximum: maximumDeposit }
  })

  const previousPage = () => {
    title.value = defaultTitle
    isSelectedChannel.value = false
    idSelect.value = undefined
  }

  const goDepositHistory = () => {
    isSelectedChannel.value = false
    idSelect.value = undefined
    activeTab.value = 2
    activeTabHistory.value = 0
  }

  const openWithdrawFromPage = () => {
    popupStore.openModalProfile('cashier')
    activeTab.value = 1
  }

  const clear = () => {
    title.value = defaultTitle
    activeTab.value = 0
    activeTabHistory.value = 0
    isSelectedChannel.value = false
    idSelect.value = undefined
  }

  return {
    title,
    activeTab,
    tabList,
    activeTabHistory,
    tabListHistory,
    isSelectedChannel,
    idSelect,
    askmepayData,
    askmepaySerivce,
    askmepayIsDepositChannel,
    askmepayMinMaxDeposit,
    previousPage,
    goDepositHistory,
    openWithdrawFromPage,
    clear,
  }
})
