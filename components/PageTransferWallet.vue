<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('menu_transfer_wallet') }}</h3>

    <div class="w-full flex flex-col items-center gap-2 sm:gap-4">
      <div
        class="rounded-xl border-2 w-full h-40 flex flex-col items-center justify-center bg-zinc-100 dark:border-gray-500 dark:bg-gray-800 p-4"
      >
        <UIcon
          v-if="isLoading"
          name="i-heroicons-arrow-path"
          class="animate-spin text-slate-500 text-4xl"
        />

        <div v-else class="flex flex-col items-center justify-center">
          <p>{{ $t('txt_amount') }} ({{ $t('transfer_wallet_cash') }})</p>
          <p
            class="cashback text-4xl sm:text-5xl text-green-600 dark:text-green-400"
          >
            {{ walletCash.currency }}
          </p>
        </div>

        <UButton
          v-if="user?.walletCash"
          type="button"
          class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-2"
          :loading="isLoading"
          :disabled="isLoading"
          @click="onConfirm()"
          >{{ $t('transfer_to_credit') }}</UButton
        >
      </div>
      <div
        v-if="!user?.walletCash"
        class="w-full text-center mt-5 flex flex-col items-center justify-center"
      >
        <div class="text-sm text-red-700">{{ $t('can_not_transfer_now') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RequestAutoWithdraw,
  RequestSumTurn,
} from '~/models/transfer.model'

const { t } = useI18n()
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const isLoading = ref(false)

const user = profileStore.userData

const emit = defineEmits(['activeTab'])

const walletCash = computed(() => useCurrency(user ? user.walletCash : 0))

const onConfirm = () => {
  popupStore.alertConfirm({
    message: t('do_you_want_to_transfer'),
    preventClose: true,
    onConfirm: () => onSubmit(),
  })
}

const onSubmit = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useTransferWallet()
    if (!status) {
      popupStore.alertError({ message })
    } else {
      if (data && data.isTurn) {
        if (data.isTurn) {
          const { isTurn, sumTurn, credit } = data
          if (isTurn && sumTurn) {
            transferSumTurn({ amount: credit, outstanding: 0 })
          } else if (isTurn) {
            transferAutoWithdraw({ amount: credit })
          }
        } else {
          popupStore.alertSuccess({ message })
        }
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const transferAutoWithdraw = async (body: RequestAutoWithdraw) => {
  try {
    isLoading.value = true
    const { status, message } = await useAutoWithdraw(body)
    if (!status) {
      popupStore.alertError({ message })
    } else {
      popupStore.alertSuccess({ message })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const transferSumTurn = async (body: RequestSumTurn) => {
  try {
    isLoading.value = true
    const { status, message } = await useSumTurn(body)
    if (!status) {
      popupStore.alertError({ message })
    } else {
      popupStore.alertSuccess({ message })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}
</script>
