<template>
  <UChip
    :ui="{
      base: 'ring-0',
      background: 'bg-red-600 dark:bg-red-600',
      default: { color: 'red' },
    }"
    :size="size"
    class="absolute top-3 right-3"
  >
    <slot />
  </UChip>
</template>

<script lang="ts" setup>
type ChipSize = 'xs' | 'sm' | '2xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xs' | '3xl'

defineProps({
  size: {
    type: String as PropType<ChipSize>,
    default: 'xs',
  },
})
</script>
