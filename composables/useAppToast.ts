export const useAppToast = () => {
  const toast = useToast()

  interface ToastOptions {
    title?: string
    message?: string
  }

  return {
    success: ({ title, message }: ToastOptions) => {
      toast.add({
        title,
        description: message,
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 2000,
      })
    },
    error: ({ title, message }: ToastOptions) => {
      toast.add({
        title,
        description: message,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        timeout: 2000,
      })
    },
  }
}
