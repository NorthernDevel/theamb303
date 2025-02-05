<template>
  <div
    class="flex flex-col gap-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <p class="text-gray-400 text-xs">{{ $t('date') }}</p>
        <p class="text-sm">
          {{ dayjs(item.createdDate).format('DD/MM/YYYY HH:mm') }}
        </p>
      </div>
      <div class="flex flex-col">
        <p class="text-right text-gray-400 text-xs">{{ $t('reward_name') }}</p>
        <p class="text-sm">{{ item.nameReward }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <p class="text-gray-400 text-xs">{{ $t('reward_amount') }}</p>
        <p class="text-sm">{{ currency }}</p>
      </div>
      <div class="flex flex-col">
        <p class="text-right text-gray-400 text-xs">
          {{ $t('reward_serial_code') }}
        </p>
        <p class="text-center text-sm">{{ serialCode }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

type RecordProps = {
  amount: number
  createdDate: string
  nameReward: string
  productType: string
  serialCode?: string
}

const { useCurrency } = useFormatter()

const props = defineProps({
  item: {
    type: Object as PropType<RecordProps>,
    required: true,
  },
})
const serialCode = computed(() =>
  props.item.productType === 'COUPON' ? props.item.serialCode : '-'
)

const currency = computed(() => {
  let rewAmount = 0
  if (props.item.amount) {
    rewAmount = props.item.amount
  }
  const { currency } = useCurrency(rewAmount, 'none')
  return currency
})
</script>
