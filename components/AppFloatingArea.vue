<template>
  <div
    class="fixed right-4 bottom-20 sm:bottom-20 lg:bottom-10 flex flex-col z-50"
  >
    <UButton
      :class="isShowButton ? 'inline-flex' : 'hidden'"
      class="w-12 h-12 lg:w-14 lg:h-14 justify-center !rounded-full !bg-gradient-to-b tab-menu from-sky-400 via-sky-500 to-sky-600 opacity-95"
      @click="scrollToTop"
      >
      <UIcon name="i-heroicons-arrow-up-20-solid" class="w-8 h-8 text-gray-100" />
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const scrollPosition = ref(0)
const isShowButton = ref(false)

const handleScroll = () => {
  scrollPosition.value = window.scrollY
  isShowButton.value = scrollPosition.value > 250
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scrolling
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
