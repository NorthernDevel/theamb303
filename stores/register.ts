// stores/register.ts
import { z } from 'zod'
import type { RequestAuth } from '~/models/auth.model'
import type { RequestRegister } from '~/models/register.model'

type StateOneType = {
  username: string | undefined
  password: string | undefined
  recommend: string | undefined
}

type StateTwoType = {
  verifyRef2: string | undefined
}

export const useRegisterStore = defineStore('registerStore', () => {
  const { t } = useI18n()
  const popupStore = usePopupStore()

  const recommendNames = ref<string[]>([])
  const isLoading = ref(false)
  const currentStep = ref<number>(0)
  const pinArray = ref([])
  const otpError = ref()
  const otpRef = ref()
  const credential = ref<RequestAuth>()

  const steps = [t('register_step1'), t('register_step2'), t('register_step3')]

  // NOTE: ----------------- Init State -----------------
  const initialStateOne: StateOneType = {
    username: undefined,
    password: undefined,
    recommend: undefined,
  }

  const initialStateTwo: StateTwoType = {
    verifyRef2: '',
  }

  const stateOne = ref<StateOneType>({
    ...initialStateOne,
  })

  const stateTwo = ref<typeof initialStateTwo>({
    ...initialStateTwo,
  })

  const initialAllState: RequestRegister = {
    refId: '',
    marketingId: '',
    ...stateTwo.value,
    tel: '',
    verifyRef1: '',
    verifyType: 1,
    ...stateOne.value,
  }

  const body = ref({
    ...initialAllState,
  })

  // NOTE: ----------------- Zod Validation -----------------

  const stateOneSchema = z.object({
    username: z
      .string({ required_error: t('required_username') })
      .min(9, { message: t('register_phone_least') })
      .max(20, { message: t('register_phone_exceed') })
      .refine((username) => /^[0-9]+$/.test(username), {
        message: t('register_phone_must_be_only_numbers'),
      })
      .refine(async () => await userValidator(), {
        message: t('register_user_already'),
      }),
    password: z
      .string({ required_error: t('required_password') })
      .min(8, { message: t('required_least_char') })
      .max(20, { message: t('required_exceed_char') })
      .refine((password) => /[A-Z]/.test(password), {
        message: t('required_upper_lower'),
      })
      .refine((password) => /[a-z]/.test(password), {
        message: t('required_upper_lower'),
      }),
    recommend: z.string({ required_error: t('register_request_recommend') }),
  })

  const stateTwoSchema = z.object({
    verifyRef2: z.string({ required_error: t('register_otp') }),
  })

  // NOTE: ----------------- Functions -----------------
  const nextStep = () => currentStep.value++

  const fetchRecommendList = async () => {
    try {
      const { status, names } = await useRecommendList()
      if (status) {
        recommendNames.value = names!
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  const userValidator = async () => {
    try {
      if (stateOne.value.username && stateOne.value.username!.length < 9)
        return false
      const { validated } = await useUserValidate({
        username: stateOne.value.username!,
      })
      console.log(body.value);
      
      return validated
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  // STEP 2: Check OTP.
  const requestOtp = async () => {
    isLoading.value = true
    try {
      const { status, data, message } = await useRequestOtp({
        phone: stateOne.value.username!,
      })

      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        body.value = {
          ...body.value,
          ...stateOne.value,
          tel: stateOne.value.username!,
          verifyRef1: data!.ref,
        }
        otpRef.value = body.value.verifyRef1

        nextStep()
        startCountdown()
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  const reCallOtp = async () => {
    try {
      const { status, data, message } = await useRequestOtp({
        phone: stateOne.value.username!,
      })
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        body.value.verifyRef1 = data!.ref
        restartCountdown()
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  // STEP 3: Fill OTP and countdown 5 min, Submit register.
  const {
    formattedTime,
    startCountdown,
    clearCountdown,
    restartCountdown,
    isTimeUp,
  } = useCountdown(5, 1)

  const verifyOtp = async () => {
    otpError.value = undefined
    const pin = Object.values(pinArray.value).join('')
    stateTwo.value.verifyRef2 = pin
    isLoading.value = true
    try {
      const { validated, message } = await useVerifyOtp({
        phone: stateOne.value.username!, // stateOne.value.username!
        ref: body.value.verifyRef1!, // body.value.verifyRef1!
        otp: stateTwo.value.verifyRef2,
      })
      if (!validated) {
        otpError.value = message
        stateTwo.value.verifyRef2 = undefined
      } else {
        body.value = {
          ...body.value,
          ...stateOne.value,
          tel: stateOne.value.username!,
          verifyRef2: stateTwo.value.verifyRef2,
        }
      }
      return validated
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const onSubmit = async () => {
    isLoading.value = true
    try {
      // NOTE: Set ref or marketRef to body.
      body.value.refId = popupStore.refId
      body.value.marketingId = popupStore.marketingId
      
      const { status, data, message } = await useRegister(body.value)
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        credential.value = data
        clearCountdown()
        nextStep()
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  const resetForm = () => {
    otpError.value = undefined
    stateOne.value = { ...initialStateOne }
    stateTwo.value = { ...initialStateTwo }
    body.value = { ...initialAllState }
    // Back to step 1
    setTimeout(() => (currentStep.value = 0), 500)
  }

  return {
    currentStep,
    pinArray,
    otpError,
    isLoading,
    steps,
    recommendNames,
    stateOne,
    stateOneSchema,
    stateTwo,
    stateTwoSchema,
    formattedTime,
    isTimeUp,
    otpRef,
    credential,
    fetchRecommendList,
    requestOtp,
    reCallOtp,
    verifyOtp,
    onSubmit,
    resetForm,
    clearCountdown,
  }
})
