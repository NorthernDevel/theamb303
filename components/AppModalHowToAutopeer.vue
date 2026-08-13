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
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center z-[60] bg-black/75 px-3"
      >
        <UCard
          :ui="{
            body: { padding: 'p-4 sm:p-6' },
          }"
          class="relative w-full max-w-[680px] u-card-bg"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="theme-title text-xl font-semibold leading-6">
                คำแนะนำการใช้งาน AutoPeer
              </h3>
              <UButton
                color="white"
                variant="ghost"
                class="-my-1 justify-center absolute top-1 right-0 w-14 h-14 text-amber-200 focus-visible:ring-0"
                @click="closeAndSwitchDepositChannel"
              >
                <UIcon name="i-heroicons-x-mark-20-solid" class="w-14 h-14" />
              </UButton>
            </div>
          </template>

          <div class="flex flex-col justify-center">
            <div class="max-h-[60vh] overflow-y-auto">
              <div
                class="flex flex-col gap-4 mt-2 font-extralight px-1 sm:px-4 text-amber-100/90"
              >
                <p class="theme-title text-center text-lg font-medium">
                  คำแนะนำการใช้งาน AutoPeer
                </p>
                <p class="text-center font-medium text-amber-300">
                  ระบบโอนอัตโนมัติระหว่างผู้เล่น เงินเข้าทันทีที่อัปสลิป
                  ไม่ต้องรอ มั่นใจได้ 100% ว่าปลอดภัยไม่เสี่ยงโดนอายัดบัญชี
                </p>
                <p>
                  1. ระบุจำนวนเงินที่ต้องการฝาก (จำนวนเต็มร้อยเท่านั้น
                  ฝากขั้นต่ำ 100 บาท สูงสุด 20,000 บาท) แล้วกด ฝาก
                </p>
                <p>
                  2. ตรวจสอบยอดโอนเงินและทำการโอนเงิน
                  เมื่อโอนเงินเสร็จให้อัปโหลดสลิปแล้วกด “ยืนยัน”
                </p>
                <p>
                  3.
                  เครดิตจะเข้าระบบทันทีเหมือนการฝากเงินแบบอัปโหลดสลิปอัตโนมัติ
                  เมื่อทำรายการภายในเวลาที่กำหนด
                </p>
                <div class="theme-error-box rounded-lg p-2 my-2">
                  <div class="flex flex-col items-center w-full text-sm">
                    กรุณาโอนเงินและอัปโหลดสลิปภายใน 5 นาที
                    หากไม่อัปโหลดตามเวลาที่กำหนด
                    คุณต้องดำเนินการแจ้งความว่าโอนเงินผิดและติดต่อธนาคารเพื่อดึงเงินคืนด้วยตัวเอง
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full flex justify-center mt-4">
              <UButton
                type="button"
                class="theme-primary-btn w-36 h-11 justify-center text-base"
                @click="popupStore.closeModalHowToAutopeer()"
              >
                เริ่มต้นใช้งาน
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const popupStore = usePopupStore()
const cashierStore = useCashierStore()

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const closeAndSwitchDepositChannel = () => {
  popupStore.closeModalHowToAutopeer()
  cashierStore.backToMainDeposit()
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
