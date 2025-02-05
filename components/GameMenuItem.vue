<template>
  <div
    :class="[isActive(item.to) && tabActiveColor]"
    class="relative h-12 w-20 sm:w-24 sm:h-16 lg:w-32 lg:h-24 p-1 sm:p-2 lg:p-4 flex flex-col flex-nowrap items-center justify-center gap-1 tab-menu my-4"
  >
    <NuxtImg
      :src="item.image"
      :alt="item.name"
      :class="[isActive(item.to) && 'animate-mini-bounce']"
      class="w-16 h-16 lg:w-24 lg:h-24 object-contain absolute -top-8 sm:-top-7 lg:-top-9 transition-all duration-500 hover:scale-125"
      loading="lazy"
    />
    <div class="h-5 lg:h-10"></div>
    <p
      :class="[isActive(item.to) && '!text-gray-50']"
      class="text-center lg:text-left text-xs sm:text-sm lg:text-base text-gray-500"
    >
      {{ $t(item.label) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

type Item = {
  name: string
  label: string
  image: string
  to: string
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  color: {
    type: String,
    default: 'amber',
  },
})

const tabActiveColor = computed(() => {
  switch (props.color) {
    case 'amber':
      return 'tab-active-amber'
    case 'sky':
      return 'tab-active-sky'
    case 'rose':
      return 'tab-active-rose'
    case 'green':
      return 'tab-active-green'
    case 'red':
      return 'tab-active-red'
    case 'orange':
      return 'tab-active-orange'
    default:
      return 'tab-active-amber'
  }
})

const isActive = (path: string) => {
  const rountePath = route.path.split('/').slice(0, 2).join('/')
  return rountePath == path
}
</script>
