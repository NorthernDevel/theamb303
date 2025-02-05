export function useDebounce<T>(value: Ref<string>, delay: number): Ref<string> {
  const debouncedValue = ref<string>(value.value)

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (...args: any[]) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  // Watch for changes in the input value
  watch(
    value,
    debounce((newValue) => {
      debouncedValue.value = newValue
    }, delay)
  )

  return debouncedValue
}
