<template>
  <UModal
    v-model="isOpen"
    :overlay="true"
    prevent-close
    :fullscreen="navStore.isMobile"
  >
    <UCard
      class="u-card-bg"
      :ui="{
        body: {
          padding: 'px-0 py-0 sm:p-0',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <NuxtImg src="/assets/images/logo.webp" alt="logo" class="w-20" />
          <UButton
            color="blue"
            variant="ghost"
            class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0"
            @click="onClickClose()"
            ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
          /></UButton>
        </div>
      </template>

      <div class="flex">
        <div class="p-1 min-w-[5rem] sm:min-w-32 lg:min-w-44 overflow-y-auto">
          <AppVerticalNav
            :links="navStore.menuProfile"
            color="blue"
            :use-route="false"
          />
        </div>

        <div class="py-4 px-2 w-full border-l border-gray-200">
          <PageChangePass v-if="navStore.currentMenu === 'change-password'" />

          <PageCashier v-else-if="navStore.currentMenu === 'cashier'" />

          <PageTransferWallet
            v-else-if="navStore.currentMenu === 'transfer-wallet'"
          />

          <PageMiniGame v-else-if="navStore.currentMenu === 'mini-game'" />

          <PageReward v-else-if="navStore.currentMenu === 'reward'" />

          <PageCoupon v-else-if="navStore.currentMenu === 'coupon'" />

          <PageCashback v-else-if="navStore.currentMenu === 'cashback'" />

          <PageCommission v-else-if="navStore.currentMenu === 'commission'" />

          <PageBonus v-else-if="navStore.currentMenu === 'bonus'" />

          <PageAffiliate v-else-if="navStore.currentMenu === 'affiliate'" />

          <PageConfigPromotion
            v-else-if="navStore.currentMenu === 'config-promotion'"
          />

          <InformationUpdate
            v-else-if="navStore.currentMenu === 'update-information'"
            form-profile
          />

          <PromptPayUpdate
            v-else-if="navStore.currentMenu === 'update-prompt-pay'"
          />

          <PageProfile v-else />
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const navStore = useNavStore()
const bankStore = useBankStore()
const cashierStore = useCashierStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const onClickClose = () => {
  if (
    cashierStore.isAutoPeerTransferPending &&
    cashierStore.confirmAutoPeerLeave
  ) {
    const isBackToMainDeposit = cashierStore.isSelectedChannel

    cashierStore.confirmAutoPeerLeave({
      activeTab: cashierStore.activeTab,
      idSelect: isBackToMainDeposit ? undefined : cashierStore.idSelect,
      isSelectedChannel: isBackToMainDeposit
        ? false
        : cashierStore.isSelectedChannel,
      onConfirm: isBackToMainDeposit ? undefined : () => (isOpen.value = false),
    })
    return
  }

  isOpen.value = false
}

onMounted(() => bankStore.getBankList())

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>
