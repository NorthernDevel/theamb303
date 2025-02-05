import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
  id: 'loaderStore',
  state: () => ({
    isLoading: false,
  }),
  actions: {
    start() {
      this.isLoading = true
    },
    stop() {
      this.isLoading = false
    }
  },
})
