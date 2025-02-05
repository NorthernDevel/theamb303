export const useUrlValidator = () => {
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return { isValidUrl }
}
