<template>
  <UForm
    ref="form"
    :state="state"
    :schema="numberPadSchema"
    :validate-on="['submit']"
    @submit.prevent="onSubmit"
  >
    <AppFormGroup
      :label="
        $t('please_specify_amount', {
          value: shortCutAmount.length > 6 ? '(จำนวนเต็มร้อยเท่านั้น)' : '',
        })
      "
      :required="true"
      name="amount"
    >
      <UInput
        :ui="{
          base: 'text-right [&::placeholder]:text-left',
          color: {
            white: {
              outline:
                'bg-black/50 border-red-900/60 text-gray-100 ring-red-900/60 focus:ring-red-500 focus:border-amber-300',
            },
          },
        }"
        icon="i-heroicons-banknotes"
        type="text"
        size="lg"
        inputmode="numeric"
        :placeholder="
          $t('deposit_range', {
            min: amountCurrency(min),
            max: amountCurrency(max),
            currency: '',
          })
        "
        v-model="state.amount"
        @blur="onBlur"
      >
        <template #trailing>
          <span class="text-amber-200/70 text-xs">
            {{ profileStore.currency }}
          </span>
        </template>
      </UInput>
    </AppFormGroup>

    <p
      class="font-light text-sm text-amber-100/80 mb-2 before:content-['*'] before:text-rose-400"
    >
      {{
        $t('deposit_range', {
          min: amountCurrency(min),
          max: amountCurrency(max),
          currency: profileStore.currency,
        })
      }}
    </p>

    <div
      :class="[shortCutAmount.length > 6 && 'grid-cols-4']"
      class="grid grid-cols-3 gap-2"
    >
      <UButton
        v-for="amount in shortCutAmount"
        :key="amount.value"
        type="button"
        :loading="loading"
        class="menu-btn-inactive w-full h-12 justify-center rounded-full text-md !text-gray-50"
        @click="onSelectshortCutAmount(amount.value)"
      >
        <span v-if="isFirstSelect">+</span>{{ amount.name }}
      </UButton>
    </div>

    <UButton
      type="submit"
      class="theme-primary-btn w-full h-12 justify-center text-lg mt-10 mb-3"
    >
      {{ $t('btn_next') }}
    </UButton>

    <UButton
      type="button"
      class="theme-danger-btn w-full h-12 justify-center text-lg mb-2"
      :loading="loading"
      @click="cashierStore.backToMainDeposit()"
      >{{ $t('btn_back') }}</UButton
    >
  </UForm>
</template>

<script lang="ts" setup>
import { z } from 'zod'

interface InitialState {
  amount: number | undefined
}

export interface ShortCutAmount {
  name: string
  value: number
}

const { t } = useI18n()
const { useCurrency, useParseAmount } = useFormatter()
const profileStore = useProfileStore()
const cashierStore = useCashierStore()

const props = defineProps({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  shortCutAmount: {
    type: Array as () => ShortCutAmount[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const amount = ref('0')
const isFirstSelect = ref(false)
const initialState: InitialState = {
  amount: undefined,
}

const numberPadSchema = z.object({
  amount: z
    .number({ required_error: t('please_specify_amount') })
    .superRefine((value, ctx) => {
      if (value < props.min) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: props.min,
          type: 'number',
          inclusive: true,
          message: t('deposit_amount_must_be_at_least', {
            value: amountCurrency(props.min),
          }),
        })
      }

      if (value > props.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: props.max,
          type: 'number',
          inclusive: true,
          message: t('deposit_amount_must_be_at_most', {
            value: amountCurrency(props.max),
          }),
        })
      }

      if (value % 100 !== 0 && props.shortCutAmount.length > 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('deposit_amount_must_be_a_whole_number'),
        })
      }
    }),
})

const amountCurrency = (amount: number) =>
  useCurrency(amount, 'none').currency.value

const state = ref({
  ...initialState,
})

const onBlur = (event: Event) => {
  const input = (event.target as HTMLInputElement).value

  if (!input) {
    amount.value = '0'
    state.value.amount = 0
    return
  }

  const amountNumber = useParseAmount().parseAmount(input)

  amount.value = useParseAmount().formatAmount(amountNumber)
  state.value.amount = amountNumber
}

const onSelectshortCutAmount = (value: number) => {
  if (!isFirstSelect.value) {
    isFirstSelect.value = true
    state.value.amount = value
  } else if (state.value.amount) {
    state.value.amount = state.value.amount + value
  } else {
    state.value.amount = value
  }
}

const onSubmit = () => {
  emit('submit', state.value.amount)
}
</script>
