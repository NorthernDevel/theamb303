<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div
      class="rounded-xl border-2 w-full h-40 flex flex-col items-center justify-center bg-zinc-100 dark:border-gray-500 dark:bg-gray-800"
    >
      <UIcon
        v-if="isLoading"
        name="i-heroicons-arrow-path"
        class="animate-spin text-slate-500 text-4xl"
      />

      <div v-else class="flex flex-col items-center justify-center">
        <p>{{ $t('txt_amount') }} ({{ $t('menu_cashback') }})</p>
        <p
          class="cashback text-4xl sm:text-5xl text-green-600 dark:text-green-400"
        >
          {{ amount }}
        </p>
      </div>
    </div>

    <div
      v-if="!isDisbled"
      class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
    >
      <USelectMenu v-model="selected" :options="typeOfWithdraw" size="xl">
        <template #leading>
          <UAvatar v-bind="selected.avatar" size="2xs" />
        </template>
      </USelectMenu>

      <UButton
        type="button"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
        :loading="isLoading"
        :disabled="isLoading"
        @click="onSubmit"
        >{{ t('btn_apply') }}</UButton
      >
    </div>
    <div
      v-else-if="isDisbled && cashback"
      class="w-full text-center mt-5 flex flex-col items-center justify-center"
    >
      <div class="text-sm text-red-700">{{ cashback.message }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CashbackData, RequestCashbackType } from '~/models/cashback.model'

type WithdrawType = {
  label: string
  avatar: { src: string }
  type: number
}

const { t } = useI18n()
const { useCurrency } = useFormatter()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])

const isLoading = ref(false)
const isDisbled = ref(true)
const cashback = ref<CashbackData>()

const typeOfWithdraw: WithdrawType[] = [
  {
    label: t('withdraw_credit'),
    avatar: { src: '/assets/images/coin.webp' },
    type: 0,
  },
  {
    label: t('withdraw_diamond'),
    avatar: { src: '/assets/images/diamond.svg' },
    type: 1,
  },
]
const selected = ref(typeOfWithdraw[0])

const amount = computed(() => {
  isLoading.value = true
  let rawCredit = 0
  if (cashback.value && cashback.value.amount) {
    rawCredit = cashback.value.amount
  }
  const { currency } = useCurrency(rawCredit)
  isLoading.value = false
  return currency
})

const getCashback = async () => {
  try {
    isLoading.value = true
    const { status, message, data } = await useCashback()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        cashback.value = data
        isDisbled.value = !!cashback.value?.isDisableBtn
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getCashbackTurnOverDetail = async (body: RequestCashbackType) => {
  try {
    isLoading.value = true
    const { status, message, data } = await useCashbackTurnOverDetail(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && !data.isDisableBtn) {
        addCashbackToProduct({ cashbackType: body.cashbackType })
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const addCashbackToProduct = async (body: RequestCashbackType) => {
  try {
    isLoading.value = true
    const { status, message } = await useCashbackToProduct(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
        message: message,
        onConfirm: () => emit('activeTab', 1),
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = () => {
  if (selected)
    popupStore.alertConfirm({
      title: t('confirm_to', {
        label: selected.value.label,
      }),
      preventClose: true,
      onConfirm: () =>
        getCashbackTurnOverDetail({ cashbackType: selected.value.type }),
    })
}

onMounted(() => {
  getCashback()
})
</script>
