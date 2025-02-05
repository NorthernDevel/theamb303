<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('menu_minigame') }}</h3>
    <div v-if="miniGameData && miniGameData.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="(item, key) in miniGameData" :key="key" :item="item" class="relative">
        <div class="group relative bg-gray-900 rounded-lg cursor-pointer mb-3">
          <div>
            <NuxtImg class="w-full h-48 sm:h-36 rounded-md min-h-28 object-cover group-hover:brightness-50"
              :src="miniGameData[key].icon" />
            <div class="w-full flex items-center h-6 bg-gray-800 bg-opacity-70 absolute bottom-0 rounded-b-md">
              <p class="text-xs sm:text-sm text-gray-100 dark:text-gray-100 truncate px-2">
                {{ miniGameData[key].description }}
              </p>
            </div>
          </div>
          <div
            class="w-full h-full text-gray-300 dark:text-gray-300 absolute top-0 hidden group-hover:flex justify-center items-center">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gray-900 bg-opacity-60 hover:bg-opacity-90 rounded-full flex items-center justify-center"
              @click="playGame(miniGameData[key].gameUrl)">
              <UIcon name="i-heroicons-play-solid"
                class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-50 hover:opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMiniGameList } from '~/composables/useMiniGameService';
import type { GameListData } from '~/models/mini-game.model';

const popupStore = usePopupStore()

const isLoading = ref(false)
const miniGameData = ref<GameListData[]>([])

const getMiniGameList = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useMiniGameList()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        miniGameData.value = data
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const playGame = (gameUrl: string) => {
  const token = useCookie('auth_token')
  if (!!token) {
    const features =
      'toolbar=no,scrollbars=yes,resizable=yes,width=' +
      screen.width +
      ',height=' +
      screen.height
    window.open(
      `${gameUrl}${token.value}`,
      '_blank',
      features
    )
  }
}

onMounted(() => {
  getMiniGameList()
})
</script>
