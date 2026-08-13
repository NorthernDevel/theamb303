<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="isLoading" class="w-full h-40 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="theme-loading-icon" />
    </div>
    <div v-else class="w-full">
      <div
        v-if="!isAutoPeer"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <p>ขณะนี้ระบบ {{ $t('deposit_auto_peer') }} ปิดให้บริการ</p>
        <p>กรุณาเลือกใช้ช่องทางอื่น</p>
      </div>
      <div
        v-else-if="isDepositError"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <p class="text-center">{{ isDepositError }}</p>
        <UButton
          type="button"
          class="theme-primary-btn w-full h-12 justify-center text-md my-5"
          @click="cashierStore.backToMainDeposit()"
          >ใช้ช่องทางการฝากเงินอื่น</UButton
        >
        <UButton
          type="button"
          class="theme-danger-btn w-full h-12 justify-center text-md mb-4"
          @click="popupStore.openModalContact()"
          >ติดต่อแอดมิน</UButton
        >
      </div>
      <div v-else-if="!isCompleted" class="w-full">
        <InformationUpdate v-on:complete="toCompleted" />
      </div>
      <div v-else-if="isCompleted">
        <p class="text-center text-sm text-amber-200/80 mt-2 mb-4">
          ขั้นตอน กรอกยอด -> คัดลอกเลขบัญชี -> แนบสลิบ -> รับเครดิตทันที
        </p>
        <div v-if="step === 0">
          <NumberPad
            :min="minAutopeerDeposit"
            :max="maxAutopeerDeposit"
            :short-cut-amount="shortCutAmount"
            :loading="isLoading"
            @submit="onSubmitNumberPad"
          />
        </div>

        <div v-if="step === 1">
          <div
            v-for="bank in p2cDepositList"
            class="theme-panel w-full flex py-2 mb-2"
          >
            <div class="w-1/3 flex flex-col items-center justify-center">
              <NuxtImg
                :src="
                  'https://cdn.tiamutauto.com/master-bank/' +
                  bank.bankShort +
                  '.svg'
                "
                :alt="bank.bankName"
                class="w-20"
              />
            </div>
            <div class="w-2/3 px-4 grid grid-cols-2">
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_name') }}
                </div>
                <div class="theme-value flex items-center">
                  {{ bank.bankName }}
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account') }}
                </div>
                <div class="theme-title text-xl sm:text-2xl">
                  {{ bank.accountNumber }}
                  <UIcon
                    name="i-heroicons-clipboard-document"
                    class="w-5 h-5 cursor-pointer"
                    @click="copyToClipboard(bank.accountNumber)"
                  />
                </div>
              </div>
              <div class="theme-list-item">
                <div class="theme-label flex items-center text-sm">
                  {{ $t('bank_account_first_name') }}
                </div>
                <div class="theme-value">{{ bank.firstName }} {{ bank.lastName }}</div>
              </div>
            </div>
          </div>

          <p
            v-if="p2cDepositList.length"
            class="text-[12px] font-light text-center text-amber-200/70 my-2"
          >
            {{ $t('deposit_can_copy_with_button') }}
            <UIcon name="i-heroicons-clipboard-document" class="w-3 h-3" />
          </p>

          <div class="flex flex-col gap-4">
            <div
              class="theme-panel w-full flex flex-col items-center justify-center px-6 py-4"
            >
              <div class="w-full flex flex-col">
                <div class="flex justify-between">
                  <p class="theme-label text-xl sm:text-2xl">
                    {{ $t('deposit_amount') }}
                  </p>
                  <p class="theme-title text-xl sm:text-2xl font-semibold">
                    {{ summary }}฿
                  </p>
                </div>
                <p class="text-xs font-light text-amber-200/70 pt-2">
                  {{
                    $t('deposit_please_use_your_bank', {
                      bank_account: bankStore.userBank.account,
                    })
                  }}
                </p>
                <p class="text-center text-sm text-amber-200/70 mt-2">
                  RIF: {{ cashierStore.p2cRef }}
                </p>
              </div>
            </div>

            <div
              class="w-full flex flex-col items-center justify-center rounded-xl border border-amber-300/50 bg-red-950/40 px-6 py-4 text-amber-100 shadow-lg shadow-black/40 ring-1 ring-amber-200/10 ring-inset"
            >
              <div v-if="!isTimeUp" class="w-full flex flex-col items-center">
                <p class="font-light text-md sm:text-lg">
                  กรุณาโอนและอัปโหลดสลิปภายใน
                  <span
                    v-if="countdown"
                    class="theme-title text-xl sm:text-2xl font-medium"
                    >{{ countdown.formattedTime }}</span
                  >
                </p>
                <p
                  class="text-xs sm:text-sm text-amber-200/70"
                >
                  หากทำรายการไม่สำเร็จภายในเวลาที่กำหนด
                  ช่องทางฝากนี้จะถูกระงับชั่วคราว
                </p>
              </div>
              <div v-else class="w-full flex flex-col items-center">
                <p class="font-light text-md sm:text-lg text-rose-400">
                  หมดเวลาทำรายการแล้ว
                </p>
                <p class="text-xs sm:text-sm text-amber-200/70">
                  กรุณายกเลิกแล้วทำรายการใหม่อีกครั้ง
                </p>
              </div>
            </div>

            <div class="w-full">
              <AppUploadFile v-on:base64-file="getBase64Image" />
            </div>

            <div class="w-full">
              <UButton
                type="button"
                class="theme-primary-btn w-full h-12 justify-center text-lg my-2"
                @click="onSubmit"
                :disabled="isLoading || isTimeUp"
                >{{ $t('btn_apply') }}</UButton
              >
              <UButton
                type="button"
                class="theme-danger-btn w-full h-12 justify-center text-lg my-2"
                @click="onClickCancelTransfer"
                :disabled="isLoading"
                >ยกเลิกรายการฝาก</UButton
              >
            </div>

            <div
              class="theme-panel w-full flex flex-col items-center justify-center px-6 py-4"
            >
              <div class="w-full flex flex-col items-center">
                <p class="theme-title font-medium text-md sm:text-lg">
                  โอนภายใน 5 นาที ตรวจสอบเลขบัญชี ทุกครั้งก่อนโอน
                </p>
                <p class="text-sm text-left text-amber-100/80">
                  *
                  หากไม่อัปโหลดตามเวลาที่กำหนดคุณต้องดำเนินการแจ้งความว่าโอนเงินผิดและติดต่อธนาคารเพื่อดึงเงินคืนด้วยตนเอง
                </p>
                <p class="text-sm text-left text-amber-100/80">
                  * กรณียกเลิกรายการ จะถูกระงับการฝากช่องทาง AutoPeer 3 นาที
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppModalHowToAutopeer v-model="popupStore.isOpenModalHowToAutopeer" />
</template>

