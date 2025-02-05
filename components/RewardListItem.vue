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
    class="relative transition-all duration-500 overflow-hidden mt-4"
  >
    <div class="flex gap-4">
      <NuxtImg
        :src="reward.fullImg"
        :alt="reward.nameReward"
        class="w-20 h-20 sm:w-24 sm:h-24 rounded-md"
      />
      <div class="w-full flex flex-col">
        <p class="text-sm sm:text-base">{{ reward.nameReward }}</p>
        <div class="flex items-center gap-1">
          <p class="text-base sm:text-lg font-semibold">
            {{ useCurrency(reward.amount, 'none').currency }}
          </p>
          <NuxtImg
            src="/assets/images/diamond.svg"
            alt="diamond"
            class="w-5 sm:w-6"
          />
        </div>
        <UButton
          type="button"
          class="login-btn w-full h-7 sm:h-9 justify-center rounded-full text-sm sm:text-base font-light mt-2"
          :disabled="isLoading"
          @click="onClicked(reward)"
          >{{ $t('redeem') }}</UButton
        >
      </div>
    </div>
    <transition
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-40"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 max-h-40"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isExpanded">
        <UDivider :label="$t('reward_more_detail')" class="mt-4" />
        <div class="flex flex-col gap-4 mt-2">
          <div
            class="flex items-center justify-between text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300"
          >
            <p>{{ $t('reward_balance') }}</p>
            <p>{{ useNumberWithComma(reward.count).amount }}</p>
          </div>
          <div>
            <p
              class="font-medium text-sm sm:text-base text-gray-500 dark:text-gray-300"
            >
              {{ $t('reward_description') }}
            </p>
            <p
              v-html="reward.description"
              class="text-xs sm:text-sm opacity-60"
            ></p>
          </div>
        </div>
      </div>
    </transition>
    <template #footer>
      <div
        class="flex items-center justify-center h-6 bg-gray-100 dark:bg-gray-800 rounded-b-md cursor-pointer"
        @click="isExpanded = !isExpanded"
      >
        <p class="text-[12px] font-light dark:font-medium text-gray-500">
          {{ isExpanded ? $t('btn_hide') : $t('btn_more') }}
        </p>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { RewardListPlayerList } from '~/models/reward.model'

const { useNumberWithComma, useCurrency } = useFormatter()

defineProps({
  reward: {
    type: Object as PropType<RewardListPlayerList>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['getReward'])

const isExpanded = ref(false)

const onClicked = (reward: RewardListPlayerList) => {
  emit('getReward', reward)
}
</script>
