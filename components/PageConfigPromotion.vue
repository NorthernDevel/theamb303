<template>
  <div class="w-full flex flex-col items-center">
    <h3 class="text-2xl mb-4">{{ $t('config_promotion') }}</h3>
    <div v-if="isLoading" class="w-full">
      <USkeleton class="w-full h-28 mt-2" />
      <USkeleton class="w-full h-28 mt-2" />
      <USkeleton class="w-full h-28 mt-2" />
    </div>
    <div v-else class="w-full">
      <div v-if="promotionList.length">
        <ConfigPromotionItem
          v-for="(promotion, index) in promotionList"
          :promition="promotion"
          :index="index"
          :is-last-one="index !== promotionList.length - 1"
          v-on:move-up="moveUp"
          v-on:move-down="moveDown"
        />
      </div>
      <UCard v-else class="flex items-center justify-center my-4">
        <div class="flex justify-center gap-1">
          <UIcon name="i-heroicons-circle-stack-solid" class="w-6 h-6" />
          <p class="text-">{{ $t('data_not_found') }}</p>
        </div>
      </UCard>

      <UForm
        :state="state"
        ref="form"
        @submit.prevent="onSubmit"
        class="w-full"
      >
        <div v-if="promotionList.length" class="my-4 px-5">
          <URadioGroup
            :legend="$t('status')"
            v-model="isActive"
            :options="options"
          />
        </div>

        <UButton
          type="submit"
          class="login-btn w-full h-12 justify-center rounded-full text-lg font-light"
          :loading="isSubmitLoading"
          :disabled="isLoading || isSubmitLoading || !promotionList.length"
          >{{ $t('btn_submit') }}</UButton
        >
        <UCheckbox
          color="blue"
          v-model="notifyWhenDisabled"
          @change="toggleToLocalStorage"
          class="mt-2"
        >
          <template #label>
            <span class="text-sm font-extralight">{{
              $t('notify_status')
            }}</span>
          </template>
        </UCheckbox>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  RequestConfigAutoPromotion,
  RequestListPromotion,
} from '~/models/default.model'

type ConfigAutoPromotion = {
  username: string
  isActive: boolean
}

const { t } = useI18n()
const { getItem, setItem, removeItem } = useCustomLocalStorage()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const isLoading = ref(false)
const isSubmitLoading = ref(false)
const promotionList = ref<RequestListPromotion[]>([])
const isCreate = ref(false)
const isActive = ref(false)

const initialState: ConfigAutoPromotion = {
  username: '',
  isActive: false,
}

const state = ref({
  ...initialState,
})

const options = [
  { value: false, label: t('status_inactive') },
  { value: true, label: t('status_active') },
]

const notifyWhenDisabled = computed(() => {
  if (!profileStore.userId) return true
  const userKey = getItem(`user-key-${profileStore.userId}`)
  if (userKey) return false
  return true
})

const toggleToLocalStorage = (isNotify: boolean) => {
  if (profileStore.userId) {
    if (isNotify) {
      removeItem(`user-key-${profileStore.userId}`)
    } else {
      setItem(`user-key-${profileStore.userId}`, profileStore.userId)
    }
  }
}

const getAutoPromotionList = async () => {
  try {
    isLoading.value = true
    const username = profileStore.userData?.username!
    const { status, data, message } = await useAutoPromotionCustomers({
      username,
    })
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const {
          isCreateAutoPromotion,
          listPromotion,
          isActive: promotionActive,
        } = data

        isCreate.value = !!isCreateAutoPromotion
        if (!isCreate.value) isActive.value = !!promotionActive

        // NOTE: listPromotion --> sort by seq --> map new object
        if (listPromotion && listPromotion.length) {
          promotionList.value = listPromotion
            .sort((a, b) => a.seq - b.seq)
            .map((promotion, index) => {
              const { id, promotionName, type, seq, isPromotionActive } =
                promotion
              const seqIndex = seq > 10000 ? index + 1 : seq
              return {
                promotionId: id,
                promotionName,
                type,
                seq: seqIndex,
                isPromotionActive,
              }
            })
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

const moveUp = (index: number) => {
  if (index > 0) {
    promotionList.value[index - 1].seq += 1
    const temp = promotionList.value[index]
    promotionList.value[index] = promotionList.value[index - 1]
    promotionList.value[index - 1] = temp
    promotionList.value[index - 1].seq -= 1
  }
}

const moveDown = (index: number) => {
  if (index < promotionList.value.length - 1) {
    promotionList.value[index + 1].seq -= 1
    const temp = promotionList.value[index]
    promotionList.value[index] = promotionList.value[index + 1]
    promotionList.value[index + 1] = temp
    promotionList.value[index + 1].seq += 1
  }
}

const onSubmit = async () => {
  const body: RequestConfigAutoPromotion = {
    username: profileStore.userData?.username!,
    isActive: isActive.value,
    listPromotion: promotionList.value,
  }

  try {
    isSubmitLoading.value = true
    const { status, message } = await useConfigAutoPromotionCustomers(
      isCreate,
      body
    )
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      profileStore.isAutoPromotion = body.isActive
      popupStore.alertSuccess({
        title: message,
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isSubmitLoading.value = false
  }
}

onMounted(() => {
  getAutoPromotionList()
})
</script>
