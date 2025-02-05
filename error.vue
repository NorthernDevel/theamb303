<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <NuxtImg src="/assets/images/404.webp" class="grayscale animate-bounce" />
    <h1 class="text-6xl font-bold text-gray-800 mt-10">
      {{ error?.statusCode }}
    </h1>
    <p class="text-2xl mt-4 text-gray-700">{{ error?.statusMessage }}</p>

    <NuxtLink to="/" class="mt-6 text-amber-500">
      <div class="border-2 border-amber-500 rounded-full px-4 py-2">
        {{ $t('go_to_home') }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
const title = `${props.error?.statusCode} ${
  props.error?.statusMessage || 'Something went wrong!'
}`
useHead({
  title,
})
</script>
