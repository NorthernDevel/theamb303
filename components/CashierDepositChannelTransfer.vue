<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div
      class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-2"
    >
      <div class="flex flex-col items-center">
        <div class="flex items-center gap-1 text-green-600 dark:text-green-500">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5" />
          <p class="text-sm">
            {{
              $t('deposit_please_use_your_bank', {
                bank_account: bankStore.userBank.account,
              })
            }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="w-full">
      <USkeleton class="w-full h-20 mt-2" />
    </div>
    <div v-else class="w-full">
      <div
        v-for="bank in depositBank"
        class="border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mt-2"
      >
        <div class="flex gap-2 sm:gap-4">
          <NuxtImg :src="bank.avatar" :alt="bank.label" class="w-16 h-16" />
          <div class="flex flex-col font-light">
            <p>{{ bank.label }}</p>
            <div class="flex items-center gap-1">
              <p class="text-lg">{{ bank.account }}</p>
              <UIcon
                name="i-heroicons-clipboard-document"
                class="w-5 h-5 cursor-pointer"
                @click="copyToClipboard(bank.account)"
              />
            </div>
            <p class="text-sm mt-1">{{ bank.accountName }}</p>
          </div>
        </div>
      </div>
      <p
        v-if="depositBank.length"
        class="text-[12px] font-light text-center text-gray-500 dark:text-gray-300 mt-2"
      >
        {{ $t('deposit_can_copy_with_button') }}
        <UIcon name="i-heroicons-clipboard-document" class="w-3 h-3" />
      </p>
    </div>

    <div
      v-if="cashierStore.idSelect === 'MANUAL_SLIP'"
      class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
    >
      <AppFormGroup
        :label="$t('please_specify_amount')"
        :required="true"
        name="amount"
      >
        <UInput
          :ui="{
            base: 'text-right',
          }"
          icon="i-heroicons-banknotes"
          type="text"
          size="lg"
          inputmode="numeric"
          v-model="amountInput"
          v-on:blur="onBlur"
        >
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">{{
              profileStore.currency
            }}</span>
          </template>
        </UInput>
      </AppFormGroup>
    </div>

    <div v-if="isSlip" class="w-full">
      <AppUploadFile v-on:base64-file="getBase64Image" />
    </div>

    <div v-if="isSlip" class="w-full">
      <UButton
        type="button"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
        @click="onSubmit"
        :disabled="isLoading"
        >{{ $t('btn_apply') }}</UButton
      >
    </div>
    <div v-else class="w-full">
      <UButton
        type="button"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
        @click="cashierStore.goDepositHistory"
        :disabled="isLoading"
        >{{ $t('history_deposit') }}</UButton
      >
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
const { useCurrency } = useFormatter()
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
      (bank) => bank.id === accountBankName
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
  // Remove all non-numeric characters except for decimal point
  const cleanedValue = input.replace(/[^0-9.]/g, '')

  const amountNumber = parseFloat(cleanedValue)
  const { currency } = useCurrency(amountNumber, 'none')
  amountInput.value = currency.value || '0'

  amount.value = Math.round(amountNumber * 100) / 100
}

const onSubmit = async () => {
  const imgSlip = base64Image.value
  if (imgSlip) {
    const type =
      cashierStore.idSelect === 'AUTO_SLIP'
        ? SlipType.AUTO_SLIP
        : SlipType.MANUAL_SLIP
    const dateTime = dayjs().format('DD/MM/YYYY HH:mm')
    const body = { imgSlip, type, dateTime, amount: amount.value }
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

onMounted(() => {
  getBankDeposit({ limit: 1, accountType: cashierStore.idSelect })
})
</script>
