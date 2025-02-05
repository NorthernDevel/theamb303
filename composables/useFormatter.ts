export const useFormatter = () => {
  const useCurrency = (
    amount: number | Ref<number>,
    symbol: 'leading' | 'trailing' | 'none' = 'trailing'
  ) => {
    const currency = computed(() => {
      const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      let formatted = formatter.format(isRef(amount) ? amount.value : amount)

      if (symbol === 'leading') return formatted

      if (formatted.includes('฿')) {
        if (symbol === 'none') return formatted.replace('฿', '')
        formatted = formatted.replace('฿', '') + '฿'
      }

      return formatted
    })

    return {
      currency,
    }
  }

  const useNumberWithComma = (amount: number | Ref<number>) => {
    const numberWithComma = computed(() => {
      const formatted = new Intl.NumberFormat().format(
        isRef(amount) ? amount.value : amount
      )
      return formatted
    })

    return {
      amount: numberWithComma,
    }
  }

  return {
    useCurrency,
    useNumberWithComma,
  }
}
