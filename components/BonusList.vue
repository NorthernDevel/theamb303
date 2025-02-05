<template>
  <div class="w-full">
    <div v-if="isLoading">
      <USkeleton class="h-32 sm:h-36 mt-4" />
    </div>
    <div v-else>
      <BonusListItem
        v-if="pendingBonusList.length"
        v-for="bonus in pendingBonusList"
        :bonus="bonus"
        :is-loading="isExchangeLoading"
        v-on:get-bonus="onGetBonus"
      />
      <UCard v-else class="flex items-center justify-center mt-4 h-36">
        <div class="flex justify-center gap-1">
          <UIcon name="i-heroicons-circle-stack-solid" class="w-6 h-6" />
          <p class="text-lg">{{ $t('data_not_found') }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RequestBonus,
  ListBonus,
  RequestReceiveBonus,
} from '~/models/bonus.model'

type StatusType = {
  label: string
  type: string
}

const { t } = useI18n()
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])

const statusOfBonus: StatusType[] = [
  {
    label: t('reward_type_all'),
    type: '',
  },
  {
    label: t('bonus_status_pending'),
    type: 'PENDING',
  },
  {
    label: t('bonus_status_received'),
    type: 'RECEIVED',
  },
  {
    label: t('bonus_status_expired'),
    type: 'EXPIRED',
  },
]
const selected = ref(statusOfBonus[0])
const isLoading = ref(false)
const isExchangeLoading = ref(false)
const bonusList = ref<ListBonus[]>([])
const bonusTotal = ref<number>(0)

const pendingBonusList = computed(() => {
  return bonusList.value.filter((bonus) => bonus.status === 'PENDING')
})

const getListBonus = async (body: RequestBonus) => {
  try {
    isLoading.value = true
    const { status, data, message } = await useBonus(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.list) {
        bonusList.value = data.list
        bonusTotal.value = data.total
      } else {
        bonusList.value = []
        bonusTotal.value = 0
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getBonus = async (serial: string) => {
  try {
    isExchangeLoading.value = true
    const { status, data, message } = await useBonusDetail({ serial })
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.reference) {
        receiveBonus({ serial, reference: data.reference })
      } else {
        popupStore.alertError({ message: data?.message || '' })
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isExchangeLoading.value = false
  }
}

const receiveBonus = async (body: RequestReceiveBonus) => {
  try {
    isExchangeLoading.value = true
    const { status, message } = await useReceiveBonus(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
        onConfirm: () => {
          emit('activeTab', 1)
        },
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isExchangeLoading.value = false
  }
}

const onGetBonus = (serial: string) => {
  getBonus(serial)
}

onMounted(() => {
  getListBonus({
    page: 1,
    size: 10,
  })
})
</script>
