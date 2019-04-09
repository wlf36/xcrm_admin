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
        title: '新建科室',
        icon: 'iconfont icon-demo',
        auths: ['新建科室'],
      },
    },
    {
      path: '/depart/list',
      component: DepartList,
      meta: {
        title: '科室列表',
        icon: 'iconfont icon-demo',
        auths: ['科室列表'],
      },
    },
  ],

}

export default DepartRouter
