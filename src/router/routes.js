// const Layout = () => import('@/components/Layout/main')
const contentWrapper = () =>
    import ('@/components/Layout/content-wrapper')
const TipsNetworkErr = () =>
    import ('@/views/tips/network')
const TipsNoAuth = () =>
    import ('@/views/tips/auth')
const TipsOutsite = () =>
    import ('@/views/tips/outsite')
const HomePage = () =>
    import ('@/views/home')
const LoginPage = () =>
    import ('@/views/login')
const BindPhone = () =>
    import ('@/views/bindPhone')
const PersonCenter = () =>
    import ('@/views/person-center')
    // 系统管理---组织机构
    // contentOrganization
const contentOrganization = () =>
    import ('@/views/systemManagement/content-organization')
const Organization = () =>
    import ('@/views/systemManagement/organization/list')
const OrganizationUpload = () =>
    import ('@/views/systemManagement/organization/upload')
const OrganizationCreate = () =>
    import ('@/views/systemManagement/organization/create')
const OrganizationView = () =>
    import ('@/views/systemManagement/organization/view')
/**
 * 要求：
 *  1、配置Router时，需将此router的权限编码信息、打开方式信息、是否在面包屑隐藏信息、是否为左侧菜单、是否有菜单图标配置在内。
 *  2、如此路由节点是要在面包屑中展示的，则需严格按照路由父子级，将子路由定义在其直属父级路由的children中
 *  3、为页面渲layout，所有除’/‘外的路由，都需定在’/‘路由的children下
 * 作用：除去正常路由展示，系统会从本数组内抓取权限菜单、判断是否能在面包屑中显示
 * 特殊配置字段说明：
 * meta.menuPath 标记是否为菜单。不是可不设置此字段
 * meta.authCode 当此路由受权限控制，需设置此字段，并填写与服务端一直的权限编码。不受权限控制可不设置
 * meta.hideInBread 标记是否需在面包屑中展示。不是可不设置此字段
 * meta.menuIcon 标记此路由在展示时需显示的ant design的图标。只能填写ant design中ICON组件内允许的字符串
 * meta.openMode 标记此路由点击后展示打开的方式。若值为normal，可不设置此字段
 *               spa 注册子前端项目的路由。注，此时设置的router.name为子项目展现路由名称的name，且需带上子项目名称前缀。如：/{micname}/{子项目router.name}，且无需设定router.component
 *               normal 本项目中自有路由
 *               outsite 新开标签页打开，此打开方式将不嵌套layout
 * meta.outsiteLink 当meta.openMode 为outsite时，必须配置此字段，并设置完整跳转页面的href
 *
 */
