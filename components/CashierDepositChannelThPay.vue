<template>
  <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
    <div
      v-if="cashierStore.thpayIsDisabled"
      class="theme-error-box w-full flex flex-col justify-center items-center text-center"
    >
      <p>ขณะนี้ระบบ THPAY ปิดให้บริการ</p>
      <p>กรุณาเลือกใช้ช่องทางอื่น</p>
    </div>
    <template v-else>
        <div
          v-if="!isQrCode && !cashierStore.amountIsSlipAndThpay"
          class="w-full"
        >
        <div class="theme-panel w-full p-4">
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
                  v-model="state.amount"
                  v-on:blur="onBlur"
                >
                  <template #trailing>
                    <span class="text-amber-200/70 text-xs">{{
                      profileStore.currency
                    }}</span>
                  </template>
                </UInput>
              </AppFormGroup>

              <p
                class="font-light text-sm text-amber-100/80 before:content-['*'] before:text-rose-400"
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
                class="theme-primary-btn w-full h-12 justify-center text-lg mt-2"
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
        <teleport to="body">
          <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="qrCodeData"
              class="fixed inset-0 flex items-center justify-center z-[60] bg-black/75"
            >
              <UCard
                :ui="{
                  body: { base: 'h-[90%]', padding: 'py-0 sm:p-0' },
                }"
                class="relative w-[400px] h-full md:w-[510px] md:max-w-[680px] u-card-bg"
              >
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="theme-title text-xl font-semibold leading-6">
                      THPAY
                    </h3>
                    <UButton
                      color="white"
                      variant="ghost"
                      class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 text-amber-200 focus-visible:ring-0"
                      @click="onClosePopupAskmepay()"
                      ><UIcon
                        name="i-heroicons-x-mark-20-solid"
                        class="w-14 h-14"
                    /></UButton>
                  </div>
                </template>
                <div
                  v-if="qrCodeData.representType === 'REDIRECT'"
                  class="w-full h-full relative"
                >
                  <NuxtLink :to="qrCodeData.qr_link" target="_blank">
                    <UButton
                      :ui="{ rounded: 'rounded-full' }"
                      icon="i-heroicons-arrow-top-right-on-square"
                      color="blue"
                      class="absolute top-1 right-1"
                    />
                  </NuxtLink>
                  <iframe
                    ref="iframeRef"
                    :src="qrCodeData.qr_link"
                    frameborder="0"
                    scrolling="yes"
                    :title="qrCodeData.orderId"
                    class="w-full h-full rounded-lg"
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
                    class="theme-panel flex flex-col items-center justify-center rounded-t-none p-2"
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
                    <p class="font-extralight text-sm text-amber-100/80">
                      {{ $t('capture_qrcode') }}
                    </p>
                    <UDivider :label="$t('or')" class="my-1" />
                    <p class="font-extralight text-sm text-amber-100/80">
                      {{ $t('long_press_for_save_image') }}
                    </p>
                  </div>

                  <div class="theme-panel flex justify-around p-2 mt-2">
                    <div class="w-1/2 flex flex-col items-start justify-center">
                      <p class="theme-label text-sm">{{ $t('time_up_in') }}</p>
                      <p class="theme-title font-medium text-2xl">
                        {{ formattedTime }}
                      </p>
                    </div>
                    <UDivider orientation="vertical" class="mx-1" />
                    <div
                      class="flex-grow flex flex-col items-end justify-center"
                    >
                      <p class="theme-label text-sm">
                        {{ $t('transfer_amount') }}
                      </p>
                      <p class="theme-title font-medium text-2xl">
                        {{ amountTransfer }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <h3 class="theme-title text-center font-semibold">
                      {{ $t('follow_conditions') }}
                    </h3>
                    <div
                      class="font-light text-sm mt-2 space-y-2 text-amber-100/80"
                    >
                      <li>{{ $t('do_not_transfer_again') }}</li>
                      <li>{{ $t('do_not_edit_amount') }}</li>
                      <li>{{ $t('please_wait_a_moment') }}</li>
                      <li>{{ $t('if_not_followed') }}</li>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </transition>
        </teleport>
      </div>
    </template>
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
const resourceStore = useResourceStore()
const { useCurrency, useParseAmount } = useFormatter()
const { formattedTime, startCountdown, clearCountdown, isTimeUp } =
  useCountdownWithMinSec(10, 1)

const isLoading = ref(false)
const isQrCode = ref(false)
const form = ref()
const amount = ref('0')
const qrCodeData = ref<QrcodeAskmepayData>()

const minDeposit = cashierStore.askmepayMinMaxDeposit.minimum
const maxDeposit = cashierStore.askmepayMinMaxDeposit.maximum
const { currency: minCurrency } = useCurrency(minDeposit, 'none')
const { currency: maxCurrency } = useCurrency(maxDeposit, 'none')

const initialState: InitialState = {
  amount: minDeposit || 100,
}

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

  if (!input) {
    amount.value = '0'
    state.value.amount = 0
    return
  }

  const amountNumber = useParseAmount().parseAmount(input)

  amount.value = useParseAmount().formatAmount(amountNumber)

  state.value.amount = amountNumber
}

const generateQrcodeAskmepay = async (depositAmount: number) => {
  const body: RequestGenQRCode = {
    amount: depositAmount,
    bankName: 'THPAY',
    serviceId: cashierStore.askmepaySerivce?.serviceID!,
    redirectUrl: window.location.origin,
    type: cashierStore.askmepaySerivce?.network!,
    pin: '',
    serial: '',
  }

  try {
    isLoading.value = true
    const { status, data, message, code } =
      await useGenerateQrcodeAskmepay(body)
    if (!status) {
      if (String(code) === '9900') {
        if (resourceStore.isDeposit.isAutoSlip) {
          cashierStore.idSelect = 'AUTO_SLIP'
          cashierStore.isSelectedChannel = true
          return
        }

        popupStore.alertError({
          preventClose: true,
          message: 'จำนวนฝากขั้นต่ำไม่ถูกต้อง กรุณาใช้ช่องทางฝากอื่น',
          onCancel: () => cashierStore.backToMainDeposit(),
        })
      } else {
        popupStore.alertError({
          preventClose: true,
          message: message,
          onCancel: () => cashierStore.goExpressDeposit(),
        })
      }
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

const onSubmit = async () => {
  if (form.value.errors.length) return
  await generateQrcodeAskmepay(state.value.amount)
}

const onCancelPopupAskmepay = () => {
  resetState()
  popupStore.alertSuccess({
    message: 'ยกเลิกรายการฝากสำเร็จ',
    preventClose: true,
    onConfirm: () => cashierStore.backToMainDeposit(),
  })
}

const onClosePopupAskmepay = () => {
  resetState()
  cashierStore.goDepositHistory()
}

const resetState = () => {
  qrCodeData.value = undefined
  isQrCode.value = false
  state.value = { ...initialState }
  clearCountdown()
}

onMounted(() => {
  if (cashierStore.amountIsSlipAndThpay) {
    generateQrcodeAskmepay(cashierStore.amountIsSlipAndThpay)
    return
  }

  cashierStore.getP2cDepositPending()
})

onUnmounted(() => {
  resetState()
})
</script>
