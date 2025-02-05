<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center justify-center w-full">
      <div
        class="rounded-xl border-4 w-full py-2 flex flex-col items-center justify-center bg-zinc-100 dark:border-gray-500 dark:bg-gray-800"
      >
        <div class="">{{ $t('txt_income') }}</div>
        <div class="cashback text-5xl text-green-600 dark:text-green-400">
          {{ credit }}
        </div>

        <UButton
          v-if="affiliateData?.credit !== undefined"
          icon="i-heroicons-banknotes"
          size="sm"
          class="mt-4 mb-2 login-btn rounded-full"
          :disabled="affiliateData?.credit === 0"
          >{{ $t('withdraw_wallet') }}</UButton
        >
      </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full">
      <UTabs
        v-model="activeTab"
        :items="historyCreditList"
        class="w-full mt-4"
      />
      <MultipleTransaction :channel="TransactionChannel.AFFILIATE" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PreviewTakeAffiliateCreditData } from '~/models/affiliate.model'
import { TransactionChannel } from '~/models/transactions.model';

const { t } = useI18n()
const { useCurrency } = useFormatter()
const popupStore = usePopupStore()

const isLoading = ref(false)
const activeTab = ref<number>(0)
const affiliateData = ref<PreviewTakeAffiliateCreditData>()
const totalRecord = ref(0)
const historyCreditList = [
  {
    name: 'receive',
    label: t('history_short'),
    icon: 'i-heroicons-clock',
  },
]

const credit = computed(() => {
  let rawCredit = 0
  if(affiliateData.value && affiliateData.value.credit) {
    rawCredit = affiliateData.value.credit
  }
  const { currency } = useCurrency(rawCredit)
  return currency
})

const getCredit = async () => {
  try {
    isLoading.value = true
    totalRecord.value = 0
    const { status, message, data } = await usePreviewTakeAffiliateCredit()
    if (!status) {
      popupStore.alertError({ message: message })
      affiliateData.value = undefined
    } else {
      if (data && data.credit) {
        affiliateData.value = data
      } else {
        affiliateData.value = undefined
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getCredit()
})
</script>