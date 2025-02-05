<template>
  <div
    v-if="item.active && props.item.productCode !== 'T24S'"
    class="group relative bg-gray-900 rounded-lg cursor-pointer transition-all duration-200"
    :class="[
      [isFirst && 'row-span-2 col-span-2'],
      [!isProvider && 'hover:scale-105'],
    ]"
  >
    <div>
      <div
        v-if="item.rtp"
        class="absolute right-0 w-full flex justify-end bg-gray-800 bg-opacity-50 rounded-t-md px-2 py-[2px] z-10"
      >
        <UIcon
          name="i-heroicons-fire-16-solid"
          class="w-4 h-4 mr-1"
          :class="winRate.color"
        />
        <p class="text-[8px] sm:text-[10px] text-gray-100 dark:text-gray-100">
          {{ winRate.text }}
          <span class="font-extralight">{{ percentage }}%</span> RTP
        </p>
      </div>
      <NuxtImg
        class="rounded-md w-full min-h-20 object-cover group-hover:brightness-75"
        :src="gameImage"
      />
      <div
        class="w-full flex items-center justify-between h-6 bg-gray-800 bg-opacity-70 absolute bottom-0 rounded-b-md"
      >
        <p
          :class="[!isProvider && 'max-w-[75%]']"
          class="text-xs sm:text-sm text-gray-100 dark:text-gray-100 truncate px-2"
        >
          {{ gameName }}
        </p>
        <div v-if="!isProvider" class="z-10" @click="toggleFavorite(item)">
          <NuxtImg
            :src="favoriteIcon"
            class="w-7 h-7 object-cover transition-all duration-500 hover:scale-125 mr-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full h-full text-gray-300 dark:text-gray-300 absolute top-0 hidden group-hover:flex justify-center items-center"
    >
      <div
        class="w-20 h-20 sm:w-24 sm:h-24 lg:w-20 lg:h-20 bg-gray-900 bg-opacity-60 hover:bg-opacity-90 rounded-full flex items-center justify-center"
        @click="gameSelected()"
      >
        <UIcon
          name="i-heroicons-play-solid"
          class="w-16 h-16 sm:w-16 sm:h-16 lg:w-12 lg:h-12 opacity-50 hover:opacity-90"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GamesList } from '~/models/games.model'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const gameStore = useGameStore()
const popupStore = usePopupStore()
const navStore = useNavStore()

const props = defineProps({
  index: Number,
  item: {
    type: Object as PropType<GamesList>,
    required: true,
  },
  isProvider: { type: Boolean, default: false },
})

const isFirst = computed(() => props.index === 0)

const gameName = computed(() => props.item.gameName || props.item.productName)

const gameImage = computed(() => {
  if (props.item.productCode === 'T24S' || props.item.productCode === 'NFK')
    return props.item.logo.askmepage
  return (
    props.item.logo.vertical ||
    props.item.logo.horizontal ||
    props.item.logo.banner
  )
})

const percentage = computed(() => {
  if (!props.item.rtp) return '00.00'
  return (props.item.rtp + 6).toFixed(2)
})

const winRate = computed(() => {
  if (!props.item.rtp) return { text: 'Megawin', color: 'text-green-500' }
  if (props.item.rtp < 88) return { text: 'Megawin', color: 'text-green-500' }
  if (props.item.rtp >= 88 && props.item.rtp < 96)
    return { text: 'Superwin', color: 'text-blue-500' }
  return { text: 'Bigwin', color: 'text-red-500' }
})

const favoriteIcon = computed(() => {
  if (route.params.id === 'favorites') return '/assets/images/star-remove.webp'
  const icon = props.item.isFavorite
    ? '/assets/images/star-check.webp'
    : '/assets/images/star-add.webp'
  return icon
})

const toggleFavorite = (item: GamesList) => {
  if (authStore.isAuthenticated) {
    if (item.isFavorite) {
      popupStore.alertConfirm({
        message: t('remove_from_favorite'),
        preventClose: true,
        onConfirm: () => {
          props.item.isFavorite = false
          gameStore.deleteGameFavorite(item.loginCode!)
        },
      })
    } else {
      props.item.isFavorite = true
      gameStore.addGameFavorite(item.loginCode!)
    }
  } else {
    popupStore.openModalLogin()
  }
}

const gameSelected = () => {
  if (props.isProvider) {
    const { type, productCode } = props.item
    const typeLowerCase = type!.toLowerCase()
    const path = navStore.mutationPath.find((item) =>
      Object.keys(item).some((key) => key === typeLowerCase)
    )
    const navigate = path ? Object.values(path)[0] : typeLowerCase
    router.push(`/${navigate}/${productCode}`)
  } else {
    if (authStore.isAuthenticated) {
      const { type, productCode, loginCode } = props.item
      const baseURL = window.location.origin
      const features =
        'toolbar=no,scrollbars=yes,resizable=yes,width=' +
        screen.width +
        ',height=' +
        screen.height
      window.open(
        `${baseURL}/redirect?type=${type}&product=${productCode}&gameID=${loginCode}&isMobile=true`,
        '_blank',
        features
      )
    } else {
      popupStore.openModalLogin()
    }
  }
}
</script>
