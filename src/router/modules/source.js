const Source = () => import('@/views/source/Source')
const SourceAdd = () => import('@/views/source/SourceAdd')
const SourceList = () => import('@/views/source/SourceList')

const SourceRouter = {
  path: '/source',
  component: Source,
  meta: {
    title: '渠道管理',
    // menuTab: true,
    icon: 'iconfont icon-demo',
  },
  children: [
    {
      path: '/source/add',
      component: SourceAdd,
      meta: {
        title: '添加渠道',
        icon: 'iconfont icon-demo',
      },
    },
    {
      path: '/source/list',
      component: SourceList,
      meta: {
        title: '渠道列表',
        icon: 'iconfont icon-demo',
      },
    },
  ],

}

export default SourceRouter
