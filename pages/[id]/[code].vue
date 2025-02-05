<template>
  <section>
    <AppLaunching />
  </section>

  <section>
    <div class="flex flex-col">
      <div class="flex justify-center px-2 py-4 mt-4">
        <AppGameNav :links="navStore.menuGames" color="green" />
      </div>

      <div class="w-full p-2 md:p-4">
        <section>
          <AppGameBar
            v-if="gameObject?.gameType === 'SPORT'"
            :name="title"
            :src="barImage"
          />
          <AppGameBar
            v-else
            :game-type="`${gameObject?.gameType}`"
            is-search
            is-select
            v-on:search-term="onSearchTerm"
            v-on:selected="onSelected"
          />
          <AppGameList :is-loading="isLoading" :games-list="filterListData" />
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GameType, RequestGameListByCode } from '~/models/default.model'
import type { GamesList } from '~/models/games.model'

const route = useRoute()
const gameStore = useGameStore()
const navStore = useNavStore()
const popupStore = usePopupStore()

const title = ref('')
const barImage = ref('')
const isLoading = ref(false)
const searchTerm = ref('')
const filterListData = ref<GamesList[]>([])
let gamesListData: GamesList[] = []

const onSearchTerm = (search: string) => {
  searchTerm.value = search
}

const debouncedSearchTerm = useDebounce(searchTerm, 500)

// NOTE: Search by name.
watch(debouncedSearchTerm, (value) => {
  if (!value) return (filterListData.value = gamesListData)
  const regex = new RegExp(value, 'i')
  filterListData.value = gamesListData.filter((item) =>
    regex.test(item.gameName!)
  )
})

const fetchGameListByCode = async (body: RequestGameListByCode) => {
  try {
    isLoading.value = true
    const { status, data, message } = await useGamesListByCode(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { productName, gamesList } = data
        title.value = productName
        gamesListData = gamesList ? gamesList : []
        filterListData.value = gamesListData
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.log((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const fetchGameListByType = async (gameType: GameType) => {
  try {
    isLoading.value = true
    const { status, data, message } = await useGamesListByType(gameType)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { gamesList } = data
        if (gamesList.length) {
          const { productName, logo, games } = gamesList[0]
          title.value = productName
          barImage.value = logo.mobile || logo.default
          gamesListData = games ? games.filter(item => (item.gameName !== 'SBO bet 568Win Sportsbook' && item.gameName !== 'SBO bet Third Party SportsBook') ) : []
          filterListData.value = gamesListData
        }
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.log((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const gameObject = computed(() => {
  const gameFinded = navStore.menuGames.find(
    (item) => item.name === route.params.id
  )
  return gameFinded
})

watch(title, () =>
  useHead({
    title: title.value.toUpperCase(),
  })
)

const onSelected = (productCode: string) => {
  if (gameObject.value) {
    const { gameType } = gameObject.value
    const type = gameType === 'SPORT' ? (route.params.code as string) : gameType
    const cachedGameType = gameStore.cacheStringToGameType(type!)

    if (cachedGameType) {
      if (gameType === 'SPORT') {
        fetchGameListByType(cachedGameType)
      } else {
        fetchGameListByCode({ gameType: cachedGameType, productCode })
      }
    }
  }
}

onMounted(() => {
  const productCode = route.params.code as string
  onSelected(productCode)
})
</script>
