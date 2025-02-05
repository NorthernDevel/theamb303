// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
      ],
    },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL_API,
      requestID: process.env.REQUEST_ID,
      siteID: process.env.SITE_ID,
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'radix-vue/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-marquee',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'th',
        name: 'ภาษาไทย',
        file: 'th.json',
      },
    ],
    detectBrowserLanguage: false,
    defaultLocale: 'th',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
  },
})
