<template>
  <USlideover v-model="isOpen" side="left" class="h-full overflow-scroll">
    <UCard class="flex flex-col flex-1">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            <NuxtImg src="/assets/images/logo.png" alt="logo" class="w-32" />
          </h3>
          <UButton
            color="cyan"
            variant="ghost"
            class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0"
            @click="isOpen = false"
            ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
          /></UButton>
        </div>
      </template>

      <div v-if="resourceStore.isShowToggleLanguage" class="mb-5">
        <USelectMenu
          v-model="langStore.langSelected"
          :options="langStore.multilingual"
          @change="langStore.onSwitchLanguage"
          variant="none"
        >
          <template #leading>
            <NuxtImg
              :src="langStore.langSelected.avatar?.src"
              alt="flag"
              class="w-8"
            />
          </template>
          <template #label>
            <span class="truncate text-base pl-4">{{
              langStore.langSelected.label
            }}</span>
          </template>
          <template #option="{ option: lang }">
            <NuxtImg :src="lang.avatar?.src" :alt="lang.label" class="w-8" />
            <span class="truncate text-base">{{ lang.label }}</span>
          </template>
        </USelectMenu>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <SlideMenuItem v-for="item in navStore.menuSlidebar" :item="item" />
      </div>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()
const navStore = useNavStore()
const langStore = useLanguageStore()

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>
