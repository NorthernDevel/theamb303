<template>
  <div class="flex flex-col items-center justify-center">
    <UForm
      class="mt-2 w-60 sm:w-72"
      :state="state"
      :schema="couponSchema"
      ref="form"
      @submit.prevent="onSubmit"
      :validateOn="['submit']"
    >
      <AppFormGroup :label="$t('coupon_code')" :required="true" name="conpon">
        <UInput
          :type="'text'"
          class="grow"
          v-model="state.conpon"
          style="text-align: center"
        />
      </AppFormGroup>

      <UButton
        type="submit"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
        :loading="isLoading"
        :disabled="isLoading"
        >{{ t('btn_apply') }}</UButton
      >
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { RequestCouponToProduct } from '~/models/default.model'

const { t } = useI18n()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])

const form = ref()
const isLoading = ref(false)
const initialState: CouponCode = {
  conpon: undefined,
}
type CouponCode = {
  conpon: string | undefined
}
const state = ref({
  ...initialState,
})

const couponSchema = z.object({
  conpon: z
    .string({ required_error: t('required_coupon') })
    .refine((conpon) => conpon, {
      message: t('required_coupon'),
    }),
})

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    const { conpon } = state.value
    const body: RequestCouponToProduct = {
      recordId: conpon!,
    }
    isLoading.value = true
    const { status, message } = await useCouponToProduct(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
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

const resetForm = () => {
  state.value = { ...initialState }
}

onUnmounted(() => resetForm())
</script>
