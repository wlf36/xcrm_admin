const Customer = () => import('@/views/customer/Customer')
const CustomerAdd = () => import('@/views/customer/CustomerAdd')
const CustomerList = () => import('@/views/customer/CustomerList')
const CustomerExport = () => import('@/views/customer/CustomerExport')

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
      path: '/customer/export',
      component: CustomerExport,
      meta: {
        title: '管理数据',
        icon: 'iconfont icon-demo',
        auths: ['导出数据', '导入数据', '统计数据'],
      },
    },
  ],

}

export default CustomerRouter
