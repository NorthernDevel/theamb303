<template>
  <div class="flex flex-col">
    <VerticalMenu
      v-for="link in links"
      :item="link"
      :color="color"
      :use-route="useRoute"
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
  useRoute: {
    type: Boolean,
    default: true,
  },
})
</script>
