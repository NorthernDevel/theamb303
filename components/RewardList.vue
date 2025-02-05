<template>
  <div class="w-full">
    <div class="flex gap-2">
      <USelectMenu
        v-model="selected"
        :options="typeOfReward"
        @change="onChanged"
        size="xl"
        class="grow"
      />
      <div class="grow flex items-center justify-end gap-1">
        <p class="text-2xl sm:text-3xl font-semibold">
          {{
            useCurrency(profileStore.userData?.walletDiamond || 0, 'none')
              .currency
          }}
        </p>
        <NuxtImg
          src="/assets/images/diamond.svg"
          alt="diamond"
          class="w-8 sm:w-10"
        />
      </div>
    </div>

    <div v-if="isLoading">
      <USkeleton class="h-32 sm:h-36 mt-4" />
    </div>
    <div v-else>
      <RewardListItem
        v-if="rewardList.length"
        v-for="reward in rewardList"
        :reward="reward"
        :is-loading="isExchangeLoading"
        v-on:get-reward="onGetReward"
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
import dayjs from 'dayjs'
import type {
  RequestRewardListPlayer,
  RewardListPlayerList,
} from '~/models/reward.model'

type RewardType = {
  label: string
  type: string
}

const { t } = useI18n()
const { useCurrency } = useFormatter()
const profileStore = useProfileStore()
const rewardStore = useRewardStore()
const popupStore = usePopupStore()

const emit = defineEmits(['activeTab'])

const typeOfReward: RewardType[] = [
  {
    label: t('reward_type_all'),
    type: '',
  },
  {
    label: t('reward_type_normal'),
    type: 'NORMAL',
  },
  {
    label: t('reward_type_coupon'),
    type: 'COUPON',
  },
]
const selected = ref(typeOfReward[0])
const isLoading = ref(false)
const isExchangeLoading = ref(false)
const rewardList = ref<RewardListPlayerList[]>([])
const rewardTotal = ref<number>(0)

const getRewardListPlayer = async (body: RequestRewardListPlayer) => {
  try {
    isLoading.value = true
    const { status, data, message } = await useRewardListPlayer(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.list) {
        rewardList.value = data.list
        rewardTotal.value = data.total
      } else {
        rewardList.value = []
        rewardTotal.value = 0
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const exchangeReward = async (reward: RewardListPlayerList) => {
  try {
    isExchangeLoading.value = true
    const { status, message } = await useExchangeReward({ id: reward.id })
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      const { productType, productCode } = reward
      // STEP 1: check productType
      if (productType === 'COUPON') {
        await rewardStore.getReportExchangeReward({
          username: '',
          isPlayer: true,
          page: 1,
          size: 10,
          startDate: dayjs().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
          endDate: dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        })

        // STEP 2: map productCode
        if (rewardStore.exchangeRewardList) {
          const exchangeReward = rewardStore.exchangeRewardList.find(
            (item) => item.productCode === productCode
          )
          // STEP 3: show serialCode
          if (exchangeReward) {
            popupStore.alertSuccess({
              title: t('reward_your_coupon_code'),
              message: exchangeReward.serialCode,
              copyText: exchangeReward.serialCode,
              preventClose: true,
              onConfirm: () => {
                popupStore.openModalProfile('coupon')
              },
            })
          }
        }
      } else {
        popupStore.alertSuccess({
          title: message,
          onConfirm: () => {
            emit('activeTab', 1)
          },
        })
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isExchangeLoading.value = false
  }
}

const onGetReward = (reward: RewardListPlayerList) => {
  exchangeReward(reward)
}

const onChanged = (selected: RewardType) => {
  getRewardListPlayer({
    name: '',
    page: 1,
    size: 10,
    type: selected.type,
  })
}

onMounted(() => {
  getRewardListPlayer({
    name: '',
    page: 1,
    size: 10,
    type: selected.value.type,
  })
})
</script>
