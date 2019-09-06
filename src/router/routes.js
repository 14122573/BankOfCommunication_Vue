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
    import ('@/views/login/login')
const RegisterPage = () =>
    import ('@/views/login/register')
const OldSysLogout = () =>
    import ('@/views/login/oldSysLogout')
const BindPhone = () =>
    import ('@/views/login/bindPhone')
    // 个人信息
const PersonCenter = () =>
    import ('@/views/personal/person-center')
const PersonExpert = () =>
    import ('@/views/personal/expert')
    // 系统管理
    // 组织机构
const Organization = () =>
    import ('@/views/systemManagement/organization/list')
const OrganizationUpload = () =>
    import ('@/views/systemManagement/organization/upload')
const OrganizationCreate = () =>
    import ('@/views/systemManagement/organization/create')
const OrganizationView = () =>
    import ('@/views/systemManagement/organization/view')
    // 角色管理
const RoleManagement = () =>
    import ('@/views/systemManagement/role/list')
const RoleCreate = () =>
    import ('@/views/systemManagement/role/add')
    // 管理员管理
const AdministratorManagement = () =>
    import ('@/views/systemManagement/administrator/index')
const PendingView = () =>
    import ('@/views/systemManagement/administrator/pending-view')
const Distribution = () =>
    import ('@/views/systemManagement/administrator/distribution')
const CreateNewUser = () =>
    import ('@/views/systemManagement/administrator/new-user-create')
const NewUserView = () =>
    import ('@/views/systemManagement/administrator/new-user-view')
    // 专家管理人员
const Talent = () =>
    import ('@/views/expertManagement/talent/list')
const TalentUpload = () =>
    import ('@/views/expertManagement/talent/upload')
const TalentCreate = () =>
    import ('@/views/expertManagement/talent/create')
const TalentView = () =>
    import ('@/views/expertManagement/talent/view')
const ExpertLibrary = () =>
    import ('@/views/expertManagement/expertLibrary/list')
const ExpertLibraryCreate = () =>
    import ('@/views/expertManagement/expertLibrary/create')
const ExpertLibrarySelect = () =>
    import ('@/views/expertManagement/expertLibrary/select')
const ExpertLibraryView = () =>
    import ('@/views/expertManagement/expertLibrary/view')
const ExpertLibraryUpload = () =>
    import ('@/views/expertManagement/expertLibrary/upload')
const ProjectReview = () =>
    import ('@/views/expertManagement/review/list')
const ProjectReviewHistory = () =>
    import ('@/views/expertManagement/review/history')
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
     *               outsite 新开标签页打开，此打开方式将不嵌套layout。对应读取的跳转链接在，config/outside-config.js下。对象键值名需与router.name、router.meta.authCode保持一致
     *
     */
