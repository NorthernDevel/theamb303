<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('menu_cashback') }}</h3>

    <UTabs v-model="activeTab" :items="tabList" class="w-full">
      <template #icon="{ item, selected }">
        <UIcon
          :name="item.icon"
          class="w-4 h-4 flex-shrink-0 mr-2"
          :class="[selected && 'text-amber-500 dark:text-amber-400']"
        />
      </template>
    </UTabs>
    <CashbackDetail v-if="activeTab === 0" v-on:active-tab="onActiveTab" />
    <MultipleTransaction
      v-if="activeTab === 1"
      :channel="TransactionChannel.CASHBACK"
    />
  </div>
</template>

<script lang="ts" setup>
import { TransactionChannel } from '~/models/transactions.model'

const { t } = useI18n()

const activeTab = ref<number>(0)
const tabList = [
  {
    name: 'cashback',
    label: t('menu_cashback'),
    icon: 'i-heroicons-arrow-uturn-left',
  },
  {
    name: 'history',
    label: t('history_short'),
    icon: 'i-heroicons-clock',
  },
]

const onActiveTab = (tab: number) => (activeTab.value = tab)
</script>
