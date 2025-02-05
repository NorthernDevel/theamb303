<template>
  <header
    class="w-full py-2 px-2 lg:px-0 transition-all duration-500 ease-in-out z-20"
    :class="{
      'fixed ': isChangeClass,
    }"
  >
    <div
      v-if="isChangeClass"
      class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-95 dark:bg-gray-900 dark:opacity-95 -z-10"
    ></div>
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex gap-2">
        <div>
          <AppSlideMenu v-model="popupStore.isOpenSlideMenu" />
          <UIcon
            name="i-heroicons-bars-3-bottom-left-20-solid"
            class="w-10 h-10 bg-white dark:bg-white"
            @click="popupStore.openSlideMenu"
          />
        </div>

        <div class="flex flex-col">
          <NuxtLink to="/">
            <NuxtImg
              src="/assets/images/header-logo.webp"
              alt="logo"
              class="w-28 sm:w-32"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="w-2/4 ml-4 hidden lg:inline">
        <AppHorizontalNav />
      </div>

      <div class="grow flex items-center justify-end">
        <div v-if="authStore.isAuthenticated">
          <div
            v-if="profileStore.userData"
            class="flex items-center justify-end"
          >
            <div class="flex flex-col items-end gap-1 sm:gap-0">
              <div class="flex items-center">
                <UIcon
                  name="i-heroicons-user-16-solid"
                  class="w-4 h-4 mr-1 text-white dark:text-white"
                />
                <UDropdown
                  :items="navStore.menuHeaderDropdown"
                  :ui="{ item: { disabled: 'cursor-text select-text' } }"
                  :popper="{ placement: 'bottom-end' }"
                >
                  <span class="text-white dark:text-white text-sm">{{
                    profileStore.userData.username
                  }}</span>
                  <UIcon
                    name="i-heroicons-chevron-down-16-solid"
                    class="w-4 h-4 ml-1 text-white dark:text-white"
                  />

                  <template #item="{ item }">
                    <span class="truncate text-base">{{ $t(item.label) }}</span>
                    <UIcon
                      :name="item.icon"
                      class="flex-shrink-0 h-6 w-6 text-gray-400 dark:text-gray-500 ms-auto"
                    />
                  </template>
                </UDropdown>
              </div>
              <div class="flex gap-2">
                <div
                  v-if="profileStore.diamond.value !== '0'"
                  class="hidden sm:flex h-7 items-center relative bg-gray-900 bg-opacity-80 rounded-full pl-1 pr-3"
                >
                  <NuxtImg
                    src="/assets/images/diamond.svg"
                    alt="logo"
                    class="w-7"
                  />
                  <span
                    class="text-sky-400 dark:text-sky-400 sm:text-lg font-semibold"
                    >{{ profileStore.diamond }}</span
                  >
                </div>
                <div
                  class="h-7 flex items-center relative bg-gray-900 bg-opacity-80 rounded-full pl-6 pr-3"
                >
                  <NuxtImg
                    src="/assets/images/coin.webp"
                    alt="logo"
                    class="w-7 absolute -left-2"
                  />
                  <span
                    class="text-amber-400 dark:text-amber-400 sm:text-lg font-semibold"
                    >{{ profileStore.balance }}</span
                  >
                  <UButton
                    :ui="{
                      color: {
                        white: {
                          ghost:
                            'text-white dark:text-white hover:text-gray-200 dark:hover:text-gray-200 hover:bg-tranparent dark:hover:bg-tranparent',
                        },
                      },
                    }"
                    icon="i-heroicons-arrow-path-16-solid"
                    size="sm"
                    color="white"
                    variant="ghost"
                    class="p-0 pl-1"
                    @click="profileStore.getProfile()"
                    :loading="profileStore.isLoading"
                  />
                </div>
                <UButton
                  class="hidden sm:inline-block login-btn w-18 h-7 justify-center rounded-full text-sm font-light"
                  @click="popupStore.openModalProfile('cashier')"
                  >{{ $t('menu_cashier') }}</UButton
                >
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col items-end space-y-1">
              <USkeleton
                class="h-4 w-32 rounded-full bg-gray-100 dark:bg-gray-300"
              />
              <USkeleton
                class="h-6 w-28 rounded-full bg-gray-100 dark:bg-gray-300"
              />
            </div>
          </div>
        </div>

        <div v-else class="flex items-center justify-end space-x-2">
          <UButton
            icon="i-heroicons-arrow-right-end-on-rectangle"
            class="login-btn w-36 h-10 justify-center rounded-full text-lg font-light"
            @click="popupStore.openModalLogin"
            >{{ $t('sign_in') }}</UButton
          >
        </div>
        <UDropdown
          v-if="resourceStore.isShowToggleLanguage"
          :items="langStore.langItems"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-end' }"
          class="inline-flex"
        >
          <NuxtImg :src="langFlagIcon" alt="flag" class="w-8 md:w-10 mx-2" />

          <template #item="{ item }">
            <NuxtImg
              :src="item.avatar.src"
              alt="flag"
              class="w-8 md:w-10 mx-2"
            />
            <span class="truncate text-base">{{ item.label }}</span>
          </template>
        </UDropdown>
      </div>
    </div>
  </header>
  <div v-if="!authStore.isAuthenticated">
    <AppModalLogin v-model="popupStore.isOpenModalLogin" />
    <AppModalRegister v-model="popupStore.isOpenModalRegister" />
    <AppModalForgotPassword v-model="popupStore.isOpenModalForgotPassword" />
  </div>
  <div v-else>
    <AppModalProfile v-model="popupStore.isOpenModalProfile" />
  </div>
  <AppModalContact v-model="popupStore.isOpenModalContact" />
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()
const langStore = useLanguageStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const popupStore = usePopupStore()
const navStore = useNavStore()

const scrollPosition = ref(0)
const isChangeClass = ref(false)
const handleScroll = () => {
  scrollPosition.value = window.scrollY
  isChangeClass.value = scrollPosition.value > 50
}

const langFlagIcon = computed(() => {
  if (!langStore.currentLang) return '/assets/images/flag/th.png'
  return '/assets/images/flag/' + langStore.currentLang + '.png'
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