const appRoutes = [{
  path: '/',
  name: 'Layout',
  redirect: '/login',
  component: contentWrapper,
  children: [{
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { title: '首页' },
  },
  {
    path: '/noauth',
    name: 'noautherr',
    component: TipsNoAuth,
    meta: { title: '没有权限', },
  },

  {
    path: '/person',
    name: 'person',
    component: PersonCenter,
    meta: { title: '账户信息' },
  },
  {
    path: '/person/expert',
    name: '/person/expert',
    component: PersonExpert,
    meta: { title: '专家个人信息维护' },
  },
  {
    path: '/systemManagement',
    name: 'systemManagement',
    component: contentWrapper,
    meta: { title: '系统管理', menuPath: true, authCode: 'P00000', menuIcon: 'setting', hideInBread: true },
    children: [{
      path: '/systemManagement/organization',
      name: '/systemManagement/organization',
      component: Organization,
      meta: { title: '组织机构管理', menuPath: true, authCode: 'P01000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/systemManagement/organization/upload',
        name: '/systemManagement/organization/upload',
        component: OrganizationUpload,
        meta: { title: '导入', menuPath: false, authCode: 'P01005', menuIcon: 'setting', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/organization/create',
        name: '/systemManagement/organization/create',
        component: OrganizationCreate,
        meta: { title: '组织机构创建', menuPath: false, authCode: 'P01001', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/organization/view',
        name: '/systemManagement/organization/view',
        component: OrganizationView,
        meta: { title: '组织机构查看', menuPath: false, uthCode: 'P01002', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/organization/edit',
        name: '/systemManagement/organization/edit',
        component: OrganizationCreate,
        meta: { title: '组织机构编辑', menuPath: false, authCode: 'P01003', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      ]
    },
      // RoleManagement角色管理
    {
      path: '/systemManagement/role',
      name: '/systemManagement/role',
      component: RoleManagement,
      meta: { title: '角色管理', menuPath: true, authCode: 'P02000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/systemManagement/role/create',
        name: '/systemManagement/role/create',
        component: RoleCreate,
        meta: { title: '角色创建', menuPath: false, authCode: 'P02001', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/role/edit',
        name: '/systemManagement/role/edit',
        component: RoleCreate,
        meta: { title: '角色修改', menuPath: false, authCode: 'P02003', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/systemManagement/role/view',
        name: '/systemManagement/role/view',
        component: RoleCreate,
        meta: { title: '角色查看', menuPath: false, authCode: 'P02002', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
      },
      ]
    },
      // AdministratorManagement管理员管理
    {
      path: '/systemManagement/administrator',
      name: '/systemManagement/administrator',
      component: AdministratorManagement,
      meta: { title: '管理员管理', menuPath: true, authCode: 'P03000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/systemManagement/administrator/createNewUser',
        name: '/systemManagement/administrator/createNewUser',
        component: CreateNewUser,
        meta: { title: '新增用户信息', menuPath: false, authCode: 'P03303', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      },
      {
        path: '/systemManagement/administrator/editNewUser',
        name: '/systemManagement/administrator/editNewUser',
        component: CreateNewUser,
        meta: { title: '新增用户信息修改', menuPath: false, authCode: 'P03302', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      },
      {
        path: '/systemManagement/administrator/newUserView',
        name: '/systemManagement/administrator/newUserView',
        component: NewUserView,
        meta: { title: '查看新用户信息', menuPath: false, authCode: 'P03301', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      },
      {
        path: '/systemManagement/administrator/pendingView',
        name: '/systemManagement/administrator/pendingView',
        component: PendingView,
        meta: { title: '待分配权限查看', menuPath: false, authCode: 'P03101', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      },
      {
        path: '/systemManagement/administrator/distribution',
        name: '/systemManagement/administrator/distribution',
        component: Distribution,
        meta: { title: '权限分配', menuPath: false, authCode: 'P03102', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
      },
      ]
    },
    ]
  },
  {
    path: '/expertManagement',
    name: 'expertManagement',
    component: contentWrapper,
    meta: {
      title: '专家人员管理',
      menuPath: true,
      authCode: 'P10000',
      menuIcon: 'team',
      hideInBread: true
    },
    children: [{
      path: '/expertManagement/talent',
      name: '/expertManagement/talent',
      component: Talent,
      meta: { title: '人才库', menuPath: true, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/expertManagement/talent/upload',
        name: '/expertManagement/talent/upload',
        component: TalentUpload,
        meta: { title: '导入人才库', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/talent/create',
        name: '/expertManagement/talent/create',
        component: TalentCreate,
        meta: { title: '新增人才账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/talent/view',
        name: '/expertManagement/talent/view',
        component: TalentView,
        meta: { title: '查看人才账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      ]
    },
    {
      path: '/expertManagement/expertLibrary',
      name: '/expertManagement/expertLibrary',
      component: ExpertLibrary,
      meta: { title: '专家库', menuPath: true, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/expertManagement/expertLibrary/create',
        name: '/expertManagement/expertLibrary/create',
        component: ExpertLibraryCreate,
        meta: { title: '新增专家账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/expertLibrary/edit',
        name: '/expertManagement/expertLibrary/edit',
        component: ExpertLibraryCreate,
        meta: { title: '修改专家账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/expertLibrary/view',
        name: '/expertManagement/expertLibrary/view',
        component: ExpertLibraryView,
        meta: { title: '查看专家账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/expertLibrary/select',
        name: '/expertManagement/expertLibrary/select',
        component: ExpertLibrarySelect,
        meta: { title: '选择专家账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      },
      {
        path: '/expertManagement/expertLibrary/upload',
        name: '/expertManagement/expertLibrary/upload',
        component: ExpertLibraryUpload,
        meta: { title: '导入专家账号', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      }
      ]
    },
    {
      path: '/expertManagement/reiview',
      name: '/expertManagement/reiview',
      component: ProjectReview,
      meta: { title: '项目评审', menuPath: true, authCode: 'P10000', menuIcon: 'edit', hideInBread: false, openMode: 'normal' },
      children: [{
        path: '/expertManagement/reiview/history',
        name: '/expertManagement/reiview/history',
        component: ProjectReviewHistory,
        meta: { title: '历史评审', menuPath: false, authCode: 'P10000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
      }]
    }
    ]
  },
  {
    path: '/kpjd',
    name: 'kpjd',
    component: contentWrapper,
    meta: { title: '科普教育基地申报管理', menuPath: true, authCode: 'S0101', menuIcon: 'barcode', hideInBread: true },
    children: [{
      path: '/kpjd/declare/Declare',
      name: '/kpjd/declare/Declare',
      meta: { title: '提交基地申报', menuPath: true, authCode: 'S010101', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/DeclareReview',
      name: '/kpjd/declare/DeclareReview',
      meta: { title: '基地申报评审', menuPath: true, authCode: 'S010102', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/Trial',
      name: '/kpjd/declare/Trial',
      meta: { title: '基地申报组织专家', menuPath: true, authCode: 'S010103', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/organizationExpert',
      name: '/kpjd/declare/organizationExpert',
      meta: { title: '基地申报专家评审', menuPath: true, authCode: 'S010104', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/Notice',
      name: '/kpjd/declare/Notice',
      meta: { title: '基地申报评审结果', menuPath: true, authCode: 'S010105', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/Submission',
      name: '/kpjd/declare/Submission',
      meta: { title: '提交考核材料', menuPath: true, authCode: 'S010106', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/declare/AssessResult',
      name: '/kpjd/declare/AssessResult',
      meta: { title: '考核结果', menuPath: true, authCode: 'S010107', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    {
      path: '/kpjd/judge/judgeTable',
      name: '/kpjd/judge/judgeTable',
      meta: { title: '评判标准管理', menuPath: true, authCode: 'S010108', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
    },
    ]
  },
    //水产新品种审定子项目菜单配置
  {
    path: '/scsd',
    name: 'scsd',
    component: contentWrapper,
    meta: { title: '水产新品种审定', menuPath: true, authCode: 'S0501', menuIcon: 'barcode', hideInBread: true },
    children: [{
      path: '/scsd/post/scsdPost',
      name: '/scsd/post/scsdPost',
      meta: { title: '新品申报', menuPath: true, authCode: 'S050101', menuIcon: 'exception', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/forma/scsdForma',
      name: '/scsd/forma/scsdForma',
      meta: { title: '形式审查信息', menuPath: true, authCode: 'S050103', menuIcon: 'file-protect', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/expert/scsdOrgaExpert',
      name: '/scsd/expert/scsdOrgaExpert',
      meta: { title: '组织专家', menuPath: true, authCode: 'S050102', menuIcon: 'usergroup-add', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/exam/scsdExam',
      name: '/scsd/exam/scsdExam',
      meta: { title: '函审信息', menuPath: true, authCode: 'S050104', menuIcon: 'reconciliation', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/local/scsdLocal',
      name: '/scsd/local/scsdLocal',
      meta: { title: '现场审定确认', menuPath: true, authCode: 'S050106', menuIcon: 'solution', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/localexam/scsdLocalExam',
      name: '/scsd/localexam/scsdLocalExam',
      meta: { title: '现场审定专家意见', menuPath: true, authCode: 'S050105', menuIcon: 'solution', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/review/scsdReview',
      name: '/scsd/review/scsdReview',
      meta: { title: '评审结果信息', menuPath: true, authCode: 'S050107', menuIcon: 'audit', hideInBread: false, openMode: 'spa' },
    },
    {
      path: '/scsd/selectPost',
      name: '/scsd/selectPost',
      meta: { title: '查看申报记录', menuPath: true, authCode: 'S050108', menuIcon: 'exception', hideInBread: false, menuIcon: 'appstore' }
    }
    ]
  },
  {
    path: '/SCYJ/:sysname',
    name: 'SCYJ',
    component: TipsOutsite,
    meta: { title: '国家水生动物疫情预警系统', menuPath: true, authCode: 'SCYJ', menuIcon: 'alert', hideInBread: false, openMode: 'outsite' },
  },
  {
    path: '/YQCB/:sysname',
    name: 'YQCB',
    component: TipsOutsite,
    meta: { title: '全国水产养殖动植物病情测报系统', menuPath: true, menuIcon: 'cloud-upload', authCode: 'YQCB', hideInBread: false, openMode: 'outsite' },
  },
  {
    path: '/ZXJC/:sysname',
    name: 'ZXJC',
    component: TipsOutsite,
    meta: { title: '国家水生动物疫病监测信息管理系统', menuPath: true, menuIcon: 'hdd', authCode: 'ZXJC', hideInBread: false, openMode: 'outsite' },
  },
  {
    path: '/NYPC/:sysname',
    name: 'NYPC',
    component: TipsOutsite,
    meta: { title: '水产养殖动物病原菌耐药性普查数据分析系统', menuPath: true, menuIcon: 'experiment', authCode: 'NYPC', hideInBread: false, openMode: 'outsite' }
  }
  ],
},
{
  path: '/login',
  name: 'login',
  component: LoginPage,
  meta: { title: '登录' },
},
{
  path: '/register',
  name: 'register',
  component: RegisterPage,
  meta: { title: '注册' },
},
{
  path: '/bindPhone',
  name: 'bindPhone',
  component: BindPhone,
  meta: { title: '选择系统绑定手机号', },
},
{
  path: '/oldSysLogout',
  name: 'oldSysLogout',
  component: OldSysLogout,
  meta: { title: '老系统安全登出', },
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