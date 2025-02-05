<template>
  <UCard
    class="w-full border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800"
  >
    <!-- Drop area -->
    <div
      class="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
      @dragover.prevent
      @drop.prevent="handleFileDrop"
      @click="triggerFileInput"
    >
      <UIcon name="i-heroicons-arrow-up-tray" class="w-8 h-8" />

      <!-- Instructions -->
      <p class="text-center font-semibold">{{ $t('drag_and_drop_file') }}</p>
      <p class="text-center text-sm text-gray-500 mt-1">
        {{ $t('or') }}
        <span class="text-amber-500 underline cursor-pointer">{{
          $t('browse_file')
        }}</span>
        {{ $t('from_device') }}
      </p>

      <!-- Hidden file input for browsing -->
      <input
        type="file"
        ref="fileInput"
        accept=".jpg, .jpeg, .png"
        @change="handleFileUpload"
        class="hidden"
      />
    </div>

    <!-- Display the preview and file name if a file is selected -->
    <div v-if="fileName" class="flex flex-col items-center gap-2 mt-2">
      <img
        v-if="previewImage"
        :src="previewImage"
        alt="Preview"
        class="mt-2 w-32 h-32 object-cover rounded-md border"
      />
      <p class="max-w-48 sm:max-w-72 truncate text-sm font-medium">{{ fileName }}</p>
    </div>

    <p v-if="error" class="text-sm text-red-700 mt-2">{{ error }}</p>
  </UCard>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const emit = defineEmits(['base64File'])

const fileInput = ref<HTMLInputElement | undefined>(undefined)
const fileName = ref<string | undefined>(undefined)
const previewImage = ref<string | undefined>(undefined)
const base64Image = ref<string | undefined>(undefined)
const error = ref<string | undefined>(undefined)

// Handle file drop
const handleFileDrop = (event: DragEvent) => {
  const droppedFile = event.dataTransfer?.files[0]
  handleFile(droppedFile)
}

// Handle file input change
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    handleFile(file)
  }
}

const handleFile = (file: File | undefined) => {
  if (file) {
    // Check file size
    if (file.size > 1 * 1024 * 1024) {
      error.value = t('error_file_size')
      resetFile()
      return
    }

    // Check file type
    const fileType = file.type
    if (!['image/jpeg', 'image/jpg','image/png'].includes(fileType)) {
      error.value = t('error_file_type')
      resetFile()
      return
    }

    // Set file name
    fileName.value = file.name
    error.value = undefined

    // Generate base64 preview
    const reader = new FileReader()
    reader.onload = () => {
      previewImage.value = reader.result as string
      base64Image.value = reader.result?.toString()
      emit('base64File', base64Image.value)
    }
    reader.readAsDataURL(file)
  }
}

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click()
}

const resetFile = () => {
  fileInput.value!.value = ''
  fileName.value = undefined
  previewImage.value = undefined
  base64Image.value = undefined
  emit('base64File', base64Image.value)
}
</script>
