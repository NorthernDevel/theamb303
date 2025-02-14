// stores/register.ts
import { z } from 'zod'
import type { RequestAuth } from '~/models/auth.model'
import type { RequestRegister } from '~/models/register.model'

type StateOneType = {
  username: string | undefined
  password: string | undefined
  recommend: string | undefined
  tel: string | undefined
  verifyRef2: string | undefined
}

type StateTwoType = {
  verifyRef2: string | undefined
}

export const useRegisterStore = defineStore('registerStore', () => {
  const { t } = useI18n()
  const resourceStore = useResourceStore()
  const popupStore = usePopupStore()

  const recommendNames = ref<string[]>([])
  const isLoading = ref(false)
  const currentStep = ref<number>(0)
  const pinArray = ref([])
  const otpError = ref()
  const otpRef = ref()
  const credential = ref<RequestAuth>()
  const captchaImage = ref()

  const steps = [t('register_step1'), t('register_step2'), t('register_step3')]

  // NOTE: ----------------- Init State -----------------
  const initialStateOne: StateOneType = {
    username: undefined,
    password: undefined,
    recommend: undefined,
    tel: undefined,
    verifyRef2: undefined,
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
    verifyRef1: '',
    verifyType: 1,
    ...stateOne.value,
  }

  const body = ref({
    ...initialAllState,
  })

  // NOTE: ----------------- Zod Validation -----------------
  const otpPhoneShortSchema = z.object({
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

  const userByPhoneSchema = z.object({
    username: z
      .string({ required_error: t('required_username') })
      .min(4, { message: t('register_username_require') })
      .max(16, { message: t('register_username_require') })
      .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
        message: t('register_username_require'),
      })
      .refine(async () => await userValidator(), {
        message: t('register_user_already'),
      }),
    tel: z
      .string({ required_error: t('required_phone') })
      .min(9, { message: t('register_phone_least') })
      .max(20, { message: t('register_phone_exceed') })
      .refine((tel) => /^[0-9]+$/.test(tel), {
        message: t('register_phone_must_be_only_numbers'),
      })
      .refine(async () => await phoneValidator(), {
        message: t('register_phone_already'),
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
    verifyRef2: z.string({ required_error: t('register_captcha_require') }),
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
      const usenameLength =
        resourceStore.registerType === 'OTP_PHONE_SHORT' ? 9 : 4
      if (
        stateOne.value.username &&
        stateOne.value.username!.length < usenameLength
      )
        return false
      const { validated } = await useUserValidate({
        username: stateOne.value.username!,
      })
      return validated
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    }
  }

  const phoneValidator = async () => {
    try {
      if (stateOne.value.tel && stateOne.value.tel!.length < 9) return false
      const { validated } = await usePhoneValidate({
        phone: stateOne.value.tel!,
      })
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
          verifyType: 1,
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

  const getCaptcha = async () => {
    try {
      const { status, data, message } = await useCaptcha()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        body.value.verifyRef1 = data?.recId
        captchaImage.value = data?.image
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.log((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  const verifyCaptcha = async () => {
    body.value = {
      ...body.value,
      ...stateOne.value,
      recommend: '',
      verifyType: 2,
    }
    onSubmit()
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
        if (resourceStore.registerType === 'USER_BY_PHONE') getCaptcha()
      } else {
        credential.value = data
        clearCountdown()
        currentStep.value = 2
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
    otpPhoneShortSchema,
    userByPhoneSchema,
    captchaImage,
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
    verifyCaptcha,
    getCaptcha,
    onSubmit,
    resetForm,
    clearCountdown,
  }
})