const appRoutes = [{
  path: '/',
  name: 'Layout',
  redirect: '/login',
  component: contentWrapper,
  children: [
    { path: '/home', name: 'home', component: HomePage, meta: { title: '首页' }, },
    { path: '/noauth', name: 'noautherr', component: TipsNoAuth, meta: { title: '没有权限', }, },
    {
      path: '/person',
      name: 'person',
      component: PersonCenter,
      meta: { title: '个人中心' },
    },
    {
      path: '/systemManagement',
      name: 'systemManagement',
      component: contentOrganization,
      meta: { title: '系统管理', menuPath: true, authCode: 'S0501', menuIcon: 'setting', hideInBread: true },
      children: [{
        path: '/systemManagement/organization',
        name: '/systemManagement/organization',
        component: Organization,
        meta: { title: '组织机构管理', menuPath: true, authCode: 'S050101', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/organization/upload',
        name: '/systemManagement/organization/upload',
        component: OrganizationUpload,
        meta: { title: '导入', menuPath: false, authCode: 'S050101', menuIcon: 'setting', hideInBread: false, openMode: 'normal' }
      },
      {
			 path: '/organization/create',
			 name: '/organization/create',
			 component: OrganizationCreate,
			 meta: { title: '创建', menuPath: false, authCode: 'S050101', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
			 path: '/organization/view',
			 name: '/organization/view',
			 component: OrganizationView,
			 meta: { title: '查看', menuPath: false, authCode: 'S050101', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      }]
    },
    {
      path: '/scsd',
      name: 'scsd',
      component: contentWrapper,
      meta: { title: '水产新品种审定', menuPath: true, authCode: 'S0501', menuIcon: 'barcode', hideInBread: true },
      children: [{
        path: '/scsd/post/scsdPos',
        name: '/scsd/post/scsdPos',
        meta: { title: '完善申报信息', menuPath: true, authCode: 'S050101', menuIcon: 'exception', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/expert/scsdOrgaExpert',
        name: '/scsd/expert/scsdOrgaExpert',
        meta: { title: '组织专家', menuPath: true, authCode: 'S050102', menuIcon: 'usergroup-add', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/forma/scsdForma',
        name: '/scsd/forma/scsdForma',
        meta: { title: '形式审查信息', menuPath: true, authCode: 'S050103', menuIcon: 'file-protect', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/exam/scsdExam',
        name: '/scsd/exam/scsdExam',
        meta: { title: '函审信息', menuPath: true, authCode: 'S050104', menuIcon: 'reconciliation', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/localexam/scsdLocalExam',
        name: '/scsd/localexam/scsdLocalExam',
        meta: { title: '现场审定专家意见', menuPath: true, authCode: 'S050105', menuIcon: 'solution', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/local/scsdLocal',
        name: '/scsd/local/scsdLocal',
        meta: { title: '现场审定专家代录入', menuPath: true, authCode: 'S050106', menuIcon: 'solution', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/review/scsdReview',
        name: '/scsd/review/scsdReview',
        meta: { title: '评审结果信息', menuPath: true, authCode: 'S050107', menuIcon: 'audit', hideInBread: false, openMode: 'spa' },
      },
      ]
    },
    {
      path: '/SCYJ/:sysname',
      name: 'SCYJ',
      component: TipsOutsite,
      meta: { title: '水产预警系统', menuPath: true, authCode: 'SCYJ', menuIcon: 'alert', hideInBread: false, openMode: 'outsite', outsiteLink: 'http://47.102.155.97:8080' },
    },
    {
      path: '/YQCB/:sysname',
      name: 'YQCB',
      component: TipsOutsite,
      meta: { title: '全国水产养殖动植物病情测报系统', menuPath: true, menuIcon: 'cloud-upload', authCode: 'YQCB', hideInBread: false, openMode: 'outsite', outsiteLink: 'http://47.102.155.97:8081' },
    },
    {
      path: '/ZXJC/:sysname',
      name: 'ZXJC',
      component: TipsOutsite,
      meta: { title: '国家水生动物疫病监测信息管理系统', menuPath: true, menuIcon: 'hdd', authCode: 'ZXJC', hideInBread: false, openMode: 'outsite', outsiteLink: 'http://47.102.155.97:8082' },
    },
    {
      path: '/NYPC/:sysname',
      name: 'NYPC',
      component: TipsOutsite,
      meta: { title: '水产养殖动物病原菌耐药性普查数据分析系统', menuPath: true, menuIcon: 'experiment', authCode: 'NYPC', hideInBread: false, openMode: 'outsite', outsiteLink: 'http://47.102.155.97:8083' }
    },
  ],
},
{
  path: '/login',
  name: 'login',
  component: LoginPage,
  meta: { title: '登录', authCode: 'S050107' },
},
{
  path: '/bindPhone',
  name: 'bindPhone',
  component: BindPhone,
  meta: { title: '选择系统绑定手机号', },
},
{
  path: '/networkerr',
  name: 'networkerr',
  component: TipsNetworkErr,
  meta: { title: '网络错误', },
},
]

export const routes = [
  ...appRoutes,
]
