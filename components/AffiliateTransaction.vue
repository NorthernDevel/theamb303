<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('transactions') }}</h3>
  </div>
  <div class="w-full flex items-center justify-between gap-4">
    <div class="flex flex-col w-1/2">
      <div class="mb-1">{{ $t('start_date') }} :</div>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
          id="startDate"
          icon="i-heroicons-calendar-days-20-solid"
          :label="dayjs(startDate).format('DD-MM-YYYY')"
          class="w-full flex justify-center items-center text-center"
        />
        <template #panel="{ close }">
          <DatePicker
            v-model="startDate"
            is-required
            @close="close"
            class="flex justify-center items-center"
          />
        </template>
      </UPopover>
    </div>

    <div class="flex flex-col w-1/2">
      <div class="mb-1">{{ $t('end_date') }} :</div>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
          id="endDate"
          icon="i-heroicons-calendar-days-20-solid"
          :label="dayjs(endDate).format('DD-MM-YYYY')"
          class="w-full flex justify-center items-center text-center"
        />
        <template #panel="{ close }">
          <DatePicker
            v-model="endDate"
            is-required
            @close="close"
            class="flex justify-center items-center"
          />
        </template>
      </UPopover>
    </div>
  </div>

  <div class="mt-5 w-full">
    <UTable
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: $t('data_not_found'),
      }"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      class="border-2 border-gray-200 dark:border-gray-500 w-full bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <template #default>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ transaction.child }}</td>
          <td>{{ transaction.createdDate }}</td>
        </tr>
      </template>
    </UTable>
    <div
      class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
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
import type {
  RecordReportTarnsection,
  RequestReportTarnsection,
} from '~/models/affiliate.model'
import dayjs from 'dayjs'

const { t } = useI18n()
const popupStore = usePopupStore()

const columns = [
  { key: 'no', label: t('table_header_trans_no') },
  { key: 'username', label: t('username') },
  { key: 'date', label: t('table_header_trans_date') },
]
const transactions = ref<RecordReportTarnsection[]>([])
const isLoading = ref(false)
const page = ref(1)
const pageCount = 5
const totalRecord = ref(0)
const startDate = ref(new Date())
const endDate = ref(new Date())

watch([startDate, endDate], () => {
  const start = dayjs(startDate.value)
  const end = dayjs(endDate.value)

  if (start.isBefore(end) || start.isSame(end)) {
    getTransaction({
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      page: page.value,
      size: pageCount,
    })
  } else {
    popupStore.alertError({ message: t('start_after_end') })
  }
})

const getTransaction = async (body: RequestReportTarnsection) => {
  try {
    isLoading.value = true
    transactions.value = []
    totalRecord.value = 0
    const { status, message, data } = await ReportTarnsection(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data && data.records) {
        transactions.value = data.records
        totalRecord.value = data.total
      } else {
        transactions.value = []
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

onMounted(() => {
  getTransaction({
    startDate: dayjs(startDate.value).format('YYYY-MM-DD'),
    endDate: dayjs(endDate.value).format('YYYY-MM-DD'),
    page: page.value,
    size: pageCount,
  })
})
</script>
