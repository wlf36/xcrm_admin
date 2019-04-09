const Disease = () => import('@/views/disease/Disease')
const DiseaseAdd = () => import('@/views/disease/DiseaseAdd')
const DiseaseList = () => import('@/views/disease/DiseaseList')

const DiseaseRouter = {
  path: '/disease',
  component: Disease,
  meta: {
    title: '病种管理',
    // menuTab: true,
    icon: 'iconfont icon-demo',
  },
  children: [
    {
      path: '/disease/add',
      component: DiseaseAdd,
      meta: {
        title: '新建病种',
        icon: 'iconfont icon-demo',
        auths: ['新建病种'],
      },
    },
    {
      path: '/disease/list',
      component: DiseaseList,
      meta: {
        title: '病种列表',
        icon: 'iconfont icon-demo',
        auths: ['病种列表'],
      },
    },
  ],

}

export default DiseaseRouter
