<template>
  <div class="bg-gray-100 bg-opacity-80">
    <div class="container mx-auto">
      <div class="grid grid-cols-2 lg:grid-cols-3 gab-4">
        <div v-for="status in status" class="flex my-3 mx-2">
          <NuxtImg
            :src="'/assets/images/icons/' + status.img + '.png'"
            alt="aaa"
            class="w-20 object-contain"
          />
          <div class="flex flex-col justify-center text-gray-800">
            <h2 class="text-[16px] font-semibold">{{ $t(status.title) }}</h2>
            <p class="hidden md:inline">{{ $t(status.description) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const status = [
  {
    img: 'ic-status-wallet',
    title: 'showcase_smartwallet',
    description: 'showcase_smartwallet_detail',
  },
  {
    img: 'ic-status-rank',
    title: 'showcase_number1',
    description: 'showcase_number1_detail',
  },
  {
    img: 'ic-status-change',
    title: 'showcase_fast_dw',
    description: 'showcase_fast_dw_detail',
  },
  {
    img: 'ic-status-eveywhere',
    title: 'showcase_playany',
    description: 'showcase_playany_detail',
  },
  {
    img: 'ic-status-support',
    title: 'showcase_service',
    description: 'showcase_service_detail',
  },
  {
    img: 'ic-status-promotion',
    title: 'showcase_offer',
    description: 'showcase_offer_detail',
  },
]
</script>
