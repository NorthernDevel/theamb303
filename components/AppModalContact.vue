<template>
  <UModal
    v-model="isOpen"
    :overlay="true"
    :ui="{
      container: 'items-center',
      width: 'w-[300px]',
    }"
    prevent-close
  >
    <UCard>
      <UButton
        color="cyan"
        variant="ghost"
        class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0"
        @click="isOpen = false"
        ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
      /></UButton>
      <div class="flex flex-col justify-center">
        <div class="flex justify-center my-4">
          <NuxtImg src="/assets/images/logo.png" alt="logo" class="w-32" />
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
          <div
            v-for="contact in resourceStore.contacts"
            class="w-full cursor-pointer gray-gradient rounded-2xl"
          >
            <div class="bg-white dark:bg-gray-900 rounded-xl m-[2px]">
              <NuxtLink :to="contact.options.link" target="_blank">
                <div class="w-full flex gap-4 p-3">
                  <NuxtImg
                    :src="`/assets/images/socials/${contact.provider.toLowerCase()}.webp`"
                    :alt="contact.provider"
                    class="w-14 object-contain"
                    loading="lazy"
                  />
                  <div class="flex flex-col justify-center">
                    <p>{{ $t(contact.display.th) }}</p>
                    <p v-if="contact.provider === 'LINE'" class="font-light">
                      {{ contact.options.lineId }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const resourceStore = useResourceStore()

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
