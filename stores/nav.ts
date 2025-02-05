export const useNavStore = defineStore('navStore', () => {
  const { t } = useI18n()
  const authStore = useAuthStore()
  const popupStore = usePopupStore()

  const currentMenu = ref('profile')
  const menuHeader = [
    [
      {
        label: 'menu_home',
        avatar: {
          src: '/assets/images/icons/ic-3d-home.webp',
        },
        to: '/',
      },
      {
        label: 'menu_promotions',
        avatar: {
          src: '/assets/images/icons/ic-3d-gift.webp',
        },
        to: '/promotion',
      },
      {
        label: 'menu_articles',
        avatar: {
          src: '/assets/images/icons/ic-3d-books.webp',
        },
        to: '/article',
      },
      {
        label: 'menu_contact',
        avatar: {
          src: '/assets/images/icons/ic-3d-contact.webp',
        },
        click: () => popupStore.openModalContact(),
      },
    ],
  ]
  const menuHeaderDropdown = [
    [
      {
        label: 'profile_full',
        icon: 'i-heroicons-user',
        click: () => popupStore.openModalProfile(),
      },
    ],
    [
      {
        label: 'password_change',
        icon: 'i-heroicons-lock-closed',
        click: () => popupStore.openModalProfile('change-password'),
      },
    ],
    [
      {
        label: 'sign_out',
        icon: 'i-heroicons-arrow-left-start-on-rectangle',
        click: () => {
          popupStore.alertConfirm({
            title: t('sign_out'),
            message: t('confirm_sure'),
            preventClose: true,
            onConfirm: () => authStore.signOut(),
          })
        },
      },
    ],
  ]
  const menuFooter = [
    {
      name: 'profile',
      label: 'profile',
      image: 'assets/images/icons/ic-3d-person.webp',
      to: '/',
    },
    {
      name: 'cashier',
      label: 'menu_cashier',
      image: 'assets/images/icons/ic-3d-wallet-2.webp',
      to: '/cashier',
    },
    {
      name: 'home',
      label: 'menu_home',
      image: 'assets/images/icons/ic-3d-home.webp',
      to: '/',
    },
    {
      name: 'promotion',
      label: 'menu_promotions',
      image: 'assets/images/icons/ic-3d-gift.webp',
      to: '/promotion',
    },
    {
      name: 'contact',
      label: 'menu_contact',
      image: '/assets/images/icons/ic-3d-contact.webp',
      to: '/contact',
    },
    {
      name: 'login',
      label: 'sign_in',
      image: '/assets/images/icons/ic-3d-login.webp',
      to: '',
    },
    {
      name: 'register',
      label: 'register_now',
      image: '/assets/images/icons/ic-3d-register.webp',
      to: '',
    },
  ]
  const menuGames = [
    {
      name: 'hot-game',
      label: 'game_hotgame',
      image: 'assets/images/menus/hot-game.webp',
      gameType: 'HOT',
      to: '/',
    },
    {
      name: 'favorites',
      label: 'game_favorites',
      image: 'assets/images/menus/favorites.webp',
      gameType: 'FAVORITES',
      to: '/favorites',
    },
    {
      name: 'recently',
      label: 'game_recently',
      image: 'assets/images/menus/recently.webp',
      gameType: 'RECENTLY',
      to: '/recently',
    },
    {
      name: 'slot',
      label: 'game_slot',
      image: 'assets/images/menus/slot.webp',
      gameType: 'SLOT',
      to: '/slot',
    },
    {
      name: 'casino',
      label: 'game_casino',
      image: 'assets/images/menus/casino.webp',
      gameType: 'LIVE',
      to: '/casino',
    },
    {
      name: 'sport',
      label: 'game_sport',
      image: 'assets/images/menus/sport.webp',
      gameType: 'SPORT',
      to: '/sport',
    },
    {
      name: 'fishing',
      label: 'game_fishing',
      image: 'assets/images/menus/fishing.webp',
      gameType: 'FISH',
      to: '/fishing',
    },
    {
      name: 'lottery',
      label: 'game_lottery',
      image: 'assets/images/menus/lottery.webp',
      gameType: 'LOTTERY',
      to: '/lottery',
    },
    {
      name: 'card',
      label: 'game_card',
      image: 'assets/images/menus/card.webp',
      gameType: 'CARD',
      to: '/card',
    },
    {
      name: 'poker',
      label: 'game_poker',
      image: 'assets/images/menus/poker.webp',
      gameType: 'POKER',
      to: '/poker',
    },
    {
      name: 'keno',
      label: 'game_keno',
      image: 'assets/images/menus/keno.webp',
      gameType: 'KENO',
      to: '/keno',
    },
    {
      name: 'trading',
      label: 'game_trading',
      image: 'assets/images/menus/trading.webp',
      gameType: 'TRADING',
      to: '/trading',
    },
    {
      name: 'esport',
      label: 'game_esport',
      image: 'assets/images/menus/esport.webp',
      gameType: 'ESPORT',
      to: '/esport',
    },
    {
      name: 'cockfight',
      label: 'game_cockfight',
      image: 'assets/images/menus/cockfight.webp',
      gameType: 'COCK',
      to: '/cockfight',
    },
  ]
  const menuSlidebar = [
    {
      name: 'home',
      label: 'menu_home',
      image: 'assets/images/icons/ic-3d-home.webp',
      to: '/',
    },
    {
      name: 'register',
      label: 'register',
      image: 'assets/images/icons/ic-3d-register.webp',
      to: '',
    },
    {
      name: 'profile',
      label: 'profile_full',
      image: 'assets/images/icons/ic-3d-person.webp',
      to: '',
    },
    {
      name: 'cashier',
      label: 'menu_cashier',
      image: 'assets/images/icons/ic-3d-wallet-2.webp',
      to: '',
    },
    {
      name: 'promotion',
      label: 'menu_promotions',
      image: 'assets/images/icons/ic-3d-gift.webp',
      to: '/promotion',
    },
    {
      name: 'article',
      label: 'menu_articles',
      image: 'assets/images/icons/ic-3d-books.webp',
      to: '/article',
    },
    {
      name: 'contact',
      label: 'menu_contact',
      image: 'assets/images/icons/ic-3d-contact.webp',
      to: '',
    },
    {
      name: 'signout',
      label: 'sign_out',
      image: 'assets/images/icons/ic-3d-logout.webp',
      to: '',
    },
  ]
  const menuProfile = [
    {
      name: 'profile',
      label: 'profile_full',
      image: 'assets/images/icons/ic-profile.webp',
      to: 'profile',
    },
    {
      name: 'change-password',
      label: 'password_change',
      image: 'assets/images/icons/ic-3d-lock.webp',
      to: 'change-password',
    },
    {
      name: 'cashier',
      label: 'menu_cashier',
      image: 'assets/images/icons/ic-3d-wallet-2.webp',
      to: 'cashier',
    },
    {
      name: 'transfer-wallet',
      label: 'menu_transfer_wallet',
      image: 'assets/images/icons/ic-3d-transfer.webp',
      to: 'transfer-wallet',
    },
    {
      name: 'mini-game',
      label: 'menu_minigame',
      image: 'assets/images/menus/esport.webp',
      to: 'mini-game',
    },
    {
      name: 'reward',
      label: 'menu_reward',
      image: 'assets/images/icons/ic-3d-thophy.webp',
      to: 'reward',
    },
    {
      name: 'coupon',
      label: 'menu_coupon',
      image: 'assets/images/icons/ic-3d-coupon.webp',
      to: 'coupon',
    },
    {
      name: 'cashback',
      label: 'menu_cashback',
      image: 'assets/images/icons/ic-3d-cashback.webp',
      to: 'cashback',
    },
    {
      name: 'commission',
      label: 'menu_commission',
      image: 'assets/images/icons/ic-3d-commission.webp',
      to: 'commission',
    },
    {
      name: 'bonus',
      label: 'menu_bonus',
      image: 'assets/images/icons/ic-3d-bonus.webp',
      to: 'bonus',
    },
    {
      name: 'affiliate',
      label: 'menu_affiliate',
      image: 'assets/images/icons/ic-3d-affiliate.webp',
      to: 'affiliate',
    },
    {
      name: 'config-promotion',
      label: 'menu_config_promotion',
      image: 'assets/images/icons/ic-3d-config.webp',
      to: 'config-promotion',
    },
  ]
  const isMobile = ref(false)

  onMounted(() => {
    isMobile.value = window.matchMedia('(max-width: 640px)').matches
  })

  const setCurrentMenu = (menu?: string) => {
    if (menu) currentMenu.value = menu
  }

  const menuGamesList = computed(() => menuGames.map((item) => item.name))

  const selectedMenu = (name: string) => {
    currentMenu.value = name
  }

  const mutationPath: { [key: string]: string }[] = [
    { live: 'casino' },
    { fish: 'fishing' },
    { cock: 'cockfight' },
  ]

  return {
    menuProfile,
    currentMenu,
    menuHeader,
    menuHeaderDropdown,
    menuFooter,
    menuGames,
    menuSlidebar,
    menuGamesList,
    mutationPath,
    isMobile,
    selectedMenu,
    setCurrentMenu,
  }
})
