<template>
  <div
    class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between space-x-1 col-span-2">
      <div class="flex items-center text-sm">
        {{ item.date }}
      </div>

      <div>
        <UBadge :color="statusColor">{{
          item.wallet
        }}</UBadge>
      </div>
    </div>

    <div class="flex items-center justify-end text-sm">
      {{ currency }}
      <NuxtImg v-if="item.wallet === 'CREDIT'" src="/assets/images/coin.webp" alt="credit" class="w-6" />
      <NuxtImg v-else src="/assets/images/diamond.svg" alt="diamond" class="w-6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { string } from 'zod';
import type { DepositSpecialTransRecord } from '~/models/transactions.model'
const { useCurrency } = useFormatter()

const props = defineProps({
  item: {
    type: Object as PropType<DepositSpecialTransRecord>,
    required: true,
  },
})

const statusColor = computed(() => {
  switch (props.item.wallet) {
    case 'CREDIT':
      return 'amber'
    default:
      return 'sky'
  }
})

const currency = computed(() => {
  let rawCredit = 0
  if (props.item.amount) {
    rawCredit = props.item.amount
  }
  const { currency } = useCurrency(rawCredit)
  return currency.value.replace('฿', '').trim()
})
</script>
