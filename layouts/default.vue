<template>
  <SplashScreen />
  <div v-if="isShowContent" class="main-container min-w-[375px]">
    <div class="overflow-x-hidden">
      <AppHeader />
      <main
        class="cover-container before:w-full before:h-[720px] before:md:h-[620px]"
      >
        <Announcement />
        <slot />
      </main>
    </div>
    <AppFooter />
    <AppFooterNav />
    <AppFloatingArea />
  </div>
  <AppLoader />
  <AppAlertPopup v-model="popupStore.isOpenAlertPopup" />
</template>

<script lang="ts" setup>
import type { RequestGameLogin } from '~/models/default.model'
import '@/assets/style.css'
import '@/assets/tailwind/custom.css'

const route = useRoute()
const authStore = useAuthStore()
const gameStore = useGameStore()
const popupStore = usePopupStore()
const resourceStore = useResourceStore()

const isShowContent = ref(true)

useHead({
  titleTemplate: '%s - THEAMB303',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      crossorigin: '',
    },
  ],
})

if (process.env.NODE_ENV === 'production') {
  useHead({
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-CV4MQDLXN8',
        async: true,
      },
      {
        hid: 'gtag-inline',
        innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-CV4MQDLXN8');
      `,
      },
    ],
  })
}

onBeforeMount(() => {
  authStore.checkRouteRedirectToHome()

  if (route.query) {
    const queryString = route.query
    if (queryString.action && queryString.action === 'register') {
      // NOTE: Ref afiliate or marketing.
      const key = Object.keys(queryString).find(
        (k) => k === 'ref' || k === 'marketingRef'
      )
      const body = key ? { key: key, value: queryString[key] as string } : null
      if (body) {
        setTimeout(() => popupStore.openModalRegisterWithParams(body), 1000)
      } else {
        setTimeout(() => popupStore.openModalRegister(), 1000)
      }
    } else if (queryString.action && queryString.action === 'login') {
      setTimeout(() => popupStore.openModalLogin(), 1000)
    } else if (route.params.id == 'redirect') {
      // NOTE: Play game.
      const { type, product, gameID, isMobile } = queryString
      if (type && product && gameID && isMobile) {
        isShowContent.value = false
        if (type === 'ASKMEBET') {
          // NOTE: Play Sport Askmebet.
          gameStore.playAskmebet()
        } else {
          // NOTE: Play other.
          const cachedGameType = gameStore.cacheStringToGameType(type as string)
          if (cachedGameType) {
            const baseURL = window.location.origin
            const body: RequestGameLogin = {
              code: gameID as string,
              gameType: cachedGameType,
              isMobile: Boolean(isMobile),
              productCode: product as string,
              redirect: baseURL + '/reload',
            }
            gameStore.playGame(body)
          }
        }
      }
    } else {
      popupStore.clear()
    }
  }
})

onMounted(() => {
  if (isShowContent.value) {
    resourceStore.getResoures()
    if (route.params.id == 'reload') {
      navigateTo('/')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
})
</script>