<script lang="ts" setup>
import { useInformation } from '~/composables/useCustomerService'
import type { P2cDepositList } from '~/models/p2c.model'
import type { ChannelType, PendingDepositState } from '~/stores/cashier'
import type { ShortCutAmount } from './NumberPad.vue'

const { t } = useI18n()
const cashierStore = useCashierStore()
const bankStore = useBankStore()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { copyToClipboard } = useClipboard()

const shortCutAmount: ShortCutAmount[] = [
  { name: '100', value: 100 },
  { name: '300', value: 300 },
  { name: '500', value: 500 },
  { name: '1,000', value: 1000 },
  { name: '3,000', value: 3000 },
  { name: '5,000', value: 5000 },
  { name: '10,000', value: 10000 },
  { name: '20,000', value: 20000 },
]

const minAutopeerDeposit = 100
const maxAutopeerDeposit = 20000

const isLoading = ref(false)
const isCompleted = ref(false)
const isTimeUp = ref(false)
const step = ref(0)
const amount = ref(0)
const isDepositError = ref('')
const p2cDepositList = ref<P2cDepositList[]>([])
const summary = ref<string>('')
const countdown = ref()
const base64Image = ref<string | undefined>(undefined)
const skipLeaveConfirm = ref(false)
const isConfirmingLeave = ref(false)
const depositLoopKey = ref(0)

