<template>
  <section>
    <AppLaunching />
  </section>

  <section>
    <div class="flex flex-col">
      <div class="flex justify-center px-2 py-4 mt-8">
        <AppGameNav :links="navStore.menuGames" color="rose" />
      </div>
      <AppDownload />

      <div class="w-full p-2 md:p-4">
        <div class="space-y-10">
          <section>
            <AppGameBar
              src="/assets/images/menus/slot.webp"
              :name="slots"
              to="/slot"
              is-more
            />
            <AppGameList
              :is-loading="loaderStore.isLoading"
              :games-list="slotRecomnended"
              first-large
              is-provider
            />
          </section>
          <section>
            <AppGameBar
              src="/assets/images/menus/casino.webp"
              :name="casino"
              to="/casino"
              is-more
            />
            <AppGameList
              :is-loading="loaderStore.isLoading"
              :games-list="casinoRecomnended"
              first-large
              is-provider
            />
          </section>
        </div>
      </div>
    </div>
  </section>

  <section>
    <AppShowcase />
  </section>
</template>
<script setup lang="ts">
const { t } = useI18n()
import { GameType } from '~/models/default.model'
import type { GamesList } from '~/models/games.model'

const navStore = useNavStore()
const loaderStore = useLoaderStore()
const popupStore = usePopupStore()

const slots = t('game_slot')
const casino = t('game_casino')

useSeoMeta({
  title: 'Home Page',
  description: 'This is the home Page',
  ogTitle: 'THEAMB303',
  ogDescription: 'THEAMB303, slot, casino, pgslot, poker, bacarat',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'THEAMB303',
  twitterDescription: 'THEAMB303, slot, casino, pgslot, poker, bacarat',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary',
})

const slotGameList = ref<GamesList[]>([])
const casinoGameList = ref<GamesList[]>([])

const fetchGamesListByType = async (gameType: GameType) => {
  try {
    loaderStore.start()
    const { status, gamesList, message } = await useGamesListByType(gameType)
    if (!status) {
      popupStore.toastError({ message })
    } else {
      const gamesData = gamesList ? gamesList : []
      if (gameType == GameType['SLOT']) {
        slotGameList.value = gamesData
      } else {
        casinoGameList.value = gamesData
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.log((e as Error).message)
  } finally {
    loaderStore.stop()
  }
}

const slotRecomnended = computed(() => {
  const slotRecomnendList = [
    'PGS',
    'DRG',
    'MGS',
    'AMBS',
    'PMTS',
    'POPG',
    'RECG',
    'JOK',
    'SMP',
  ]
  const filteredSlots = slotGameList.value.filter((slot) =>
    slotRecomnendList.includes(slot.productCode)
  )

  const index = filteredSlots.findIndex((slot) => slot.productCode === 'AMBS')

  // NOTE: AMBS frist.
  if (index > 0) {
    const [slot] = filteredSlots.splice(index, 1)
    filteredSlots.unshift(slot)
  }

  return filteredSlots
})

const casinoRecomnended = computed(() => {
  const casinoRecomnendList = [
    'PTG',
    'MG',
    'PMT',
    'WM',
    'SAG',
    'MTV',
    'YB',
    'PTGC',
    'WON',
  ]
  const filteredCasinos = casinoGameList.value.filter((casino) =>
    casinoRecomnendList.includes(casino.productCode)
  )
  return filteredCasinos
})

onMounted(async () => {
  await fetchGamesListByType(GameType['SLOT'])
  await fetchGamesListByType(GameType['LIVE'])
})
</script>

<style scoped>
.col-width {
  width: 50%;
}

@media (min-width: 1024px) {
  .col-width {
    width: calc(33.3333% - 20px);
  }
}
</style>
