import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/shareInfo',
  //   component: Layout,
  //   redirect: '/shareInfo',
  //   name: 'shareInfo',
  //   children: [{
  //     path: 'shareInfo',
  //     component: () => import('@/views/shareInfo/index'),
  //     meta: { title: '分享信息', icon: 'example' }
  //   }]
  // },
  {
    path: '/pageAnalysis',
    component: Layout,
    redirect: '/pageAnalysis',
    name: 'pageAnalysis',
    children: [{
      path: 'pageAnalysis',
      component: () => import('@/views/pageAnalysis/index'),
      meta: { title: '页面分析', icon: 'pages' }
    }]
  },
  {
    path: '/userRetention',
    component: Layout,
    redirect: '/userRetention',
    name: 'userRetention',
    children: [{
      path: 'userRetention',
      component: () => import('@/views/userRetention/index'),
      meta: { title: '用户留存', icon: 'user' }
    }]
  },
  // {
  //   path: '/userActicity',
  //   component: Layout,
  //   redirect: '/userActicity',
  //   name: 'userActicity',
  //   children: [{
  //     path: 'userActicity',
  //     component: () => import('@/views/userActicity/index'),
  //     meta: { title: '用户活跃度', icon: 'user-activity' }
  //   }]
  // },
  // {
  //   path: '/userFrom',
  //   component: Layout,
  //   redirect: '/userFrom',
  //   name: 'userFrom',
  //   children: [{
  //     path: 'userFrom',
  //     component: () => import('@/views/userFrom/index'),
  //     meta: { title: '用户来源', icon: 'user-from' }
  //   }]
  // },
  {
    path: '/userPortrait',
    component: Layout,
    redirect: '/userPortrait',
    name: 'userPortrait',
    children: [{
      path: 'userPortrait',
      component: () => import('@/views/userPortrait/index'),
      meta: { title: '用户画像', icon: 'user-print' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    hidden: true,
    meta: { title: 'Example', icon: 'example' },
    children: [{
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: 'Table', icon: 'table' }
    }, {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }]
  }, {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: { title: 'Form', icon: 'form' }
    }]
  }, {
    path: '/chanlManger',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: '渠道管理',
      component: () => import('@/views/chanelManger/index'),
      meta: { title: '渠道管理', icon: 'table' }
    }]
  }, {
    path: '/userManger',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: '用户管理',
      component: () => import('@/views/userManger/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  }, {
    path: '/addChanl',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: '添加渠道',
      component: () => import('@/views/addChanl/index'),
      meta: { title: '添加渠道', icon: 'add environment' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