const isAutoPeer = computed(() => {
  if (!profileStore.userData) return false
  return profileStore.userData.isDeposit.isAutoPeer
})

const normalizeP2cExpiredDate = (expiredDate: string) => {
  return expiredDate.replace(/\sUTC\+7$/, ' UTC')
}

const applyP2cDepositData = (
  data: {
    list?: P2cDepositList[]
    summary: string
    expiredDate: string
  },
  options: { normalizeExpiredDate?: boolean } = {},
) => {
  const { list, summary: amount, expiredDate } = data

  if (!list?.length) {
    popupStore.alertError({ message: 'ไม่พบข้อมูลบัญชีสำหรับทำรายการฝากเงิน' })
    return
  }

  popupStore.closeAlertPopup()
  isTimeUp.value = false
  step.value = 1
  p2cDepositList.value = list
  cashierStore.p2cRef = list[0].ref
  summary.value = amount
  countdown.value = useCountdownWithTemstamp(
    options.normalizeExpiredDate
      ? normalizeP2cExpiredDate(expiredDate)
      : expiredDate,
  )
  countdown.value.startCountdown()
}

const onSubmitNumberPad = async (amountNumber: number) => {
  amount.value = amountNumber
  depositLoopKey.value++
  await onSubmitDeposit()
}

