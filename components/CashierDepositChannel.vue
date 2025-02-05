<template>
  <div
    @click="onSelectedChannel(id, title)"
    class="relative border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-4 md:py-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
  >
    <div class="flex gap-4">
      <NuxtImg
        :src="image"
        :alt="id"
        class="w-14 h-14 rounded-full"
      />
      <div>
        <div class="text-lg text-amber-500">
          {{ title }}
        </div>
        <div class="text-sm font-extralight">
          {{ description }}
        </div>
      </div>
    </div>
    <UBadge
      v-if="badge"
      color="rose"
      variant="solid"
      class="absolute top-1 right-1"
      >{{ badge }}</UBadge
    >
  </div>
</template>

<script lang="ts" setup>
const cashierStore = useCashierStore()

defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  badge: String,
})

const onSelectedChannel = (id: string, title: string) => {
  cashierStore.title = title
  cashierStore.idSelect = id
  cashierStore.isSelectedChannel = true
}
</script>
