<template>
  <div
    v-if="!cashierStore.isSelectedChannel"
    class="w-full"
  >
  <div v-if="isLoading" class="grid grid-cols-1 space-y-2">
    <USkeleton class="h-24" />
    <USkeleton class="h-24" />
    <USkeleton class="h-24" />
  </div>
    <div v-else class="grid grid-cols-1 space-y-2">
      <CashierDepositChannel
        v-if="isPeer2Pay"
        id="PEER2PAY"
        :title="$t('deposit_peer2pay')"
        :description="$t('deposit_peer2pay_detail')"
        image="assets/images/channels/Peer2pay.webp"
        :badge="$t('deposit_best_channels')"
      />
      <CashierDepositChannel
        v-if="isAutoSlip"
        id="AUTO_SLIP"
        :title="$t('deposit_auto_slip')"
        :description="$t('deposit_use_register')"
        image="assets/images/channels/autoSlip.webp"
      />
      <CashierDepositChannel
        v-if="isManualSlip"
        id="MANUAL_SLIP"
        :title="$t('deposit_auto_slip')"
        :description="$t('deposit_use_register')"
        image="assets/images/channels/autoSlip.webp"
      />
      <CashierDepositChannel
        v-if="isAuto"
        id="AUTO"
        :title="$t('deposit_auto')"
        :description="$t('deposit_use_register')"
        image="assets/images/channels/auto.webp"
      />
      <CashierDepositChannel
        v-if="cashierStore.askmepayIsDepositChannel"
        id="THPAY"
        title="THPAY"
        :description="$t('deposit_qrcode')"
        image="assets/images/channels/thpay.webp"
      />
      <CashierDepositChannel
        v-if="isTrueWallet"
        id="TRUEWALLET"
        title="Truemoney"
        :description="$t('deposit_truemoney')"
        image="assets/images/channels/truemoney.webp"
      />
    </div>
  </div>

  <div v-else class="w-full">
    <CashierDepositChannelThPay v-if="cashierStore.idSelect === 'THPAY'" />
    <CashierDepositChannelTransfer v-else />
  </div>
</template>

<script lang="ts" setup>
const resourceStore = useResourceStore()
const cashierStore = useCashierStore()

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const isPeer2Pay = computed(() => false) // resourceStore.resources?.isDeposit.isPeer2Pay
const isAuto = computed(() => resourceStore.isDeposit.isAuto)
const isAutoSlip = computed(() => resourceStore.isDeposit.isAutoSlip)
const isManualSlip = computed(() => resourceStore.isDeposit.isManualSlip)
const isScbAPI = computed(() => resourceStore.isDeposit.isScbAPI)
const isTrueWallet = computed(() => resourceStore.isDeposit.isTrueWallet)
</script>
