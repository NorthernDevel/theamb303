import axios from 'axios'

export const useHttpClient = () => {
  const config = useRuntimeConfig()
  const lang = useLanguageStore()
  const { clientIp } = useResourceStore()
  const authToken = useCookie('auth_token')

  const api = axios.create({
    baseURL: config.public.baseURL,
    headers: {
      'Request-Id': config.public.requestID,
      SiteId: config.public.siteID,
      Lang: lang.currentLang,
      'Client-Ip': clientIp,
    },
    timeout: 10000,
  })

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      if (!!authToken.value) {
        config.headers.Authorization = `Bearer ${authToken.value}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle error response globally
      if (error.response && error.response.status === 401) {
        return error.response
      }
      return Promise.reject(error)
    }
  )

  return api
}
