<template>
  <div
    v-if="isLoading"
    class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[9999] bg-gray-100"
  >
    <div>
      <NuxtImg
        src="/assets/images/logo.png"
        alt="splash screen"
        class="w-full"
      />
      <UProgress animation="carousel" class="mt-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000) // Adjust the time based on how long you want the splash screen to show
})
</script>
