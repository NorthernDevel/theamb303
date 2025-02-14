<template>
  <UForm
    class="mt-6"
    :state="registerStore.stateOne"
    :schema="registerStore.userByPhoneSchema"
    @submit.prevent="registerStore.verifyCaptcha"
    autocomplete="off"
  >
    <AppFormGroup :label="$t('username')" :required="true" name="username">
      <UInput
        icon="i-heroicons-user"
        type="text"
        size="lg"
        inputmode="numeric"
        v-model="registerStore.stateOne.username"
        autofocus
      />
    </AppFormGroup>

    <AppFormGroup :label="$t('phone_number')" :required="true" name="tel">
      <UInput
        icon="i-heroicons-phone"
        type="text"
        size="lg"
        inputmode="numeric"
        v-model="registerStore.stateOne.tel"
      />
    </AppFormGroup>

    <AppFormGroup :label="$t('password')" :required="true" name="password">
      <UButtonGroup size="lg" orientation="horizontal" class="w-full">
        <UInput
          icon="i-heroicons-key"
          :type="
            passwordVisibility.isPasswordVisible.value ? 'text' : 'password'
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
      :label="$t('register_captcha')"
      :required="true"
      name="verifyRef2"
    >
      <UInput
        icon="i-heroicons-finger-print-solid"
        type="text"
        size="lg"
        inputmode="numeric"
        v-model="registerStore.stateOne.verifyRef2"
      />
    </AppFormGroup>

    <div v-if="captchaImage" class="flex justify-center mb-8">
      <div
        class="relative border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50"
      >
        <NuxtImg :src="captchaImage" alt="captcha" class="w-48 p-1" />
        <UIcon
          name="i-heroicons-arrow-path-16-solid"
          @click="refreshCaptcha"
          class="w-6 h-6 absolute right-1 bottom-1 text-blue-600"
        />
      </div>
    </div>
    
    <UButton
      type="submit"
      class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
      :loading="registerStore.isLoading"
      :disabled="registerStore.isLoading"
      >{{ $t('btn_submit') }}</UButton
    >
  </UForm>
</template>

<script setup lang="ts">
const registerStore = useRegisterStore()
const passwordVisibility = usePasswordVisibility()

const captchaImage = computed(() => registerStore.captchaImage)

const refreshCaptcha = () => registerStore.getCaptcha()

onMounted(() => registerStore.getCaptcha())
</script>
