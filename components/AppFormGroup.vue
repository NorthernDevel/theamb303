<template>
  <UFormGroup
    :label="label"
    :required="required"
    :name="name"
    :hint="hint"
    :error="error"
    class="text-white font-light mb-4"
  >
    <slot />
  </UFormGroup>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  required: Boolean,
  name: String,
  hint: String,
  error: String
})
</script>