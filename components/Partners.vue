<template>
  <div class="flex flex-col items-center bg-gray-200 py-4">
    <div class="container flex items-center justify-center flex-wrap space-x-3">
      <div v-for="partner in partners" class="py-5">
        <div>
          <NuxtImg
            :src="'/assets/images/partners/' + partner + '.png'"
            :alt="partner"
            class="partner w-24"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const partners = [
  'slot-logo-evo-play',
  'slot-logo-sp',
  'slot-logo-ps',
  'slot-logo-kingmaker',
  'slot-logo-joker',
  'slot-logo-habanero',
  'slot-logo-ameba',
  'slot-logo-cq9',
  'slot-logo-pg',
  'slot-logo-rich88',
  'slot-logo-goldy',
]
</script>

<style scoped>
.partner {
  filter: grayscale(1);
}
</style>
