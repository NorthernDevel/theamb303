<template>
  <div class="w-full px-2">
    <div class="md:max-h-[55vh] overflow-y-auto">
      <section v-if="!isLoading">
        <CashierHistoryItem
          v-if="records.length"
          v-for="(item, key) in records"
          :key="key"
          :item="item"
          v-on:receive-reject="getRejectId"
        />
        <div
          v-else
          class="py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
        >
          <div class="flex justify-center gap-1">
            <UIcon name="i-heroicons-circle-stack-solid" class="w-4 h-4" />
            <p class="text-sm">{{ $t('data_not_found') }}</p>
          </div>
        </div>
      </section>
      <section v-else>
        <USkeleton class="h-10 w-full mb-2" v-for="i in 5" :key="i" />
      </section>
    </div>

    <div v-if="totalRecord" class="w-full flex justify-center mt-4">
      <UPagination
        v-model="page"
        :total="totalRecord"
        :ui="{
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
        }"
        :active-button="{ color: 'gray' }"
      >
        <template #prev="{ onClick }">
          <UTooltip :text="$t('previous_page')">
            <UButton
              icon="i-heroicons-arrow-small-left-20-solid"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:first-child]:rotate-180 me-2"
              @click="onClick"
            />
          </UTooltip>
        </template>

        <template #next="{ onClick }">
          <UTooltip :text="$t('next_page')">
            <UButton
              icon="i-heroicons-arrow-small-right-20-solid"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:last-child]:rotate-180 ms-2"
              @click="onClick"
            />
          </UTooltip>
        </template>
      </UPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Record, RequestHistory } from '~/models/history.model'

const { t } = useI18n()
const popupStore = usePopupStore()

const isLoading = ref(false)
const page = ref(1)
const records = ref<Record[]>([])
const totalRecord = ref(0)

const props = defineProps({
  activeTab: Number,
})

watch([props, page], () => {
  const transactionType = props.activeTab === 0 ? 'DEPOSIT' : 'WITHDRAW'
  getHistory({ transactionType, page: page.value, limit: 10 })
})

const getHistory = async (body: RequestHistory) => {
  try {
    isLoading.value = true
    records.value = []
    totalRecord.value = 0
    const { status, data, message } = await useHistory(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.records) {
        records.value = data.records
        totalRecord.value = data.totalRecord
        // Get Reject tansactions.
        if (body.transactionType === 'WITHDRAW') {
          getRejectTransaction()
        }
      } else {
        records.value = []
        totalRecord.value = 0
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getRejectTransaction = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useRejectTrans()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.records) {
        const rejectRecords = data.records
        // Create a Set of rejectRecord IDs for faster lookup
        const rejectIds = new Set(
          rejectRecords
            .filter((record) => !record.isReceive)
            .map((record) => record.id)
        )

        // Update records to set isRejectTrans = true if id matches
        records.value.forEach((record) => {
          if (rejectIds.has(record.id)) {
            record.isRejectTrans = true
          }
        })
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getRejectId = (id: string) => {
  console.log(id)
  popupStore.alertConfirm({
    message: t('history_confirm'),
    preventClose: true,
    onConfirm: () => receiveRejectTransaction(id),
  })
}

const receiveRejectTransaction = async (rejectTransId: string) => {
  try {
    isLoading.value = true
    const { status, message } = await useReceiveRejectTrans({ rejectTransId })
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: message,
        onConfirm: () =>
          getHistory({
            transactionType: 'WITHDRAW',
            page: page.value,
            limit: 10,
          }),
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getHistory({ transactionType: 'DEPOSIT', page: page.value, limit: 10 })
})
</script>
