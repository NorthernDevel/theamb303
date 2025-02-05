<template>
  <div @click="onSelectedMenu(item.name)" class="grow flex justify-center">
    <div
      class="w-16 sm:w-20 min-w-16 flex flex-col items-center position-relative cursor-pointer transition-all duration-200 hover:scale-110"
    >
      <NuxtImg :src="item.image" :alt="item.name" :class="[item.name === 'home' && 'w-16']" class="w-12" loading="lazy" />
      <p class="text-sm md:text-base text-gray-100 dark:text-gray-100">
        {{ $t(item.label) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const popupStore = usePopupStore()

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

const onSelectedMenu = (name: string) => {
  if (name == 'home') return navigateTo('/')
  if (name == 'promotion') return navigateTo('/promotion')
  if (name == 'login') return popupStore.openModalLogin()
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
      default:
        popupStore.openModalContact()
        break
    }
}
</script>

<style></style>
