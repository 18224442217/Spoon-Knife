import Vue from 'vue'
import Router from 'vue-router'
import Cache from '../utils/cache'
import Test from '@/pages/test'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('../pages/home/index'),
    meta: {
      hasFooter: true
    }
  },{
    path: '/fenxiang',
    name: 'fenxiang',
    component: () => import('../pages/coupon/fenxiang'),
    meta: {
      hasFooter: true
    }
  }, {
    path: '/category',
    name: 'category',
    component: () => import('../pages/category/index'),
    meta: {
      hasFooter: true
    }
  }, {
    path: '/financial',
    name: 'financial',
    component: () => import('../pages/financial/index'),
    meta: {
      hasFooter: true,
      title: '金融专区'
    }
  }, {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: () => import('../pages/shoppingCart/index'),
    meta: {
      hasFooter: true,
      authorization: true
    }
  }, {
    path: '/mine',
    name: 'mine',
    component: () => import('../pages/mine/index'),
    meta: {
      hasFooter: true,
      authorization: true
    }
  },
  {
    path: '/productDetails',
    name: 'productDetails',
    component: () => import('../pages/product/index'),
    meta: {}
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/merchantlogin',
    name: 'merchantlogin',
    component: () => import('../pages/login/merchantlogin')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/login')
  },
  {
    path: '/loginmain',
    name: 'loginmain',
    component: () => import('../pages/login/loginmain')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../pages/mine/address/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/address/edit',
    name: 'addressEdit',
    component: () => import('../pages/mine/address/edit'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/mine/order/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () => import('../pages/mine/order/detail'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/privacyPolicy',
    name: 'privacyPolicy',
    component: () => import('../pages/mine/privacyPolicy'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/userAgreement',
    name: 'userAgreement',
    component: () => import('../pages/mine/userAgreement'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/goodslist',
    name: 'goodslist',
    component: () => import('../pages/category/goodslist')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../pages/category/shop')
  },
  {
    path: '/shopInfo',
    name: 'shopInfo',
    component: () => import('../pages/category/shop/shopInfo')
  },

  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('../pages/order/create'),
    meta: {
      authorization: true
    }
  },

  {
    path: '/orderPay',
    name: 'orderPay',
    component: () => import('../pages/order/pay'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/order/logistics',
    name: 'orderLogistics',
    component: () => import('../pages/mine/order/logistics'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/order/refund',
    name: 'orderRefund',
    component: () => import('../pages/mine/order/refund'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/category/shop/shopWindowList',
    name: 'shopWindowList',
    component: () => import('../pages/category/shop/shopWindowList')
  },
  {
    path: '/gaprefecture',
    name: 'gaprefecture',
    component: () => import('../pages/gaprefecture/index'),
    meta: {
      title: '广安特色产品'
    }
  },
  {
    path: '/gaprefecture/classification',
    name: 'classification',
    component: () => import('../pages/gaprefecture/classification/index'),
    meta: {
      title: '广安特色产品'
    }
  },
  {
    path: '/gaprefecture/particulars',
    name: 'particulars',
    component: () => import('../pages/gaprefecture/particulars/index'),
    meta: {
      title: '广安特色产品'
    }
  },
  {
    path: '/localservice',
    name: 'localservice',
    component: () => import('../pages/localservice/index')
  },
  {
    path: '/merchantenter',
    name: 'merchantenter',
    component: () => import('../pages/merchantenter/index'),
    meta: {
      // authorization: true,
      title: '和生活商户入驻'
    }
  },
  {
    path: '/merchantenter/mapp',
    name: 'mapp',
    component: () => import('../pages/merchantenter/mapp')
  },
    // {
    //   path: '/mapsearch',
    //   name: 'mapsearch',
    //   component: () => import('../pages/merchantenter/mapsearch')
    // },
  {
    path: '/Servicebulletins',
    name: 'Servicebulletins',
    component: () => import('../pages/Servicebulletins/index')
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../pages/coupon/index'),
    meta: {
      // authorization: true,
      title: '领劵中心'
    }
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../pages/coupon/map')
  },

  {
    path: '/cancelsystem',
    name: 'cancelsystem',
    component: () => import('../pages/cancelsystem/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: '/cancelsystem/cancel',
    name: 'cancel',
    component: () => import('../pages/cancelsystem/cancel')

  },
  {
    path: '/cancelsystem/history',
    name: 'history',
    component: () => import('../pages/cancelsystem/history')
  },
  {
    path: '/cancelsystem/couponhistory',
    name: 'couponhistory',
    component: () => import('../pages/cancelsystem/couponhistory')
  },
  {
    path: '/mycoupon',
    name: 'mycoupon',
    component: () => import('../pages/mycoupon/index'),
    meta: {
      title: '我的卡券',
      authorization: true
    }
  },
  {
    path: '/mycoupon/mecoupon',
    name: 'mecoupon',
    component: () => import('../pages/mycoupon/mecoupon'),
    meta: {
      title: '我的卡券'
    }
  },
  {
    path: '/merchant_offline_coupon',
    name: 'merchant_offline_coupon',
    component: () => import('../pages/merchantOfflineCoupon/index'),
    meta: {
      title: '商家优惠券',
      authorization: true
    }
  },
  {
    path: '/activty/help_poor',
    name: 'help_poor',
    component: () => import('../pages/activty/helpPoor'),
    meta: {
      title: '扶贫专区'
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../pages/feedback/index'),
    meta: {
      title: '意见反馈'
    }
  },
  {
    path: '/location',
    name: 'location',
    component: () => import('../pages/location/index'),
    meta: {
      title: '位置选择'
    }
  },
  {
    path: '/announcement',
    name: 'announcement',
    component: () => import('../pages/announcement/index'),
    meta: {
      title: '公告'
    }
  },
  {
    path: '/nearbyMerchant',
    name: 'nearbyMerchant',
    component: () => import('../pages/nearbyMerchant/index'),
    meta: {
      title: '附近商家'
    }
  },
  {
    path: '/storeSharing',
    name: 'storeSharing',
    component: () => import('../pages/coupon/storeSharing'),
    meta: {
      title: '商家店铺'
    }
  },
  {
    path: '/couponSharing',
    name: 'couponSharing',
    component: () => import('../pages/coupon/couponSharing'),
    meta: {
      title: '领券中心'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
// 解决菜单跳转相同路径下报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 校验是否需要登录状态
router.beforeEach((to, from, next) => {
  // console.log(next)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.authorization) {
    if (Cache.getToken()) {
      next()
    } else if (to.matched[0].path === '/cancelsystem') {
      next({
        name: 'merchantlogin'
      })
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

export default router
