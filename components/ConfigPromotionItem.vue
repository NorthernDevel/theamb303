<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-2 py-2 sm:p-3',
      },
      footer: {
        padding: 'p-0 sm:p-0',
      },
    }"
    class="w-full min-h-[84px] mt-2"
  >
    <div class="flex gap-4">
      <div class="min-h-[68px] flex flex-col items-center justify-center gap-1">
        <UButton
          v-if="index !== 0"
          icon="i-heroicons-chevron-up"
          size="sm"
          color="white"
          variant="solid"
          @click="moveUp(index)"
        />
        <UButton
          v-if="isLastOne"
          icon="i-heroicons-chevron-down"
          size="sm"
          color="white"
          variant="solid"
          @click="moveDown(index)"
        />
      </div>
      <div class="flex flex-col justify-around">
        <p class="text-sm sm:text-base">
          {{ promition.promotionName }}
        </p>
        <div class="flex items-center gap-2">
          <UToggle
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid"
            v-model="promition.isPromotionActive"
            @change="toggleActive(index)"
          />
          <p class="text-xs sm:text-sm font-light" :class="[promition.isPromotionActive && 'text-green-500']">
            {{
              $t(
                promition.isPromotionActive
                  ? 'status_active'
                  : 'status_inactive'
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import type { RequestListPromotion } from '~/models/default.model'

defineProps({
  promition: {
    type: Object as PropType<RequestListPromotion>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isLastOne: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['moveUp', 'moveDown', 'updateStatus'])

const moveUp = (index: number) => emit('moveUp', index)

const moveDown = (index: number) => emit('moveDown', index)

const toggleActive = (index: number) => emit('updateStatus', index)
</script>
