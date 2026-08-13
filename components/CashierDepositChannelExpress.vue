<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="isLoading" class="w-full h-40 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="theme-loading-icon" />
    </div>

    <div v-else class="w-full">
      <div v-if="step === 0">
        <p
          v-if="cashierStore.idSelect === 'AUTO'"
          class="text-center text-sm text-amber-200/80 mt-2 mb-4"
        >
          ขั้นตอน กรอกยอด -> คัดลอกเลขบัญชี -> โอนเงิน -> รับเครดิตทันที
        </p>
        <NumberPad
          :min="minDeposit"
          :max="maxDeposit"
          :short-cut-amount="shortCutAmount"
          :loading="isLoading"
          @submit="onSubmitAmount"
        />
      </div>

      <div v-if="step === 1">
        <CashierDepositChannelThPay v-if="cashierStore.idSelect === 'THPAY'" />
        <CashierDepositChannelTransfer
          v-else-if="
            cashierStore.idSelect === 'AUTO' ||
            cashierStore.idSelect === 'AUTO_SLIP' ||
            cashierStore.idSelect === 'TRUEWALLET'
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortCutAmount } from './NumberPad.vue'

const resourceStore = useResourceStore()
const cashierStore = useCashierStore()
const popupStore = usePopupStore()

const isLoading = ref(false)
const step = ref(0)

const shortCutAmount: ShortCutAmount[] = [
  { name: '50', value: 50 },
  { name: '100', value: 100 },
  { name: '300', value: 300 },
  { name: '500', value: 500 },
  { name: '1,000', value: 1000 },
  { name: '5,000', value: 5000 },
]

const minAutoSlipDeposit = 50
const maxAutoSlipDeposit = 300
const minThpayDeposit = cashierStore.askmepayMinMaxDeposit.minimum
const maxThpayDeposit = cashierStore.askmepayMinMaxDeposit.maximum

const isAutoSlip = resourceStore.isDeposit.isAutoSlip
const isAskmepay = resourceStore.isDeposit.isAskmepay

const minDeposit = computed(() => minAutoSlipDeposit)

const maxDeposit = computed(() => {
  if (
    cashierStore.idSelect === 'AUTO' ||
    cashierStore.idSelect === 'TRUEWALLET'
  ) {
    return 50000
  }

  if (isAskmepay && maxThpayDeposit) {
    return maxThpayDeposit
  }

  return 200000
})

const onSubmitAmount = async (amount: number) => {
  if (
    cashierStore.idSelect === 'AUTO' ||
    cashierStore.idSelect === 'TRUEWALLET'
  ) {
    cashierStore.idSelect =
      cashierStore.idSelect === 'AUTO' ? 'AUTO' : 'TRUEWALLET'
    step.value = 1
    return
  }

  const depositAmount = amount

  if (!minThpayDeposit || minThpayDeposit === 0) {
    if (isAutoSlip) {
      cashierStore.idSelect = 'AUTO_SLIP'
      cashierStore.amountIsSlipAndThpay = depositAmount
      step.value = 1
      return
    }

    popupStore.alertError({
      title: 'ขณะนี้ระบบ ฝากเงินด่วน \nปิดให้บริการชั่วคราว',
      message: 'กรุณาเลือกใช้ช่องทางอื่น\nในการฝากชั่วคราวก่อนนะค่ะ',
    })
    return
  }

  if (isAutoSlip && isAskmepay) {
    cashierStore.idSelect =
      depositAmount > maxAutoSlipDeposit && depositAmount >= minThpayDeposit
        ? 'THPAY'
        : 'AUTO_SLIP'
  } else if (isAutoSlip) {
    cashierStore.idSelect = 'AUTO_SLIP'
  } else if (isAskmepay) {
    if (depositAmount < minThpayDeposit) {
      cashierStore.idSelect = 'AUTO_SLIP'
      cashierStore.amountIsSlipAndThpay = depositAmount
      step.value = 1
      return
    }
    cashierStore.idSelect = 'THPAY'
  } else {
    popupStore.alertError({
      message: 'ช่องทางการฝากนี้ไม่พร้อมใช้งาน',
    })
    return
  }

  cashierStore.amountIsSlipAndThpay = depositAmount
  step.value = 1
}

onMounted(() => {
  cashierStore.getP2cDepositPending()
})
</script>
