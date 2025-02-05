<template>
  <UModal
    v-model="isOpen"
    :overlay="true"
    :ui="{
      container: 'items-center',
      width: 'w-[300px]',
    }"
    prevent-close
  >
    <UCard>
      <UButton
        color="cyan"
        variant="ghost"
        class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0"
        @click="isOpen = false"
        ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
      /></UButton>
      <div class="flex flex-col justify-center">
        <div class="flex justify-center my-2">
          <NuxtImg src="/assets/images/logo.png" alt="logo" class="w-32" />
        </div>

        <template v-if="currentStep === 0">
          <UForm
            class="mt-6"
            :state="state"
            :schema="loginSchema"
            ref="form"
            @submit.prevent="onSubmit"
            :validateOn="['submit']"
          >
            <AppFormGroup
              :label="$t('phone_number')"
              :required="true"
              name="phone"
            >
              <UInput
                icon="i-heroicons-user"
                type="text"
                size="lg"
                inputmode="numeric"
                autofocus
                autocomplete
                v-model="state.phone"
              />
            </AppFormGroup>

            <UButton
              type="submit"
              class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
              :loading="authStore.isLoading"
              :disabled="authStore.isLoading"
              >{{ $t('btn_submit') }}</UButton
            >
          </UForm>
        </template>

        <template v-else>
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="relative">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-16 h-16 text-primary"
              />
              <UIcon
                name="i-heroicons-check-circle"
                class="w-12 h-12 animate-ping absolute top-2 right-2 text-primary"
              />
            </div>
            <p class="mb-6">
              {{ $t('new_password_sent_to', { phone: state.phone }) }}
            </p>
          </div>

          <UButton
            type="but"
            class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
            @click="swicthToLogin"
            >{{ $t('btn_submit') }}</UButton
          >
        </template>
      </div>

      <p
        class="text-center text-sm font-light text-gray-700 dark:text-gray-100 pt-4"
      >
        {{ $t('do_not_have_account') }}
        <ULink
          as="button"
          active-class="text-primary"
          inactive-class="text-base text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-200"
          @click="swicthToRegister"
        >
          {{ $t('register_now') }}
        </ULink>
      </p>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { RequestForgotPass } from '~/models/default.model'
const { t } = useI18n()
const popupStore = usePopupStore()
const authStore = useAuthStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const currentStep = ref<number>(0)
const form = ref()
const initialState: RequestForgotPass = {
  phone: undefined,
}
const state = ref({
  ...initialState,
})

const loginSchema = z.object({
  phone: z.string({ required_error: t('required_phone') }),
})

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    authStore.isLoading = true
    const { status, message } = await useForgotPassword(state.value)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      currentStep.value = 1
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    authStore.isLoading = false
  }
}

const swicthToLogin = () => {
  popupStore.closeModalForgotPassword()
  setTimeout(() => {
    popupStore.openModalLogin()
    resetForm()
  }, 500)
}

const swicthToRegister = () => {
  popupStore.closeModalForgotPassword()
  setTimeout(() => popupStore.openModalRegister(), 500)
}

const resetForm = () => {
  currentStep.value = 0
  state.value = { ...initialState }
  form.value.clear()
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  },
})
</script>
