<template>
  <div
    :class="[isActive(item.to) ? tabActiveColor : '', size]"
    class="relative p-2 sm:p-3 flex items-center gap-2 sm:gap-3 menu-btn-inactive"
  >
    <div
      v-if="props.item.recommend"
      class="absolute -top-2 right-2 sm:right-4 animate-blinkGlowRed border border-red-700 rounded-full px-2"
    >
      <p class="text-xs text-white">{{ props.item.recommend_label }}</p>
    </div>
    <div class="w-16 sm:w-20 flex justify-center shrink-0">
      <NuxtImg
        :src="item.image"
        :alt="item.name"
        :class="[isActive(item.to) && 'animate-mini-bounce']"
        class="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        loading="lazy"
      />
    </div>
    <div class="min-w-0 flex-1">
      <p
        :class="[isActive(item.to) && '!text-gray-50']"
        class="text-sm sm:text-base text-gray-100"
      >
        {{ $t(item.label) }}
      </p>
      <p class="mt-1 text-xs sm:text-sm text-gray-300/80 leading-snug">
        {{ $t(item.description) }}
      </p>
    </div>
  </div>
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

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  size: {
    type: String,
    default: 'w-full min-h-20',
  },
})

const tabActiveColor = computed(() => 'menu-btn-active')

const isActive = (to: ChannelType) => {
  return cashierStore.idSelect == to
}
</script>
