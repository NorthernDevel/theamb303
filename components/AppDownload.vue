<template>
  <div v-if="resourceStrore.apkFile.active" id="app-download" class="flex justify-center pb-2 sm:pt-6 sm:pb-6">
    <NuxtLink :to="resourceStrore.apkFile.source" target="_blank">
      <NuxtImg
        src="/assets/images/download-apk.png"
        alt="Get it on google play"
        class=" object-contain"
        loading="lazy"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const resourceStrore = useResourceStore()
</script>
