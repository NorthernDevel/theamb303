<template>
  <div class="w-full flex flex-col items-center justify-center">
    <h3 class="mt-2">{{ $t('history') }}</h3>

    <UTabs
      v-model="cashierStore.activeTabHistory"
      :items="cashierStore.tabListHistory"
      class="w-full mt-4"
    />
    <CashierHistoryDetail :active-tab="cashierStore.activeTabHistory" />
  </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()
</script>
