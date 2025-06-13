import type { IsDeposit, PrefixPermissionData } from '~/models/prefix.model'
import type {
  Announcement,
  imageLuancherData,
  ApkFile,
  ContactData,
  FooterDescription,
  InfoSetting,
  ResoucesData,
  RegisterTypes,
} from '~/models/resource.model'

interface NewBankList {
  id: string
  label: string
  avatar: { src: string }
}
// stores/resource.ts
export const useResourceStore = defineStore('resourceStore', () => {
  const popupStore = usePopupStore()

  const isLoading = ref(false)
  const version = 'v1.1'
  const prefix = ref<PrefixPermissionData>()
  const resources = ref<ResoucesData>()
  const bankList = ref<NewBankList[]>([])
  const clientIp = ref<string | undefined>()

  const infoSetting = computed((): InfoSetting => {
    if (!resources.value)
      return {
        language: { en: true, th: true },
        title: { en: '', th: '' },
        description: { en: '', th: '' },
      }
    return resources.value.info
  })

  const apkFile = ref<ApkFile>({
    active: false,
    source: '',
  })

  const announcement = computed((): Announcement => {
    if (!resources.value)
      return { display: { en: '', th: '' }, isActive: false }
    return resources.value.announcement
  })

  const bannerImages = computed((): imageLuancherData[] => {
    if (!resources.value) return []
    const { banners, imageUrl } = resources.value
    if (!banners.length) return []
    const newBanners = banners.map((banner) => {
      return { ...banner, image: `${imageUrl.banner}${banner.image}` }
    })
    return newBanners
  })

  const promotionImages = computed((): imageLuancherData[] => {
    if (!resources.value) return []
    const { promotions, imageUrl } = resources.value
    if (!promotions.length) return []
    const newPromotionImages = promotions.map((promotion) => {
      return { ...promotion, image: `${imageUrl.promotion}${promotion.image}` }
    })
    return newPromotionImages
  })

  const footerDescription = ref<FooterDescription>({
    title: {
      en: 'Game skills, the first in Thailand',
      th: 'สกิลเกม เจ้าแรกในไทย',
    },
    description: {
      en: 'THEAMB303 Slot Online FullHD, offering slots, casinos, fishing games, and sports all in one place from famous providers around the world. theamb-303.com has more, but is easier. With a wide variety of games, beautiful new graphics, and popularity, we gather the most online slots and slot games in Thailand. With our intelligent deposit and withdrawal system, it is easy to play, fast, and features auto deposit and withdrawal — the only one that truly works.',
      th: 'THEAMB303 Slot Online FullHD สล็อต คาสิโน ยิงปลา และกีฬา ครบจบ เว็บเดียวจากค่ายดังทุกมุมโลก theamb-303.com มีมากกว่า แต่ง่ายกว่า เกมเยอะ ภาพสวยใหม่ และ เป็นที่นิยม เรารวม สล็อตออนไลน์ และ เกมสล็อต มากที่สุดในไทย ด้วยระบบเติมถอนอัจฉริยะ เล่นง่าย รวดเร็ว ฝากถอนออโต้ เจ้าเดียวที่ใช้ได้จริง',
    },
  })

  const registerType = computed((): RegisterTypes => {
    if (!resources.value) return 'OTP_PHONE_SHORT'
    return resources.value.registerType
  })

  const contacts = computed((): ContactData[] => {
    if (!resources.value) return []
    return resources.value.contacts
  })

  const tags = computed((): string[] => {
    if (!resources.value) return []
    return resources.value.tags
  })

  const isDeposit = computed((): IsDeposit => {
    if (!prefix.value)
      return {
        isAskmepay: false,
        isAuto: false,
        isAutoSlip: false,
        isDecimal: false,
        isManualSlip: false,
        isPeer2Pay: false,
        isScbAPI: false,
        isTrueWallet: false,
      }
    return prefix.value.isDeposit
  })

  const isShowToggleLanguage = computed(() => {
    const { en, th } = infoSetting.value.language
    return en && th
  })

  const popups = computed(() => {
    if (!resources.value) return []
    const { popups, imageUrl } = resources.value
    if (!popups.length) return []
    const newPopups = popups.map((popup) => {
      return { ...popup, image: `${imageUrl.popup}${popup.image}` }
    })
    return newPopups
  })

  const popupNotLogin = computed(() => {
    if (!popups) return []
    return popups.value.filter(
      (item) => item.isActive && !item.isLogin && !item.isFlash
    )
  })

  const showPopupNotLogin = () => {
    setTimeout(() => {
      if (popupNotLogin.value.length) popupStore.openPopupNotLogin()
    }, 1000)
  }

  const popupLoggedIn = computed(() => {
    if (!popups) return []
    return popups.value.filter(
      (item) => item.isActive && item.isLogin && !item.isFlash
    )
  })

  const showPopupLoggedIn = () => {
    setTimeout(() => {
      if (popupLoggedIn.value.length) popupStore.openPopupLoggedIn()
    }, 1000)
  }

  const getResoures = async () => {
    try {
      isLoading.value = true
      const {
        status,
        message,
        data,
        resources: resourceData,
      } = await useResurces()
      if (!status) {
        popupStore.alertError({ message: message })
      } else {
        prefix.value = data
        resources.value = resourceData
      }
    } catch (e) {
      popupStore.toastError({ message: (e as Error).message })
      console.error((e as Error).message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    version,
    isShowToggleLanguage,
    infoSetting,
    resources,
    isDeposit,
    bankList,
    contacts,
    popups,
    announcement,
    footerDescription,
    bannerImages,
    promotionImages,
    registerType,
    tags,
    apkFile,
    clientIp,
    getResoures,
    showPopupNotLogin,
    showPopupLoggedIn,
  }
})
