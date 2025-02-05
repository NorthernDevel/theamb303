<template>
  <div
    :class="[isActive(item.to) && tabActiveColor]"
    class="relative w-full h-16 lg:h-14 p-1 sm:p-2 flex flex-col lg:flex-row flex-nowrap items-center justify-center space-y-1 lg:space-x-1 tab-menu"
  >
    <AppChip v-if="isShowChip" />
    <NuxtImg
      :src="item.image"
      :alt="item.name"
      :class="[isActive(item.to) && 'animate-mini-bounce']"
      class="w-8 h-8 lg:w-10 lg:h-10 object-contain"
      loading="lazy"
    />
    <p
      :class="[isActive(item.to) && '!text-gray-50']"
      class="text-center lg:text-left text-xs md:text-sm lg:text-base text-gray-500"
    >
      {{ $t(item.label) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const navStore = useNavStore()
const profileStore = useProfileStore()
const bankStore = useBankStore()

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
  useRoute: {
    type: Boolean,
    default: true,
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
  if (props.useRoute) {
    const rountePath = route.path.split('/').slice(0, 2).join('/')
    return rountePath == path
  }
  return navStore.currentMenu == path
}

const isShowChip = computed(() => {
  if (props.item.name === 'cashier' && !bankStore.isCustomerAccount) return true

  if (
    props.item.name === 'transfer-wallet' &&
    profileStore.userData?.walletCash
  )
    return true
})
</script>

<style scoped>

</style>
