// const Layout = () => import('@/components/Layout/main')
const contentWrapper = () =>  import ('@/components/Layout/content-wrapper')
const TipsUpperLimitErr = () => import ('@/views/tips/upperlimit')
const TipsNetworkErr = () => import ('@/views/tips/network')
const TipsInnerNetworkErr = () => import ('@/views/tips/innerNetwork')
const TipsNoAuth = () => import ('@/views/tips/auth')
const TipsOutsite = () => import ('@/views/tips/outsite')
const ErrorPage = () => import ('@/views/tips/error-page')
const HomePage = () => import ('@/views/home')
const LoginPage = () => import ('@/views/login/login')
const RegisterPage = () => import ('@/views/login/register')
const OldSysLogout = () => import ('@/views/login/oldSysLogout')
const BindPhone = () => import ('@/views/login/bindPhone')
// 个人信息
const PersonCenter = () => import ('@/views/personal/person-center')
const PersonExpert = () => import ('@/views/personal/expert')
// 系统管理
const SysBasicInfo = () => import ('@/views/systemManagement/basicInformation/index')
// 组织机构
const Organization = () => import ('@/views/systemManagement/organization/list')
const OrganizationCreate = () => import ('@/views/systemManagement/organization/create')
const OrganizationView = () => import ('@/views/systemManagement/organization/view')
// 角色管理
const RoleManagement = () => import ('@/views/systemManagement/role/list')
const RoleCreate = () => import ('@/views/systemManagement/role/add')
// 权限功能点配置管理
const RolePermissionConfig = () => import ('@/views/systemManagement/permissionConfig/index')
const RolePermissionPoint = () => import ('@/views/systemManagement/permissionConfig/point')
const RolePermissionAddPoint = () => import ('@/views/systemManagement/permissionConfig/addPoint')
const RolePermissionAddPointBatch = () => import ('@/views/systemManagement/permissionConfig/addPointBatch')
const RolePermissionEditPoint = () => import ('@/views/systemManagement/permissionConfig/editPoint')
// 管理员管理
const AdministratorManagement = () => import ('@/views/systemManagement/administrator/index')
const PendingView = () => import ('@/views/systemManagement/administrator/pending-view')
const Distribution = () => import ('@/views/systemManagement/administrator/distribution')
const CreateNewUser = () => import ('@/views/systemManagement/administrator/new-user-create')
const NewUserView = () => import ('@/views/systemManagement/administrator/new-user-view')
// 专家管理人员
const LibraryEdit = () => import('@/views/expertManagement/components/libraryEdit') // 人才库、专家库、专家个人信息的新增及修改共用组件
const LibraryView = () => import('@/views/expertManagement/components/libraryView') // 人才库、专家库、专家个人信息的查看共用组件
const ExpertBase = () => import ('@/views/expertManagement/base/index')
const Talent = () => import ('@/views/expertManagement/talent/list')
const TalentUpload = () => import ('@/views/expertManagement/talent/upload')
// const TalentCreate = () => import ('@/views/expertManagement/talent/create')
// const TalentView = () => import ('@/views/expertManagement/talent/view')
const ExpertLibrary = () => import ('@/views/expertManagement/expertLibrary/list')
// const ExpertLibraryCreate = () => import ('@/views/expertManagement/expertLibrary/create')
const ExpertLibrarySelect = () => import ('@/views/expertManagement/expertLibrary/select')
// const ExpertLibraryView = () => import ('@/views/expertManagement/expertLibrary/view')
const ExpertLibraryUpload = () => import ('@/views/expertManagement/expertLibrary/upload')
const ProjectReview = () => import ('@/views/expertManagement/review/list')
const ProjectReviewHistory = () => import ('@/views/expertManagement/review/history')
const demo = () => import ('@/views/demo/use-ueditor')
// 内容管理-知识文库
const KnowledgeList = () => import ('@/views/cms/knowledge/list')
const KnowledgeCreate = () => import ('@/views/cms/knowledge/create')
const KnowledgeEdit = () => import ('@/views/cms/knowledge/edit')
const KnowledgeDetail = () => import ('@/views/cms/knowledge/details')
const KnowledgePublishedList= () => import ('@/views/cms/knowledgePublish/authList')
const KnowledgePublishedAnonymousList= () => import ('@/views/cms/knowledgePublish/anonymousList')
const KnowledgeView= () => import ('@/views/cms/knowledgePublish/view')
// 内容管理-通知公告
const NoticeList = () => import ('@/views/cms/notice/list')
const NoticeCreate = () => import ('@/views/cms/notice/create')
const NoticeEdit = () => import ('@/views/cms/notice/edit')
const NoticeDetail = () => import ('@/views/cms/notice/detail')
const NoticePublishedList= () => import ('@/views/cms/noticePublish/list')
const NoticeView= () => import ('@/views/cms/noticePublish/view')
// 内容管理 - 投票管理
const VoteList = () => import('@/views/cms/vote/list')
const VoteEdit = () => import('@/views/cms/vote/edit')
const VoteResult = () => import('@/views/cms/vote/result')
const VoteView = () => import('@/views/cms/vote/view')
const VoteQrList = () => import('@/views/cms/vote/qr-list')
// 内容管理 - 操作手册
const ManualList = () => import('@/views/cms/manual/list')
const ManualFileList = () => import('@/views/cms/manual/file-list')
const ManualView = () => import('@/views/cms/manual/manual-view')
// 数据服务 - 渔业兽医
// const Veterinary = () => import('@/views/cms/dataService/veterinary')
const VeterinaryList = () => import('@/views/cms/dataService/veterinaryList')
const VeterinaryView = () => import('@/views/cms/dataService/view')

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
     */
