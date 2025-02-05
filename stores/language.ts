// stores/language.ts
interface LanguageOption {
  id?: string
  label?: string
  avatar?: {
    src?: string
  }
}

type LocaleLanguage = 'en' | 'th'

export const useLanguageStore = defineStore('languageStore', () => {
  const { setLocale, getLocaleCookie } = useI18n()
  const resourceStore = useResourceStore()

  const currentLang = ref<LocaleLanguage>('th')
  const langSelected = ref<LanguageOption>({})

  const langItems = [
    [
      {
        label: 'ภาษาไทย',
        avatar: {
          src: 'assets/images/flag/th.png',
        },
        click: () => onChangeLanguage('th'),
      },
    ],
    [
      {
        label: 'English',
        avatar: {
          src: 'assets/images/flag/en.png',
        },
        click: () => {
          onChangeLanguage('en')
        },
      },
    ],
  ]

  const multilingual: LanguageOption[] = [
    {
      id: 'th',
      label: 'ภาษาไทย',
      avatar: { src: 'assets/images/flag/th.png' },
    },
    {
      id: 'en',
      label: 'English',
      avatar: { src: 'assets/images/flag/en.png' },
    },
  ]

  onMounted(() => {
    const { en, th } = resourceStore.infoSetting.language
    if (en && th) {
      currentLang.value = 'th'
      const index = multilingual.findIndex((item) => item.id === 'th')
      langSelected.value = multilingual[index]
    } else {
      if (en) {
        setLocale('en')
      } else {
        setLocale('th')
      }
    }
  })

  const onChangeLanguage = (lang: string) => {
    const index = multilingual.findIndex((item) => item.id === lang)
    langSelected.value = multilingual[index]
    currentLang.value = lang as LocaleLanguage
    setLocale(lang)
  }

  const onSwitchLanguage = (lang: LanguageOption) => {
    currentLang.value = lang.id! as LocaleLanguage
    setLocale(lang.id!)
  }

  return {
    currentLang,
    langItems,
    langSelected,
    multilingual,
    onSwitchLanguage,
  }
})
