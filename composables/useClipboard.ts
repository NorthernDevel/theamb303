export const useClipboard = () => {
  const { t } = useI18n()
  const popupStore = usePopupStore()
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      popupStore.toastSuccess({ title: t('successfull'), message: text })
    } catch (e) {
      popupStore.toastError({
        title: t('something_went_wrong'),
        message: (e as Error).message,
      })
    }
  }

  return {
    copyToClipboard,
  }
}
