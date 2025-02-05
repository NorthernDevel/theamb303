<template>
  <UProgress :value="task" :max="steps" indicator>
    <template #step-0="{ step }">
      <span class="text-green-500">
        <UIcon name="i-heroicons-pencil-square" /> {{ step }}
      </span>
    </template>

    <template #step-1="{ step }">
      <span class="text-sky-500">
        <UIcon name="i-heroicons-device-phone-mobile" /> {{ step }}
      </span>
    </template>

    <template #step-2="{ step }">
      <span class="text-amber-500">
        <UIcon name="i-heroicons-rocket-launch" /> {{ step }}
      </span>
    </template>
  </UProgress>
</template>

<script setup lang="ts">
defineProps({ task: Number, steps: Array })
</script>