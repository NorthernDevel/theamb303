<template>
  <div
    v-if="resourceStore.announcement.isActive"
    class="bg-white bg-opacity-10 h-10"
  >
    <div class="inline-block whitespace-nowrap overflow-hidden py-2">
      <div
        class="inline-block animate-scroll-left font-light text-white dark:text-white"
      >
        {{ annoucement }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const resourceStore = useResourceStore()
const langStore = useLanguageStore()

const annoucement = computed(() => {
  if (resourceStore.announcement) {
    const { en, th } = resourceStore.announcement.display
    if (langStore.currentLang === 'en') return en
    return th
  }
})
</script>
