<template>
  <UModal
    v-model="isOpen"
    :overlay="true"
    prevent-close
    :fullscreen="navStore.isMobile"
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <NuxtImg src="/assets/images/logo.png" alt="logo" class="w-20" />
          <UButton
            color="cyan"
            variant="ghost"
            class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0"
            @click="isOpen = false"
            ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
          /></UButton>
        </div>
      </template>

      <div>
        <div class="flex justify-evenly w-full">
          <UIcon
            v-if="miniGameStore.isSelectedPrediction"
            name="i-heroicons-chevron-left-20-solid"
            class="w-8 h-8 cursor-pointer"
            @click="miniGameStore.previousPage"
          />
          <div class="flex-grow text-center">
            <h3 class="text-2xl mb-4">{{ miniGameStore.title }}</h3>
          </div>
          <div v-if="miniGameStore.isSelectedPrediction" class="w-8"></div>
        </div>

        <div v-if="miniGameStore.isSelectedPrediction">
          <Prediction />
        </div>
        <div v-else>
          <div
            v-if="miniGameStore.answersData && miniGameStore.answersData.length"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div
              v-for="(item, key) in miniGameStore.answersData"
              :key="key"
              :item="item"
              class="relative"
            >
              <div class="group">
                <div
                  @click="miniGameStore.onSelectPrediction(item.id)"
                  class="relative rounded-lg bg-gray-100 group-hover:brightness-75 cursor-pointer mb-3"
                >
                  <UBadge
                    :color="item.isEndTime ? 'red' : 'primary'"
                    variant="soft"
                    class="absolute right-0"
                    >{{
                      item.isEndTime
                        ? $t('prediction_time_over')
                        : $t('prediction_in_progress')
                    }}</UBadge
                  >
                  <div>
                    <NuxtImg
                      v-if="item.imgPath"
                      class="w-full h-48 sm:h-36 rounded-md min-h-28 object-contain"
                      :src="item.imgPath"
                    />
                    <NuxtImg
                      v-else
                      src="/assets/images/logo.png"
                      class="w-full h-48 sm:h-36 rounded-md min-h-28 object-contain"
                    />

                    <div
                      class="w-full flex items-center h-6 bg-gray-800 bg-opacity-70 absolute bottom-0 rounded-b-md"
                    >
                      <p
                        class="text-xs sm:text-sm text-gray-100 dark:text-gray-100 truncate px-2"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const navStore = useNavStore()
const miniGameStore = useMiniGameStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    miniGameStore.previousPage()
  },
})
</script>
