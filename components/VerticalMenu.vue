<template>
  <div v-if="isUseRoute">
    <NuxtLink :to="item.to">
      <VerticalMenuItem :item="item" :color="color" :use-route="true" />
    </NuxtLink>
  </div>
  <div v-else>
    <div @click="navStore.selectedMenu(item.to)">
      <VerticalMenuItem :item="item" :color="color" :use-route="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const navStore = useNavStore()

type Item = {
  name: string
  label: string
  image: string
  to: string
}

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
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

const isUseRoute = computed(() => props.useRoute)
</script>
