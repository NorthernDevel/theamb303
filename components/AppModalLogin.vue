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

        <UForm
          class="mt-6"
          :state="state"
          :schema="loginSchema"
          ref="form"
          @submit.prevent="onSubmit"
          :validateOn="['submit']"
        >
          <AppFormGroup
            :label="$t('username_tel')"
            :required="true"
            name="username"
          >
            <UInput
              icon="i-heroicons-user"
              type="text"
              size="lg"
              inputmode="numeric"
              autofocus
              autocomplete
              v-model="state.username"
            />
          </AppFormGroup>

          <div>
            <AppFormGroup
              :label="$t('password')"
              :required="true"
              name="password"
            >
              <UButtonGroup size="lg" orientation="horizontal" class="w-full">
                <UInput
                  icon="i-heroicons-key"
                  :type="
                    passwordVisibility.isPasswordVisible.value
                      ? 'text'
                      : 'password'
                  "
                  v-model="state.password"
                  class="grow"
                />
                <UButton
                  :icon="passwordVisibility.icon.value"
                  color="gray"
                  class="rounded-none rounded-r-md -me-2.5"
                  @click="passwordVisibility.togglePasswordVisibility"
                />
              </UButtonGroup>
            </AppFormGroup>
          </div>

          <UButton
            icon="i-heroicons-arrow-right-end-on-rectangle"
            type="submit"
            class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
            :loading="authStore.isLoading"
            :disabled="authStore.isLoading"
            >{{ $t('sign_in') }}</UButton
          >
        </UForm>
        <div class="flex justify-between mt-6">
          <p class="font-light">
            <ULink
              as="button"
              active-class="text-primary"
              inactive-class="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-200"
              @click="swicthToRegister"
            >
              {{ $t('register') }}
            </ULink>
          </p>

          <p class="font-light">
            <ULink
              as="button"
              active-class="text-primary"
              inactive-class="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200"
              @click="swicthToForgotPassword"
            >
              {{ $t('forgot_password') }}
            </ULink>
          </p>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { RequestAuth } from '~/models/auth.model'

const { t } = useI18n()
const { getItem } = useCustomLocalStorage()
const popupStore = usePopupStore()
const authStore = useAuthStore()
const promotionStore = usePromotionStore()
const passwordVisibility = usePasswordVisibility()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const form = ref()
const initialState: RequestAuth = {
  username: undefined,
  password: undefined,
}
const state = ref({
  ...initialState,
})

const loginSchema = z.object({
  username: z.string({ required_error: t('required_username') }),
  password: z.string({ required_error: t('required_password') }),
})

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    authStore.isLoading = true
    const { status, message } = await authStore.signIn(state.value)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
        preventClose: true,
        onConfirm: async () => {
          // NOTE: Fixed on sefari.
          if (authStore.isSafari) {
            window.location.reload()
          } else {
            promotionStore.isDisabledAutoPromotions()
            popupStore.closeModalLogin()
          }
        },
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    authStore.isLoading = false
  }
}

const swicthToRegister = () => {
  popupStore.closeModalLogin()
  setTimeout(() => popupStore.openModalRegister(), 500)
}

const swicthToForgotPassword = () => {
  popupStore.closeModalLogin()
  setTimeout(() => popupStore.openModalForgotPassword(), 500)
}

const resetForm = () => {
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
