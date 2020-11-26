import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 库存列表
  {
    path: '/Inventory',
    component: Layout,
    redirect: '/Inventory/InventoryLists',
    name: '库存管理',
    // meta: { title: '库存管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'InventoryLists',
        // name: '库存列表',
        component: () => import('@/views/Inventory/index'),
        meta: { title: '库存列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/InComeManager',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '入库单管理',
        component: () => import('@/views/incomeManager/index'),
        meta: { title: '入库单管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/outManager',
    component: Layout,
    redirect: '/outManager/form',
    children: [
      {
        path: 'index',
        component: () => import('@/views/outManager/index'), // Parent router-view
        name: '出库单管理',
        meta: { title: '出库单管理', icon: 'nested' }
      }
    ]
  },

  {
    path: '/delivery',
    component: Layout,
    children: [
      {
        path: 'delivery',
        component: () => import('@/views/delivery/index'), // Parent router-view
        name: '发货单管理',
        meta: { title: '发货单管理', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
