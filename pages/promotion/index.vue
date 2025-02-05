<template>
  <div class="w-full mb-8">
    <UContainer>
      <h3 class="text-3xl text-center text-gray-100 dark:text-gray-100 my-8">
        {{ $t('promotion') }}
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 gap-4">
        <div v-for="promotion in promotionStore.promotions">
          <UCard
            :ui="{
              body: {
                padding: 'px-0 py-0 sm:p-0',
              },
              footer: {
                padding: 'p-0 sm:p-0',
              },
            }"
            class="bg-gray-800 bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg"
          >
            <NuxtImg
              class="rounded-md w-full object-cover cursor-pointer"
              :src="promotionImage(promotion.image)"
              @click="moreDetail(promotion.slug)"
            />
            <div class="px-4 py-2">
              <h4 class="text-lg sm:text-2xl text-gray-100">
                {{ promotion.title }}
              </h4>
              <p class="py-2 text-gray-100 font-light">
                {{ promotion.shortContent }}
              </p>
            </div>

            <template #footer>
              <div
                @click="moreDetail(promotion.slug)"
                class="flex items-center justify-center h-6 bg-gray-100 dark:bg-gray-800 rounded-b-md cursor-pointer"
              >
                <p
                  class="text-[12px] font-light dark:font-medium text-gray-500 dark:text-gray-300"
                >
                  {{ $t('btn_more') }}
                </p>
              </div>
            </template>
          </UCard>
          <!-- <div class="border-2 border-gray-200 rounded-lg bg-gray-200 bg-opacity-50">
         
          </div> -->
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const promotionStore = usePromotionStore()
const resourceStore = useResourceStore()

useHead({
  title: t('promotion'),
})

const promotionImage = (image: string) => {
  if (!resourceStore.resources) return 'assets/images/notfound/promotion.webp'
  return resourceStore.resources.imageUrl.promotion + image
}

const moreDetail = (slug: string) => {
  router.push(`/promotion/${slug}`)
}
</script>
