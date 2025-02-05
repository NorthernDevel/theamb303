<template>
  <UHorizontalNavigation
    :links="navStore.menuHeader"
    :ui="{
      active:
        'text-white dark:text-white after:bg-gray-300 dark:after:bg-gray-300 after:rounded-full',
      before:
        'hover:before:bg-gray-200 hover:before:bg-opacity-10 dark:hover:before:bg-gray-200 dark:hover:before:bg-opacity-10',
      avatar: {
        base: 'flex-shrink-0',
        size: 'sm',
      },
    }"
  >
    <template #default="{ link }">
      <span
        class="text-base text-gray-100 group-hover:text-white active:text-white relative"
        >{{ $t(link.label) }}</span
      >
    </template>
  </UHorizontalNavigation>
</template>

<script lang="ts" setup>
const navStore = useNavStore()
</script>
