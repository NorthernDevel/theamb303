// stores/modal.ts
export type AlertTypes = 'success' | 'error' | 'confirm' | 'warning'
type Ref = 'ref' | 'marketingRef'

export type PopupProps = {
  type?: AlertTypes | undefined // confirm, success, error
  title?: string | undefined
  message?: string | undefined
  copyText?: string | undefined
  preventClose?: boolean | undefined
  doNotShow?: boolean | undefined
  onConfirm?: () => void
  onCancel?: () => void
}

type QueryString = {
  key: Ref
  value: string
}

interface ToastOptions {
  title?: string
  message?: string
}

export const usePopupStore = defineStore('popupStore', {
  state: () => {
    return {
      isLoading: false,
      isOpenSlideMenu: false,
      isOpenModalLogin: false,
      isOpenModalForgotPassword: false,
      isOpenModalRegister: false,
      isOpenModalContact: false,
      isOpenModalPrediction: false,
      isOpenPopupNotLogin: false,
      isOpenPopupLoggedIn: false,
      refId: '',
      marketingId: '',
      isOpenModalProfile: false,
      isOpenAlertPopup: false,
      alertProps: {} as PopupProps,
    }
  },
  actions: {
    openSlideMenu() {
      this.isOpenSlideMenu = true
    },
    closeSlideMenu() {
      this.isOpenSlideMenu = false
    },
    openModalLogin() {
      this.isOpenModalLogin = true
    },
    closeModalLogin() {
      this.isOpenModalLogin = false
    },
    openModalForgotPassword() {
      this.isOpenModalForgotPassword = true
    },
    closeModalForgotPassword() {
      this.isOpenModalForgotPassword = false
    },
    openModalRegister() {
      this.isOpenModalRegister = true
    },
    openModalRegisterWithParams(body: QueryString) {
      if (body.key === 'ref') this.refId = body.value
      if (body.key === 'marketingRef') this.marketingId = body.value
      setTimeout(() => (this.isOpenModalRegister = true), 500)
    },
    closeModalRegister() {
      this.isOpenModalRegister = false
    },
    openModalProfile(menu?: string) {
      const menuSelected = menu || 'profile'

      const navStore = useNavStore()
      navStore.setCurrentMenu(menuSelected)

      this.isOpenModalProfile = true
    },
    closeModalProfile() {
      this.isOpenModalProfile = false
    },
    openModalContact() {
      this.isOpenModalContact = true
    },
    closeModalContact() {
      this.isOpenModalContact = false
    },
    openModalPrediction() {
      this.isOpenModalPrediction = true
    },
    closeModalPrediction() {
      this.isOpenModalPrediction = false
    },
    openPopupNotLogin() {
      this.isOpenPopupNotLogin = true
    },
    closePopupNotLogin() {
      this.isOpenPopupNotLogin = false
    },
    openPopupLoggedIn() {
      this.isOpenPopupLoggedIn = true
    },
    closePopupLoggedIn() {
      this.isOpenPopupLoggedIn = false
    },
    alertSuccess(props: PopupProps) {
      this.alertProps = { ...props, type: 'success' }
      this.isOpenAlertPopup = true
    },
    alertError(props: PopupProps) {
      this.alertProps = { ...props, type: 'error' }
      this.isOpenAlertPopup = true
    },
    alertConfirm(props: PopupProps) {
      this.alertProps = { ...props, type: 'confirm' }
      this.isOpenAlertPopup = true
    },
    alertWarning(props: PopupProps) {
      this.alertProps = { ...props, type: 'warning' }
      this.isOpenAlertPopup = true
    },
    closeAlertPopup() {
      setTimeout(() => (this.alertProps = {} as PopupProps), 0)
      this.isOpenAlertPopup = false
    },
    toastError(options: ToastOptions) {
      const toast = useAppToast()
      return toast.error({
        title: options.title,
        message: options.message,
      })
    },
    toastSuccess(options: ToastOptions) {
      const toast = useAppToast()
      return toast.success({
        title: options.title,
        message: options.message,
      })
    },
    clear() {
      this.$reset()
    },
  },
})
