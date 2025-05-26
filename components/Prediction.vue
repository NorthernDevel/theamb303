<template>
  <UCard
    v-if="answer && !loaderStore.isLoading"
    :ui="{
      body: {
        padding: 'px-2 py-2 sm:p-3',
      },
      footer: {
        padding: 'p-0 sm:p-0',
      },
    }"
    class="relative transition-all duration-500 overflow-hidden mt-4"
  >
    <div class="flex flex-col gap-4 mt-4">
      <div
        v-if="answer.isEndTime && answerPlayer"
        class="flex flex-col items-center mb-4"
      >
        <div v-if="answerPlayer.status === 'SUCCESS'" class="w-full">
          <p class="mb-2 text-lg text-green-500 text-center">
            {{ $t('prediction_question', { question: answerPlayer.question }) }}
          </p>
          <p class="mb-2 text-center">
            {{
              $t('prediction_your_answer', {
                answer: yourChoice(answerPlayer.choiceSet),
              })
            }}
          </p>
          <p
            class="text-xl text-center"
            :class="
              answerPlayer.rightOrWrong ? 'text-green-500' : 'text-red-500'
            "
          >
            {{
              answerPlayer.rightOrWrong
                ? $t('prediction_correct')
                : $t('prediction_incorrect')
            }}
          </p>
        </div>
        <div v-else class="w-full">
          <p class="mb-2 text-lg text-green-500 text-center">
            {{ $t('prediction_question', { question: answerPlayer.question }) }}
          </p>
          <p class="mb-2 text-center">
            {{
              $t('prediction_your_answer', {
                answer: yourChoice(answerPlayer.choiceSet),
              })
            }}
          </p>
          <p class="text-xl text-amber-500 text-center">
            {{ $t('prediction_waiting_for_results') }}
          </p>
        </div>
      </div>
      <div
        v-else-if="answer.isEndTime && !answerPlayer"
        class="flex justify-center mb-4"
      >
        <p class="text-xl text-amber-500">
          {{ $t('prediction_time_over_with_icon') }}
        </p>
      </div>
      <div
        v-else-if="
          !answer.isEndTime && answerPlayer && answerPlayer.status === 'PENDING'
        "
        class="flex flex-col items-center mb-4"
      >
        <p class="mb-2">
          {{
            $t('prediction_your_answer', {
              answer: yourChoice(answerPlayer.choiceSet),
            })
          }}
        </p>
        <p class="text-xl text-amber-500">
          {{ $t('prediction_waiting_for_results') }}
        </p>
      </div>
      <div v-else>
        <p class="text-lg sm:text-xl text-green-500 mb-4">
          {{ $t('prediction_question', { question: answer.question }) }}
        </p>
        <div class="grid grid-cols-2 gap-2 mb-4">
          <UButton
            v-for="(value, key) in answer.answer"
            :key="key"
            :item="value"
            type="button"
            color="orange"
            variant="soft"
            @click="onSelectedAnswer(key)"
            class="w-full h-8 rounded-full font-light"
            >{{ key }}. {{ value }}</UButton
          >
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-40"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 max-h-40"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isExpanded">
        <UDivider :label="$t('prediction_detail')" class="mt-4" />
        <div class="flex flex-col gap-4 mt-2">
          <div class="flex justify-center">
            <NuxtImg
              v-if="answer.imgPath"
              :src="answer.imgPath"
              :alt="answer.name"
              class="w-40 h-40 object-contain sm:w-48 sm:h-48 rounded-md"
            />
            <NuxtImg
              v-else
              src="/assets/images/logo.png"
              :alt="answer.name"
              class="w-40 h-40 object-contain sm:w-48 sm:h-48 rounded-md"
            />
          </div>
          <p v-html="answer?.detail" class="text-sm"></p>
          <div>
            <p
              class="font-medium text-sm sm:text-base text-gray-500 dark:text-gray-300"
            >
              {{ $t('prediction_preiod') }}
            </p>
            <p
              class="text-sm sm:text-base font-medium text-gray-500 dark:text-gray-300"
            >
              {{ preiod }}
            </p>
          </div>
        </div>
      </div>
    </transition>
    <template #footer>
      <div
        class="flex items-center justify-center h-6 bg-gray-100 dark:bg-gray-800 rounded-b-md cursor-pointer"
        @click="isExpanded = !isExpanded"
      >
        <p class="text-[12px] font-light dark:font-medium text-gray-500">
          {{ isExpanded ? $t('btn_hide') : $t('prediction_detail') }}
        </p>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { AnswerMap } from '~/models/predict.model'

const miniGameStore = useMiniGameStore()
const loaderStore = useLoaderStore()

const isExpanded = ref(false)

const answer = computed(() => miniGameStore.answerData)

const answerPlayer = computed(() => miniGameStore.answerPlayerData)

const yourChoice = (answer: AnswerMap) => {
  const firstKey = Object.keys(answer)[0]
  const firstValue = answer[firstKey]
  return `${firstKey}. ${firstValue}`
}

const onSelectedAnswer = (key: string | number) => {
  if (answer.value) miniGameStore.onConfirmAnswerSelected(answer.value, key)
}

const preiod = computed(() => {
  if (!answer.value) return
  const { start, end } = answer.value.date

  return `${dayjs(start).format('DD/MM/YYYY HH:mm')} - ${dayjs(end).format(
    'DD/MM/YYYY HH:mm'
  )}`
})
</script>
