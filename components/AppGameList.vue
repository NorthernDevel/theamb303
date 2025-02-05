<template>
  <div
    v-if="isLoading"
    :class="[isProvider && '!grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-5']"
    class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-4"
  >
    <USkeleton class="w-full h-20 sm:h-28 md:h-32 lg:36" v-for="item in 14" />
  </div>

  <transition
    v-show="!isLoading"
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      :class="[[isProvider && '!grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-5']]"
      class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-4"
    >
      <AppGameListItem
        v-for="(item, key) in visibleGames"
        :key="key"
        :item="item"
        :index="isFirstLarge(key)"
        :is-provider="isProvider"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import type { GamesList } from '~/models/games.model'

const props = defineProps({
  isLoading: Boolean,
  gamesList: Object as PropType<GamesList[]>,
  firstLarge: { type: Boolean, default: false },
  isProvider: { type: Boolean, default: false },
  isCollapse: { type: Boolean, default: false },
})

const isFirstLarge = (index: number) => (props.firstLarge ? index : undefined)

const visibleGames = computed(() => {
  if (!props.isCollapse) return props.gamesList
  return []
})
</script>
