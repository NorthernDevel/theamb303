<template>
  <div
    v-if="!authStore.isAuthenticated"
    class="container flex flex-col sm:flex-row items-center mx-auto md:mx-auto mt-2 mb-4"
  >
    <UCarousel
      ref="carouselAnnouncementRef"
      v-slot="{ item }"
      :items="announceImages"
      :ui="{
        item: 'basis-full md:basis-1/2 xl:basis-1/3 space-x-1',
        indicators: {
          wrapper: 'bottom-0',
          base: 'rounded-full h-1 w-5',
          active: 'bg-amber-500 dark:bg-amber-500',
          inactive: 'bg-gray-100 dark:bg-gray-100',
        },
      }"
      :prev-button="{
        color: 'amber',
        icon: 'i-heroicons-chevron-left',
        class: 'left-4',
      }"
      :next-button="{
        color: 'amber',
        icon: 'i-heroicons-chevron-right',
        class: 'right-4',
      }"
      class="overflow-hidden"
      arrows
      indicators
    >
      <div class="mx-2 my-2 border-2 rounded-xl p-[1px]">
        <img :src="item" class="w-full rounded-lg" draggable="false" />
      </div>
    </UCarousel>
  </div>

  <div v-else>
    <UCarousel
      ref="carouselPromotionRef"
      v-slot="{ item }"
      :items="promotionImages"
      :ui="{
        item: 'basis-full lg:basis-1/2 space-x-1',
        indicators: {
          wrapper: 'bottom-0',
          base: 'rounded-full h-1 w-5',
          active: 'bg-amber-500 dark:bg-amber-500',
          inactive: 'bg-gray-100 dark:bg-gray-100',
        },
      }"
      :prev-button="{
        color: 'amber',
        icon: 'i-heroicons-chevron-left',
        class: 'left-3',
      }"
      :next-button="{
        color: 'amber',
        icon: 'i-heroicons-chevron-right',
        class: 'right-3',
      }"
      class="overflow-hidden mb-1"
      arrows
      indicators
    >
      <div class="mx-2 my-2 border-2 rounded-xl p-[1px]">
        <img :src="item" class="w-full rounded-lg" draggable="false" />
      </div>
    </UCarousel>
  </div>

  <div class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-40"
    ></div>
    <NuxtMarquee :speed="50" direction="left">
      <NuxtImg
        v-for="(item, index) in partners"
        :key="index"
        :src="'/assets/images/partners/' + item + '.png'"
        :alt="item"
        class="w-20 md:w-28 inline-block mr-4 md:mr-7"
      />
    </NuxtMarquee>
  </div>

  <div
    v-if="authStore.isAuthenticated && profileStore.userData"
    class="flex justify-center mt-4 sm:mt-6"
  >
    <div
      @click="popupStore.openModalProfile('config-promotion')"
      :class="[
        profileStore.isAutoPromotion &&
          '!bg-gradient-to-b !from-green-400 !via-green-500 !to-green-600',
      ]"
      class="w-32 flex items-center justify-center gap-1 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 p-1 rounded-full cursor-pointer"
    >
      <UIcon :name="bonusStatusIcon" class="w-4 h-4 text-gray-100" />
      <p v-if="profileStore.isAutoPromotion" class="text-sm text-gray-100">
        {{ $t('status_is_active') }}
      </p>
      <p v-else class="text-sm text-gray-100">
        {{ $t('status_is_inactive') }}
      </p>
    </div>
  </div>

  <div v-if="authStore.isAuthenticated">
    <div class="flex items-center justify-center gap-4 mt-4 sm:mt-6 mb-2">
      <div class="group" @click="popupStore.openModalProfile('cashier')">
        <div
          class="relative w-36 sm:w-44 lg:w-52 h-14 sm:h-16 lg:h-20 p-2 flex flex-nowrap items-center justify-center gap-1 tab-menu !bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600"
        >
          <AppChip :show="!bankStore.isCustomerAccount" />
          <NuxtImg
            src="/assets/images/icons/ic-3d-deposit.webp"
            alt="deposit"
            class="w-16 sm:w-20 h-16 sm:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-200 group-hover:scale-110"
            loading="lazy"
          />

          <p class="text-center text-gray-50 sm:text-lg lg:text-xl">
            {{ $t('deposit') }}
          </p>
        </div>
      </div>

      <div class="group" @click="cashierStore.openWithdrawFromPage()">
        <div
          class="w-36 sm:w-44 lg:w-52 h-14 sm:h-16 lg:h-20 p-2 flex flex-nowrap items-center justify-center gap-1 tab-menu !bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600"
        >
          <NuxtImg
            src="/assets/images/icons/ic-3d-withdraw.webp"
            alt="withdraw"
            class="w-16 sm:w-20 h-16 sm:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-200 group-hover:scale-110"
            loading="lazy"
          />
          <p class="text-center text-gray-50 sm:text-lg lg:text-xl">
            {{ $t('withdraw') }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="miniGameStore.answersData.length"
      class="flex justify-center py-2"
    >
      <div class="group" @click="popupStore.openModalPrediction()">
        <div
          class="w-52 sm:w-60 lg:w-80 h-20 sm:h-24 lg:h-28 p-2 flex flex-nowrap items-center justify-center gap-1 tab-menu"
        >
          <!-- <AppChip :show="true" /> -->
          <NuxtImg
            src="/assets/images/icons/ic-3d-quiz.webp"
            alt="pridiction activity"
            class="w-20 sm:w-24 h-20 sm:h-24 lg:w-28 lg:h-28 object-contain transition-all duration-200 group-hover:scale-110"
            loading="lazy"
          />
          <p class="text-center text-gray-500 sm:text-lg lg:text-xl">
            {{ $t('prediction_activity') }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center mt-10 mb-4">
    <UButton
      class="register-btn w-60 h-16 justify-center rounded-full text-3xl"
      @click="popupStore.openModalRegister()"
      >{{ $t('register') }}</UButton
    >
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const profileStore = useProfileStore()
const resourceStore = useResourceStore()
const miniGameStore = useMiniGameStore()
const popupStore = usePopupStore()
const cashierStore = useCashierStore()
const bankStore = useBankStore()

const carouselAnnouncementRef = ref()

const announceImages = computed(() => {
  if (!resourceStore.bannerImages)
    return [
      'assets/images/notfound/banner.webp',
      'assets/images/notfound/banner.webp',
      'assets/images/notfound/banner.webp',
    ]
  return resourceStore.bannerImages
    .filter((banner) => banner.isActive)
    .map((item) => item.image)
})

const carouselPromotionRef = ref()

const promotionImages = computed(() => {
  if (!resourceStore.promotionImages)
    return [
      'assets/images/notfound/promotion.webp',
      'assets/images/notfound/promotion.webp',
      'assets/images/notfound/promotion.webp',
    ]
  return resourceStore.promotionImages
    .filter((promotion) => promotion.isActive)
    .map((item) => item.image)
})

const partners = [
  'slot-logo-evo-play',
  'slot-logo-sp',
  'slot-logo-ps',
  'slot-logo-kingmaker',
  'slot-logo-joker',
  'slot-logo-mg-slot',
  'slot-logo-habanero',
  'slot-logo-wm-slot',
  'slot-logo-pragmatic-play',
  'slot-logo-ameba',
  'slot-logo-cq9',
  'slot-logo-play-tech',
  'slot-logo-sexy-gaming',
  'slot-logo-sa-gaming',
  'slot-logo-pg',
  'slot-logo-rich88',
  'slot-logo-goldy',
]

const bonusStatusIcon = computed(() =>
  profileStore.isAutoPromotion
    ? 'i-heroicons-check-20-solid'
    : 'i-heroicons-x-mark-solid'
)

onMounted(() => {
  setInterval(() => {
    // NOTE: Announcements
    if (!carouselAnnouncementRef.value) return

    if (
      carouselAnnouncementRef.value.page === carouselAnnouncementRef.value.pages
    ) {
      return carouselAnnouncementRef.value.select(0)
    }

    carouselAnnouncementRef.value.next()
  }, 6000)

  setInterval(() => {
    // NOTE: Promotions
    if (!carouselPromotionRef.value) return

    if (carouselPromotionRef.value.page === carouselPromotionRef.value.pages) {
      return carouselPromotionRef.value.select(0)
    }

    carouselPromotionRef.value.next()
  }, 4000)
})
</script>
