import type { ServiceAskmepayData } from '~/models/service-ask.model'

export type ChannelType =
  | 'AUTO'
  | 'AUTO_SLIP'
  | 'AUTO_PEER'
  | 'THPAY'
  | 'TRUEWALLET'
  | 'DECIMAL'
  | 'MANUAL_SLIP'
  | 'EXPRESS_DEPOSIT'
  | undefined

export type PendingDepositState = {
  activeTab: number
  idSelect: ChannelType
  isSelectedChannel: boolean
  onConfirm?: () => void
}

interface DepositMenu {
  name: string
  label: string
  description: string
  image: string
  to: ChannelType
  recommend: boolean
  recommend_label: string
  enabled: boolean
}

// stores/cashier.ts
export const useCashierStore = defineStore('CashierStore', () => {
  const { t } = useI18n()
  const resourceStore = useResourceStore()
  const popupStore = usePopupStore()
  const loaderStore = useLoaderStore()

  const defaultTitle = t('menu_cashier')
  const title = ref(defaultTitle)
  const activeTab = ref<number>(0)
  const tabList = [
    {
      name: 'withdraw',
      label: t('withdraw'),
      icon: 'i-heroicons-arrow-up-on-square',
    },
    {
      name: 'deposit',
      label: t('deposit'),
      icon: 'i-heroicons-arrow-down-on-square',
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
  const idSelect = ref<ChannelType>()
  const amountIsSlipAndThpay = ref(0)
  const p2cRef = ref('')
  const isAutoPeerTransferPending = ref(false)
  const confirmAutoPeerLeave = ref<
    ((pendingState: PendingDepositState) => void) | undefined
  >()
  const thpayIsDisabled = ref(false)
  const askmepayData = ref<ServiceAskmepayData>()

  const askmepayRecord = computed(() => askmepayData.value?.record?.[0])
  const askmepaySerivce = computed(() => askmepayRecord.value?.services?.[0])

  const askmepayIsDepositChannel = computed(() => {
    return askmepayRecord.value?.isDepositChannel ?? false
  })

  const askmepayMinMaxDeposit = computed(() => {
    if (!askmepaySerivce.value) return { minimum: 0, maximum: 0 }

    const { minimumDeposit, maximumDeposit } = askmepaySerivce.value
    return { minimum: minimumDeposit, maximum: maximumDeposit }
  })

  const depositMenu = computed((): DepositMenu[] => {
    return [
      {
        name: 'deposit_express',
        label: 'ฝากเงินด่วน',
        description: 'ฝากเงินเข้าเว็ป ในช่องทางที่รวดเร็วและดีที่สุด',
        image: 'assets/images/icons/ic-3d-upload-slip.webp',
        to: 'EXPRESS_DEPOSIT',
        recommend: true,
        recommend_label: 'ช่องทางฝากยอดนิยม',
        enabled:
          resourceStore.isDeposit.isAutoSlip ||
          resourceStore.isDeposit.isAskmepay,
      },
      {
        name: 'deposit_auto',
        label: 'ฝากผ่านบัญชีธนาคาร',
        description: 'ฝากเงินผ่านบัญชีทางเว็ป เข้าอัตโนมัติทันที',
        image: 'assets/images/icons/ic-3d-bank.webp',
        to: 'AUTO',
        recommend: false,
        recommend_label: 'ยอดนิยม',
        enabled: resourceStore.isDeposit.isAuto,
      },
      {
        name: 'deposit_auto_peer',
        label: 'ฝากผ่านช่องทาง Autopeer',
        description: 'ฝาก-ถอน ระหว่างผู้ใช้โดยตรง ปลอดภัย รวดเร็ว',
        image: 'assets/images/icons/ic-3d-peer.webp',
        to: 'AUTO_PEER',
        recommend: false,
        recommend_label: 'ยอดนิยม',
        enabled:
          resourceStore.isDeposit.isAutoPeer ||
          resourceStore.isDeposit.isPeer2Pay,
      },
      {
        name: 'deposit_truemoney',
        label: 'deposit_truemoney',
        description: 'เข้าระบบรวดเร็ว ปลอดภัย ใช้งานง่าย',
        image: 'assets/images/icons/ic-true-money.webp',
        to: 'TRUEWALLET',
        recommend: false,
        recommend_label: 'ยอดนิยม',
        enabled: resourceStore.isDeposit.isTrueWallet,
      },
      {
        name: 'deposit_decimal',
        label: 'deposit_decimal',
        description: '',
        image: 'assets/images/icons/ic-3d-decimal.webp',
        to: 'DECIMAL',
        recommend: false,
        recommend_label: 'ยอดนิยม',
        enabled: resourceStore.isDeposit.isDecimal,
      },
    ]
  })

  const goExpressDeposit = () => {
    isSelectedChannel.value = true
    idSelect.value = 'EXPRESS_DEPOSIT'
    amountIsSlipAndThpay.value = 0
  }

  const goDepositHistory = () => {
    isSelectedChannel.value = false
    idSelect.value = undefined
    amountIsSlipAndThpay.value = 0
    activeTab.value = 2
    activeTabHistory.value = 0
  }

  const backToMainDeposit = () => {
    isSelectedChannel.value = false
    idSelect.value = undefined
    amountIsSlipAndThpay.value = 0
  }

  const setAutoPeerTransferPending = (
    isPending: boolean,
    onConfirmLeave?: (pendingState: PendingDepositState) => void,
  ) => {
    isAutoPeerTransferPending.value = isPending
    confirmAutoPeerLeave.value = onConfirmLeave
  }

  const openWithdrawFromPage = () => {
    popupStore.openModalProfile('cashier')
    activeTab.value = 0
  }

  const openDepositFromPage = () => {
    popupStore.openModalProfile('cashier')
    activeTab.value = 1
  }

  const onCancelDeposit = () => {
    popupStore.alertSuccess({
      message: 'ยกเลิกรายการฝากสำเร็จ',
      preventClose: true,
      onConfirm: () => backToMainDeposit(),
    })
  }

  const clear = () => {
    title.value = defaultTitle
    activeTab.value = 0
    activeTabHistory.value = 0
    isSelectedChannel.value = false
    idSelect.value = undefined
    amountIsSlipAndThpay.value = 0
    setAutoPeerTransferPending(false)
  }

  const getP2cDepositPending = async () => {
    try {
      loaderStore.start()
      const { status, code, message } = await useP2cDepositPending()
      if (!status) {
        if (code === '60002') {
          popupStore.alertP2cWarning({
            message: t('auto_peer_previous_message'),
            preventClose: true,
            onConfirm: () => {
              idSelect.value = 'AUTO_PEER'
            },
            onCancel: () => p2cCancelTransfer(),
          })
        } else if (code === '60005' || code === '60004' || code === '88004') {
        } else {
          popupStore.alertError({ message: message })
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const p2cCancelTransfer = async (ref?: string) => {
    try {
      const cancelRef = [ref || p2cRef.value]
      const { status, code, message } = await useP2cCancelTransfer(cancelRef)
      if (!status) {
        popupStore.alertError({
          message: message,
          preventClose: true,
          onCancel: () => {
            idSelect.value = 'AUTO_PEER'
          },
        })
      } else {
        popupStore.alertSuccess({
          title: message,
          message: 'ยกเลิกรายการสำเร็จ',
        })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    }
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
    depositMenu,
    p2cRef,
    isAutoPeerTransferPending,
    confirmAutoPeerLeave,
    thpayIsDisabled,
    amountIsSlipAndThpay,
    goDepositHistory,
    openWithdrawFromPage,
    openDepositFromPage,
    clear,
    backToMainDeposit,
    goExpressDeposit,
    onCancelDeposit,
    setAutoPeerTransferPending,
    getP2cDepositPending,
    p2cCancelTransfer,
  }
})
