import { defineStore } from 'pinia'
import type { RequestAuth } from '~/models/auth.model'

export const useAuthStore = defineStore('authStore', () => {
  const route = useRoute()
  const profileStore = useProfileStore()
  const promotionStore = usePromotionStore()
  const resourceStore = useResourceStore()
  const navStore = useNavStore()
  const authToken = useCookie('auth_token')
  const isAuthenticated = ref(!!authToken.value)
  const fetchInterval = ref<any>(null)
  const isLoading = ref(false)

  const signIn = async (credential: RequestAuth) => {
    const { status, token, message } = await useSignIn(credential)
    if (!status) return { status, message }
    useCookie('auth_token', {
      maxAge: 60 * 60 * 24, // 2 days / * 60 * 24 * 2
      httpOnly: false, // Accessible by JavaScript (for client-side)
      sameSite: 'strict',
    }).value = token
    isAuthenticated.value = true
    navigateTo('/')
    return { status }
  }

  const signOut = async () => {
    try {
      clearAllStore()
      await useSignOut()
    } catch (e) {
      clearAllStore()
      console.error((e as Error).message)
    }
  }

  const clearAllStore = () => {
    authToken.value = null
    isAuthenticated.value = false
    profileStore.clear()
    clearInterval(fetchInterval.value)
  }

  const isSafari = computed(() => {
    if (import.meta.client) {
      const userAg = navigator.userAgent
      return /^((?!chrome|android).)*safari/i.test(userAg)
    } else {
      return false
    }
  })

  watch(isAuthenticated, () => {
    if (isAuthenticated.value) {
      // NOTE: Reload menu favorites and recently.
      navStore.menuGames = navStore.menuGames
      setTimeout(async () => profileStore.getProfile(), 200)
      fetchInterval.value = setInterval(
        async () => profileStore.getProfile(),
        1000 * 12
      )
    } else {
      // NOTE: Reload menu favorites and recently.
      navStore.menuGames = navStore.menuGames
      checkRouteRedirectToHome()
      if (!route.query.action) resourceStore.showPopupNotLogin()
      clearInterval(fetchInterval.value)
    }
  })

  const handleOnMounted = async () => {
    setTimeout(async () => {
      await profileStore.getProfile()
      promotionStore.isDisabledAutoPromotions()
    }, 200)
    fetchInterval.value = setInterval(
      async () => profileStore.getProfile(),
      1000 * 12
    )
  }

  onMounted(() => {
    if (isAuthenticated.value) {
      handleOnMounted()
    } else {
      clearAllStore()
      if (!route.query.action) resourceStore.showPopupNotLogin()
    }
  })

  onBeforeUnmount(() => {
    clearInterval(fetchInterval.value)
  })

  const checkRouteRedirectToHome = () => {
    if (!isAuthenticated.value && route.params.id === 'favorites') {
      navigateTo('/')
    }
  }

  return {
    isLoading,
    isAuthenticated,
    isSafari,
    signIn,
    signOut,
    checkRouteRedirectToHome,
    clearAllStore,
  }
})
