const contentWrapper = () => import('@/components/Layout/content-wrapper')
const main = () => import('@/components/Layout/main')
const TipsUpperLimitErr = () => import('@/views/tips/upperlimit')
const TipsNetworkErr = () => import('@/views/tips/network')
const TipsInnerNetworkErr = () => import('@/views/tips/innerNetwork')
const TipsNoAuth = () => import('@/views/tips/auth')
const ErrorPage = () => import('@/views/tips/error-page')
const HomePage = () => import('@/views/home')
const LoginPage = () => import('@/views/login/login')
const RegisterPage = () => import('@/views/login/register')
const OldSysLogout = () => import('@/views/login/oldSysLogout')
const BindPhone = () => import('@/views/login/bindPhone')
const BindTemporarayAccount = () =>
  import('@/views/login/bindTemporarayAccount')
// 个人信息
const PersonCenter = () => import('@/views/personal/person-center')
const PersonTransferDatas = () => import('@/views/personal/transferDatas/list')
// 系统管理
const SysBasicInfo = () =>
  import('@/views/systemManagement/basicInformation/index')
// 角色管理
const RoleManagement = () => import('@/views/systemManagement/role/list')
const RoleCreate = () => import('@/views/systemManagement/role/add')
// 权限功能点配置管理
const RolePermissionConfig = () =>
  import('@/views/systemManagement/permissionConfig/index')
const RolePermissionPoint = () =>
  import('@/views/systemManagement/permissionConfig/point')
const RolePermissionAddPoint = () =>
  import('@/views/systemManagement/permissionConfig/addPoint')
const RolePermissionAddPointBatch = () =>
  import('@/views/systemManagement/permissionConfig/addPointBatch')
const RolePermissionEditPoint = () =>
  import('@/views/systemManagement/permissionConfig/editPoint')
// 管理员管理
const AdministratorManagement = () =>
  import('@/views/systemManagement/administrator/index')
const PendingView = () =>
  import('@/views/systemManagement/administrator/pending-view')
const Distribution = () =>
  import('@/views/systemManagement/administrator/distribution')
const CreateNewUser = () =>
  import('@/views/systemManagement/administrator/new-user-create')
const NewUserView = () =>
  import('@/views/systemManagement/administrator/new-user-view')
// 专家管理人员
const LibraryEdit = () =>
  import('@/views/expertManagement/components/libraryEdit') // 人才库、专家库、专家个人信息的新增及修改共用组件
const demo = () => import('@/views/demo/use-ueditor')
const ExtractExample = () => import('@/components/ActiveExtract/example')
// 内容管理-知识文库
const KnowledgeList = () => import('@/views/cms/knowledge/list')
const KnowledgeCreate = () => import('@/views/cms/knowledge/create')
const KnowledgeEdit = () => import('@/views/cms/knowledge/edit')
const KnowledgeDetail = () => import('@/views/cms/knowledge/details')
const KnowledgePublishedList = () =>
  import('@/views/cms/knowledgePublish/authList')
const KnowledgePublishedAnonymousList = () =>
  import('@/views/cms/knowledgePublish/anonymousList')
const KnowledgeView = () => import('@/views/cms/knowledgePublish/view')
// 内容管理-通知公告
const NoticeList = () => import('@/views/cms/notice/list')
const NoticeCreate = () => import('@/views/cms/notice/create')
const NoticeEdit = () => import('@/views/cms/notice/edit')
const NoticeDetail = () => import('@/views/cms/notice/detail')
const NoticePublishedList = () => import('@/views/cms/noticePublish/list')
const NoticeView = () => import('@/views/cms/noticePublish/view')
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
 *               outsite 新开标签页打开，此打开方式将不嵌套layout。对应读取的跳转链接在数据库配置中。对象键值名需与router.name、router.meta.authCode保持一致
 */