const appRoutes = [{
  path: '/',
  name: 'Layout',
  redirect: '/login',
  component: contentWrapper,
  children: [

    {
      path: '/home', name: 'home', component: HomePage,
      meta: { title: '首页' },
    },
    {
      path: '/demo', name: 'demo', component: demo,
      meta: { title: 'demo', },
    },
    {
      path: '/noauth', name: 'noautherr', component: TipsNoAuth,
      meta: { title: '没有权限', },
    },
    {
      path: '/innerNetworkerr',
      name: 'innerNetworkerr',
      component: TipsInnerNetworkErr,
      meta: { title: '系统异常', },
    },
    {
      path: '/person', name: 'person', component: PersonCenter,
      meta: { title: '账户信息' },
    },
    {
      path: '/person/expert', name: '/person/expert', component: LibraryEdit,
      meta: { title: '专家个人信息维护' },
    },
    // 系统管理
    {
      path: '/systemManagement', name: 'systemManagement', component: contentWrapper,
      meta: { title: '系统管理', menuPath: true, authCode: 'P00000', menuIcon: 'setting', hideInBread: true },
      children: [
      //角色权限配置
        {
          path: '/systemManagement/permissionConfig',
          name: '/systemManagement/permissionConfig',
          component: RolePermissionConfig,
          meta: { title: '角色权限配置', menuPath: true, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children: [{
            path: '/systemManagement/permissionConfig/point',
            name: '/systemManagement/permissionConfig/point',
            component: RolePermissionPoint,
            meta: { title: '功能点管理', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
            children:[
              {
                path: '/systemManagement/permissionConfig/point/add',
                name: '/systemManagement/permissionConfig/point/add',
                component: RolePermissionAddPoint,
                meta: { title: '添加功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              },
              {
                path: '/systemManagement/permissionConfig/point/addBatch',
                name: '/systemManagement/permissionConfig/point/addBatch',
                component: RolePermissionAddPointBatch,
                meta: { title: '批量添加功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              },
              {
                path: '/systemManagement/permissionConfig/point/edit',
                name: '/systemManagement/permissionConfig/point/edit',
                component: RolePermissionEditPoint,
                meta: { title: '编辑功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              }
            ]
          },
          ]
        },
        {
          path: '/systemManagement/organization',
          name: '/systemManagement/organization',
          component: Organization,
          meta: { title: '组织机构管理', menuPath: true, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children: [{
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
          meta: { title: '角色管理', menuPath: true, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
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
          meta: { title: '用户管理', menuPath: true, authCode: 'P03000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
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
        // 公共基础信息维护
        {
          path: '/systemManagement/basic',
          name: '/systemManagement/basic',
          component: SysBasicInfo,
          meta: { title: '基础信息维护', menuPath: true, authCode: 'P04000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children: []
        },
      ]
    },
    // 专家库
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
        meta: { title: '人才库', menuPath: true, authCode: 'P12000', menuIcon: 'user', hideInBread: false, openMode: 'normal' },
        children: [{
          path: '/expertManagement/talent/upload',
          name: '/expertManagement/talent/upload',
          component: TalentUpload,
          meta: { title: '导入人才库', menuPath: false, authCode: 'P12001', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/talent/create',
          name: '/expertManagement/talent/create',
          component: LibraryEdit,
          meta: { title: '新增人才账号', menuPath: false, authCode: 'P12001', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/talent/edit',
          name: '/expertManagement/talent/edit',
          component: LibraryEdit,
          meta: { title: '修改人才账号', menuPath: false, authCode: 'P12003', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/talent/view',
          name: '/expertManagement/talent/view',
          component: LibraryView,
          meta: { title: '查看人才账号', menuPath: false, authCode: 'P12002', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        ]
      },
      {
        path: '/expertManagement/expertLibrary',
        name: '/expertManagement/expertLibrary',
        component: ExpertLibrary,
        meta: { title: '专家库', menuPath: true, authCode: 'P11000', menuIcon: 'user', hideInBread: false, openMode: 'normal' },
        children: [{
          path: '/expertManagement/expertLibrary/create',
          name: '/expertManagement/expertLibrary/create',
          component: LibraryEdit,
          meta: { title: '新增专家账号', menuPath: false, authCode: 'P11001', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/expertLibrary/edit',
          name: '/expertManagement/expertLibrary/edit',
          component: LibraryEdit,
          meta: { title: '修改专家账号', menuPath: false, authCode: 'P11003', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/expertLibrary/view',
          name: '/expertManagement/expertLibrary/view',
          component: LibraryView,
          meta: { title: '查看专家账号', menuPath: false, authCode: 'P11002', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/expertLibrary/select',
          name: '/expertManagement/expertLibrary/select',
          component: ExpertLibrarySelect,
          meta: { title: '选择专家账号', menuPath: false, authCode: 'P11001', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        {
          path: '/expertManagement/expertLibrary/upload',
          name: '/expertManagement/expertLibrary/upload',
          component: ExpertLibraryUpload,
          meta: { title: '导入专家账号', menuPath: false, authCode: 'P11001', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        }
        ]
      },
      {
        path: '/expertManagement/reiview',
        name: '/expertManagement/reiview',
        component: ProjectReview,
        meta: { title: '项目评审', menuPath: true, authCode: 'P13000', menuIcon: 'edit', hideInBread: false, openMode: 'normal' },
        children: [{
          path: '/expertManagement/reiview/history',
          name: '/expertManagement/reiview/history',
          component: ProjectReviewHistory,
          meta: { title: '历史评审', menuPath: false, authCode: 'P13000', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        }]
      },
      {
        path: '/expertManagement/base',
        name: '/expertManagement/base',
        component: ExpertBase,
        meta: { title: '专家基础信息维护', menuPath: true, authCode: 'P14000', menuIcon: 'edit', hideInBread: false, openMode: 'normal' }
      }
      ]
    },
    //内容发布
    {
      path: '/cms', name: 'cms', component: contentWrapper,
      meta: { title: '内容管理', menuPath: true, authCode: 'P30000', menuIcon: 'file-text', hideInBread: true },
      children:[
        {
          path: '/cms/knowledge', name: '/cms/knowledge', component: KnowledgeList,
          meta: { title: '知识文库管理', menuPath: true, authCode: 'P32000', menuIcon: 'file-text', hideInBread: false },
          children:[
            {
              path: '/cms/knowledge/create', name: '/cms/knowledge/create', component: KnowledgeCreate,
              meta: { title: '新建知识文献', menuPath: false, authCode: 'P32001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path: '/cms/knowledge/edit/:id', name: '/cms/knowledge/edit', component: KnowledgeEdit,
              meta: { title: '修改知识文献', menuPath: false, authCode: 'P32001', menuIcon: 'file-text', hideInBread: false },
            },{
              path: '/cms/knowledge/:id', name: '/cms/knowledge/details', component: KnowledgeDetail,
              meta: { title: '查看知识文献详情', menuPath: false, authCode: 'P33003', menuIcon: 'file-text', hideInBread: false },
            }
          ]
        },
        {
          path: '/cms/knowledgePublish', name: '/cms/knowledgePublish', component: KnowledgePublishedList,
          meta: { title: '知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
        },
        {
          path: '/cms/notice', name: '/cms/notice', component: NoticeList,
          meta: { title: '通知公告管理', menuPath: true, authCode: 'P31000', menuIcon: 'file-text', hideInBread: false },
          children:[
            {
              path: '/cms/notice/create', name: '/cms/notice/create', component: NoticeCreate,
              meta: { title: '新建通知公告', menuPath: false, authCode: 'P31001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path: '/cms/notice/edit/:id', name: '/cms/notice/edit', component: NoticeEdit,
              meta: { title: '修改通知公告', menuPath: false, authCode: 'P31001', menuIcon: 'file-text', hideInBread: false },
            },{
              path: '/cms/notice/:id', name: '/cms/notice/details', component: NoticeDetail,
              meta: { title: '通知公告详情', menuPath: false, authCode: 'P31005', menuIcon: 'file-text', hideInBread: false },
            }
          ]
        },
        {
          path: '/cms/manual', name: '/cms/manual', component: ManualList,
          meta: { title: '操作手册管理', menuPath: true, authCode: 'P34000', menuIcon: 'file-text', hideInBread: false },
          children: [
            {
              path: '/cms/manual/file-list', name: '/cms/manual/file-list', component: ManualFileList,
              meta: { title: '操作手册列表', menuPath: false, authCode: 'P34000', menuIcon: 'file-text', hideInBread: false },
            },
          ],
        },
        {
          path: '/cms/vote', name: '/cms/vote', component: VoteList,
          meta: { title: '投票管理', menuPath: true, authCode: 'P33000', menuIcon: 'file-text', hideInBread: false },
          children: [
            {
              path: '/cms/vote/edit', name: '/cms/vote/edit', component: VoteEdit,
              meta: { title: '投票详情', menuPath: false, authCode: 'P33001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path: '/cms/vote/result', name: '/cms/vote/result', component: VoteResult,
              meta: { title: '投票结果预览', menuPath: false, authCode: 'P33005', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path: '/cms/vote/view', name: '/cms/vote/view', component: VoteView,
              meta: { title: '投票信息查看', menuPath: false, authCode: 'P33003', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path: '/cms/vote/qr-list', name: '/cms/vote/qr-list', component: VoteQrList,
              meta: { title: '投票二维码列表', menuPath: false, authCode: 'P33000', menuIcon: 'file-text', hideInBread: false },
            },
          ]
        }
      ]
    },
    //范蠡奖评审
    {
      path: '/fljps',
      name: 'fljps',
      component: contentWrapper,
      meta: { title: '范蠡奖评审', menuPath: true, authCode: 'S1002', menuIcon: 'barcode', hideInBread: true },
      children: [
      //wuzihao 业务处室
        {
          path: '/fljps/notf/flaNotf', name: '/fljps/notf/flaNotf',
          meta: { title: '评审管理', menuPath: true, authCode: 'S100201', hideInBread: false, menuIcon: 'sound', openMode: 'spa' },
        },
        {
          path: '/fljps/firsttrial/flaFirstTrial', name: '/fljps/firsttrial/flaFirstTrial',
          meta: { title: '初审管理', menuPath: true, authCode: 'S100203', hideInBread: false, menuIcon: 'sound', openMode: 'spa' },
        },
        {
          path: '/fljps/expert/flaOrgaExpert', name: '/fljps/expert/flaOrgaExpert',
          meta: { title: '组织专家', menuPath: true, authCode: 'S100204', hideInBread: false, menuIcon: 'team', openMode: 'spa' },
        },
        {
          path: '/fljps/reviewShow/flaReviewShow', name: '/fljps/reviewShow/flaReviewShow',
          meta: { title: '评审结果汇总', menuPath: true, authCode: 'S100205', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        //申报单位
        {
          path: '/fljps/reportNote/flaReviewNotf', name: '/fljps/reportNote/flaReviewNotf',
          meta: { title: '评审管理', menuPath: true, authCode: 'S100209', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        {
          path: '/fljps/scitechrep/scitechrep', name: '/fljps/scitechrep/scitechrep',
          meta: { title: '技术类申报', menuPath: true, authCode: 'S100210', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        {
          path: '/fljps/innoteamrep/innoteamrep', name: '/fljps/innoteamrep/innoteamrep',
          meta: { title: '团队类申报', menuPath: true, authCode: 'S100211', hideInBread: false, menuIcon: 'table', openMode: 'spa'},
        },
        {
          path: '/fljps/checkconf/checkconfirmpost', name: '/fljps/checkconf/checkconfirmpost',
          meta: { title: '检查并确认申报', menuPath: true, authCode: 'S100212', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        // huchanglin 专家
        {
          path: '/fljps/review/flaReview', name: '/fljps/review/flaReview',
          meta: { title: '评审管理', menuPath: true, authCode: 'S100208', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
          children:[
            {
              path: '/fljps/flaReportDetail/flaReportDetail/:id', name: '/fljps/flaReportDetail/flaReportDetail',
              meta: { title: '查看成果详情', menuPath: false, authCode: 'S10020304', hideInBread: false , menuIcon: 'table', openMode: 'spa'}
            },
          ]
        },
        //ricozhou 主管单位
        {
          path: '/fljps/recomanage/flaRrua', name: '/fljps/recomanage/flaRrua',
          meta: { title: '申报单位推荐', menuPath: true, authCode: 'S100206', hideInBread: false, menuIcon: 'sound', openMode: 'spa' },
        },
        {
          path: '/fljps/recomanage/flaRecConf', name: '/fljps/recomanage/flaRecConf',
          meta: { title: '推荐材料审查', menuPath: true, authCode: 'S100207', hideInBread: false, menuIcon: 'sound', openMode: 'spa' },
        },
      ]
    },
    //团体标准
    {
      path: '/ttbz',
      name: 'ttbz',
      component: contentWrapper,
      meta: { title: '中国水产学会团体标准管理', menuPath: true, authCode: 'S0201', menuIcon: 'barcode', hideInBread: true },
      children: [
        {
          path: '/ttbz/standardApplyManager/StandardApply', name: '/ttbz/standardApplyManager/StandardApply',
          meta: { title: '立项管理', authCode: 'S020101', menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
        },
        {
          path: '/ttbz/organizationExpert/StandardExpert', name: '/ttbz/organizationExpert/StandardExpert',
          meta: { title: '组织专家', authCode: 'S020107', menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
        },
        {
          path: '/ttbz/projectArgumentation/StandardReview', name: '/ttbz/projectArgumentation/StandardReview',
          meta: { title: '立项论证', authCode: 'S020102', menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ttbz/formalReview/StandardExamine', name: '/ttbz/formalReview/StandardExamine',
          meta: { title: '形式审查',authCode: 'S020104', menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ttbz/letterReviewmanager/letterReview', name: '/ttbz/letterReviewmanager/letterReview',
          meta: { title: '函审管理', authCode: 'S020106',menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' },
          children:[
            {
              path: '/ttbz/organizationExpert/standardExpertDetail', name: '/ttbz/organizationExpert/standardExpertDetail',
              meta: { title: '查看申报内容', menuPath: false, authCode: 'S02010601', hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
            },
            {
              path: '/ttbz/letterReviewmanager/letterReview/addLetterReview', name: '/ttbz/letterReviewmanager/letterReview/addLetterReview',
              meta: { title: '标准申报函审结论录入', menuPath: false, authCode: 'S02010602', hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
            },
          ]
        },
        {
          path: '/ttbz/meetingReview/review', name: '/ttbz/meetingReview/review',
          meta: { title: '会议审查管理', authCode: 'S020105',menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
        },
        {
          path: '/ttbz/standardDeclare/declare', name: '/ttbz/standardDeclare/declare',
          meta: { title: '标准制定管理',  authCode: 'S020103',menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ttbz/letterReviewmanager/letterReview/letterResult', name: '/ttbz/letterReviewmanager/letterReview/letterResult',
          meta: { title: '录入函审结果',  authCode: 'S020108',menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
        },
        {
          path: '/ttbz/reviewform/Reviewconclusion', name: 'Reviewconclusion',
          meta: { title: '复审结论管理', authCode: 'S020111',menuPath: true, hideInBread:false,menuIcon: 'appstore', menuIcon: 'appstore', openMode: 'spa' }
        },
        {
          path: '/ttbz/publicAnnouncement/BulletinAndPublish', name: '/ttbz/publicAnnouncement/BulletinAndPublish',
          meta: { title: '公示发布管理', authCode: 'S020109',menuPath: true, hideInBread:false, menuIcon: 'appstore', openMode: 'spa' }
        },
      ]
    },
    //水生动物防疫系统实验室能力验证
    {
      path: '/ssdw',
      name: 'ssdw',
      component: contentWrapper,
      meta: { title: '水生动物防疫系统实验室能力验证', menuPath: true, authCode: 'S0601', menuIcon: 'barcode', hideInBread: true },
      children: [
        {
          path: '/ssdw/disease/ssdwDisease', name: '/ssdw/disease/ssdwDisease',
          meta: { title: '疾病信息管理', menuPath:true, authCode:'S060101', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/unitInfo/ssdwUnitInfo', name: '/ssdw/unitInfo/ssdwUnitInfo',
          meta: { title: '单位信息管理', menuPath:true, authCode:'S060102', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/plan/ssdwPlan', name: '/ssdw/plan/ssdwPlan',
          meta: { title: '能力验证计划管理', menuPath:true, authCode:'S060103', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/tech/ssdwTechGet', name: '/ssdw/tech/ssdwTechGet',
          meta: { title: '技术方案上报', menuPath:true, authCode:'S060104', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/tech/ssdwTech', name: '/ssdw/tech/ssdwTech',
          meta: { title: '技术方案审批', menuPath:true, authCode:'S060105', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/enroll/ssdwEnrollGet', name: '/ssdw/enroll/ssdwEnrollGet',
          meta: { title: '能力验证计划报名', menuPath:true, authCode:'S060111', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/enroll/ssdwEnroll', name: '/ssdw/enroll/ssdwEnroll',
          meta: { title: '能力验证计划报名初审', menuPath:true, authCode:'S060106', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/enroll/ssdwEnrollReview', name: '/ssdw/enroll/ssdwEnrollReview',
          meta: { title: '能力验证计划报名复审', menuPath:true, authCode:'S060114', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/sample/ssdwSample', name: '/ssdw/sample/ssdwSample',
          meta: { title: '样品管理', menuPath:true, authCode:'S060107', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/sample/ssdwSampleRecive', name: '/ssdw/sample/ssdwSampleRecive',
          meta: { title: '样品接收管理', menuPath:true, authCode:'S060112', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/sample/ssdwSampleVerify', name: '/ssdw/sample/ssdwSampleVerify',
          meta: { title: '验证报告上传', menuPath:true, authCode:'S060108', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/sample/ssdwSampleReport', name: '/ssdw/sample/ssdwSampleReport',
          meta: { title: '验证报告结果判定', menuPath:true, authCode:'S060109', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/report/ssdwReport', name: '/ssdw/report/ssdwReport',
          meta: { title: '总结报告上传', menuPath:true, authCode:'S060110', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/report/ssdwReportDown', name: '/ssdw/report/ssdwReportDown',
          meta: { title: '总结报告下载', menuPath:true, authCode:'S060113', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/mould /ssdwMould', name: '/ssdw/mould/ ssdwMould',
          meta: { title: '模板管理', menuPath:true, authCode:'S060115', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
        {
          path: '/ssdw/nodeConfig/list', name: '/ssdw/nodeConfig/list',
          meta: { title: '流程配置', menuPath:true, authCode:'S060116', hideInBread:false, menuIcon: 'appstore', openMode: 'spa'}
        },
      ]
    },
    //学术会议
    {
      path: '/xshy',
      name: 'xshy',
      component: contentWrapper,
      meta: { title: '中国水产学会学术会议管理', menuPath: true, authCode: 'S1001', menuIcon: 'barcode', hideInBread: true },
      children: [
        {
          path:'/lshy/menber/acmBoardMenber',
          name: '/lshy/menber/acmBoardMenber',
          meta: { title: '理事成员管理', menuPath: true, authCode: 'S100107', hideInBread: false, menuIcon: 'team', openMode: 'spa' },
        },
        {
          path:'/lshy/meeting/acmBoardMeeting',
          name: '/lshy/meeting/acmBoardMeeting',
          meta: { title: '理事会议管理', menuPath: true, authCode: 'S100104', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        {
          path:'/lshy/meeting/acmBoardMeetingIssueStatis',
          name: '/lshy/meeting/acmBoardMeetingIssueStatis',
          meta: { title: '理事议题结果', menuPath: true, authCode: 'S100105', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
        {
          path: '/lshy/meetingMem/acmBoardMeetingIssueVote', name: '/lshy/meetingMem/acmBoardMeetingIssueVote',
          meta: { title: '理事议题投票', menuPath: true, authCode: 'S100112', hideInBread: false, menuIcon: 'table', openMode: 'spa' },
        },
      ]
    },
    //学术会议
    {
      path: '/lshy',
      name: 'lshy',
      component: contentWrapper,
      meta: { title: '中国水产学会理事会议', menuPath: true, authCode: 'S1001', menuIcon: 'barcode', hideInBread: true },
      children: [
        {
          path:'/xshy/release/acmMeetingRelease',name: '/xshy/release/acmMeetingRelease',
          meta: { title: '会议管理', menuPath: true, authCode: 'S100102', hideInBread: false, menuIcon: 'sound', openMode: 'spa'  },
        },
        {
          path: '/xshy/push/acmPushNotf',name: '/xshy/push/acmPushNotf',
          meta: { title: '会议信息推送', menuPath: true, authCode: 'S100103', hideInBread: false, menuIcon: 'bell', openMode: 'spa'  },
        },
        {
          path: '/xshy /pushConfig/acmPushNotfConfig', name: '/xshy /pushConfig/acmPushNotfConfig ',
          meta: { title: '短信配置管理', menuPath: true, authCode: 'S100110', hideInBread: true, menuIcon: 'form' },
        },
        {
          path: '/xshy /pushEmailConfig/acmPushNotfEmailConfig', name: '/xshy /pushEmailConfig/acmPushNotfEmailConfig ',
          meta: { title: '邮件配置管理', menuPath: true, authCode: 'S100111', hideInBread: true, menuIcon: 'team' },
        },
        {
          path: '/xshy/sign/acmMeetingHome', name: '/xshy/sign/acmMeetingHome',
          meta: { title: '会议报名', menuPath: true, authCode: 'S100109', hideInBread: false, menuIcon: 'table', openMode: 'spa'  },
        },
        {
          path: '/xshy/sign/acmMeetingSignSingle', name: '/xshy/sign/acmMeetingSignSingle',
          meta: { title: '报名历史', menuPath: true, authCode: 'S100110', hideInBread: false, menuIcon: 'table', openMode: 'spa'  },
        },
      ]
    },
    //科普教育基地申报管理
    {
      path: '/kpjd',
      name: 'kpjd',
      component: contentWrapper,
      meta: { title: '科普教育基地申报管理', menuPath: true, authCode: 'S0101', menuIcon: 'barcode', hideInBread: true },
      children: [{
        path: '/kpjd/declare/Declare',
        name: '/kpjd/declare/Declare',
        meta: { title: '申报管理', menuPath: true, authCode: 'S010101', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/declare/DeclareReview',
        name: '/kpjd/declare/DeclareReview',
        meta: { title: '申报初审', menuPath: true, authCode: 'S010102', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/declare/Trial',
        name: '/kpjd/declare/Trial',
        meta: { title: '组织专家', menuPath: true, authCode: 'S010103', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/declare/organizationExpert',
        name: '/kpjd/declare/organizationExpert',
        meta: { title: '线上评分', menuPath: true, authCode: 'S010104', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' },
        children:[
          {
            path: '/kpjd/declare/Declare/DeclareInfo',
            name: '/kpjd/declare/Declare/DeclareInfo',
            meta: { title: '查看申请详情', menuPath: false, authCode: 'S01010104', menuIcon: 'appstore', hideInBread: false, openMode: 'spa'}
          },
          {
            path: '/kpjd/declare/organizationExpert/expertAdd',
            name: '/kpjd/declare/organizationExpert/expertAdd',
            meta: { title: '评分录入', menuPath: false, authCode: 'S01010402', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
          }
        ]
      },
      {
        path: '/kpjd/judge/judgeBian',
        name: '/kpjd/judge/judgeBian',
        meta: { title: '颁发牌匾', menuPath: true, authCode: 'S010105', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/declare/Notice',
        name: '/kpjd/declare/Notice',
        meta: { title: '科普教育基地库', menuPath: true, authCode: 'S010106', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/declare/Submission',
        name: '/kpjd/declare/Submission',
        meta: { title: '综合考评', menuPath: true, authCode: 'S010107', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/kpjd/judge/judgeTable',
        name: '/kpjd/judge/judgeTable',
        meta: { title: '评判标准', menuPath: true, authCode: 'S010108', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
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
        path: '/scsd/post/scsdPost/view/:id',
        name: '/scsd/post/scsdPost/view',
        meta: { title: '查看申报信息', menuPath: false, authCode: 'S05010106', hideInBread: false, openMode: 'spa' },
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
        meta: { title: '查看申报记录', menuPath: true, authCode: 'S050108', menuIcon: 'exception', hideInBread: false, openMode: 'spa' }
      },
      {
        path: '/scsd/dateEntry/information',
        name: '/scsd/dateEntry/information',
        meta: { title: '新品种推广管理', menuPath: true, authCode:'S050109', menuIcon: 'cluster', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/selectDateEntry',
        name: '/scsd/selectDateEntry',
        meta: { title: '查看所有新品种推广', menuPath: true, authCode:'S050110', menuIcon: 'cluster', hideInBread: false, openMode: 'spa' },
      },
      {
        path: '/scsd/nodeConfig/list',name: '/scsd/nodeConfig/list',
        meta: { title: '流程配置', menuPath: true, authCode:'S050111', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' },
      }
      ]
    },
    //水产原良种验收
    {
      path: '/scylzc',
      name: 'scylzc',
      component: contentWrapper,
      meta: { title: '水产原良种场验收审定', menuPath: true, authCode: 'S0503', menuIcon: 'barcode', hideInBread: true },
      children: [
        {
          path: '/scylzc/account/list',
          name: '/scylzc/account/list',
          meta: { title: '申报单位管理', menuPath: true, authCode: 'S050307', menuIcon: 'cluster', hideInBread: false, openMode: 'spa' },
        },
        {
          path: '/scylzc/acceptance/list',
          name: '/scylzc/acceptance/list',
          meta: { title: '验收申请填写', menuPath: true, authCode: 'S050301', menuIcon: 'exception', hideInBread: false, openMode: 'spa' },
        },
        {
          path: '/scylzc/afApply/list',
          name: '/scylzc/afApply/list',
          meta: { title: '验收审查管理', menuPath: true, authCode: 'S050302', menuIcon: 'barcode', hideInBread: false, openMode: 'spa'  },
        },
        {
          path: '/scylzc/afReview/list',
          name: '/scylzc/afReview/list',
          meta: { title: '验收初审管理', menuPath: true, authCode: 'S050303', menuIcon: 'exception', hideInBread: false, openMode: 'spa' },
        },
        {
          path: '/scylzc/afOrgaExpert/list',
          name: '/scylzc/afOrgaExpert/list',
          meta: { title: '组织专家评审', menuPath: true, authCode: 'S050304',  menuIcon: 'database', hideInBread: false, openMode: 'spa' }
        },
        {
          path: '/scylzc/afVerification/list',
          name: '/scylzc/afVerification/list',
          meta: { title: '专家评审', menuPath: true, authCode: 'S050305', menuIcon: 'team', hideInBread: false, openMode: 'spa' },
          children: [{
            path: '/scylzc/afVerification/list/check',
            name: '/scylzc/afVerification/list/check',
            meta: { title: '评审', menuPath: false, authCode: 'S05030501', menuIcon: 'appstore', hideInBread: false, openMode: 'normal', openMode: 'spa' }
          },
          {
            path: '/scylzc/afVerification/list/view',
            name: '/scylzc/afVerification/list/view',
            meta: { title: '查看申请', menuPath: false, authCode: 'S05030103', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
          }]
        },
        {
          path: '/scylzc/allApplyInfo/list',
          name: '/scylzc/allApplyInfo/list',
          meta: { title: '查看全部申报信息', menuPath: true, authCode: 'S050306', menuIcon: 'team', hideInBread: false, openMode: 'spa'},
        },
        {
          path: '/scylzc/nodeConfig/list ', name: '/scylzc/nodeConfig/list ',
          meta: { title: '流程配置', menuPath: true, authCode:'S050308', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' },
        }

      ]
    },
    //水产原良种复查
    {
      path: '/ylzcre',
      name: 'ylzcre',
      component: contentWrapper,
      meta: { title: '水产原良种场复查审定', menuPath: true, authCode: 'S0502', menuIcon: 'barcode', hideInBread: true, openMode: 'spa' },
      children: [
        {
          path: '/ylzcre/review/information',
          name: '/ylzcre/review/information',
          meta: { title: '监测数据管理', menuPath: true, authCode: 'S050201', menuIcon: 'exception', hideInBread: false, openMode: 'spa' },
        },
        {
          path: '/ylzcre/acceptance/list',
          name: '/ylzcre/acceptance/list',
          meta: { title: '复查申请填写', menuPath: true, authCode: 'S050202', menuIcon: 'profile', hideInBread: false, openMode: 'spa' },
        },
        {
          path: '/ylzcre/afApply/list',
          name: '/ylzcre/afApply/list',
          meta: { title: '复查申请审查', menuPath: true, authCode: 'S050203', menuIcon: 'barcode', hideInBread: false, openMode: 'spa'},
        },
        {
          path: '/ylzcre/afReview/list',
          name: '/ylzcre/afReview/list',
          meta: { title: '复查申请初审', menuPath: true, authCode: 'S050204', menuIcon: 'exception', hideInBread: false, openMode: 'spa'},
        },
        {
          path: '/ylzcre/afOrgaExpert/list',
          name: '/ylzcre/afOrgaExpert/list',
          meta: { title: '组织专家管理', menuPath: true, authCode: 'S050205', menuIcon: 'database', hideInBread: false, openMode: 'spa' }
        },
        {
          path: '/ylzcre/afVerification/list',
          name: '/ylzcre/afVerification/list',
          meta: { title: '专家评审', menuPath: true, authCode: 'S050206', menuIcon: 'team', hideInBread: false, openMode: 'spa'},
          children: [
            {
              path: '/ylzcre/afVerification/list/check',
              name: '/ylzcre/afVerification/list/check',
              meta: { title: '评审', menuPath: false, authCode: 'S05020601', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' }
            },
            {
              path: '/ylzcre/afVerification/list/view',
              name: '/ylzcre/afVerification/list/view',
              meta: { title: '查看申请', menuPath: false, authCode: 'S05020203', menuIcon: 'appstore', hideInBread: false, openMode: 'spa'}
            }
          ]
        },
        {
          path: '/ylzcre/allApplyInfo/list',
          name: '/ylzcre/allApplyInfo/list',
          meta: { title: '查看全部申报信息', menuPath: true, authCode: 'S050207', menuIcon: 'team', hideInBread: false, openMode: 'spa' }
        }
      ]
    },
    //质量追述
    {
      path: '/zlzs',
      name: 'zlzs',
      component: contentWrapper,
      meta: { title: '质量追溯', menuPath: true, authCode: 'S0703', menuIcon: 'barcode', hideInBread: true, openMode: 'spa' },
      children: [{
        path: '/zlzs/company/zlzsCompany',
        name: '/zlzs/company/zlzsCompany',
        meta: { title: '企业信息管理', menuPath: true, authCode: 'S070301', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, {
        path: '/zlzs/seedingout/zlzsSeedingout',
        name: '/zlzs/seedingout/zlzsSeedingout',
        meta: { title: '苗种投放管理', menuPath: true, authCode: 'S070302', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, {
        path: '/zlzs/fodderout/zlzsFodderout',
        name: '/zlzs/fodderout/zlzsFodderout',
        meta: { title: '饲料投入管理', menuPath: true, authCode: 'S070303', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, {
        path: '/zlzs/drugout/zlzsDrugout',
        name: '/zlzs/drugout/zlzsDrugout',
        meta: { title: '渔药投入管理', menuPath: true, authCode: 'S070304', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, {
        path: '/zlzs/sale/zlzsSale',
        name: '/zlzs/sale/zlzsSale',
        meta: { title: '销售信息管理', menuPath: true, authCode: 'S070305', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, {
        path: '/zlzs/review/zlzsReview',
        name: '/zlzs/review/zlzsReview',
        meta: { title: '追溯信息管理', menuPath: true, authCode: 'S070306', hideInBread: false, menuIcon: 'appstore', openMode: 'spa' }
      }, ]
    },
    //渔业兽医
    {
      path: '/yysygl',
      name: 'yysygl',
      component: contentWrapper,
      meta: { title: '渔业兽医', menuPath: true, authCode: 'S0602', menuIcon: 'barcode', hideInBread: true, openMode: 'spa' },
      children: [{
        path: '/yysygl/secrchpage/list', name: '/yysygl/secrchpage/list',
        meta: { title: '兽医查询', menuPath: true, authCode: 'S060201', hideInBread: true, menuIcon: 'appstore', openMode: 'spa'  },
      },
      {
        path: '/yysygl/yyVeternary/list', name: '/yysygl/yyVeternary/list',
        meta: { title: '渔业乡村兽医', menuPath: true, authCode: 'S060202', hideInBread: true, menuIcon: 'appstore', openMode: 'spa'  },
      },
      {
        path: '/yysygl/official/list', name: '/yysygl/official/list',
        meta: { title: '渔业官方兽医', menuPath: true, authCode: 'S060203', hideInBread: true, menuIcon: 'appstore', openMode: 'spa'  },
      },
      {
        path: '/yysygl/practising/list', name: '/yysygl/practising/list',
        meta: { title: '渔业执业兽医', menuPath: true, authCode: 'S060204', hideInBread: true, menuIcon: 'appstore', openMode: 'spa'  },
      },]
    },
    //智慧报表管理
    {
      path: '/bbgl',
      name: 'bbgl',
      component: contentWrapper,
      meta: { title: '智慧报表管理', menuPath: true, authCode: 'S0804', menuIcon: 'barcode', hideInBread: true, openMode: 'spa' },
      children: [{
        path: '/bbgl/report/rmReportInfo',
        name: '/bbgl/report/rmReportInfo',
        meta: { title: '报表文件管理', menuPath: true, authCode: 'S080401', menuIcon: 'appstore', hideInBread: false, openMode: 'spa' },
      }]
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
    },
    {
      path: '/SCZN/:sysname',
      name: 'SCZN',
      component: TipsOutsite,
      meta: { title: '“水产智能”健康养殖生产与大数据管理系统', menuPath: true, menuIcon: 'experiment', authCode: 'SCZN', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/XXYY/:sysname',
      name: 'XXYY',
      component: TipsOutsite,
      meta: { title: '休闲渔业品牌管理系统', menuPath: true, menuIcon: 'experiment', authCode: 'XXYY', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/HYMC/:sysname',
      name: 'HYMC',
      component: TipsOutsite,
      meta: { title: '海洋牧场', menuPath: true, menuIcon: 'experiment', authCode: 'HYMC', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/TGTX/:sysname',
      name: 'TGTX',
      component: TipsOutsite,
      meta: { title: '水产推广体系', menuPath: true, menuIcon: 'experiment', authCode: 'TGTX', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/SCJG/:sysname',
      name: 'SCJG',
      component: TipsOutsite,
      meta: { title: '水产价格采集', menuPath: true, menuIcon: 'experiment', authCode: 'SCJG', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/YMSZ/:sysname',
      name: 'YMSZ',
      component: TipsOutsite,
      meta: { title: '渔民收支', menuPath: true, menuIcon: 'experiment', authCode: 'YMSZ', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/YQJC/:sysname',
      name: 'YQJC',
      component: TipsOutsite,
      meta: { title: '渔情监测', menuPath: true, menuIcon: 'experiment', authCode: 'YQJC', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/NLBL/:sysname',
      name: 'NLBL',
      component: TipsOutsite,
      meta: { title: '内陆捕捞', menuPath: true, menuIcon: 'experiment', authCode: 'NLBL', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/ZYYH/:sysname',
      name: 'ZYYH',
      component: TipsOutsite,
      meta: { title: '水生物资源养护信息采集系统 ', menuPath: true, menuIcon: 'experiment', authCode: 'ZYYH', hideInBread: false, openMode: 'outsite' }
    },
    {
      path: '/YYTJ/:sysname',
      name: 'YYTJ',
      component: TipsOutsite,
      meta: { title: '全国渔业统计', menuPath: true, menuIcon: 'experiment', authCode: 'YYTJ', hideInBread: false, openMode: 'outsite' }
    }
  ],
},
{
  path: '/login', name: 'login', component: LoginPage,
  meta: { title: '登录' },
},
{
  path: '/register', name: 'register', component: RegisterPage,
  meta: { title: '注册' },
},
{
  path: '/bindPhone', name: 'bindPhone', component: BindPhone,
  meta: { title: '选择系统绑定手机号', },
},
{
  path: '/oldSysLogout', name: 'oldSysLogout', component: OldSysLogout,
  meta: { title: '老系统安全登出', },
},
{
  path: '/outerNetworkerr', name: 'outerNetworkerr', component: TipsNetworkErr,
  meta: { title: '网络错误', },
},
{
  path: '/error-page', name: 'error-page', component: ErrorPage,
  meta: { title: '404', },
},
{
  path: '/upperLimitErr', name: 'upperLimitErr', component: TipsUpperLimitErr,
  meta: { title: '访问频繁', },
},
// 匿名浏览知识文库
{ path: '/cms/knowledgeAnonymous', name: '/cms/knowledgeAnonymous', component: KnowledgePublishedAnonymousList,
  meta: { title: '知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path: '/cms/knowledgePublish/:id', name: '/cms/knowledgePublish/view', component: KnowledgeView,
  meta: { title: '浏览知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 浏览通知公告
{ path: '/cms/noticePublish', name: '/cms/noticePublish', component: NoticePublishedList,
  meta: { title: '通知公告', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path: '/cms/noticePublish/:id', name: '/cms/noticePublish/view', component: NoticeView,
  meta: { title: '浏览通知公告', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 浏览操作手册
{ path: '/cms/manualPublish', name: '/cms/manualPublish', component: ManualView,
  meta: { title: '操作手册', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 渔业兽医
{ path: '/veterinary', name: '/veterinary', component: VeterinaryList,
  meta: { title: '渔业兽医', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path: '/veterinary/view', name: '/veterinary/view', component: VeterinaryView,
  meta: { title: '渔业兽医', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
]

export const routes = [
  ...appRoutes,
]
