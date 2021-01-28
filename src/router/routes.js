const contentWrapper = () => import('@/components/Layout/content-wrapper')
const main = () => import('@/components/Layout/main')
const TipsUpperLimitErr = () => import('@/views/tips/upperlimit')
const TipsNetworkErr = () => import('@/views/tips/network')
const TipsInnerNetworkErr = () => import('@/views/tips/innerNetwork')
const TipsNoAuth = () => import('@/views/tips/auth')
const ErrorPage = () => import('@/views/tips/error-page')
const HomeFeature = () =>
  import('@/views/frontPublic/views/homePage/views/homeFeature')
const HomePage = () => import('@/views/home')
const Home = () => import('@/views/frontPublic/views/homePage/views/home')
const RegisterPage = () => import('@/views/login/register')
const OldSysLogout = () => import('@/views/login/oldSysLogout')
const BindPhone = () => import('@/views/login/bindPhone')
const BindTemporarayAccount = () =>
  import('@/views/login/bindTemporarayAccount')
// 个人信息
const PersonCenter = () => import('@/views/personal/person-center')
const UserChange = () => import('@/views/personal/user-change')
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
const ExtractExample = () => import('@/components/ActiveExtract/example')
// 首页
//TODO
//脚本维护
const scriptMaintenance = () => import('@/views/scrpitMaintenance/index')
const scriptConfigure = () => import('@/views/scrpitMaintenance/scriptConfigure')
const jobConfigure = () => import('@/views/jobMaintenance/jobConfigure')
//作业维护
const jobMaintenance = () => import('@/views/jobMaintenance/index')
//血缘分析
const relationshipAnalysis = () => import('@/views/relationshipAnalysis/index')
//数据源配置
const dataSourceConfigure = () => import('@/views/dataSourceConfigure/index')
//ETL配置
const etlConfigure = () => import('@/views/etlConfigure/index')
//任务查询
const taskQuery = () => import('@/views/taskQuery/index')

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
    path: '*',
    name: 'Layout',
    // redirect : '/login',
    component: main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: {title: '首页'}
      },

      {
        path: '/noauth',
        name: 'noautherr',
        component: TipsNoAuth,
        meta: {title: '没有权限'}
      },
      {
        path: '/innerNetworkerr',
        name: 'innerNetworkerr',
        component: TipsInnerNetworkErr,
        meta: {title: '系统异常'}
      },
      {
        path: '/person',
        name: 'person',
        component: PersonCenter,
        meta: {title: '账户信息'},
        children: [
          {
            path: '/person/transferDatas',
            name: '/person/transferDatas',
            component: PersonTransferDatas,
            meta: {title: '转移申报数据'}
          },//
          {
            path: '/person/userChange',
            name: '/person/userChange',
            component: UserChange,
            meta: {title: '账户基本信息修改'}
          },
        ]
      },
      {
        path: '/person/expert',
        name: '/person/expert',
        component: LibraryEdit,
        meta: {title: '专家个人信息维护'}
      },
      // 系统管理
      {
        path: '/systemManagement',
        name: 'systemManagement',
        component: contentWrapper,
        meta: {
          title: '系统管理',
          menuPath: true,
          authCode: 'P00000',
          menuIcon: 'setting',
          hideInBread: true
        },
        children: [
          //专家抽取 样例
          {
            path: '/systemManagement/extractExample',
            name: '/systemManagement/extractExample',
            component: ExtractExample,
            meta: {
              title: '专家抽取',
              menuPath: false,
              authCode: 'super',
              menuIcon: 'user',
              hideInBread: false,
              openMode: 'normal'
            }
          },
          //角色权限配置
          {
            path: '/systemManagement/permissionConfig',
            name: '/systemManagement/permissionConfig',
            component: RolePermissionConfig,
            meta: {
              title: '角色权限配置',
              menuPath: true,
              authCode: 'super',
              menuIcon: 'cluster',
              hideInBread: false,
              openMode: 'normal'
            },
            children: [
              {
                path: '/systemManagement/permissionConfig/point',
                name: '/systemManagement/permissionConfig/point',
                component: RolePermissionPoint,
                meta: {
                  title: '功能点管理',
                  menuPath: false,
                  authCode: 'super',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                },
                children: [
                  {
                    path: '/systemManagement/permissionConfig/point/add',
                    name: '/systemManagement/permissionConfig/point/add',
                    component: RolePermissionAddPoint,
                    meta: {
                      title: '添加功能点',
                      menuPath: false,
                      authCode: 'super',
                      menuIcon: 'cluster',
                      hideInBread: false,
                      openMode: 'normal'
                    }
                  },
                  {
                    path: '/systemManagement/permissionConfig/point/addBatch',
                    name: '/systemManagement/permissionConfig/point/addBatch',
                    component: RolePermissionAddPointBatch,
                    meta: {
                      title: '批量添加功能点',
                      menuPath: false,
                      authCode: 'super',
                      menuIcon: 'cluster',
                      hideInBread: false,
                      openMode: 'normal'
                    }
                  },
                  {
                    path: '/systemManagement/permissionConfig/point/edit',
                    name: '/systemManagement/permissionConfig/point/edit',
                    component: RolePermissionEditPoint,
                    meta: {
                      title: '编辑功能点',
                      menuPath: false,
                      authCode: 'super',
                      menuIcon: 'cluster',
                      hideInBread: false,
                      openMode: 'normal'
                    }
                  }
                ]
              }
            ]
          },
          // RoleManagement角色管理
          {
            path: '/systemManagement/role',
            name: '/systemManagement/role',
            component: RoleManagement,
            meta: {
              title: '角色管理',
              menuPath: true,
              authCode: 'P02000',
              menuIcon: 'cluster',
              hideInBread: false,
              openMode: 'normal'
            },
            children: [
              {
                path: '/systemManagement/role/create',
                name: '/systemManagement/role/create',
                component: RoleCreate,
                meta: {
                  title: '角色创建',
                  menuPath: false,
                  authCode: 'P02001',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/role/edit',
                name: '/systemManagement/role/edit',
                component: RoleCreate,
                meta: {
                  title: '角色修改',
                  menuPath: false,
                  authCode: 'P02003',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/role/view',
                name: '/systemManagement/role/view',
                component: RoleCreate,
                meta: {
                  title: '角色查看',
                  menuPath: false,
                  authCode: 'P02002',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              }
            ]
          },
          // AdministratorManagement管理员管理
          {
            path: '/systemManagement/administrator',
            name: '/systemManagement/administrator',
            component: AdministratorManagement,
            meta: {
              title: '用户管理',
              menuPath: true,
              authCode: 'P03000',
              menuIcon: 'cluster',
              hideInBread: false,
              openMode: 'normal'
            },
            children: [
              {
                path: '/systemManagement/administrator/createNewUser',
                name: '/systemManagement/administrator/createNewUser',
                component: CreateNewUser,
                meta: {
                  title: '新增用户信息',
                  menuPath: false,
                  authCode: 'P03303',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/administrator/editNewUser',
                name: '/systemManagement/administrator/editNewUser',
                component: CreateNewUser,
                meta: {
                  title: '账户信息修改',
                  menuPath: false,
                  authCode: 'P03302',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/administrator/edit',
                name: '/systemManagement/administrator/edit',
                component: LibraryEdit,
                meta: {
                  title: '人员信息修改',
                  menuPath: false,
                  authCode: 'P11003',
                  menuIcon: 'user',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/administrator/newUserView',
                name: '/systemManagement/administrator/newUserView',
                component: NewUserView,
                meta: {
                  title: '查看新用户信息',
                  menuPath: false,
                  authCode: 'P03301',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/administrator/pendingView',
                name: '/systemManagement/administrator/pendingView',
                component: PendingView,
                meta: {
                  title: '待分配权限查看',
                  menuPath: false,
                  authCode: 'P03101',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              },
              {
                path: '/systemManagement/administrator/distribution',
                name: '/systemManagement/administrator/distribution',
                component: Distribution,
                meta: {
                  title: '权限分配',
                  menuPath: false,
                  authCode: 'P03102',
                  menuIcon: 'cluster',
                  hideInBread: false,
                  openMode: 'normal'
                }
              }
            ]
          },
          // 公共基础信息维护
          {
            path: '/systemManagement/basic',
            name: '/systemManagement/basic',
            component: SysBasicInfo,
            meta: {
              title: '基础信息维护',
              menuPath: true,
              authCode: 'P04000',
              menuIcon: 'cluster',
              hideInBread: false,
              openMode: 'normal'
            },
            children: []
          },
          // 操作日志
          {
            path: '/systemManagement/operlog',
            name: '/systemManagement/operlog',
            component: () =>
              import ('@/views/systemManagement/operlog/index'),
            meta: {
              title: '操作日志',
              menuPath: true,
              authCode: 'P05000',
              menuIcon: 'cluster',
              hideInBread: false,
              openMode: 'normal'
            },
            children: [{
              path: '/systemManagement/operlog/particulars',
              name: '/systemManagement/operlog/particulars',
              component: () =>
                import ('@/views/systemManagement/operlog/particulars'),
              meta: {
                title: '查看日志详情',
                menuPath: false,
                authCode: 'P05001',
                menuIcon: 'cluster',
                hideInBread: false,
                openMode: 'normal'
              }
            }]
          }
        ]
      },
      {
        path: '/homepage',
        name: '/homepage',
        component: HomePage,
        meta: {
          title: '首页',
          menuPath: true,
          menuIcon: 'home',
          hideInBread: true
        }
      },
      {
        path: '/scriptMaintenance',
        name: '/scriptMaintenance',
        component: scriptMaintenance,
        meta: {
          title: '脚本维护',
          menuPath: true,
          menuIcon: 'setting',
          hideInBread: false,
          openMode: 'normal',
        },
        children: [
          {
            path: '/scriptMaintenance/scriptConfigure',
            name: '/scriptMaintenance/scriptConfigure',
            component: scriptConfigure,
            meta: {
              title: '脚本配置',
              menuPath: false,
              hideInBread: false,
              openMode: 'normal',
            }
          },
        ]
      },

      {
        path: '/jobMaintenance',
        name: '/jobMaintenance',
        component: jobMaintenance,
        meta: {
          title: '作业维护',
          menuPath: true,
          menuIcon: 'build',
          hideInBread: true
        },
        children: [
          {
            path: '/jobMaintenance/jobConfigure',
            name: '/jobMaintenance/jobConfigure',
            component: jobConfigure,
            meta: {
              title: '脚本配置',
              menuPath: false,
              hideInBread: false,
              openMode: 'normal',
            }
          },
        ]
      },
      {
        path: '/relationshipAnalysis',
        name: '/relationshipAnalysis',
        component: relationshipAnalysis,
        meta: {
          title: '血缘分析',
          menuPath: true,
          menuIcon: 'dropbox',
          hideInBread: true
        }
      },
      {
        path: '/dataSourceConfigure',
        name: '/dataSourceConfigure',
        component: dataSourceConfigure,
        meta: {
          title: '数据源配置',
          menuPath: true,
          menuIcon: 'setting',
          hideInBread: true
        }
      },
      {
        path: '/etlConfigure',
        name: '/etlConfigure',
        component: etlConfigure,
        meta: {
          title: 'ETL服务器配置',
          menuPath: true,
          menuIcon: 'interaction',
          hideInBread: true
        }
      },
      {
        path: '/taskQuery',
        name: '/taskQuery',
        component: taskQuery,
        meta: {
          title: '任务查询',
          menuPath: true,
          menuIcon: 'container',
          hideInBread: true
        }
      },
    ]
  },
  //内容发布
  {
    path: '/login',
    redirect: '/homepage/index',
    name: 'homepage',
    component: Home,
    meta: {title: '主页'}
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {title: '注册'}
  },
  {
    path: '/bindPhone',
    name: 'bindPhone',
    component: BindPhone,
    meta: {title: '选择系统绑定手机号'}
  },
  {
    path: '/bindTemporarayAccount',
    name: 'bindTemporarayAccount',
    component: BindTemporarayAccount,
    meta: {title: '选择系统绑定手机号'}
  },
  {
    path: '/oldSysLogout',
    name: 'oldSysLogout',
    component: OldSysLogout,
    meta: {title: '老系统安全登出'}
  },
  {
    path: '/networkerr',
    name: 'networkerr',
    component: TipsNetworkErr,
    meta: {title: '网络错误'}
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage,
    meta: {title: '404'}
  },
  {
    path: '/upperLimitErr',
    name: 'upperLimitErr',
    component: TipsUpperLimitErr,
    meta: {title: '访问频繁'}
  }
]

export const routes = [...appRoutes]