// ต้องเช็คยิงซ้ำ
const onSubmitDeposit = async () => {
  try {
    const { status, code, data, message } = await useP2cDeposit(amount.value)
    if (!status) {
      if (code === '60001') {
        popupStore.alertLoading({
          message,
          preventClose: true,
          loopKey: depositLoopKey.value,
          onLooping: () => onSubmitDeposit(),
        })
      } else if (code === '60002') {
        if (data) {
          applyP2cDepositData(data, { normalizeExpiredDate: true })
        }
      } else {
        popupStore.alertError({ message })
      }
    } else {
      if (data) {
        popupStore.closeAlertPopup()
        applyP2cDepositData(data)
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  }
}

const getInformation = async () => {
  try {
    isLoading.value = true
    const { status, code, data, message } = await useInformation()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { firstNameEN, lastNameEN } = data
        isCompleted.value = !!firstNameEN && !!lastNameEN
        if (isCompleted.value) {
          popupStore.openModalHowToAutopeer()
        }
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const toCompleted = async (isComplete: boolean) => {
  if (!isComplete) return
  await getP2cDepositStatus()
}

const getP2cDepositStatus = async () => {
  try {
    isLoading.value = true
    const { status, code, data, message } = await useP2cDepositStatus()
    if (!status) {
      if (code === '60005' || code === '88004' || code === '60004') {
        // 88004 ขออภัย ไม่สามารถทำรายการ AutoPeer ในช่วงเวลา 23:00 - 01:00 ได้ เนื่องจากเลี่ยงข้อผิดพลาดจากธนาคาร
        isDepositError.value = message
      } else {
        popupStore.alertError({ message: message })
      }
    } else {
      await getInformation()
      if (!isCompleted.value) return
      if (data) {
        step.value = 1
        isTimeUp.value = false
        const { list, summary: amount, expiredDate } = data
        p2cDepositList.value = list
        cashierStore.p2cRef = list[0].ref
        summary.value = amount
        countdown.value = useCountdownWithTemstamp(expiredDate)
        countdown.value.startCountdown()
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getBase64Image = (file: string | undefined) => {
  base64Image.value = file
}

const onSubmit = async () => {
  const imgSlip = base64Image.value
  if (imgSlip) {
    const ref = cashierStore.p2cRef
    const body = { imgSlip, ref }
    try {
      isLoading.value = true
      const { status, message } = await useP2cUploadSlip(body)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        skipLeaveConfirm.value = true
        cashierStore.setAutoPeerTransferPending(false)
        step.value = 0
        resetState()
        popupStore.alertSuccess({
          title: message,
          preventClose: true,
          onConfirm: () => cashierStore.goDepositHistory(),
        })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }
}

const onClickCancelTransfer = () => {
  skipLeaveConfirm.value = true
  cashierStore.setAutoPeerTransferPending(false)
  p2cCancelTransfer()
}

const applyPendingDepositState = (pendingState: PendingDepositState) => {
  cashierStore.activeTab = pendingState.activeTab
  cashierStore.idSelect = pendingState.idSelect
  cashierStore.isSelectedChannel = pendingState.isSelectedChannel
  pendingState.onConfirm?.()
}

const p2cCancelTransfer = async (pendingState?: PendingDepositState) => {
  try {
    const ref = [cashierStore.p2cRef]
    const { status, message } = await useP2cCancelTransfer(ref)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
        message: 'ยกเลิกรายการสำเร็จ',
        preventClose: true,
        onConfirm: () => {
          step.value = 0
          resetState()
          cashierStore.getP2cDepositPending()
          if (pendingState) {
            applyPendingDepositState(pendingState)
          } else {
            cashierStore.backToMainDeposit()
          }
        },
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  }
}

const confirmCancelTransferBeforeLeave = (pendingState: PendingDepositState) => {
  popupStore.alertConfirm({
    title: 'ยืนยันการออกจากหน้านี้',
    message: 'หากออกจากหน้านี้ รายการฝาก AutoPeer ปัจจุบันจะถูกยกเลิก',
    preventClose: true,
    onConfirm: () => {
      skipLeaveConfirm.value = true
      cashierStore.setAutoPeerTransferPending(false)
      p2cCancelTransfer(pendingState)
    },
    onCancel: () => {
      isConfirmingLeave.value = false
    },
  })
}

const resetState = () => {
  base64Image.value = undefined
  isDepositError.value = ''
  p2cDepositList.value = []
  countdown.value = null
}

watchEffect(() => {
  cashierStore.setAutoPeerTransferPending(
    step.value === 1 && !skipLeaveConfirm.value,
    confirmCancelTransferBeforeLeave,
  )

  if (countdown.value) {
    if (countdown.value.isTimeUp) {
      isTimeUp.value = true
      resetState()
    }
  }
})

watch(
  () => [
    cashierStore.activeTab,
    cashierStore.idSelect,
    cashierStore.isSelectedChannel,
  ],
  ([activeTab, idSelect, isSelectedChannel]) => {
    const isLeavingAutoPeer =
      activeTab !== 1 || idSelect !== 'AUTO_PEER' || !isSelectedChannel

    if (
      step.value !== 1 ||
      skipLeaveConfirm.value ||
      isConfirmingLeave.value ||
      !isLeavingAutoPeer
    ) {
      return
    }

    const pendingState: PendingDepositState = {
      activeTab: activeTab as number,
      idSelect: idSelect as ChannelType,
      isSelectedChannel: isSelectedChannel as boolean,
    }

    isConfirmingLeave.value = true
    cashierStore.activeTab = 1
    cashierStore.idSelect = 'AUTO_PEER'
    cashierStore.isSelectedChannel = true
    confirmCancelTransferBeforeLeave(pendingState)
  },
)

onMounted(() => {
  getP2cDepositStatus()

  // step.value = 1
  // const { list, summary: amount, expiredDate } = mockup.data
  // p2cDepositList.value = list
  // cashierStore.p2cRef = list[0].ref
  // summary.value = amount
  // countdown.value = useCountdownWithTemstamp(expiredDate)
  // countdown.value.startCountdown()
})

onUnmounted(() => {
  resetState()
  cashierStore.setAutoPeerTransferPending(false)
})
</script>
