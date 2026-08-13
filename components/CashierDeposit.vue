<template>
  <div class="w-full">
    <template v-if="!cashierStore.isSelectedChannel">
      <UDivider
        :ui="{ border: { base: 'dark:bg-emerald-700' } }"
        label="ช่องทางการฝากเงิน"
        size="sm"
        class="mt-4"
      />
      <div class="flex flex-col gap-2 mt-4">
        <CashierDepositButton
          v-for="item in cashierStore.depositMenu"
          :key="item.to"
          :item="item"
          color="yellow"
          size="w-full min-h-20"
        />
      </div>
    </template>

    <template v-else>
      <UDivider :label="$t(title)" size="sm" class="mt-4" />
      <div class="py-2 px-2 w-full">
        <CashierDepositChannelAutoPeer
          v-if="cashierStore.idSelect === 'AUTO_PEER'"
        />
        <CashierDepositChannelWithDecimal
          v-else-if="cashierStore.idSelect === 'DECIMAL'"
        />
        <CashierDepositChannelTransfer
          v-else-if="cashierStore.idSelect === 'AUTO_SLIP'"
        />
        <CashierDepositChannelExpress v-else />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

const title = computed(() => {
  switch (cashierStore.idSelect) {
    case 'AUTO':
      return 'deposit_auto'
    case 'AUTO_SLIP':
      return 'deposit_auto_slip'
    case 'AUTO_PEER':
      return 'ฝาก-ถอน ระหว่างผู้ใช้โดยตรง'
    case 'THPAY':
      return 'ฝากเงินรวดเร็วผ่านคิวอาร์โค้ด หรือ สแกนฝากเงิน'
    case 'TRUEWALLET':
      return 'deposit_truemoney'
    case 'DECIMAL':
      return 'deposit_decimal'
    case 'EXPRESS_DEPOSIT':
      return 'deposit_express'
    default:
      return 'deposit_express'
  }
})

onMounted(() => {
  cashierStore.isSelectedChannel = false
})
</script>
