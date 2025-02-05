<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
    <div
      v-for="item in gameSports!.games"
      class="group relative cursor-pointer"
      @click="onSelected(item)"
    >
      <NuxtImg
        class="rounded-md w-full min-h-14 group-hover:brightness-75"
        :class="[!item.active && 'grayscale']"
        :src="gameSports!.imageUrl + item.src"
      />
      <div
        v-if="!item.active"
        class="absolute top-0 w-full h-full flex items-center justify-center"
      >
        <p class="text-gray-400 dark:text-gray-400 text-4xl sm:text-5xl lg:text-6xl opacity-40 group-hover:opacity-70">
          COMING SOON
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GameSport } from '~/stores/game'

const router = useRouter()
const authStore = useAuthStore()
const popupStore = usePopupStore()
const navStore = useNavStore()

defineProps({
  gameSports: Object as PropType<GameSport>,
})

const onSelected = (item: GameSportData) => {
  if (authStore.isAuthenticated) {
    if (!item.active) return

    if (item.type === 'ASKMEBET') {
      const baseURL = window.location.origin
      const features =
        'toolbar=no,scrollbars=yes,resizable=yes,width=' +
        screen.width +
        ',height=' +
        screen.height
      window.open(
        `${baseURL}/redirect?type=${item.type}&product=${item.type}&gameID=xxx&isMobile=true`,
        '_blank',
        features
      )
    } else {
      const { type } = item
      const path = navStore.mutationPath.find((item) =>
        Object.keys(item).some((key) => key === 'sport')
      )
      const navigate = path ? Object.values(path)[0] : 'sport'
      router.push(`/${navigate}/${type}`)
    }
  } else {
    popupStore.openModalLogin()
  }
}
</script>
