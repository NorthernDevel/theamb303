<template>
  <div>
    <div class="flex flex-col items-center justify-center mb-5">
      <h3 class="text-2xl mb-4">{{ $t('menu_affiliate') }}</h3>
      <div
        class="border-2 border-gray-200 mb-8 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 w-full rounded-lg p-2 pt-4mt-2">
        <AppFormGroup :label="$t('share_affiliate')" name="linkAffiliate">
          <UInput icon="i-heroicons-link" :type="'text'" class="grow leading-6" v-model="affiliateLink" readonly />
        </AppFormGroup>
        <div class="dark:text-yellow-400 text-center my-4 text-xs"><span class="dark:text-amber-100">{{ $t('signup_referral') }} &nbsp; : &nbsp; </span>{{ affiliate_total }}</div>
        <UButton icon="i-heroicons-document-duplicate" @click="copyToClipboard(affiliateLink)"
          class="login-btn w-full h-12 justify-center rounded-full text-lg font-light mt-1 mb-3">{{ $t('copy') }}
        </UButton>
      </div>

      <UTabs v-model="activeTab" :items="tabList" class="w-full">
        <template #icon="{ item, selected }">
          <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0 mr-2 hidden sm:inline-block"
            :class="[selected && 'text-amber-500 dark:text-amber-400']" />
        </template>
      </UTabs>
      <AffiliateCredit v-if="activeTab === 0" />
      <AffiliateTransaction v-if="activeTab === 1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RequestLinkAffiliate , RequestAffiliateChildById, AffiliateChildByIdData } from '~/models/affiliate.model'

const { t } = useI18n()
const popupStore = usePopupStore()
const profileStore = useProfileStore()
const { copyToClipboard } = useClipboard()

const isLoading = ref(false)
const affiliateLink = ref()
const users = ref<AffiliateChildByIdData[]>([])
const affiliate_total = ref<number>(0)
const activeTab = ref<number>(0)
const baseURL = ref(window.location.origin)
const tabList = [
  {
    name: 'receive',
    label: t('affiliate_menus_income'),
    icon: 'i-heroicons-banknotes',
  },
  {
    name: 'history',
    label: t('affiliate_menus_reports'),
    icon: 'i-heroicons-clock',
  },
]

const getLinkAffiliate = async (body: RequestLinkAffiliate) => {
  try {
    isLoading.value = true
    const { status, message, data } = await useLinkAffiliate(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const splitURL = data.link.split('?')
        affiliateLink.value = `${baseURL.value}?${splitURL[1]}`
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const getAffiliateChildById = async (body: RequestAffiliateChildById) => {
  try {
    isLoading.value = true

    const { status, message, data, total } = await AffiliateChildById(body)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      affiliate_total.value = total ?? 0
      users.value = data ?? []
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getLinkAffiliate({ url: `${baseURL.value}` })
  if(profileStore.userData)
    getAffiliateChildById({ username: profileStore.userData.username , page : 1 , size : 50 })
})
</script>