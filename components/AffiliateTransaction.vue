<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-2xl mb-4">{{ $t('affiliate_menus_reports') }}</h3>
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

  <div class="w-full px-2">
    <div class="md:max-h-[55vh] overflow-y-auto">
      <section v-if="!isLoading">
        <div v-if="totalRecord > 0">
          <div
            v-for="(item, key) in transactions"
            :key="key"
            class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
          >
            <div class="flex items-center justify-between space-x-1 col-span-2">
              <div class="flex flex-col text-sm">
                <div class="text-gray-900 dark:text-gray-100">
                  {{ item.child }}
                </div>
                <div class="text-gray-500 dark:text-gray-400 text-xs">
                  {{ dayjs(item.createdDate).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>

              <div class="text-sm">
                <span v-if="item.type === 'WIN_LOSE'">{{ t('win_lose') }}</span>
                <span v-else-if="item.type === 'DEPOSIT'">{{
                  t('deposit_short')
                }}</span>
                <span v-else-if="item.type === 'WITHDRAW'">{{
                  t('withdraw_short')
                }}</span>
              </div>
            </div>

            <div
              class="flex items-center justify-end text-sm"
              :class="{
                'text-green-500': item.value > 0,
                'text-gray-900': item.value === 0,
                'text-red-500': item.value < 0,
              }"
            >
              {{ item.value }}
            </div>
          </div>
        </div>

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
