export default defineNuxtRouteMiddleware(() => {
  const authToken = useCookie('auth_token')

  if (!authToken.value) {
    // Show the login modal if the token is missing or invalid
    const authStore = useAuthStore()
    authStore.clearAllStore()
    const popupStore = usePopupStore()
    popupStore.openModalLogin()

    // Prevent the user from navigating to the page until they log in
    return abortNavigation()
  }
})
