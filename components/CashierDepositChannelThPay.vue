<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div v-if="!isQrCode" class="w-full">
      <div
        class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
      >
        <div>
          <UForm
            :state="state"
            :schema="depositAskmepaySchema"
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
                v-model="state.amount"
                v-on:blur="onBlur"
              >
                <template #trailing>
                  <span class="text-gray-500 dark:text-gray-400 text-xs">{{
                    profileStore.currency
                  }}</span>
                </template>
              </UInput>
            </AppFormGroup>

            <p
              class="font-light text-sm text-gray-700 dark:text-gray-200 before:content-['*'] before:text-red-500"
            >
              {{
                $t('deposit_range', {
                  min: minCurrency,
                  max: maxCurrency,
                  currency: profileStore.currency,
                })
              }}
            </p>
            <UButton
              type="submit"
              class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
              :loading="isLoading"
            >
              {{ $t('btn_submit') }}
            </UButton>
          </UForm>
        </div>
         <div class="flex justify-center mt-4">
        <NuxtImg
          src="/assets/images/verified.webp"
          alt="Verified by ASKMEBET"
          class="w-32 sm:w-auto"
        />
      </div>
      </div>
     
    </div>

    <div v-else v-if="qrCodeData" class="w-full">
      <div
        v-if="qrCodeData.representType === 'REDIRECT'"
        class="w-full relative"
      >
        <NuxtLink :to="qrCodeData.qr_link" target="_blank">
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            icon="i-heroicons-arrow-top-right-on-square"
            color="amber"
            class="absolute top-1 right-1"
          />
        </NuxtLink>
        <iframe
          :src="qrCodeData.qr_link"
          frameborder="0"
          scrolling="no"
          :title="qrCodeData.orderId"
          class="w-full h-[1090px] sm:h-[956px] rounded-lg"
          :class="[qrCodeData.name === 'QR CODE' && '!h-[650px]']"
        >
        </iframe>
      </div>
      <div v-else class="px-2 sm:px-6">
        <NuxtImg
          src="/assets/images/thai-qr-payment.webp"
          alt="Thai QR Payment"
          class="rounded-t-lg"
        />
        <div
          class="flex flex-col items-center justify-center border border-gray-200 dark:border-gray-500 rounded-b-lg p-2"
        >
          <div class="w-52 h-56 flex flex-col items-center relative">
            <p>{{ qrCodeData.orderId }}</p>
            <NuxtImg
              id="capture-area"
              :src="qrCodeData.qr_link"
              alt="QR Code"
              class="relative max-h-48"
            />
          </div>
          <p class="font-extralight text-sm">
            {{ $t('capture_qrcode') }}
          </p>
          <UDivider :label="$t('or')" class="my-1" />
          <p class="font-extralight text-sm">
            {{ $t('long_press_for_save_image') }}
          </p>
        </div>

        <div
          class="flex justify-around border border-gray-200 dark:border-gray-500 rounded-lg p-2 mt-2"
        >
          <div class="w-1/2 flex flex-col items-start justify-center">
            <p class="font-light text-sm">{{ $t('time_up_in') }}</p>
            <p class="font-medium text-2xl text-teal-500 dark:text-teal-300">
              {{ formattedTime }}
            </p>
          </div>
          <UDivider orientation="vertical" class="mx-1" />
          <div class="flex-grow flex flex-col items-end justify-center">
            <p class="font-light text-sm">{{ $t('transfer_amount') }}</p>
            <p class="font-medium text-2xl text-teal-500 dark:text-teal-300">
              {{ amountTransfer }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-center">{{ $t('follow_conditions') }}</h3>
          <div class="font-light text-sm mt-2 space-y-2">
            <li>{{ $t('do_not_transfer_again') }}</li>
            <li>{{ $t('do_not_edit_amount') }}</li>
            <li>{{ $t('please_wait_a_moment') }}</li>
            <li>{{ $t('if_not_followed') }}</li>
          </div>
        </div>
      </div>

      <UButton
        type="button"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-4"
        @click="cashierStore.goDepositHistory"
        :disabled="isLoading"
        >{{ $t('history_deposit') }}</UButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type {
  QrcodeAskmepayData,
  RequestGenQRCode,
} from '~/models/service-ask.model'

interface InitialState {
  amount: number
}

const { t } = useI18n()
const cashierStore = useCashierStore()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { useCurrency } = useFormatter()
const { formattedTime, startCountdown, clearCountdown, isTimeUp } =
  useCountdown(10, 1)

const isLoading = ref(false)
const isQrCode = ref(false)
const form = ref()
const amount = ref('0')
const qrCodeData = ref<QrcodeAskmepayData>()

const initialState: InitialState = {
  amount: 100,
}

const minDeposit = cashierStore.askmepayMinMaxDeposit.minimum
const maxDeposit = cashierStore.askmepayMinMaxDeposit.maximum
const { currency: minCurrency } = useCurrency(minDeposit, 'none')
const { currency: maxCurrency } = useCurrency(maxDeposit, 'none')

const state = ref({
  ...initialState,
})

const depositAskmepaySchema = z.object({
  amount: z
    .number({ required_error: t('please_specify_amount') })
    .superRefine((value, ctx) => {
      // Validate minimum amount
      if (value < minDeposit) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: minDeposit,
          type: 'number',
          inclusive: true,
          message: t('deposit_amount_must_be_at_least', {
            value: minCurrency.value,
          }),
        })
      }

      // Validate maximum amount
      if (value > maxDeposit) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: maxDeposit,
          type: 'number',
          inclusive: true,
          message: t('deposit_amount_must_be_at_most', {
            value: maxCurrency.value,
          }),
        })
      }
    }),
})

const amountTransfer = computed(() => {
  let rewAmount = 0
  if (qrCodeData.value && qrCodeData.value.amount) {
    rewAmount = qrCodeData.value.amount
  }
  const { currency } = useCurrency(rewAmount, 'none')
  return currency
})

watch(isTimeUp, () => {
  if (isTimeUp) {
    resetState()
    popupStore.alertWarning({
      title: t('deposit_qrcode_expired'),
    })
  } else {
    isQrCode.value = true
  }
})

const onBlur = (event: Event) => {
  const input = (event.target as HTMLInputElement).value
  // Remove all non-numeric characters except for decimal point
  const cleanedValue = input.replace(/[^0-9.]/g, '')

  const amountNumber = parseFloat(cleanedValue)
  const { currency } = useCurrency(amountNumber, 'none')
  amount.value = currency.value || '0'

  state.value.amount = Math.round(amountNumber * 100) / 100
}

const onSubmit = async () => {
  if (form.value.errors.length) return
  const body: RequestGenQRCode = {
    amount: state.value.amount,
    bankName: 'THPAY',
    serviceId: cashierStore.askmepaySerivce?.serviceID!,
    redirectUrl: window.location.origin,
    type: cashierStore.askmepaySerivce?.network!,
    pin: '',
    serial: '',
  }

  try {
    isLoading.value = true
    const { status, data, message } = await useGenerateQrcodeAskmepay(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        qrCodeData.value = data
        if (qrCodeData.value.representType === 'QR') {
          startCountdown()
        }
        isQrCode.value = true
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const resetState = () => {
  qrCodeData.value = undefined
  isQrCode.value = false
  state.value = { ...initialState }
  clearCountdown()
}

onUnmounted(() => {
  resetState()
})
</script>
