<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('password_change') }}</h3>
    <UForm
      class="mt-2 w-60 sm:w-72"
      :state="state"
      :schema="changePasswordSchema"
      ref="form"
      @submit.prevent="onSubmit"
      :validateOn="['submit']"
    >
      <AppFormGroup
        :label="$t('password_current')"
        :required="true"
        name="oldPassword"
      >
        <UButtonGroup size="lg" orientation="horizontal" class="w-full">
          <UInput
            icon="i-heroicons-key"
            :type="
              oldPassVisibility.isPasswordVisible.value ? 'text' : 'password'
            "
            v-model="state.oldPassword"
            class="grow"
          />
          <UButton
            :icon="oldPassVisibility.icon.value"
            color="gray"
            class="rounded-none rounded-r-md -me-2.5"
            @click="oldPassVisibility.togglePasswordVisibility"
          />
        </UButtonGroup>
      </AppFormGroup>

      <AppFormGroup :label="$t('password_new')" :required="true" name="password">
        <UButtonGroup size="lg" orientation="horizontal" class="w-full">
          <UInput
            icon="i-heroicons-key"
            :type="passVisibility.isPasswordVisible.value ? 'text' : 'password'"
            v-model="state.password"
            class="grow"
          />
          <UButton
            :icon="passVisibility.icon.value"
            color="gray"
            class="rounded-none rounded-r-md -me-2.5"
            @click="passVisibility.togglePasswordVisibility"
          />
        </UButtonGroup>
      </AppFormGroup>

      <AppFormGroup
        :label="$t('password_confirm')"
        :required="true"
        name="confirmPassword"
      >
        <UButtonGroup size="lg" orientation="horizontal" class="w-full">
          <UInput
            icon="i-heroicons-key"
            :type="
              confirmPassVisibility.isPasswordVisible.value
                ? 'text'
                : 'password'
            "
            v-model="state.confirmPassword"
            class="grow"
          />
          <UButton
            :icon="confirmPassVisibility.icon.value"
            color="gray"
            class="rounded-none rounded-r-md -me-2.5"
            @click="confirmPassVisibility.togglePasswordVisibility"
          />
        </UButtonGroup>
      </AppFormGroup>

      <UButton
        type="submit"
        class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
        :loading="isLoading"
        :disabled="isLoading"
        >{{ $t('password_change') }}</UButton
      >
    </UForm>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import { z } from 'zod'
import type { RequestChangePassword } from '~/models/default.model'

type ChangePassword = {
  oldPassword: string | undefined
  password: string | undefined
  confirmPassword: string | undefined
}

const authStore = useAuthStore()
const popupStore = usePopupStore()
const oldPassVisibility = usePasswordVisibility()
const passVisibility = usePasswordVisibility()
const confirmPassVisibility = usePasswordVisibility()

const form = ref()
const isLoading = ref(false)
const initialState: ChangePassword = {
  oldPassword: undefined,
  password: undefined,
  confirmPassword: undefined,
}

const state = ref({
  ...initialState,
})

const changePasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: t('required_old_password') }),
    password: z
      .string({ required_error: t('required_password') })
      .min(8, {
        message: t('required_least_char'),
      })
      .max(20, { message: t('required_exceed_char') })
      .refine((password) => /[A-Z]/.test(password), {
        message: t('required_upper_lower'),
      })
      .refine((password) => /[a-z]/.test(password), {
        message: t('required_upper_lower'),
      }),
    confirmPassword: z.string({ required_error: t('required_pass_confirm') }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t('required_pass_match'),
    path: ['confirmPassword'],
  })

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    const { oldPassword, password } = state.value
    const body: RequestChangePassword = {
      oldPassword: oldPassword!,
      password: password!,
    }
    isLoading.value = true
    const { status, message } = await useChangePassword(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
        onClick: async () => {
          resetForm()
          popupStore.closeModalProfile()
          await authStore.signOut()
          setTimeout(() => {
            popupStore.openModalLogin()
          }, 1000)
        },
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
