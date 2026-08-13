<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="isLoading" class="w-full h-40 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="theme-loading-icon" />
    </div>
    <div v-else class="w-full">
      <div
        v-if="!depositBank.length"
        class="theme-error-box w-full flex flex-col justify-center items-center text-center"
      >
        <template v-if="cashierStore.idSelect === 'AUTO_SLIP'">
          <p>ขณะนี้ระบบ ฝากเงินด่วน ปิดให้บริการชั่วคราว</p>
          <p>กรุณาเลือกใช้ช่องทางอื่นในการฝากชั่วคราวก่อนนะค่ะ</p>
        </template>
        <template v-else>
          <p>ขณะนี้ระบบ {{ $t(title) }} ปิดให้บริการ</p>
          <p>กรุณาเลือกใช้ช่องทางอื่น</p>
        </template>
      </div>
      <div v-else>
        <div class="theme-panel w-full mb-2 px-3 py-2">
          <div class="flex flex-col items-center">
            <div class="flex items-center gap-1 text-amber-200">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5" />
              <p v-if="cashierStore.idSelect === 'TRUEWALLET'" class="text-sm">
                {{
                  $t('deposit_please_use_your_bank', {
                    bank_account:
                      cashierStore.idSelect === 'TRUEWALLET'
                        ? profileStore.userData?.phoneNo
                        : bankStore.userBank.account,
                  })
                }}
              </p>
              <p v-else class="text-sm">
                {{
                  $t('deposit_please_use_your_bank', {
                    bank_account: bankStore.userBank.account,
                  })
                }}
              </p>
            </div>
          </div>
        </div>

        <div v-for="bank in depositBank" class="theme-panel p-2 mt-2">
          <div class="flex gap-2 sm:gap-4">
            <NuxtImg :src="bank.avatar" :alt="bank.label" class="w-16 h-16" />
            <div class="flex flex-col font-light text-gray-50">
              <p class="theme-label">{{ bank.label }}</p>
              <div class="flex items-center gap-1">
                <p class="theme-title text-lg font-semibold">
                  {{ bank.account }}
                </p>
                <UIcon
                  name="i-heroicons-clipboard-document"
                  class="w-5 h-5 cursor-pointer"
                  @click="copyToClipboard(bank.account)"
                />
              </div>
              <p class="text-sm mt-1 text-amber-100/80">
                {{ bank.accountName }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="depositBank.length"
        class="text-[12px] font-light text-center text-amber-200/70 mt-2"
      >
        {{ $t('deposit_can_copy_with_button') }}
        <UIcon name="i-heroicons-clipboard-document" class="w-3 h-3" />
      </p>

      <UButton
        v-if="cashierStore.idSelect === 'AUTO'"
        type="button"
        class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
        :loading="isLoading"
        @click="cashierStore.goDepositHistory()"
      >
        {{ $t('history_deposit') }}
      </UButton>
    </div>

    <div
      v-if="cashierStore.idSelect === 'MANUAL_SLIP'"
      class="theme-panel w-full p-4"
    >
      <AppFormGroup
        :label="$t('please_specify_amount')"
        :required="true"
        name="amount"
      >
        <UInput
          :ui="{
            base: 'text-right',
            color: {
              white: {
                outline:
                  'bg-black/50 border-red-900/60 text-gray-100 ring-red-900/60 focus:ring-red-500 focus:border-amber-300',
              },
            },
          }"
          icon="i-heroicons-banknotes"
          type="text"
          size="lg"
          inputmode="numeric"
          v-model="amountInput"
          v-on:blur="onBlur"
        >
          <template #trailing>
            <span class="text-amber-200/70 text-xs">{{
              profileStore.currency
            }}</span>
          </template>
        </UInput>
      </AppFormGroup>
    </div>

    <div v-if="isSlip && depositBank.length" class="w-full">
      <AppUploadFile v-on:base64-file="getBase64Image" />
    </div>

    <div v-if="isSlip && depositBank.length" class="w-full">
      <UButton
        type="button"
        class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
        @click="onSubmit"
        :disabled="isLoading"
        >{{ $t('btn_apply') }}</UButton
      >

      <UButton
        type="button"
        class="theme-danger-btn w-full h-12 justify-center text-lg mt-4 mb-4"
        @click="cashierStore.onCancelDeposit()"
      >
        ยกเลิกรายการฝาก
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { BankDepositData } from '~/models/bank-deposit.model'
import type { RequestBankDeposit } from '~/models/default.model'
import { SlipType } from '~/models/transactions.model'

const cashierStore = useCashierStore()
const bankStore = useBankStore()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { useParseAmount } = useFormatter()
const { copyToClipboard } = useClipboard()

const isLoading = ref(false)
const BankDeposit = ref<BankDepositData[]>([])
const base64Image = ref<string | undefined>(undefined)
const amountInput = ref('0')
const amount = ref(0)

const isSlip = computed(() => {
  return (
    cashierStore.idSelect === 'AUTO_SLIP' ||
    cashierStore.idSelect === 'MANUAL_SLIP'
  )
})

const title = computed(() => {
  switch (cashierStore.idSelect) {
    case 'AUTO':
      return 'deposit_auto'
    case 'AUTO_SLIP':
      return 'deposit_auto_slip'
    case 'TRUEWALLET':
      return 'deposit_truemoney'
    case 'DECIMAL':
      return 'deposit_decimal'
    default:
      return 'deposit_auto'
  }
})

const depositBank = computed(() => {
  return BankDeposit.value.map((bank) => {
    const { accountBankName, accountNumber, accountName } = bank
    if (accountBankName === 'TRUEWALLET') {
      return {
        account: accountNumber,
        label: 'TRUEMONEY',
        avatar: 'assets/images/channels/truemoney.webp',
        accountName,
      }
    }
    const bankFiltered = bankStore.bankList.filter(
      (bank) => bank.id === accountBankName,
    )
    return {
      account: accountNumber,
      label: bankFiltered[0].label,
      avatar: bankFiltered[0].avatar.src,
      accountName,
    }
  })
})

const getBankDeposit = async (body: RequestBankDeposit) => {
  try {
    isLoading.value = true
    const { status, data, message } = await useBankDeposit(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      BankDeposit.value = []
      if (data) BankDeposit.value = data
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

const onBlur = (event: Event) => {
  const input = (event.target as HTMLInputElement).value

  const amountNumber = useParseAmount().parseAmount(input)

  amountInput.value = useParseAmount().formatAmount(amountNumber)

  amount.value = amountNumber
}

const onSubmit = async () => {
  const imgSlip = base64Image.value
  if (imgSlip) {
    const type =
      cashierStore.idSelect === 'AUTO_SLIP'
        ? SlipType.AUTO_SLIP
        : SlipType.MANUAL_SLIP
    const dateTime = dayjs().format('DD/MM/YYYY HH:mm')
    const body = {
      imgSlip,
      type,
      dateTime,
      amount:
        cashierStore.idSelect === 'MANUAL_SLIP'
          ? amount.value
          : cashierStore.amountIsSlipAndThpay,
    }
    try {
      isLoading.value = true
      const { status, message } = await useUploadSlip(body)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        resetForm()
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

const resetForm = () => {
  base64Image.value = undefined
  amountInput.value = '0'
  amount.value = 0
}

watchEffect(() => {
  if (cashierStore.idSelect) {
    getBankDeposit({ limit: 1, accountType: cashierStore.idSelect })
  }
})

onMounted(() => {
  cashierStore.getP2cDepositPending()
})
</script>
