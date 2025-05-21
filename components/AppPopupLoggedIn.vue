<template>
  <UModal
    v-if="popupItems.length"
    v-model="isOpen"
    :overlay="true"
    :ui="{
      container: 'items-center',
      width: 'w-[340px] md:w-[520px]',
    }"
    prevent-close
    class=""
  >
    <div class="relative">
      <UButton
        color="red"
        variant="ghost"
        class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0 z-50"
        @click="isOpen = false"
        ><UIcon name="i-heroicons-x-mark-20-solid" class="w-20 h-20"
      /></UButton>
      <UCarousel
        ref="carouselPopupsRef"
        v-slot="{ item }"
        :items="popupItems"
        :ui="{
          item: 'basis-full',
          indicators: {
            wrapper: '-bottom-0',
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
        :arrows="popupItems.length > 1"
        :indicators="popupItems.length > 1"
      >
        <div class="mx-2 my-2 border-2 rounded-xl p-[1px]">
          <img
            :src="item.image"
            class="w-full rounded-lg"
            :class="[item.route && 'cursor-pointer']"
            @click="onClickImage(item)"
            draggable="false"
          />
        </div>
      </UCarousel>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type { PopupData } from '~/models/resource.model'
const router = useRouter()
const popupStore = usePopupStore()
const resourceStore = useResourceStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const carouselPopupsRef = ref()
const popupItems = computed(() => {
  if (!resourceStore.popups) return []
  return resourceStore.popups
    .filter(
      (popup) => popup.isActive && popup.isLogin === true && !popup.isFlash
    )
    .map((item) => item)
})

const onClickImage = (item: PopupData) => {
  if (!item.route) return
  if (item.isInternal) {
    router.push(item.route)
    popupStore.closePopupLoggedIn()
  } else {
    window.open(item.route, '_blank')
  }
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

onMounted(() => {
  setInterval(() => {
    if (!carouselPopupsRef.value) return

    if (carouselPopupsRef.value.page === carouselPopupsRef.value.pages) {
      return carouselPopupsRef.value.select(0)
    }

    carouselPopupsRef.value.next()
  }, 6000)
})
</script>
