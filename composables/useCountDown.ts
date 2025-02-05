let countdownInterval: NodeJS.Timeout | number | undefined = undefined

export const useCountdown = (min: number, sec: number) => {
  const minutes = ref<number>(min)
  const seconds = ref<number>(sec)
  // Computed property to format the time as "mm:ss"
  const formattedTime = computed((): string => {
    const min = String(minutes.value).padStart(2, '0')
    const sec = String(seconds.value).padStart(2, '0')
    return `${min}:${sec}`
  })

  // Computed property to check if time is "00:00"
  const isTimeUp = computed((): boolean => formattedTime.value === '00:00')

  const startCountdown = (): void => {
    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
    }

    countdownInterval = setInterval((): void => {
      if (seconds.value === 0) {
        if (minutes.value > 0) {
          minutes.value--
          seconds.value = 59
        } else {
          clearInterval(countdownInterval)
          countdownInterval = undefined
        }
      } else {
        seconds.value--
      }
    }, 1000)
  }

  const clearCountdown = (): void => {
    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
    }
  }

  const restartCountdown = (): void => {
    minutes.value = min
    seconds.value = sec
    clearCountdown()
    startCountdown()
  }

  return {
    formattedTime,
    startCountdown,
    clearCountdown,
    restartCountdown,
    isTimeUp,
  }
}
