<template>
  <UModal
    :appear="onOpen(isOpen)"
    v-model="isOpen"
    :overlay="true"
    :ui="{
      container: 'items-center',
      width: 'w-[330px]',
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

        <div class="mt-5">
          <AppProgress
            :task="registerStore.currentStep"
            :steps="registerStore.steps"
          />
        </div>
        <template v-if="registerStore.currentStep === 0">
          <UForm
            class="mt-6"
            :state="registerStore.stateOne"
            :schema="registerStore.stateOneSchema"
            @submit.prevent="registerStore.requestOtp"
            autocomplete="off"
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
                v-model="registerStore.stateOne.username"
                autofocus
              />
            </AppFormGroup>

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
                  v-model="registerStore.stateOne.password"
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

            <AppFormGroup
              :label="$t('register_recommend')"
              :required="true"
              name="recommend"
            >
              <USelectMenu
                size="lg"
                v-model="registerStore.stateOne.recommend"
                :options="registerStore.recommendNames"
              />
            </AppFormGroup>

            <UButton
              type="submit"
              class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
              :loading="registerStore.isLoading"
              :disabled="registerStore.isLoading"
              >{{ $t('btn_submit') }}</UButton
            >
          </UForm>
        </template>

        <template v-if="registerStore.currentStep === 1">
          <UForm
            class="mt-6"
            :state="registerStore.stateTwo"
            :schema="registerStore.stateTwoSchema"
            @submit.prevent="registerStore.onSubmit"
          >
            <AppFormGroup
              :label="$t('register_otp')"
              :required="true"
              :hint="'REF: ' + registerStore.otpRef"
              name="verifyRef2"
              :error="registerStore.otpError"
            >
              <PinInputRoot
                id="pin-input"
                v-model="registerStore.pinArray"
                class="flex gap-2 items-center mt-1"
                @complete="registerStore.verifyOtp()"
              >
                <PinInputInput
                  v-for="(id, index) in 6"
                  :key="id"
                  :index="index"
                  inputmode="numeric"
                  class="w-10 h-10 text-gray-800 bg-gray-200 rounded text-center shadow-lg text-green10 placeholder:text-mauve8 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
                />
              </PinInputRoot>
            </AppFormGroup>
            <UDivider />
            <p class="text-sm font-light text-gray-700 dark:text-gray-100 py-4">
              {{ $t('register_request_otp') }}
              <ULink
                as="button"
                active-class="text-primary"
                inactive-class="text-amber-500 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-200"
                class="font-normal"
                @click="
                  registerStore.isTimeUp ? registerStore.reCallOtp() : null
                "
              >
                <div v-if="!registerStore.isTimeUp">
                  {{ registerStore.formattedTime }} {{ $t('minutes') }}
                </div>
                <div v-else>{{ $t('register_new_otp') }}</div>
              </ULink>
            </p>
            <UButton
              type="submit"
              class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
              :loading="registerStore.isLoading"
              :disabled="registerStore.isLoading"
              >{{ $t('btn_submit') }}</UButton
            >
          </UForm>
        </template>

        <template v-if="registerStore.currentStep === 2">
          <h2 class="text-center text-2xl font-ligh py-4">
            {{ $t('register_welcome') }}
            <UIcon name="i-heroicons-academic-cap" class="w-5 h-5" />
          </h2>
          <div class="font-light text-sm text-center pb-4">
            <p>
              {{ $t('username') }}: {{ registerStore.credential?.username }}
            </p>
            <p>
              {{ $t('password') }}: {{ registerStore.credential?.password }}
            </p>
          </div>

          <UButton
            icon="i-heroicons-arrow-right-end-on-rectangle"
            class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
            :loading="authStore.isLoading"
            :disabled="registerStore.isLoading"
            @click="autoSignIn()"
            >{{ $t('sign_in') }}</UButton
          >
        </template>

        <p
          v-if="registerStore.currentStep !== 2"
          class="text-center text-sm font-light text-gray-700 dark:text-gray-100 pt-4"
        >
          {{ $t('register_already_account') }}
          <ULink
            as="button"
            active-class="text-primary"
            inactive-class="text-base text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200"
            @click="swicthToLogin"
          >
            {{ $t('sign_in') }}
          </ULink>
        </p>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const { t } = useI18n()
const popupStore = usePopupStore()
const authStore = useAuthStore()
const registerStore = useRegisterStore()
const passwordVisibility = usePasswordVisibility()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const onOpen = (isOpen: boolean) => {
  if (isOpen) registerStore.fetchRecommendList()
  return isOpen
}

const autoSignIn = async () => {
  if (registerStore.credential) {
    try {
      authStore.isLoading = true
      const { status, message } = await authStore.signIn(
        registerStore.credential
      )
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        popupStore.alertSuccess({
          title: t('successfull'),
          onConfirm: () => {
            popupStore.closeModalLogin()
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
}

const swicthToLogin = () => {
  popupStore.closeModalRegister()
  setTimeout(() => popupStore.openModalLogin(), 500)
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) {
      registerStore.resetForm()
      registerStore.clearCountdown()
    }
    emit('update:modelValue', value)
  },
})
</script>
