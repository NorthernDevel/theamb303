// stores/games-provider.ts
import { GameType, type RequestGameLogin } from '~/models/default.model'
import type { GamesList, GamesProvider } from '~/models/games.model'
import type { AnswerData } from '~/models/predict.model'

export interface GameSport {
  games: GameSportData[]
  imageUrl: string
}

export interface GameSportData {
  type: string
  src: string
  active: boolean
}

export const useGameStore = defineStore('gameStore', () => {
  const popupStore = usePopupStore()
  const loaderStore = useLoaderStore()

  const searchTerm = ref('')
  const collapsed = ref<Record<string, boolean>>({})
  const gameTypeCache = new Map<string, GameType>()
  const gamesProviderSlot = ref<GamesProvider[]>([])
  const gamesProviderFishing = ref<GamesProvider[]>([])
  const filterListData = ref<GamesList[]>([])
  let gamesListData: GamesList[] = []

  const gameSports: GameSport = {
    // games: [
    //   {
    //     type: 'ASKMEBET',
    //     src: 'Askmebet.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'SABA',
    //     src: 'Saba.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'SBO',
    //     src: 'Sbobet.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'PANDA',
    //     src: 'Panda.gif',
    //     active: false,
    //   },
    //   {
    //     type: 'FBS',
    //     src: 'Fbsport.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'PLB',
    //     src: 'PARLAYBAY.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'UMB',
    //     src: 'Umbet.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'VSB',
    //     src: 'Pragmatic.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'AFB',
    //     src: 'AFB888.gif',
    //     active: true,
    //   },
    //   {
    //     type: 'LALI',
    //     src: 'LalikaBet.gif',
    //     active: true,
    //   },
    // ],
    games: [
      {
        type: 'SBO',
        src: 'Sbobet.gif',
        active: true,
      },
      {
        type: 'SABA',
        src: 'Saba.gif',
        active: true,
      },
    ],
    imageUrl: '/assets/images/games/sports/',
  }

  const onSearchTerm = (search: string) => {
    searchTerm.value = search
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // NOTE: Search by name.
  watch(debouncedSearchTerm, (value) => {
    if (!value) return (filterListData.value = gamesListData)
    const regex = new RegExp(value, 'i')
    filterListData.value = gamesListData.filter(
      (item) => regex.test(item.productName) || regex.test(item.gameName!)
    )
  })

  const toggleCollapse = (productCode: string) => {
    collapsed.value[productCode] = !collapsed.value[productCode]
  }

  const playGame = async (body: RequestGameLogin) => {
    try {
      const { status, url, message } = await usePlayGame(body)
      if (!status) {
        popupStore.alertError({ message })
      } else {
        window.location.replace(`${url}`)
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  const playAskmebet = async () => {
    try {
      const { status, message, urlWebProduct } = await useGameSportPost({
        redirect: window.location.origin,
      })
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        window.location.replace(`${urlWebProduct}&rdPage=sports/football`)
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  // Utility function to get the GameType from a string.
  const cacheStringToGameType = (gameTypeStr: string): GameType | undefined => {
    if (gameTypeCache.has(gameTypeStr)) {
      return gameTypeCache.get(gameTypeStr)
    }

    const gameType = GameType[gameTypeStr as keyof typeof GameType]

    if (typeof gameType === 'number') {
      gameTypeCache.set(gameTypeStr, gameType)
      return gameType
    }

    return undefined
  }

  const gamesProviderList = (games: GamesList[]): GamesProvider[] => {
    return games.map((game) => {
      const { productCode, productName, logo } = game
      const { mobile, transparent } = logo
      return {
        id: productCode,
        label: productName,
        avatar: { src: logo.default || mobile || transparent },
      }
    })
  }

  const fetchGameListByType = async (gameType: GameType) => {
    try {
      loaderStore.start()
      const { status, gamesList, message } = await useGamesListByType(gameType)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        setGameList(gamesList, gameType)
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const fetchGameRecently = async () => {
    try {
      loaderStore.start()
      const { status, gamesList, message } = await useGameRecently()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        setGameList(gamesList)
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const fetchGameFavorites = async () => {
    try {
      loaderStore.start()
      const { status, gamesList, message } = await useGameFavorites()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        gamesListData = gamesList ? gamesList : []
        if (gamesListData.length) {
          filterListData.value = gamesListData
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const setGameList = (gamesList: GamesList[], gameType?: GameType) => {
    if (gameType === 1 || gameType === 2) {
      // NOTE: Reorder Slot game: PGS, NJK, JOK first.
      const slotRecomnendList = ['PGS', 'NJK', 'JOK']
      // NOTE: Reorder Casino game: SEX, SAG, AG first.
      const casinoRecomnendList = ['SEX', 'SAG', 'AG']

      const recommendList =
        gameType === 1 ? slotRecomnendList : casinoRecomnendList
      const newGameList = recommendList
        .map((code) => gamesList.find((item) => item.productCode === code))
        .concat(
          gamesList.filter((item) => !recommendList.includes(item.productCode))
        )
      gamesListData = newGameList as GamesList[] | never[]
    } else {
      gamesListData = gamesList
    }

    // NOTE: First provider is not collapse.
    if (gamesListData.length) {
      filterListData.value = gamesListData
      if (gameType === 2 || gameType === 3) {
        // NOTE: Casino Only.
        filterListData.value.forEach((provider, index) => {
          if (index === 0) {
            collapsed.value[provider.productCode] = false
          } else {
            // NOTE: Default to collapsed
            collapsed.value[provider.productCode] = true
          }
        })
      }
    }
  }

  const cacheGamesProvider = (gameType: number, games: GamesList[]) => {
    switch (gameType) {
      case 1:
        gamesProviderSlot.value = gamesProviderList(games)
        break
      case 6:
        gamesProviderFishing.value = gamesProviderList(games)
        break
      default:
        break
    }
  }

  const addGameFavorite = async (id: string) => {
    try {
      const { status, message } = await useAddGameFavorite(id)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        popupStore.alertSuccess({ title: message })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  const deleteGameFavorite = async (id: string) => {
    try {
      const { status, message } = await useDeleteGameFavorite(id)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        popupStore.alertSuccess({ title: message })
        fetchGameFavorites()
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  return {
    gamesProviderSlot,
    gamesProviderFishing,
    filterListData,
    gamesListData,
    gameSports,
    collapsed,
    onSearchTerm,
    playGame,
    playAskmebet,
    cacheStringToGameType,
    cacheGamesProvider,
    gamesProviderList,
    fetchGameListByType,
    fetchGameRecently,
    fetchGameFavorites,
    addGameFavorite,
    deleteGameFavorite,
    toggleCollapse,
  }
})
