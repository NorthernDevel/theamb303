<template>
  <div
    class="h-12 flex items-center justify-between mb-3 px-2 space-x-2 bg-gradient-to-b from-red-500 via-red-500 to-red-400 rounded-md"
  >
    <div v-if="isSelect" class="flex items-center grow">
      <USelectMenu
        v-if="gamesProviderOption.length && providerSelected"
        :ui-menu="{ width: 'w-52 sm:w-full' }"
        v-model="providerSelected"
        :options="gamesProviderOption"
        @change="onChanged"
        variant="none"
        selectClass="w-full sm:w-60"
      >
        <template #leading>
          <UAvatar
            :ui="{
              rounded: 'rounded-lg',
            }"
            v-bind="providerSelected!.avatar"
            size="sm"
          />
        </template>
        <template #label>
          <span class="truncate text-base pl-4 hidden sm:block">{{
            providerSelected!.label
          }}</span>
        </template>
        <template #option="{ option: game }">
          <UAvatar
            :ui="{
              rounded: 'rounded-lg',
            }"
            v-bind="game.avatar"
            size="sm"
          />
          <span class="truncate text-base">{{ game.label }}</span>
        </template>
      </USelectMenu>
    </div>
    <div v-else class="flex items-center grow">
      <NuxtImg :src="src" :alt="name" loading="lazy" class="w-10 mr-1" />
      <h3 class="sm:text-xl text-gray-100 dark:text-gray-100 font-normal">
        {{ name }}
      </h3>
    </div>

    <UInput
      v-if="isSearch"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      :trailing="false"
      :placeholder="$t('search')"
      v-model="inputValue"
      @input="searchTerm"
      class="w-24 focus-within:w-32 focus-within:sm:w-48 origin-right transition-all duration-500"
    />
    <NuxtLink :to="to" v-if="isMore">
      <UButton
        class="text-gray-100 dark:text-gray-100 font-light bg-gradient-to-b from-red-600 via-red-700 to-red-600"
        >{{ $t('btn_more') }}</UButton
      >
    </NuxtLink>
    <UButton
      v-if="showCollapse"
      :icon="
        isCollapse
          ? 'i-heroicons-chevron-down-solid'
          : 'i-heroicons-chevron-up-solid'
      "
      @click="$emit('toggleCollapse')"
      class="text-gray-100 dark:text-gray-100 font-light bg-gradient-to-b from-red-600 via-red-700 to-red-600"
      />
  </div>
</template>

<script lang="ts" setup>
import type { GameType } from '~/models/default.model'
import type { GamesProvider } from '~/models/games.model'

const route = useRoute()
const gameStore = useGameStore()
const popupStore = usePopupStore()

const props = defineProps({
  src: String,
  name: String,
  to: String,
  gameType: String,
  isSearch: Boolean,
  isSelect: Boolean,
  isMore: Boolean,
  showCollapse: Boolean,
  isCollapse: Boolean,
})

const emit = defineEmits(['searchTerm', 'selected', 'toggleCollapse'])

const inputValue = ref('')
const gamesProviderOption = ref<GamesProvider[]>([])
const providerSelected = ref<GamesProvider>()

const searchTerm = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('searchTerm', target.value)
}

const clearInput = () => {
  inputValue.value = ''
}

const onChanged = (provider: GamesProvider) => {
  providerSelected.value = provider
  clearInput()
  emit('selected', provider.id)
}

const fetchGameListByType = async (gameType: GameType) => {
  if (gameType)
    try {
      const { status, gamesList, message } = await useGamesListByType(gameType)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (gamesList && gamesList.length) {
          gamesProviderOption.value = gameStore.gamesProviderList(gamesList)
          providerSelect(gamesProviderOption)
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
}

const providerSelect = (providerOption: Ref<GamesProvider[]>) => {
  const index = providerOption.value.findIndex((game) => {
    const productCode = route.params.code as string
    return game.id === productCode
  })
  providerSelected.value =
    index < 0 ? providerOption.value[0] : providerOption.value[index]
}

onMounted(() => {
  if (props.isSelect) {
    // NOTE: Get games provider when has these games type.
    if (
      (props.gameType == 'SLOT' && !gameStore.gamesProviderSlot.length) ||
      (props.gameType == 'FISH' && !gameStore.gamesProviderFishing.length)
    ) {
      const cachedGameType = gameStore.cacheStringToGameType(props.gameType)
      if (cachedGameType) fetchGameListByType(cachedGameType)
    } else {
      switch (props.gameType) {
        case 'FISH':
          gamesProviderOption.value = gameStore.gamesProviderFishing
          providerSelect(gamesProviderOption)
          break
        default:
          gamesProviderOption.value = gameStore.gamesProviderSlot
          providerSelect(gamesProviderOption)
          break
      }
    }
  }
})
</script>
