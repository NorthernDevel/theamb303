<template>
  <div v-if="isShowAdditionalMenu" class="h-20 sm:h-24 lg:h-32">
    <NuxtLink :to="item.to">
      <GameMenuItem :item="item" :color="color" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
type Item = {
  name: string
  label: string
  image: string
  to: string
}

const authStore = useAuthStore()

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  color: {
    type: String,
    default: 'amber',
  },
})

const isShowAdditionalMenu = computed(() => {
  if (
    !authStore.isAuthenticated &&
    (props.item.name === 'favorites' || props.item.name === 'recently')
  ) {
    return false
  } else {
    return true
  }
})
</script>
