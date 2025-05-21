import { defineStore } from 'pinia'
import type { PromotionData } from '~/models/promotion.model'

export const usePromotionStore = defineStore('promotionStore', () => {
  const { t } = useI18n()
  const { getItem } = useCustomLocalStorage()
  const popupStore = usePopupStore()
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const resourceStore = useResourceStore()

  const promotions = ref<PromotionData[]>([])

  const isDisabledAutoPromotions = () => {
    // NOTE: Disabled receive promotions.
    setTimeout(() => {
      if (authStore.isAuthenticated && profileStore.userId) {
        const userKey = getItem(`user-key-${profileStore.userId}`)
        if (!userKey && !profileStore.isAutoPromotion) {
          popupStore.alertConfirm({
            title: t('have_disabled_bouns'),
            message: t('do_you_you_want_config_bonus'),
            preventClose: true,
            doNotShow: true,
            onConfirm: () => popupStore.openModalProfile('config-promotion'),
            onCancel: () => resourceStore.showPopupLoggedIn(),
          })
        }
      } else {
        resourceStore.showPopupLoggedIn()
      }
    }, 1000)
  }

  onMounted(() => {
    promotions.value = [
      {
        id: '666521bce5313a85848c7b50',
        promotionId: '666153b20155c58a5ca62646',
        image: '14b5d1ab-34a3-406a-8c5e-b71ae9bab0b2.jpg',
        title: 'สมัครสมาชิกใหม่',
        shortContent: 'สมัครสมาชิกใหม่ ฝาก 100 บาท รับเลย 100 บาท',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p>ฝาก 100 รับ 100</p><p><br></p><p><span>ต้องฝากยอด 100 เท่านั้น!!! โบนัสจะเข้าออโต้ เล่น slot เท่านั้น ทำเทิร์นโอเวอร์เครดิต 6 เท่า (มียอดเครดิตถึง 1,200 หรือมากกว่า) ถอนได้สูงสุด 400</span></p><p><br></p><p><span>1 user ต่อ 1 IP เท่านั้น</span></p><p><br></p><p><span>หากพบว่ามีการสร้างหลาย user</span><p><br></p><p><span>หรือเก็บฟรีสปินเพื่อทำ bug ของเกมที่มีโบนัสฟรีเกมส์</span><p><br></p><p><span>ทางทีมงานจะระงับการจ่ายเงินทุกกรณี !!</span></p>',
        slug: 'promotion-1',
      },
      {
        id: '666521bce5313a85848c7b51',
        promotionId: '666153b20155c58a5ca62645',
        image: 'c64659aa-98b9-42c0-b399-668aad9a7149.jpg',
        title: 'สมัครสมาชิกใหม่',
        shortContent: 'สมัครสมาชิกใหม่ ฝาก 200 บาท รับเลย 200 บาท',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p>ฝาก 200 รับ 200</p><p><br></p><p><span>ต้องฝากยอด 200 เท่านั้น!!! โบนัสจะเข้าออโต้ เล่น slot เท่านั้น ทำเทิร์นโอเวอร์เครดิต 6 เท่า (มียอดเครดิตถึง 1,200 หรือมากกว่า) ถอนได้สูงสุด 800</span></p><p><br></p><p><span>1 user ต่อ 1 IP เท่านั้น</span></p><p><br></p><p><span>หากพบว่ามีการสร้างหลาย user</span><p><br></p><p><span>หรือเก็บฟรีสปินเพื่อทำ bug ของเกมที่มีโบนัสฟรีเกมส์</span><p><br></p><p><span>ทางทีมงานจะระงับการจ่ายเงินทุกกรณี !!</span></p>',
        slug: 'promotion-2',
      },
      {
        id: '66bb005116899eeb0b9df9c4',
        promotionId: '',
        image: '49e3ffdf-1144-4329-a8b3-ed12fc4ab702.jpg',
        title: 'ฝากแรกของวัน',
        shortContent: 'ฝากแรกของวัน รับเลย 20% ของยอดฝาก',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p><p><span>ฝากแรกของวัน รับ 20% ของยอดฝาก สูงสุด 1000 บาท (เมื่อฝาก 100 บาทขึ้นไป)</span></p><p><br></p><p>ทำเทิร์นโอเวอร์เครดิต 10 เท่า</p>',
        slug: 'pro-of-day',
      },
      {
        id: '66bb005116899eeb0b9df9c5',
        promotionId: '',
        image: '2bf9bca2-1efc-40c6-b849-28d806f596d2.jpg',
        title: 'ฝากประจำ',
        shortContent: 'ฝากประจำ รับ 1% ของยอดฝาก',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p><p><span>ฝากประจำ รับ 1% ของยอดฝาก รับได้ไม่จำกัด และไม่จำกัดการถอน (เมื่อฝาก 100 บาทขึ้นไป)</span></p>',
        slug: 'pro-of-day',
      },
      {
        id: '6665278c96c03ad7492b592b',
        promotionId: '666154207137efa02bdb08c1',
        image: 'd6cac1b9-6dad-4f7e-88d7-a196610e390d.jpg',
        title: 'โบนัสวันเกิด',
        shortContent: 'โบนัสวันเกิดรับ 100 บาท ฟรี!',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p>รับโบนัสวันเกิด 100 บาท ง่ายๆ เพียง แสดงบัตรประชาชน ถ่ายกับตัวเองเพื่อยืนยันกับแอดมิน</p><p><br></p><p><span>เล่น slot เท่านั้น ทำเทิร์นโอเวอร์เครดิต 4 เท่า (มียอดเครดิตถึง 400 หรือมากกว่า) ไม่จำกัดถอน</span></p></p><p><br></p><p><span>1 user ต่อ 1 IP เท่านั้น</span></p><p><br></p><p><span>หากพบว่ามีการสร้างหลาย user</span><p><br></p><p><span>หรือเก็บฟรีสปินเพื่อทำ bug ของเกมที่มีโบนัสฟรีเกมส์</span><p><br></p><p><span>ทางทีมงานจะระงับการจ่ายเงินทุกกรณี !!</span></p>',
        slug: 'pro-birthday',
      },
      {
        id: '666589ed1d0ee59abd89a811',
        promotionId: '666154c0f4e10bbcaa999728',
        image: '78a9a37c-1c32-481a-8125-974bddf1828c.jpg',
        title: 'คืนยอดเสียเป็นเพชร',
        shortContent: 'คืนยอดเสียเป็นเพชร เพื่อใช้เพชรไปเล่นมินิเกมส์ต่าง ๆ',
        content:
          '<p><span>**หมายเหตุ**</span></p><p><br></p><p><span>คืนยอดเสียเป็นเพชร เพื่อใช้เพชรไปเล่นมินิเกมส์เพื่อสะสมเพชร และแลกรับเครดิตฟรี จำนวนมาก ไม่ต้องทำเทิร์น ถอนได้เลย</span></p><p><br></p><h1>ของรางวัลเครดิตฟรีมีดังนี้</h1><p>1. เครดิตฟรี 50<br>2. เครดิตฟรี 100<br3. เครดิตฟรี 200<br>4. เครดิตฟรี 300<br>5. เครดิตฟรี 400<br>6. เครดิตฟรี 500<br>7. เครดิตฟรี 1,000<br>8. เครดิตฟรี 2,000<br>9. เครดิตฟรี 4,000<br>10. เครดิตฟรี 8,000<br>11. เครดิตฟรี 10,000</p>',
        slug: 'refund-to-credit',
      },
    ]
  })
  return { promotions, isDisabledAutoPromotions }
})
