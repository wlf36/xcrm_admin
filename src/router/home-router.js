import adminRouter from './modules/admin'
import customerRouter from './modules/customer'
import departRouter from './modules/depart'
import diseaseRouter from './modules/disease'
import sourceRouter from './modules/source'

const Log = () => import('@/views/log/Log')

const homeRouter = [
  customerRouter,
  departRouter,
  diseaseRouter,
  sourceRouter,
  adminRouter,
  {
    path: '/log',
    name: 'log',
    component: Log,
    meta: {
      title: '日志管理',
      icon: 'iconfont icon-rizhiguanli',
      auths: ['查询所有日志'],
    },
  },
]

export default homeRouter
