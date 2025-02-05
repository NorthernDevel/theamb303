<template>
  <section>
    <AppLaunching />
  </section>

  <section>
    <div class="flex flex-col">
      <div class="flex justify-center px-2 py-4 mt-4">
        <AppGameNav :links="navStore.menuGames" color="green" />
      </div>
      <AppDownload />

      <div
        v-if="pageFound"
        class="flex items-center justify-center my-20 ms:my-32"
      >
        <p class="text-gray-500 text-3xl">Page Not Found</p>
      </div>
      <div v-else class="w-full p-2 md:p-4">
        <section
          v-if="route.params.id === 'slot' || route.params.id === 'fishing'"
        >
          <AppGameBar
            :src="`/assets/images/menus/${route.params.id}.webp`"
            :name="$t(`game_${route.params.id}`)"
            :to="`/${route.params.id}`"
            is-search
            v-on:search-term="gameStore.onSearchTerm"
          />
          <AppGameList
            :is-loading="loaderStore.isLoading"
            :games-list="gameStore.filterListData"
            first-large
            is-provider
          />
        </section>
        <section v-else-if="route.params.id === 'lottery'">
          <AppGameBar
            :src="`/assets/images/menus/${route.params.id}.webp`"
            :name="$t(`game_${route.params.id}`)"
            :to="`/${route.params.id}`"
            is-search
            v-on:search-term="gameStore.onSearchTerm"
          />
          <AppGameList
            :is-loading="loaderStore.isLoading"
            :games-list="gameStore.filterListData"
          />
        </section>
        <section v-else-if="route.params.id === 'sport'">
          <AppGameBar
            :src="`/assets/images/menus/${route.params.id}.webp`"
            :name="$t(`game_${route.params.id}`)"
          />
          <AppGameSportList :game-sports="gameStore.gameSports" />
        </section>
        <section
          v-else-if="
            route.params.id === 'recently' || route.params.id === 'favorites'
          "
        >
          <AppGameBar
            :src="`/assets/images/menus/${route.params.id}.webp`"
            :name="$t(`game_${route.params.id}`)"
            is-search
            v-on:search-term="gameStore.onSearchTerm"
          />
          <AppGameList
            :is-loading="loaderStore.isLoading"
            :games-list="gameStore.filterListData"
          />
        </section>
        <section
          v-else-if="route.params.id === 'casino' || route.params.id === 'card'"
        >
          <div
            v-for="provider in gameStore.filterListData"
            :key="provider.productCode"
            class="mb-8"
          >
            <AppGameBar
              :src="provider.logo.default"
              :name="provider.productName"
              show-collapse
              :is-collapse="gameStore.collapsed[provider.productCode]"
              @toggleCollapse="gameStore.toggleCollapse(provider.productCode)"
            />
            <AppGameList
              :is-loading="loaderStore.isLoading"
              :games-list="provider.games"
              :is-collapse="gameStore.collapsed[provider.productCode]"
            />
          </div>
        </section>
        <section v-else>
          <div
            v-for="provider in gameStore.filterListData"
            :key="provider.productCode"
            class="mb-14"
          >
            <AppGameBar
              :src="provider.logo.default"
              :name="provider.productName"
            />
            <AppGameList
              :is-loading="loaderStore.isLoading"
              :games-list="provider.games"
            />
          </div>
        </section>
      </div>
    </div>
  </section>

  <section>
    <AppShowcase />
  </section>
</template>

<script lang="ts" setup>
const route = useRoute()
const navStore = useNavStore()
const gameStore = useGameStore()
const loaderStore = useLoaderStore()

const title = ref('')
const pageFound = ref(false)

watchEffect(() => {
  if (route.params.id) {
    title.value = `${route.params.id}`
    useHead({
      title: title.value.toUpperCase(),
    })
  }

  // NOTE: 404 PAGE NOT FOUND
  const index = navStore.menuGamesList.findIndex((item) => item === title.value)
  pageFound.value = index < 0
})

const gameObject = computed(() => {
  const gameFinded = navStore.menuGames.find(
    (item) => item.name === route.params.id
  )

  return gameFinded
})

onMounted(() => {
  if (gameObject.value) {
    if (gameObject.value.gameType == 'SPORT') return

    if (gameObject.value.gameType === 'RECENTLY')
      return gameStore.fetchGameRecently()

    if (gameObject.value.gameType === 'FAVORITES')
      return gameStore.fetchGameFavorites()

    const cachedGameType = gameStore.cacheStringToGameType(
      gameObject.value.gameType!
    )
    if (cachedGameType) gameStore.fetchGameListByType(cachedGameType)
  }
})
</script>
