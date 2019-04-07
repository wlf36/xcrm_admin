import Home from '@/views/home/Home'

import homeRouter from './home-router'

const Login = () => import('@/views/login/Login')

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/customer/list/',
    component: Home,
    children: [
      ...homeRouter,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

export default routes
