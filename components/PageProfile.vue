<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('profile_full') }}</h3>

    <div
      v-if="user"
      class="rounded-lg amber-gradient border-2 p-2 w-full grid grid-cols-2 py-4 dark:border-gray-800 text-gray-900 dark:text-gray-100"
    >
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('rank') }}
        </div>
        <div class="flex items-center">
          <NuxtImg
            :src="user.rank.imageRank"
            :alt="user.rank.rank"
            class="w-10"
          />
          {{ user.rank.rank }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('username') }}
        </div>
        <div>
          {{ user.username }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('profile_id') }}
        </div>
        <div>
          {{ user.usernameGameProfile }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('phone') }}
        </div>
        <div>
          {{ user.phoneNo }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('wallet_cash') }}
        </div>
        <div>
          {{ walletCash.currency }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('balance') }}
        </div>
        <div>
          {{ balance.currency }}
        </div>
      </div>
      <div class="list-item-profile">
        <div class="flex items-center text-sm">
          {{ $t('diamond') }}
        </div>
        <div class="flex gap-1">
          {{ user.walletDiamond }}
          <NuxtImg
              src="/assets/images/diamond.svg"
              alt="Diamond"
              class="w-6"
            />
        </div>
      </div>
    </div>

    <section
      v-if="bankStore.isCustomerAccount && user"
      class="w-full text-center"
    >
      <h3 class="mt-6 mb-2">
        <UDivider :label="$t('bank_information')" :ui="{ label: 'text-lg' }" />
      </h3>

      <div
        class="rounded-lg sky-gradient border-2 p-2 w-full grid grid-cols-2 py-4 dark:border-gray-800 text-gray-900 dark:text-gray-100"
      >
        <div class="list-item-profile">
          <div class="flex items-center text-sm">
            {{ $t('bank_name') }}
          </div>
          <div
            v-if="bankStore.userBank && bankStore.userBank.label"
            class="flex items-center"
          >
            <NuxtImg
              :src="bankStore.userBank.avatar"
              :alt="bankStore.userBank.label"
              class="w-6 mr-1"
            />
            {{ bankStore.userBank.label }}
          </div>
        </div>
        <div class="list-item-profile">
          <div class="flex items-center text-sm">
            {{ $t('bank_account') }}
          </div>
          <div>
            {{ user.customerBankAccount }}
          </div>
        </div>
        <div class="list-item-profile">
          <div class="flex items-center text-sm">
            {{ $t('bank_account_first_name') }}
          </div>
          <div>
            {{ user.firstName }}
          </div>
        </div>
        <div v-if="user.lastName" class="list-item-profile">
          <div class="flex items-center text-sm">
            {{ $t('bank_account_last_name') }}
          </div>
          <div>
            {{ user.lastName }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const bankStore = useBankStore()

const user = profileStore.userData

const walletCash = computed(() => useCurrency(user ? user.walletCash : 0))

const balance = computed(() => useCurrency(user ? user.balance : 0))
</script>

<style scoped>
.list-item-profile {
  @apply flex items-center justify-between space-x-1 col-span-2 border-b border-neutral-800 py-2 border-dashed border-indigo-500/50;
}

.amber-gradient {
  @apply bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600;
}

.sky-gradient {
  @apply bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600;
}
</style>
