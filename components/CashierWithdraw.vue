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
        <p class="font-light">{{ $t('your_credit') }}</p>
        <p
          class="cashback text-4xl sm:text-5xl text-green-600 dark:text-green-400"
        >
          {{ profileStore.balance }}
        </p>
      </div>
    </div>

    <div
      v-if="!isDisbled"
      class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
    >
      <UForm
        :state="state"
        :schema="withdrawSchema"
        ref="form"
        @submit.prevent="onSubmit"
        :validateOn="['blur']"
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
            v-model="amount"
            v-on:blur="onBlur"
            :disabled="isDisbled"
          >
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">{{
                profileStore.currency
              }}</span>
            </template>
          </UInput>
        </AppFormGroup>

        <UButton
          type="submit"
          class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
          :loading="isLoading"
          :disabled="isDisbled"
        >
          {{ $t('request_withdraw') }}
        </UButton>
      </UForm>
    </div>
    <p v-if="!isLoading && isDisbled" class="text-sm text-red-700">
      {{ dataMessage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { RequestWithdraw } from '~/models/default.model'

const { t } = useI18n()
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const form = ref()
const isLoading = ref(false)
const isDisbled = ref(true)
const amount = ref('0')
const minWithdraw = ref(100)
const maxWithdraw = ref(50000)
const dataMessage = ref('')

const initialState: RequestWithdraw = {
  amount: undefined,
}

const state = ref({
  ...initialState,
})

const getMinWithdraw = () => {
  return minWithdraw.value
}

const getMaxWithdraw = () => {
  return maxWithdraw.value
}

const withdrawSchema = z.object({
  amount: z
    .number({ required_error: t('please_specify_amount') })
    .superRefine((value, ctx) => {
      const minWithdraw = getMinWithdraw()
      const maxWithdraw = getMaxWithdraw()
      const { currency: minCurrency } = useCurrency(minWithdraw, 'none')
      const { currency: maxCurrency } = useCurrency(maxWithdraw, 'none')

      // Validate minimum amount
      if (value < minWithdraw) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: minWithdraw,
          type: 'number',
          inclusive: true,
          message: t('amount_must_be_at_least', {
            value: minCurrency.value,
          }),
        })
      }

      // Validate maximum amount
      if (value > maxWithdraw) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: maxWithdraw,
          type: 'number',
          inclusive: true,
          message: t('amount_must_be_at_most', {
            value: maxCurrency.value,
          }),
        })
      }
    }),
})

const getConditionWithdraw = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useConditionWithdraw()
    if (!status) {
      popupStore.alertError({ message })
    } else {
      if (data) {
        const { disableBtn, minWithdrawAmount, maxWithdrawAmount } = data
        isDisbled.value = disableBtn
        minWithdraw.value = minWithdrawAmount
        maxWithdraw.value = maxWithdrawAmount
        dataMessage.value = data?.message || t('unable_withdraw')
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    isLoading.value = true
    const { status, data, message } = await useWithdraw(
      state.value as RequestWithdraw
    )
    if (!status) {
      popupStore.alertError({ message })
    } else {
      resetForm()
      popupStore.alertSuccess({
        message,
        onConfirm: () => profileStore.getProfile(),
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

// Handle blur event to round and format the value
const onBlur = (event: Event) => {
  const input = (event.target as HTMLInputElement).value
  // Remove all non-numeric characters except for decimal point
  const cleanedValue = input.replace(/[^0-9.]/g, '')

  const amountNumber = parseFloat(cleanedValue)
  const { currency } = useCurrency(amountNumber, 'none')
  amount.value = currency.value || '0'

  state.value.amount = Math.round(amountNumber * 100) / 100
}

const resetForm = () => {
  state.value = { ...initialState }
}

onMounted(() => {
  getConditionWithdraw()
})

onBeforeUnmount(() => {
  resetForm()
})
</script>
