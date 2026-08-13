<template>
  <button
    v-if="item.enabled"
    type="button"
    class="w-full text-left"
    @click="onSelectedChannel(item.to)"
  >
    <CashierDepositButtonItem :item="item" :size="size" />
  </button>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

type Item = {
  name: string
  label: string
  description: string
  image: string
  to: ChannelType
  recommend: boolean
  recommend_label: string
  enabled: boolean
}
defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  size: {
    type: String,
    default: 'w-28 sm:w-40 h-20',
  },
})

const onSelectedChannel = (id: ChannelType) => {
  cashierStore.idSelect = id
  cashierStore.isSelectedChannel = true
}


</script>