const appRoutes = [
  {
    path     : '/',
    name     : 'Layout',
    redirect : '/login',
    component: main,
    children : [
      {
        path     : '/home',
        name     : 'home',
        component: HomePage,
        meta     : { title: '首页' }
      },
      {
        path     : '/demo',
        name     : 'demo',
        component: demo,
        meta     : { title: 'demo' }
      },
      {
        path     : '/home/homeVeterinaryList',
        name     : 'homeVeterinaryList',
        component: VeterinaryList,
        meta     : { title: '兽医' }
      },
      {
        path     : '/home/veterinaryView',
        name     : 'homeVeterinaryView',
        component: VeterinaryView,
        meta     : { title: '数据服务' }
      },
      {
        path     : '/noauth',
        name     : 'noautherr',
        component: TipsNoAuth,
        meta     : { title: '没有权限' }
      },
      {
        path     : '/innerNetworkerr',
        name     : 'innerNetworkerr',
        component: TipsInnerNetworkErr,
        meta     : { title: '系统异常' }
      },
      {
        path     : '/person',
        name     : 'person',
        component: PersonCenter,
        meta     : { title: '账户信息' },
        children : [
          {
            path     : '/person/transferDatas',
            name     : '/person/transferDatas',
            component: PersonTransferDatas,
            meta     : { title: '转移申报数据' }
          }
        ]
      },
      {
        path     : '/person/expert',
        name     : '/person/expert',
        component: LibraryEdit,
        meta     : { title: '专家个人信息维护' }
      },
      // 系统管理
      {
        path     : '/systemManagement',
        name     : 'systemManagement',
        component: contentWrapper,
        meta     : {
          title      : '系统管理',
          menuPath   : true,
          authCode   : 'P00000',
          menuIcon   : 'setting',
          hideInBread: true
        },
        children: [
          //专家抽取 样例
          {
            path     : '/systemManagement/extractExample',
            name     : '/systemManagement/extractExample',
            component: ExtractExample,
            meta     : {
              title      : '专家抽取',
              menuPath   : false,
              authCode   : 'super',
              menuIcon   : 'user',
              hideInBread: false,
              openMode   : 'normal'
            }
          },
          //角色权限配置
          {
            path     : '/systemManagement/permissionConfig',
            name     : '/systemManagement/permissionConfig',
            component: RolePermissionConfig,
            meta     : {
              title      : '角色权限配置',
              menuPath   : true,
              authCode   : 'super',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: [
              {
                path     : '/systemManagement/permissionConfig/point',
                name     : '/systemManagement/permissionConfig/point',
                component: RolePermissionPoint,
                meta     : {
                  title      : '功能点管理',
                  menuPath   : false,
                  authCode   : 'super',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                },
                children: [
                  {
                    path     : '/systemManagement/permissionConfig/point/add',
                    name     : '/systemManagement/permissionConfig/point/add',
                    component: RolePermissionAddPoint,
                    meta     : {
                      title      : '添加功能点',
                      menuPath   : false,
                      authCode   : 'super',
                      menuIcon   : 'cluster',
                      hideInBread: false,
                      openMode   : 'normal'
                    }
                  },
                  {
                    path     : '/systemManagement/permissionConfig/point/addBatch',
                    name     : '/systemManagement/permissionConfig/point/addBatch',
                    component: RolePermissionAddPointBatch,
                    meta     : {
                      title      : '批量添加功能点',
                      menuPath   : false,
                      authCode   : 'super',
                      menuIcon   : 'cluster',
                      hideInBread: false,
                      openMode   : 'normal'
                    }
                  },
                  {
                    path     : '/systemManagement/permissionConfig/point/edit',
                    name     : '/systemManagement/permissionConfig/point/edit',
                    component: RolePermissionEditPoint,
                    meta     : {
                      title      : '编辑功能点',
                      menuPath   : false,
                      authCode   : 'super',
                      menuIcon   : 'cluster',
                      hideInBread: false,
                      openMode   : 'normal'
                    }
                  }
                ]
              }
            ]
          },
          // RoleManagement角色管理
          {
            path     : '/systemManagement/role',
            name     : '/systemManagement/role',
            component: RoleManagement,
            meta     : {
              title      : '角色管理',
              menuPath   : true,
              authCode   : 'P02000',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: [
              {
                path     : '/systemManagement/role/create',
                name     : '/systemManagement/role/create',
                component: RoleCreate,
                meta     : {
                  title      : '角色创建',
                  menuPath   : false,
                  authCode   : 'P02001',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/role/edit',
                name     : '/systemManagement/role/edit',
                component: RoleCreate,
                meta     : {
                  title      : '角色修改',
                  menuPath   : false,
                  authCode   : 'P02003',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/role/view',
                name     : '/systemManagement/role/view',
                component: RoleCreate,
                meta     : {
                  title      : '角色查看',
                  menuPath   : false,
                  authCode   : 'P02002',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              }
            ]
          },
          // AdministratorManagement管理员管理
          {
            path     : '/systemManagement/administrator',
            name     : '/systemManagement/administrator',
            component: AdministratorManagement,
            meta     : {
              title      : '用户管理',
              menuPath   : true,
              authCode   : 'P03000',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: [
              {
                path     : '/systemManagement/administrator/createNewUser',
                name     : '/systemManagement/administrator/createNewUser',
                component: CreateNewUser,
                meta     : {
                  title      : '新增用户信息',
                  menuPath   : false,
                  authCode   : 'P03303',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/administrator/editNewUser',
                name     : '/systemManagement/administrator/editNewUser',
                component: CreateNewUser,
                meta     : {
                  title      : '账户信息修改',
                  menuPath   : false,
                  authCode   : 'P03302',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/administrator/edit',
                name     : '/systemManagement/administrator/edit',
                component: LibraryEdit,
                meta     : {
                  title      : '人员信息修改',
                  menuPath   : false,
                  authCode   : 'P11003',
                  menuIcon   : 'user',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/administrator/newUserView',
                name     : '/systemManagement/administrator/newUserView',
                component: NewUserView,
                meta     : {
                  title      : '查看新用户信息',
                  menuPath   : false,
                  authCode   : 'P03301',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/administrator/pendingView',
                name     : '/systemManagement/administrator/pendingView',
                component: PendingView,
                meta     : {
                  title      : '待分配权限查看',
                  menuPath   : false,
                  authCode   : 'P03101',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              },
              {
                path     : '/systemManagement/administrator/distribution',
                name     : '/systemManagement/administrator/distribution',
                component: Distribution,
                meta     : {
                  title      : '权限分配',
                  menuPath   : false,
                  authCode   : 'P03102',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                }
              }
            ]
          },
          // 公共基础信息维护
          {
            path     : '/systemManagement/basic',
            name     : '/systemManagement/basic',
            component: SysBasicInfo,
            meta     : {
              title      : '基础信息维护',
              menuPath   : true,
              authCode   : 'P04000',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: []
          }
        ]
      },
      //内容发布
      {
        path     : '/cms',
        name     : 'cms',
        component: contentWrapper,
        meta     : {
          title      : '内容管理',
          menuPath   : true,
          authCode   : 'P30000',
          menuIcon   : 'file-text',
          hideInBread: true
        },
        children: [
          {
            path     : '/cms/knowledge',
            name     : '/cms/knowledge',
            component: KnowledgeList,
            meta     : {
              title      : '知识文库管理',
              menuPath   : true,
              authCode   : 'P32000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/knowledge/create',
                name     : '/cms/knowledge/create',
                component: KnowledgeCreate,
                meta     : {
                  title      : '新建知识文献',
                  menuPath   : false,
                  authCode   : 'P32001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/knowledge/edit/:id',
                name     : '/cms/knowledge/edit',
                component: KnowledgeEdit,
                meta     : {
                  title      : '修改知识文献',
                  menuPath   : false,
                  authCode   : 'P32001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/knowledge/:id',
                name     : '/cms/knowledge/details',
                component: KnowledgeDetail,
                meta     : {
                  title      : '查看知识文献详情',
                  menuPath   : false,
                  authCode   : 'P33003',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          },
          {
            path     : '/cms/knowledgePublish',
            name     : '/cms/knowledgePublish',
            component: KnowledgePublishedList,
            meta     : {
              title      : '知识文献',
              menuPath   : false,
              menuIcon   : 'file-text',
              hideInBread: false
            }
          },
          {
            path     : '/cms/notice',
            name     : '/cms/notice',
            component: NoticeList,
            meta     : {
              title      : '通知公告管理',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/notice/create',
                name     : '/cms/notice/create',
                component: NoticeCreate,
                meta     : {
                  title      : '新建通知公告',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/notice/edit/:id',
                name     : '/cms/notice/edit',
                component: NoticeEdit,
                meta     : {
                  title      : '修改通知公告',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/notice/:id',
                name     : '/cms/notice/details',
                component: NoticeDetail,
                meta     : {
                  title      : '通知公告详情',
                  menuPath   : false,
                  authCode   : 'P31005',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          },
          {
            path     : '/cms/manual',
            name     : '/cms/manual',
            component: ManualList,
            meta     : {
              title      : '操作手册管理',
              menuPath   : true,
              authCode   : 'P34000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/manual/file-list',
                name     : '/cms/manual/file-list',
                component: ManualFileList,
                meta     : {
                  title      : '操作手册列表',
                  menuPath   : false,
                  authCode   : 'P34000',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          },
          {
            path     : '/cms/vote',
            name     : '/cms/vote',
            component: VoteList,
            meta     : {
              title      : '投票管理',
              menuPath   : true,
              authCode   : 'P33000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/vote/edit',
                name     : '/cms/vote/edit',
                component: VoteEdit,
                meta     : {
                  title      : '投票详情',
                  menuPath   : false,
                  authCode   : 'P33001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/vote/result',
                name     : '/cms/vote/result',
                component: VoteResult,
                meta     : {
                  title      : '投票结果预览',
                  menuPath   : false,
                  authCode   : 'P33005',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/vote/view',
                name     : '/cms/vote/view',
                component: VoteView,
                meta     : {
                  title      : '投票信息查看',
                  menuPath   : false,
                  authCode   : 'P33003',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/vote/qr-list',
                name     : '/cms/vote/qr-list',
                component: VoteQrList,
                meta     : {
                  title      : '投票二维码列表',
                  menuPath   : false,
                  authCode   : 'P33000',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path     : '/login',
    name     : 'login',
    component: LoginPage,
    meta     : { title: '登录' }
  },
  {
    path     : '/register',
    name     : 'register',
    component: RegisterPage,
    meta     : { title: '注册' }
  },
  {
    path     : '/bindPhone',
    name     : 'bindPhone',
    component: BindPhone,
    meta     : { title: '选择系统绑定手机号' }
  },
  {
    path     : '/bindTemporarayAccount',
    name     : 'bindTemporarayAccount',
    component: BindTemporarayAccount,
    meta     : { title: '选择系统绑定手机号' }
  },
  {
    path     : '/oldSysLogout',
    name     : 'oldSysLogout',
    component: OldSysLogout,
    meta     : { title: '老系统安全登出' }
  },
  {
    path     : '/networkerr',
    name     : 'networkerr',
    component: TipsNetworkErr,
    meta     : { title: '网络错误' }
  },
  {
    path     : '/error-page',
    name     : 'error-page',
    component: ErrorPage,
    meta     : { title: '404' }
  },
  {
    path     : '/upperLimitErr',
    name     : 'upperLimitErr',
    component: TipsUpperLimitErr,
    meta     : { title: '访问频繁' }
  },
  // 匿名浏览知识文库
  {
    path     : '/cms/knowledgeAnonymous',
    name     : '/cms/knowledgeAnonymous',
    component: KnowledgePublishedAnonymousList,
    meta     : {
      title      : '知识文献',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  {
    path     : '/cms/knowledgePublish/:id',
    name     : '/cms/knowledgePublish/view',
    component: KnowledgeView,
    meta     : {
      title      : '浏览知识文献',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  // 浏览通知公告
  {
    path     : '/cms/noticePublish',
    name     : '/cms/noticePublish',
    component: NoticePublishedList,
    meta     : {
      title      : '通知公告',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  {
    path     : '/cms/noticePublish/:id',
    name     : '/cms/noticePublish/view',
    component: NoticeView,
    meta     : {
      title      : '浏览通知公告',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  // 浏览操作手册
  {
    path     : '/cms/manualPublish',
    name     : '/cms/manualPublish',
    component: ManualView,
    meta     : {
      title      : '操作手册',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  // 渔业兽医
  {
    path     : '/veterinary',
    name     : '/veterinary',
    component: VeterinaryList,
    meta     : {
      title      : '渔业兽医',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  },
  {
    path     : '/veterinary/view',
    name     : '/veterinary/view',
    component: VeterinaryView,
    meta     : {
      title      : '渔业兽医',
      menuPath   : false,
      menuIcon   : 'file-text',
      hideInBread: false
    }
  }
]

export const routes = [ ...appRoutes ]
