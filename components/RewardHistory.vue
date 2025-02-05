<template>
  <div class="w-full">
    <USelectMenu v-model="selected" :options="period" />

    <div class="md:max-h-[55vh] overflow-y-auto mt-2">
      <section v-if="!isLoading">
        <RewardHistoryItem
          v-if="rewardStore.exchangeRewardList.length"
          v-for="(item, key) in rewardStore.exchangeRewardList"
          :key="key"
          :item="item"
        />
        <div
          v-else
          class="py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
        >
          <div class="flex justify-center gap-1">
            <UIcon name="i-heroicons-circle-stack-solid" class="w-4 h-4" />
            <p class="text-sm">{{ $t('data_not_found') }}</p>
          </div>
        </div>
      </section>
      <section v-else>
        <USkeleton class="h-10 w-full mb-2" v-for="i in 5" :key="i" />
      </section>
    </div>

    <div v-if="rewardStore.exchangeRewardTotal" class="w-full flex justify-center mt-4">
      <UPagination
        v-model="page"
        :total="rewardStore.exchangeRewardTotal"
        :ui="{
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
        }"
        :active-button="{ color: 'gray' }"
      >
        <template #prev="{ onClick }">
          <UTooltip :text="$t('previous_page')">
            <UButton
              icon="i-heroicons-arrow-small-left-20-solid"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:first-child]:rotate-180 me-2"
              @click="onClick"
            />
          </UTooltip>
        </template>

        <template #next="{ onClick }">
          <UTooltip :text="$t('next_page')">
            <UButton
              icon="i-heroicons-arrow-small-right-20-solid"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:last-child]:rotate-180 ms-2"
              @click="onClick"
            />
          </UTooltip>
        </template>
      </UPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

type Period = {
  label: string
  startDate: string
  endDate: string
}

const { t } = useI18n()
const rewardStore = useRewardStore()

const period: Period[] = [
  {
    label: t('reward_period_today'),
    startDate: dayjs().startOf('day').format(),
    endDate: dayjs().endOf('day').format(),
  },
  {
    label: t('reward_period_yesterday'),
    startDate: dayjs().subtract(1, 'day').startOf('day').format(),
    endDate: dayjs().subtract(1, 'day').endOf('day').format(),
  },
  {
    label: t('reward_period_this_week'),
    startDate: dayjs().startOf('week').format(),
    endDate: dayjs().endOf('week').format(),
  },
  {
    label: t('reward_period_last_week'),
    startDate: dayjs().subtract(1, 'week').startOf('week').format(),
    endDate: dayjs().subtract(1, 'week').endOf('week').format(),
  },
  {
    label: t('reward_period_this_month'),
    startDate: dayjs().startOf('month').format(),
    endDate: dayjs().endOf('month').format(),
  },
  {
    label: t('reward_period_last_month'),
    startDate: dayjs().subtract(1, 'month').startOf('month').format(),
    endDate: dayjs().subtract(1, 'month').endOf('month').format(),
  },
]
const selected = ref(period[0])
const isLoading = ref(false)
const page = ref(1)

watch([selected, page], () => {
  rewardStore.getReportExchangeReward({
    username: '',
    isPlayer: true,
    page: page.value,
    size: 10,
    startDate: dateWithoutOffset(selected.value.startDate),
    endDate: dateWithoutOffset(selected.value.endDate),
  })
})

const dateWithoutOffset = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss')
}

onMounted(() => {
  rewardStore.getReportExchangeReward({
    username: '',
    isPlayer: true,
    page: 1,
    size: 10,
    startDate: dateWithoutOffset(selected.value.startDate),
    endDate: dateWithoutOffset(selected.value.endDate),
  })
})
</script>
