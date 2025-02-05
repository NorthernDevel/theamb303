<template>
  <div v-if="!bankStore.isCustomerAccount">
    <div class="flex flex-col items-center justify-center">
      <h3 class="text-2xl mb-4">{{ $t('cashier_update_bank') }}</h3>
      <div
        class="w-60 sm:w-72 border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mb-4"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex items-center gap-2 text-green-600 dark:text-green-500"
          >
            <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10" />
            <p class="text-sm">
              {{ $t('please_enter_bank_information') }}
            </p>
          </div>
        </div>
      </div>
      <UForm
        class="mt-2 w-60 sm:w-72"
        :state="state"
        :schema="updateBankSchema"
        ref="form"
        @submit.prevent="onSubmit"
        :validateOn="['submit']"
      >
        <AppFormGroup
          :label="$t('cashier_enter_name')"
          :required="true"
          name="firstName"
        >
          <UInput
            icon="i-heroicons-user"
            type="text"
            size="lg"
            v-model="state.firstName"
            autofocus
          />
        </AppFormGroup>

        <AppFormGroup
          :label="$t('cashier_enter_surname')"
          :required="true"
          name="lastName"
        >
          <UInput
            icon="i-heroicons-user"
            type="text"
            size="lg"
            v-model="state.lastName"
          />
        </AppFormGroup>

        <AppFormGroup
          :label="$t('cashier_bank')"
          :required="true"
          name="bankName"
        >
          <USelectMenu
            icon="i-heroicons-building-library"
            v-model="state.bankName"
            :options="bankStore.bankList"
            value-attribute="id"
            size="lg"
          >
            <template #option="{ option: bank }">
              <UAvatar v-bind="bank.avatar" size="sm" />
              <span class="truncate text-base">{{ bank.label }}</span>
            </template>
          </USelectMenu>
        </AppFormGroup>

        <AppFormGroup
          :label="$t('cashier_bank_account')"
          :required="true"
          name="accountNo"
        >
          <UInput
            icon="i-heroicons-book-open"
            type="text"
            size="lg"
            inputmode="numeric"
            v-model="state.accountNo"
          />
        </AppFormGroup>

        <UButton
          type="submit"
          class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
          :loading="isLoading"
          :disabled="isLoading"
          >{{ $t('btn_submit') }}</UButton
        >
      </UForm>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col items-center justify-center">
      <div class="flex justify-evenly w-full">
        <UIcon
          v-if="cashierStore.isSelectedChannel"
          name="i-heroicons-chevron-left-20-solid"
          class="w-8 h-8 cursor-pointer"
          @click="cashierStore.previousPage"
        />
        <div class="flex-grow text-center">
          <h3 class="text-2xl mb-4">{{ cashierStore.title }}</h3>
        </div>
        <div v-if="cashierStore.isSelectedChannel" class="w-8"></div>
      </div>
      <UTabs
        v-if="!cashierStore.isSelectedChannel"
        v-model="cashierStore.activeTab"
        :items="cashierStore.tabList"
        class="w-full"
      >
        <template #icon="{ item, selected }">
          <UIcon
            :name="item.icon"
            class="w-4 h-4 flex-shrink-0 mr-2 hidden sm:inline-block"
            :class="[selected && 'text-amber-500 dark:text-amber-400']"
          />
        </template>
      </UTabs>

      <CashierDeposit
        v-if="cashierStore.activeTab === 0"
        :is-loading="isLoading"
      />
      <CashierWithdraw v-if="cashierStore.activeTab === 1" />
      <CashierHistory v-if="cashierStore.activeTab === 2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { RequestUpdateBank } from '~/models/default.model'
import type { ServiceAskmepayData } from '~/models/service-ask.model'

const cashierStore = useCashierStore()
const resourceStore = useResourceStore()
const profileStore = useProfileStore()
const bankStore = useBankStore()
const popupStore = usePopupStore()
const { t } = useI18n()

const form = ref()
const isLoading = ref(false)

const initialState: RequestUpdateBank = {
  bankName: undefined,
  accountNo: undefined,
  firstName: undefined,
  lastName: undefined,
  middleName: '',
  isAutoPromotion: true,
}

const state = ref({
  ...initialState,
})

const updateBankSchema = z.object({
  firstName: z.string({ required_error: t('cashier_enter_name') }),
  lastName: z.string({ required_error: t('cashier_enter_surname') }),
  bankName: z.string({ required_error: t('cashier_select_bank') }),
  accountNo: z
    .string({ required_error: t('cashier_enter_bank_account') })
    .min(9, {
      message: t('cashier_number_incorrect'),
    })
    .max(20, { message: t('cashier_number_incorrect') })
    .refine((accountNo) => /^\d+$/.test(accountNo), {
      message: t('cashier_numeric_only'),
    }),
})

const getAllServiceAskmepay = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useAllServiceAskmepay({
      type: '',
    })
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        cashierStore.askmepayData = data
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
    const { status, message } = await useUpdateBank(state.value)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
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

const resetForm = () => {
  state.value = { ...initialState }
}

onMounted(() => {
  resourceStore.getResoures()
  if (bankStore.isCustomerAccount) {
    if (resourceStore.isDeposit) {
      // GET ALL SERVICE ARKMEPAY
      getAllServiceAskmepay()
    }
  }
})

onBeforeUnmount(() => {
  cashierStore.clear()
  resetForm()
})
</script>
