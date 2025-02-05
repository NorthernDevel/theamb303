<template>
  <div class="flex justify-center flex-wrap gap-2 md:gap-4">
    <GameMenu
      v-for="link in links"
      :item="link"
      :color="color"
    />
  </div>
</template>

<script lang="ts" setup>
type Link = {
  name: string
  label: string
  image: string
  to: string
}

defineProps({
  links: {
    type: Object as PropType<Link[]>,
    required: true,
  },
  color: {
    type: String,
    default: 'amber',
  },
})
</script>
