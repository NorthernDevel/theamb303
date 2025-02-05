<template>
  <footer class="bottom-0 w-full flex flex-col">
    <Partners />

    <section class="flex flex-col items-center bg-gray-100 py-8">
      <div class="container flex flex-col items-center">
        <NuxtImg src="/assets/images/logo.png" alt="logo" class="w-48 mb-4" />
        <h2 class="text-2xl font-bold text-gray-700 mb-2">
          {{ footerTitle }}
        </h2>
        <p class="text-center text-gray-400">{{ footerDescription }}</p>

        <div class="flex items-center justify-center flex-wrap space-x-2 pt-5">
          <div v-for="tag in resourceStore.tags" class="pt-2">
            <UButton color="teal" variant="outline">{{ tag }}</UButton>
          </div>
        </div>
      </div>
    </section>

    <section class="flex justify-center bg-gray-800 py-2">
      <p class="font-extralight text-gray-100">
        {{ $t('copyright', { version: resourceStore.version }) }}
      </p>
    </section>
  </footer>
</template>

<script setup lang="ts">
const langStore = useLanguageStore()
const resourceStore = useResourceStore()

const footerTitle = computed(() => {
  if (resourceStore.footerDescription) {
    const { en, th } = resourceStore.footerDescription.title
    if (langStore.currentLang === 'en') return en
    return th
  }
})

const footerDescription = computed(() => {
  if (resourceStore.footerDescription) {
    const { en, th } = resourceStore.footerDescription.description
    if (langStore.currentLang === 'en') return en
    return th
  }
})
</script>
