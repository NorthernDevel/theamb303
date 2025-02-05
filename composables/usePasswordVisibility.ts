export const usePasswordVisibility = () => {
  // NOTE: Input show password.
  const isPasswordVisible = ref(false)

  const togglePasswordVisibility = () =>
    (isPasswordVisible.value = !isPasswordVisible.value)

  const icon = computed(() => {
    return isPasswordVisible.value ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'
  })
  return {
    isPasswordVisible,
    icon,
    togglePasswordVisibility,
  }
}
