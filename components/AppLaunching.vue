<template>
  <div
    v-if="!authStore.isAuthenticated"
    class="relative max-h-[600px] overflow-hidden"
  >
    <div
      class="absolute isolate md:right-1/2 top-1/2 -translate-y-1/2 size-[clamp(240px,42vw,600px)] flex flex-col items-center justify-center gap-1 md:gap-2 before:absolute before:inset-[-12%] before:-z-10 before:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.58)_38%,rgba(0,0,0,0.22)_68%,transparent_100%)] before:blur-xl"
    >
      <p
        class="theme-title font-semibold text-xl md:text-4xl lg:text-6xl"
      >
        WELCOME TO
      </p>
      <NuxtImg
        src="assets/images/logo.webp"
        alt="Logo"
        class="w-40 md:w-64 lg:w-96"
      />
      <div
        class="text-center font-semibold text-sm md:text-xl lg:text-2xl text-transparent"
      >
        <p
          class="bg-clip-text bg-gradient-to-r from-white via-sky-300 to-red-500"
        >
          คาสิโนออนไลน์ ที่ใหญ่ที่สุด
        </p>
        <p
          class="bg-clip-text bg-gradient-to-r from-white via-sky-300 to-red-500"
        >
          ครบทุกความบันเทิง
        </p>
      </div>
      <UButton
        class="theme-primary-btn md:w-44 lg:w-64 md:h-12 lg:h-16 justify-center border-2 md:text-xl lg:text-3xl font-semibold lg:my-2 [&_*]:!text-white"
        @click="popupStore.openModalRegister()"
        >{{ $t('register') }}</UButton
      >
      <p class="text-xs md:text-base lg:text-lg text-amber-100/90">
        สมัครง่าย รวดเร็ว ปลอดภัย 100%
      </p>
    </div>
    <picture>
      <source media="(min-width: 768px)" :srcset="bannerDesktop" />

      <NuxtImg
        src="assets/images/banners/banner-mobile.webp"
        class="w-full h-auto object-cover"
        alt="Banner"
        loading="lazy"
      />
    </picture>
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
          active: 'bg-gradient-to-r from-red-500 via-sky-300 to-blue-500 dark:from-red-500 dark:via-sky-300 dark:to-blue-500 shadow-[0_0_10px_rgba(0,108,255,0.65)]',
          inactive: 'bg-sky-100/25 dark:bg-sky-100/25',
        },
      }"
      :prev-button="{
        color: 'red',
        icon: 'i-heroicons-chevron-left',
        class: 'left-3',
      }"
      :next-button="{
        color: 'red',
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
      class="absolute inset-0 border-y border-blue-700/70 bg-[radial-gradient(ellipse_at_18%_50%,rgba(240,20,24,0.42)_0%,transparent_42%),radial-gradient(ellipse_at_82%_50%,rgba(0,108,255,0.46)_0%,transparent_44%),linear-gradient(180deg,rgba(5,5,7,1),rgba(0,0,0,1))] py-6 shadow-[inset_0_1px_0_rgba(240,240,240,0.18),inset_0_-1px_0_rgba(56,199,255,0.16)]"
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
          '!border-emerald-300/70 !from-emerald-400 !via-emerald-600 !to-emerald-900 !shadow-emerald-500/30',
      ]"
      class="theme-primary-btn w-36 flex items-center justify-center gap-1.5 px-3 py-1.5 cursor-pointer"
    >
      <UIcon :name="bonusStatusIcon" class="w-4 h-4 text-white drop-shadow" />
      <p
        v-if="profileStore.isAutoPromotion"
        class="text-sm font-medium text-white drop-shadow"
      >
        {{ $t('status_is_active') }}
      </p>
      <p v-else class="text-sm font-medium text-white drop-shadow">
        {{ $t('status_is_inactive') }}
      </p>
    </div>
  </div>

  <div v-if="authStore.isAuthenticated">
    <div class="flex items-center justify-center gap-4 mt-4 sm:mt-6 mb-2">
      <div class="group" @click="cashierStore.openDepositFromPage()">
        <div
          class="theme-deposit-btn relative w-36 sm:w-44 lg:w-52 h-14 sm:h-16 lg:h-20 p-2 flex flex-nowrap items-center justify-center gap-1 menu-btn-inactive"
        >
          <AppChip :show="!bankStore.isCustomerAccount" />
          <NuxtImg
            src="/assets/images/icons/ic-3d-deposit.webp"
            alt="deposit"
            class="w-16 sm:w-20 h-16 sm:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-200 group-hover:scale-110"
            loading="lazy"
          />

          <p class="text-center text-amber-100 sm:text-lg lg:text-xl">
            {{ $t('deposit') }}
          </p>
        </div>
      </div>

      <div class="group" @click="popupStore.openModalProfile('cashier')">
        <div
          class="w-36 sm:w-44 lg:w-52 h-14 sm:h-16 lg:h-20 p-2 flex flex-nowrap items-center justify-center gap-1 menu-btn-inactive !border-sky-300/60 !bg-gradient-to-b !from-sky-400 !via-blue-700 !to-black !shadow-sky-700/30"
        >
          <NuxtImg
            src="/assets/images/icons/ic-3d-withdraw.webp"
            alt="withdraw"
            class="w-16 sm:w-20 h-16 sm:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-200 group-hover:scale-110"
            loading="lazy"
          />
          <p class="text-center text-amber-100 sm:text-lg lg:text-xl">
            {{ $t('withdraw') }}
          </p>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="miniGameStore.answersData.length"
      class="flex justify-center py-2"
    >
      <div class="group" @click="popupStore.openModalPrediction()">
        <div
          class="w-52 sm:w-60 lg:w-80 h-20 sm:h-24 lg:h-28 p-2 flex flex-nowrap items-center justify-center gap-1 menu-btn-inactive"
        >
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
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import bannerDesktop from 'public/assets/images/banners/banner-desktop.webp'

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
  if (!resourceStore.promotions)
    return [
      'assets/images/notfound/promotion.webp',
      'assets/images/notfound/promotion.webp',
      'assets/images/notfound/promotion.webp',
    ]
  return resourceStore.promotions
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
    : 'i-heroicons-x-mark-solid',
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
