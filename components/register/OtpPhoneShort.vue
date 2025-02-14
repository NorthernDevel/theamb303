<template>
  <UForm
    class="mt-6"
    :state="registerStore.stateOne"
    :schema="registerStore.otpPhoneShortSchema"
    @submit.prevent="registerStore.requestOtp"
    autocomplete="off"
  >
    <AppFormGroup :label="$t('username_tel')" :required="true" name="username">
      <UInput
        icon="i-heroicons-user"
        type="text"
        size="lg"
        inputmode="numeric"
        v-model="registerStore.stateOne.username"
        autofocus
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

<script setup lang="ts">
const registerStore = useRegisterStore()
const passwordVisibility = usePasswordVisibility()
</script>
