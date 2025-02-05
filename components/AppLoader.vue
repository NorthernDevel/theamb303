<template>
  <div
    v-if="loaderStore.isLoading"
    class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[9998] bg-gray-900 bg-opacity-30"
  >
    <div
      class="w-16 h-16 border-4 border-gray-50 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
</template>

<script lang="ts" setup>
const loaderStore = useLoaderStore()
</script>
