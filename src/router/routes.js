const Layout = () => import('@/components/Layout/main')
const TipsNetworkErr  = () => import( '@/views/errorTips/network')
const TipsNoAuth  = () => import( '@/views/errorTips/auth')
const HomePage = () => import('@/views/home')
const LoginPage = () => import('@/views/login')
const BindPhone = () => import('@/views/bindPhone')
const PersonCenter = () => import('@/views/person-center')

const appRoutes = [
  { path: '/', name: 'Layout', redirect: '/login', component: Layout,
    children: [
      { path: '/home', name: 'home',component: HomePage,
        meta: { title: '首页' },
      },
      {
        path: '/noauth', name: 'noautherr',component: TipsNoAuth,
        meta: { title: '没有权限', },
      },
      { path: '/person', name: 'person',component: PersonCenter,
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/login', name: 'login',component: LoginPage,
    meta: { title: '登录', },
  },
  {
    path: '/bindPhone', name: 'bindPhone',component: BindPhone,
    meta: { title: '选择系统绑定手机号', },
  },
  {
    path: '/networkerr', name: 'networkerr',component: TipsNetworkErr,
    meta: { title: '网络错误', },
  },
]

export const routes = [
  ...appRoutes,
]
