import dayjs from 'dayjs'

let countdownInterval: NodeJS.Timeout | number | undefined = undefined

export const useCountdownWithMinSec = (min: number, sec: number) => {
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

export const useCountdown = useCountdownWithMinSec

export const useCountdownWithSec = (initialSec: number) => {
  const totalSeconds = ref<number>(initialSec)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)

  const minutes = computed(() => Math.floor(totalSeconds.value / 60))

  const seconds = computed(() => totalSeconds.value % 60)

  const formattedTime = computed(() => {
    return `${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`
  })

  const isTimeUp = computed(() => totalSeconds.value === 0)

  const startCountdown = (): void => {
    if (timer.value) return

    timer.value = setInterval(() => {
      if (totalSeconds.value > 0) {
        totalSeconds.value--
      } else {
        clearCountdown()
      }
    }, 1000)
  }

  const clearCountdown = (): void => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const restartCountdown = (): void => {
    clearCountdown()
    totalSeconds.value = initialSec
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

export const useCountdownWithTimestamp = (timestamp: string) => {
  const now = dayjs()
  const target = dayjs(timestamp).subtract(7, 'hour')

  const remainingSeconds = ref<number>(Math.max(target.diff(now, 'second'), 0))

  const minutes = computed(() => Math.floor(remainingSeconds.value / 60))
  const seconds = computed(() => remainingSeconds.value % 60)

  const formattedTime = computed(() => {
    const m = String(minutes.value).padStart(2, '0')
    const s = String(seconds.value).padStart(2, '0')
    return `${m}:${s}`
  })

  const isTimeUp = computed(() => remainingSeconds.value <= 0)

  const tick = () => {
    const diff = target.diff(dayjs(), 'second')
    remainingSeconds.value = Math.max(diff, 0)

    if (diff <= 0) {
      clearCountdown()
    }
  }

  const startCountdown = () => {
    tick()

    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
    }

    countdownInterval = setInterval(tick, 1000)
  }

  const clearCountdown = () => {
    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
      countdownInterval = undefined
    }
  }

  const restartCountdown = () => {
    remainingSeconds.value = Math.max(target.diff(dayjs(), 'second'), 0)
    clearCountdown()
    startCountdown()
  }

  return {
    formattedTime,
    isTimeUp,
    startCountdown,
    clearCountdown,
    restartCountdown,
  }
}

export const useCountdownWithTemstamp = (timestamp: string) => {
  const localTimestamp = timestamp.replace(/\sUTC(?:[+-]\d{1,2})?$/, '')
  const now = dayjs()
  const target = dayjs(localTimestamp)

  const remainingSeconds = ref<number>(Math.max(target.diff(now, 'second'), 0))

  const minutes = computed(() => Math.floor(remainingSeconds.value / 60))
  const seconds = computed(() => remainingSeconds.value % 60)

  const formattedTime = computed(() => {
    const m = String(minutes.value).padStart(2, '0')
    const s = String(seconds.value).padStart(2, '0')
    return `${m}:${s}`
  })

  const isTimeUp = computed(() => remainingSeconds.value <= 0)

  const tick = () => {
    const diff = target.diff(dayjs(), 'second')
    remainingSeconds.value = Math.max(diff, 0)

    if (diff <= 0) {
      clearCountdown()
    }
  }

  const startCountdown = () => {
    tick()

    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
    }

    countdownInterval = setInterval(tick, 1000)
  }

  const clearCountdown = () => {
    if (countdownInterval !== undefined) {
      clearInterval(countdownInterval)
      countdownInterval = undefined
    }
  }

  const restartCountdown = () => {
    remainingSeconds.value = Math.max(target.diff(dayjs(), 'second'), 0)
    clearCountdown()
    startCountdown()
  }

  return {
    formattedTime,
    isTimeUp,
    startCountdown,
    clearCountdown,
    restartCountdown,
  }
}
