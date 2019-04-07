const Depart = () => import('@/views/depart/Depart')
const DepartAdd = () => import('@/views/depart/DepartAdd')
const DepartList = () => import('@/views/depart/DepartList')

const DepartRouter = {
  path: '/depart',
  component: Depart,
  meta: {
    title: '科室管理',
    // menuTab: true,
    icon: 'iconfont icon-demo',
  },
  children: [
    {
      path: '/depart/add',
      component: DepartAdd,
      meta: {
        title: '添加科室',
        icon: 'iconfont icon-demo',
      },
    },
    {
      path: '/depart/list',
      component: DepartList,
      meta: {
        title: '科室列表',
        icon: 'iconfont icon-demo',
      },
    },
  ],

}

export default DepartRouter
