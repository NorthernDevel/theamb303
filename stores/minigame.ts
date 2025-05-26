import type {
  AnswerData,
  AnswerMap,
  AnswerPlayerData,
} from '~/models/predict.model'

export const useMiniGameStore = defineStore('miniGameStore', () => {
  const { t } = useI18n()
  const popupStore = usePopupStore()
  const loaderStore = useLoaderStore()

  const defaultTitle = t('prediction_activity')
  const title = ref(defaultTitle)
  const isSelectedPrediction = ref(false)
  const answersData = ref<AnswerData[]>([])
  const answerData = ref<AnswerData>()
  const answerPlayerData = ref<AnswerPlayerData>()

  const previousPage = () => {
    title.value = defaultTitle
    isSelectedPrediction.value = false
    answerData.value = undefined
    answerPlayerData.value = undefined
  }

  const onSelectPrediction = async (id: string) => {
    isSelectedPrediction.value = true
    await fetchPredictById(id)
    await fetchAnswerPlayerByIdPredict(id)
  }

  const onConfirmAnswerSelected = (
    answer: AnswerData,
    key: string | number
  ) => {
    const keySelected = Object.keys(answer.answer)[(key as number) - 1]
    const yourChoice = `${keySelected}. ${answer.answer[keySelected]}`
    const answerSelected = { [keySelected]: answer.answer[keySelected] }
    console.log(answer.id, answerSelected)

    popupStore.alertConfirm({
      title: t('prediction_your_answer_selected'),
      message: yourChoice,
      preventClose: true,
      onConfirm: async () => await answerPlayer(answer.id, answerSelected),
    })
  }

  const fetchPridictAllActive = async () => {
    try {
      const { status, data, message } = await usePredictAllActive()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data) {
          const { total, answer } = data
          if (total > 0) answersData.value = answer
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  const fetchPredictById = async (id: string) => {
    try {
      loaderStore.start()
      const { status, data, message } = await usePredictById(id)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data) {
          answerData.value = data
          title.value = answerData.value.name
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const fetchAnswerPlayerByIdPredict = async (id: string) => {
    try {
      loaderStore.start()
      const { status, data, message } = await useAnswerPlayerByIdPredict(id)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        if (data) {
          answerPlayerData.value = data
        }
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  const answerPlayer = async (id: string, answer: AnswerMap) => {
    try {
      loaderStore.start()
      const { status, message } = await useAnswerPlayer(id, answer)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        await useAnswerPlayerByIdPredict(id)
        popupStore.alertSuccess({
          title: message,
          onConfirm: () => previousPage(),
        })
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      loaderStore.stop()
    }
  }

  return {
    title,
    answersData,
    answerData,
    answerPlayerData,
    isSelectedPrediction,
    previousPage,
    fetchPridictAllActive,
    onSelectPrediction,
    onConfirmAnswerSelected,
  }
})
