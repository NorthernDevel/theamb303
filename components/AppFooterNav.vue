<template>
  <div class="w-full sticky bottom-0 z-10 lg:hidden">
    <div class="flex items-end">
      <div
        class="w-full h-[60px] flex items-end justify-center p-2 bg-red rounded-t-2xl"
      >
        <FooterMenuItem
          v-if="authStore.isAuthenticated"
          :item="navStore.menuFooter[0]"
        />
        <FooterMenuItem v-else :item="navStore.menuFooter[5]" />
        <FooterMenuItem
          v-if="authStore.isAuthenticated"
          :item="navStore.menuFooter[1]"
        />
        <FooterMenuItem v-else :item="navStore.menuFooter[6]" />
        <FooterMenuItem :item="navStore.menuFooter[2]" />
        <FooterMenuItem :item="navStore.menuFooter[3]" />
        <FooterMenuItem :item="navStore.menuFooter[4]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const navStore = useNavStore()
</script>

<style scoped>
.left {
  border-top-left-radius: 10px;
  background: linear-gradient(90deg, #72d8e3, #3592ed);
}

.right {
  border-top-right-radius: 10px;
  background: linear-gradient(90deg, #3592ed, #72d8e3);
}

.center {
  background: #3592ed;
}

.bg-red {
  @apply shadow-md text-white dark:text-white hover:text-gray-100 dark:hover:text-gray-100
  bg-gradient-to-b from-red-300 via-red-500 to-red-600 
  dark:bg-gradient-to-b dark:from-red-300 dark:via-red-500 dark:to-red-600;
}
</style>
