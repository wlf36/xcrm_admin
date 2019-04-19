const Customer = () => import('@/views/customer/Customer')
const CustomerAdd = () => import('@/views/customer/CustomerAdd')
const CustomerList = () => import('@/views/customer/CustomerList')
const CustomerExport = () => import('@/views/customer/CustomerExport')
const CustomerImport = () => import('@/views/customer/CustomerImport')
const CustomerWhole = () => import('@/views/customer/CustomerWhole')
const CustomerOwn = () => import('@/views/customer/CustomerOwn')

const CustomerRouter = {
  path: '/customer',
  component: Customer,
  meta: {
    title: '客户管理',
    // menuTab: true,
    icon: 'iconfont icon-demo',
  },
  children: [
    {
      path: '/customer/add',
      component: CustomerAdd,
      meta: {
        title: '新增客户',
        icon: 'iconfont icon-demo',
        auths: ['新增客户'],
      },
    },
    {
      path: '/customer/list',
      component: CustomerList,
      meta: {
        title: '客户列表',
        icon: 'iconfont icon-demo',
        auths: ['搜索客户'],
      },
    },
    {
      path: '/customer/',
      component: Customer,
      meta: {
        title: '管理数据',
        icon: 'iconfont icon-demo',
        auths: ['导出数据', '导入数据', '统计数据'],
      },
      children: [
        {
          path: '/customer/whole',
          component: CustomerWhole,
          meta: {
            title: '整体数据',
            icon: 'iconfont icon-demo',
            auths: ['统计数据'],
          },
        },
        {
          path: '/customer/own',
          component: CustomerOwn,
          meta: {
            title: '成员数据',
            icon: 'iconfont icon-demo',
            auths: ['统计数据'],
          },
        },
        {
          path: '/customer/export',
          component: CustomerExport,
          meta: {
            title: '导出数据',
            icon: 'iconfont icon-demo',
            auths: ['导出数据'],
          },
        },
        {
          path: '/customer/import',
          component: CustomerImport,
          meta: {
            title: '导入数据',
            icon: 'iconfont icon-demo',
            auths: ['导入数据'],
          },
        },
      ],
    },
  ],

}

export default CustomerRouter
