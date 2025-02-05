<template>
  <UCard
    :ui="{
      body: {
        padding: 'px-2 py-2 sm:p-3',
      },
      footer: {
        padding: 'p-0 sm:p-0',
      },
    }"
    class="relative ransition-all duration-500 overflow-hidden mt-4"
  >
    <div class="w-full flex flex-col">
      <div class="flex gap-4 dark:text-amber-400">
        <div class="w-1/2 font-semibold">
          {{ $t('receive') }} {{ bonus.amount }}
        </div>
        <div class="w-1/2 font-semibold">
          {{ $t('maximum_withdrawal') }} {{ bonus.maxWithdraw }}
        </div>
      </div>
      <div class="text-sm my-2">
        <p>{{ $t('valid_period') }} :</p>
        <span class="text-xs"
          >{{ dayjs(bonus.startDate).format('DD-MM-YYYY HH:mm:ss') }}
          <span class="mx-2">{{ $t('to') }}</span>
          {{ dayjs(bonus.endDate).format('DD-MM-YYYY HH:mm:ss') }}</span
        >
      </div>

      <div class="text-sm mb-2">
        <span>{{ $t('status') }} : </span>
        <span class="text-xs" :class="statusColor">{{
          $t(`bonus_status_${bonus.status.toLocaleLowerCase()}`)
        }}</span>
      </div>

      <UButton
        type="button"
        class="login-btn w-full h-7 sm:h-9 justify-center rounded-full text-sm sm:text-base font-light mt-2"
        :disabled="isLoading"
        @click="onClicked(bonus)"
        >{{ $t('get_bonus') }}</UButton
      >
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/th'
import type { ListBonus } from '~/models/bonus.model'

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.locale('th')
const { t, locale } = useI18n()
const props = defineProps({
  bonus: {
    type: Object as PropType<ListBonus>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const formatDate = (date: Date) => {
  if (locale.value === 'th') {
    return dayjs(date).locale('th').format('D MMM YY HH:mm น.')
  } else {
    return dayjs(date).locale('en').format('MMM D, YYYY h:mm A')
  }
}

const statusColor = computed(() => {
  switch (props.bonus?.status) {
    case 'RECEIVED':
      return 'text-lime-400'
    case 'EXPIRED':
      return 'text-red-600'
    default:
      return 'text-amber-400'
  }
})

const emit = defineEmits(['getBonus'])

const isExpanded = ref(false)

const onClicked = (bonus: ListBonus) => {
  emit('getBonus', bonus.serial)
}
</script>
