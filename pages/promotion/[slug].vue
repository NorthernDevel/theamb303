<template>
  <UContainer>
    <NuxtLink to="/promotion">
      <UButton
        icon="i-heroicons-chevron-left-20-solid"
        size="sm"
        color="black"
        variant="ghost"
        label="Button"
        class="text-gray-100 text-lg sm:text-xl font-light h-12 mt-2 pl-0"
        :trailing="false"
      >
        {{ $t('all_promotions') }}
      </UButton>
    </NuxtLink>

    <UCard class="bg-opacity-90 dark:bg-opacity-90 rounded-lg my-4">
      <div
        v-if="promotion"
        class="w-full flex flex-col items-center my-4 sm:my-8"
      >
        <h3 class="text-2xl sm:text-3xl">{{ promotion.title }}</h3>
        <NuxtImg
          class="rounded-md w-full object-cover my-4"
          :src="promotionImage"
        />
        <UDivider class="border-gray-100" />
        <div class="w-full text-left pt-4">
          <h2 class="text-2xl mb-6">{{ promotion.shortContent }}</h2>
          <div v-html="promotion.content" class="text-sm sm:text-base"></div>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import type { PromotionData } from '~/models/promotion.model'

const route = useRoute()
const promotionStrore = usePromotionStore()
const resourceStore = useResourceStore()

const promotion = ref<PromotionData>()
const slug = computed(() => route.params.slug)

const promotionImage = computed(() => {
  if (!resourceStore.resources) return 'assets/images/notfound/promotion.webp'
  return resourceStore.resources.imageUrl.promotion + promotion.value?.image!
})

const findPromotionBySlug = () => {
  const promotionFinded = promotionStrore.promotions.find(
    (promotion) => promotion.slug === slug.value
  )
  promotion.value = promotionFinded

  useHead({
    title: promotion.value?.title,
  })
}

onMounted(() => {
  findPromotionBySlug()
})
</script>
