<template>
  <div
    @click="onSelectedMenu(item.name)"
    :class="[isVisible(item.name) && 'hidden']"
    class="flex justify-center h-32"
  >
    <div
      class="w-40 h-32 flex flex-col items-center justify-center cursor-pointer rounded-3xl shadow-light hover:shadow-light-hover dark:shadow-dark dark:hover:shadow-dark-hover"
    >
      <NuxtImg
        :src="item.image"
        :alt="item.name"
        class="w-20 h-20 object-contain"
        loading="lazy"
      />
      <p>{{ $t(item.label) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const popupStore = usePopupStore()
const { t } = useI18n()

type Item = {
  name: string
  label: string
  image: string
  to: string
}

defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const unAuthMenus = [
  'home',
  'profile',
  'register',
  'promotion',
  'article',
  'contact',
]
const authMenus = [
  'home',
  'profile',
  'cashier',
  'promotion',
  'article',
  'contact',
  'signout',
]

const isVisible = (name: string) => {
  if (!authStore.isAuthenticated) {
    const index = unAuthMenus.findIndex((item) => name == item)
    return index < 0
  } else {
    const index = authMenus.findIndex((item) => name == item)
    return index < 0
  }
}

const onSelectedMenu = (name: string) => {
  popupStore.closeSlideMenu()
  if (name == 'home') return navigateTo('/')
  if (name == 'promotion') return navigateTo('/promotion')
  if (name == 'article') return navigateTo('/article')
  if (name == 'register') return popupStore.openModalRegister()
  if (name == 'contact') return popupStore.openModalContact()

  if (!authStore.isAuthenticated) popupStore.openModalLogin()
  else
    switch (name) {
      case 'cashier':
        popupStore.openModalProfile(name)
        break
      case 'profile':
        popupStore.openModalProfile()
        break
      case 'signout':
        popupStore.alertConfirm({
          title: t('sign_out'),
          message: t('confirm_sure'),
          preventClose: true,
          onConfirm: () => authStore.signOut(),
        })
        break
      default:
        popupStore.openModalContact()
        break
    }
}
</script>
