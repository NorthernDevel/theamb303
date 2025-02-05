<template>
  <teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && alert"
        @click="!alert.preventClose ? (isOpen = false) : null"
        class="fixed inset-0 flex items-center justify-center z-[60] bg-gray-200/75 dark:bg-gray-800/75"
      >
        <UCard class="relative w-80 rounded-3xl bg-gray-50">
          <UButton
            v-if="alert.copyText"
            color="gray"
            variant="ghost"
            class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 focus-visible:ring-0 hover:rounded-tr-3xl"
            @click="isOpen = false"
            ><UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14"
          /></UButton>
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="relative">
              <UIcon :name="icon" :class="iconClass" class="w-16 h-16 z" />
              <UIcon
                :name="icon"
                :class="iconClass"
                class="w-12 h-12 animate-ping absolute top-2 right-2"
              />
            </div>
            <h3 class="text-2xl">{{ alert.title }}</h3>
            <p v-if="alert.message" class="px-6 text-center">
              {{ alert.message }}
            </p>
            <div class="w-full flex justify-around !mt-8 !mb-2">
              <div v-if="alert.type === 'confirm' || alert.type === 'success'">
                <UButton
                  color="primary"
                  variant="solid"
                  size="xl"
                  :class="[alert.copyText && '!w-48']"
                  class="w-24 flex justify-center rounded-full"
                  @click="onConfirm()"
                  >{{ titleRightButton }}</UButton
                >
              </div>
              <div v-if="alert.type !== 'success' && alert.type !== 'warning'">
                <UButton
                  color="rose"
                  variant="solid"
                  size="xl"
                  class="w-24 flex justify-center rounded-full"
                  @click="onCancel()"
                  >{{ titleLeftButton }}</UButton
                >
              </div>
              <div v-if="alert.type === 'warning'">
                <UButton
                  color="amber"
                  variant="solid"
                  size="xl"
                  class="w-24 flex justify-center rounded-full"
                  @click="onCancel()"
                  >{{ titleLeftButton }}</UButton
                >
              </div>
            </div>
            <div
              v-if="alert.doNotShow"
              class="w-full flex justify-start gap-1 px-6 mt-2"
            >
              <UCheckbox
                color="blue"
                v-model="doNotShow"
                @change="toggleToLocalStorage"
              >
                <template #label>
                  <span class="text-sm font-extralight">{{
                    $t('do_not_show_again')
                  }}</span>
                </template>
              </UCheckbox>
            </div>
          </div>
        </UCard>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { setItem, removeItem } = useCustomLocalStorage()
const { copyToClipboard } = useClipboard()
const profileStore = useProfileStore()
const popupStore = usePopupStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'action'])

const alert = ref<PopupProps>()
const doNotShow = ref<boolean>(false)
const icon = ref('i-heroicons-check-circle-16-solid')
const iconClass = ref('text-primary')
const titleLeftButton = ref(t('btn_okay'))
const titleRightButton = ref(t('btn_okay'))

watchEffect(() => {
  if (popupStore.alertProps) {
    alert.value = popupStore.alertProps

    switch (alert.value?.type) {
      case 'success':
        icon.value = 'i-heroicons-check-circle-16-solid'
        iconClass.value = 'text-primary'
        titleRightButton.value = alert.value.copyText
          ? t('btn_copy_and_fill_coupon')
          : t('btn_okay')
        break
      case 'confirm':
        icon.value = 'i-heroicons-question-mark-circle-16-solid'
        iconClass.value = 'text-blue-500'
        titleLeftButton.value = t('btn_no')
        titleRightButton.value = t('btn_yes')
        break
      case 'warning':
        icon.value = 'i-heroicons-exclamation-circle-16-solid'
        iconClass.value = 'text-amber-500'
        titleLeftButton.value = t('btn_okay')
        break
      default:
        alert.value.title = t('something_went_wrong')
        icon.value = 'i-heroicons-x-circle-16-solid'
        iconClass.value = 'text-rose-500'
        titleLeftButton.value = t('btn_okay')
        return
    }
  }
})

const onConfirm = () => {
  if (alert.value?.copyText) {
    copyToClipboard(alert.value.copyText)
  }
  popupStore.closeAlertPopup()
  if (alert.value?.onConfirm) alert.value.onConfirm()
}

const onCancel = () => {
  isOpen.value = false
  if (alert.value?.onCancel) alert.value.onCancel()
}

const toggleToLocalStorage = (doNotShow: boolean) => {
  if (profileStore.userId) {
    if (doNotShow) {
      setItem(`user-key-${profileStore.userId}`, profileStore.userId)
    } else {
      removeItem(`user-key-${profileStore.userId}`)
    }
  }
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>
