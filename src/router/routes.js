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
const LoginPage = () => import('@/views/login/login')
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
// 内容管理-行业动态
const KnowledgeList = () => import('@/views/cms/industry/list')
const KnowledgeCreate = () => import('@/views/cms/industry/create')
const KnowledgeEdit = () => import('@/views/cms/industry/edit')
const KnowledgeDetail = () => import('@/views/cms/industry/details')
const KnowledgePublishedList = () =>
  import('@/views/cms/knowledgePublish/authList')
const KnowledgePublishedAnonymousList = () =>
  import('@/views/cms/knowledgePublish/anonymousList')
const KnowledgeView = () => import('@/views/cms/knowledgePublish/view')

// 首页
const NotificationAnnounce = () =>
  import('@/views/frontPublic/views/notificationAnnounce/notificationAnnounce')
const NotificationList = () =>
  import('@/views/frontPublic/views/notificationAnnounce/notificationList')
const VotingRules = () =>
  import('@/views/frontPublic/views/notificationAnnounce/votingRules')
const IndustryList = () =>
  import('@/views/frontPublic/views/industryNews/industryList.vue')

const IndustryDetails = () => 
  import('@/views/frontPublic/views/industryNews/industryDetails.vue')
const DataSearch = () =>
  import('@/views/frontPublic/views/dataSearch/dataSearch.vue')
const DataSearchResult = () =>
  import('@/views/frontPublic/views/dataSearch/searchResult.vue')
const KnowledgeService = () =>
  import('@/views/frontPublic/views/knowledgeService/knowledgeService.vue')
const TopicReportList = () =>
  import('@/views/frontPublic/views/topicReport/topicReportList')

const TopicReportDetail = () =>
  import('@/views/frontPublic/views/topicReport/topicReportDetail')
// 子项目
const FarmingTechContent = () =>
  import('@/views/frontPublic/views/farmingTech/farmingTechContent.vue')

const FarmingTechContentDetail = () =>
  import('@/views/frontPublic/views/farmingTech/farmingTechDetails.vue')

const knowledgeServiceList = () =>
  import(
    '@/views/frontPublic/views/knowledgePromotion/knowledgeServiceList.vue'
  )

const knowledgeServiceDetail = () =>
  import(
    '@/views/frontPublic/views/knowledgePromotion/knowledgeServiceDetails.vue'
  )

const CloudLessonContent = () =>
  import('@/views/frontPublic/views/cloudLesson/cloudLessonContent.vue')

const cloudLessonDetail = () =>
  import('@/views/frontPublic/views/cloudLesson/cloudLessonDetail.vue')

// 内容管理-首页信息维护管理
const HomepageInfoMaintainView = () => import('@/views/cms/homepageInfoMaintain/index')
const AddBanner = () => import('@/views/cms/homepageInfoMaintain/addBanner')
const ModifyBanner = () => import('@/views/cms/homepageInfoMaintain/modifyBanner')
const BannerDetail = () => import('@/views/cms/homepageInfoMaintain/bannerDetail')
const BannerSort = () => import('@/views/cms/homepageInfoMaintain/bannerSort')

// 内容管理-养殖技术
const FarmingTechList = () => import('@/views/cms/farmingTech/list')
const FarmingCreate = () => import('@/views/cms/farmingTech/create')
const FarmingDetail = () => import('@/views/cms/farmingTech/detail')
const FarmingEdit = () => import('@/views/cms/farmingTech/edit')

// 内容管理-科普知识
const KnowledgePromotionList = () => import('@/views/cms/knowledgePromotion/list')
const KnowledgePromotionCreate = () => import('@/views/cms/knowledgePromotion/create')
const KnowledgePromotionDetail = () => import('@/views/cms/knowledgePromotion/detail')
const KnowledgePromotionEdit = () => import('@/views/cms/knowledgePromotion/edit')

// 内容管理-云课堂
const CloudLessonList = () => import('@/views/cms/cloudLesson/list')
const CloudLessonCreate = () => import('@/views/cms/cloudLesson/create')
const CloudLessonDetail = () => import('@/views/cms/cloudLesson/detail')
const CloudLessonEdit = () => import('@/views/cms/cloudLesson/edit')

// 内容管理 - 专题报告
const TopicList = () => import('@/views/cms/topicReport/list')
const TopicCreate = () => import('@/views/cms/topicReport/create')
const TopicDetail = () => import('@/views/cms/topicReport/detail')
const TopicEdit = () => import('@/views/cms/topicReport/edit')

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

// 知识服务
// const KnowledgeService = () => import('@/views/new_login/components/knowledgeService')

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
    path     : '*',
    name     : 'Layout',
    // redirect : '/login',
    component: main,
    children : [
      {
        path     : '/home',
        name     : 'home',
        component: HomePage,
        meta     : { title: '首页' }
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
          },//
          {
            path     : '/person/userChange',
            name     : '/person/userChange',
            component: UserChange,
            meta     : { title: '账户基本信息修改' }
          },
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
          },
          // 操作日志
          {
            path     : '/systemManagement/operlog',
            name     : '/systemManagement/operlog',
            component: () =>
                import ('@/views/systemManagement/operlog/index'),
            meta: {
              title      : '操作日志',
              menuPath   : true,
              authCode   : 'P05000',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: [ {
              path     : '/systemManagement/operlog/particulars',
              name     : '/systemManagement/operlog/particulars',
              component: () =>
                    import ('@/views/systemManagement/operlog/particulars'),
              meta: {
                title      : '查看日志详情',
                menuPath   : false,
                authCode   : 'P05001',
                menuIcon   : 'cluster',
                hideInBread: false,
                openMode   : 'normal'
              }
            } ]
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
            path     : '/cms/homepageInfoMaintain',
            name     : '/cms/homepageInfoMaintain',
            component: HomepageInfoMaintainView,
            meta     : {
              title      : '首页信息维护管理',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'cluster',
              hideInBread: false,
              openMode   : 'normal'
            },
            children: [
              {
                path     : '/cms/homepageInfoMaintain/addBanner',
                name     : '/cms/homepageInfoMaintain/addBanner',
                component: AddBanner,
                meta     : {
                  title      : '添加轮播图',
                  menuPath   : true,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false,
                },
              },
              {
                path     : '/cms/homepageInfoMaintain/modifyBanner/:id',
                name     : '/cms/homepageInfoMaintain/modifyBanner',
                component: ModifyBanner,
                meta     : {
                  title      : '修改轮播图',
                  menuPath   : true,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false,
                },
              },
              {
                path     : '/cms/homepageInfoMaintain/bannerDetail/:id',
                name     : '/cms/homepageInfoMaintain/bannerDetail',
                component: BannerDetail,
                meta     : {
                  title      : '轮播图详情',
                  menuPath   : false,
                  authCode   : 'P31005',
                  menuIcon   : 'cluster',
                  hideInBread: false,
                  openMode   : 'normal'
                },
              },
              {
                path     : '/cms/homepageInfoMaintain/bannerSort',
                name     : '/cms/homepageInfoMaintain/bannerSort',
                component: BannerSort,
                meta     : {
                  title      : '轮播图排序',
                  menuPath   : true,
                  authCode   : 'P31004',
                  menuIcon   : 'file-text',
                  hideInBread: false,
                },
              }
            ]
          },
          {
            path     : '/cms/farmingtech',
            name     : '/cms/farmingtech',
            component: FarmingTechList,
            meta     : {
              title      : '养殖技术管理',
              tabName    : 'farmingNews',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false,
            },
            children: [
              {
                path     : '/cms/farmingtech/create',
                name     : '/cms/farmingtech/create',
                component: FarmingCreate,
                meta     : {
                  title      : '新建养殖技术',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/farmingtech/edit/:id',
                name     : '/cms/farmingtech/edit',
                component: FarmingEdit,
                meta     : {
                  title      : '修改养殖技术',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/farmingtech/:id',
                name     : '/cms/farmingtech/detail',
                component: FarmingDetail,
                meta     : {
                  title      : '查看养殖技术详情',
                  menuPath   : false,
                  authCode   : 'P31005',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          },
          {
            path     : '/cms/knowledgepromotion',
            name     : '/cms/knowledgepromotion',
            component: KnowledgePromotionList,
            meta     : {
              title      : '科普知识管理',
              tabName    : 'knowledgeNews',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/knowledgepromotion/create',
                name     : '/cms/knowledgepromotion/create',
                component: KnowledgePromotionCreate,
                meta     : {
                  title      : '新建科普知识',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/knowledgepromotion/edit/:id',
                name     : '/cms/knowledgepromotion/edit',
                component: KnowledgePromotionEdit,
                meta     : {
                  title      : '修改科普知识',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/knowledgepromotion/:id',
                name     : '/cms/knowledgepromotion/detail',
                component: KnowledgePromotionDetail,
                meta     : {
                  title      : '查看科普知识详情',
                  menuPath   : false,
                  authCode   : 'P31005',
                  menuIcon   : 'file-text',
                  hideInBread: false
                },
              }
            ]
          },
          {
            path     : '/cms/cloudlesson',
            name     : '/cms/cloudlesson',
            component: CloudLessonList,
            meta     : {
              title      : '云课堂管理',
              menuPath   : true,
              tabName    : 'cloudLessonNews',
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/cloudlesson/create',
                name     : '/cms/cloudlesson/create',
                component: CloudLessonCreate,
                meta     : {
                  title      : '新建云课堂',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/cloudlesson/edit/:id',
                name     : '/cms/cloudlesson/edit',
                component: CloudLessonEdit,
                meta     : {
                  title      : '修改云课堂',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/cloudlesson/:id',
                name     : '/cms/cloudlesson/detail',
                component: CloudLessonDetail,
                meta     : {
                  title      : '查看云课堂详情',
                  menuPath   : false,
                  authCode   : 'P31005',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              }
            ]
          },
          {
            path     : '/cms/industry',
            name     : '/cms/industry',
            component: KnowledgeList,
            meta     : {
              title      : '行业动态管理',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/industry/create',
                name     : '/cms/industry/create',
                component: KnowledgeCreate,
                meta     : {
                  title      : '新建行业动态',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/industry/edit/:id',
                name     : '/cms/industry/edit',
                component: KnowledgeEdit,
                meta     : {
                  title      : '修改行业动态',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/industry/:id',
                name     : '/cms/industry/detail',
                component: KnowledgeDetail,
                meta     : {
                  title      : '查看行业动态详情',
                  menuPath   : false,
                  authCode   : 'P31005',
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
                name     : '/cms/notice/detail',
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
          },{
            path     : '/cms/topicList',
            name     : '/cms/topicList',
            component: TopicList,
            meta     : {
              title      : '专题报告管理',
              menuPath   : true,
              authCode   : 'P31000',
              menuIcon   : 'file-text',
              hideInBread: false
            },
            children: [
              {
                path     : '/cms/topicList/create',
                name     : '/cms/topicList/create',
                component: TopicCreate,
                meta     : {
                  title      : '新建专题报告',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/topicList/edit/:id',
                name     : '/cms/topicList/edit',
                component: TopicEdit,
                meta     : {
                  title      : '修改专题报告',
                  menuPath   : false,
                  authCode   : 'P31001',
                  menuIcon   : 'file-text',
                  hideInBread: false
                }
              },
              {
                path     : '/cms/topicList/:id',
                name     : '/cms/topicList/detail',
                component: TopicDetail,
                meta     : {
                  title      : '专题报告详情',
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
  //内容发布
  
  // 旧的登录页面
  // {
  //   path     : '/login', name     : 'login', component: LoginPage,
  //   meta     : { title: '登录' },
  // },
  {
    path     : '/login',
    redirect : '/homepage/index',
    name     : 'homepage',
    component: Home,
    meta     : { title: '主页' },
    children : [
      {
        path     : '/homepage/index',
        component: HomeFeature,
        name     : 'index',
        meta     : { title: '首页' },
        children : [
          {
            path     : '/homepage/login',
            component: HomeFeature
            // name     : 'new_login',
            // meta     : { title: '内容' },
          }
        ]
      },
      {
        path     : '/homepage/notificationAnnounce/:id',
        name     : 'notificationAnnounce',
        component: NotificationAnnounce,
        meta     : { title: '通知公告' }
      }, 
      {
        path     : '/homepage/notificationNews',
        name     : 'notificationList',
        component: NotificationList,
        meta     : { title: '通知公告列表' }
      }, 
      {
        path     : '/homepage/votingRules/:id',
        name     : 'votingRules',
        component: VotingRules,
        meta     : { title: '投票公告' }
      },
      {
        path     : '/homepage/industryList',
        name     : 'industryList',
        component: IndustryList,
        meta     : { title: '行业动态列表' }
      },
      {
        path     : '/homepage/industryDetails/:id',
        name     : 'industryDetails',
        component: IndustryDetails,
        meta     : { title: '行业动态详情' }
      },
      {
        path     : '/homepage/knowledgeService/farmingTechDetail/:id',
        name     : '/knowledgeService/farmingTechDetail',
        component: FarmingTechContentDetail,
        meta     : { title: '养殖技术详情' }
      },
      {
        path     : '/homepage/knowledgeService/knowledgeServiceDetail/:id',
        name     : '/knowledgeService/knowledgeServiceDetail',
        component: knowledgeServiceDetail,
        meta     : { title: '科普知识详情' }
      },
      {
        path     : '/homepage/knowledgeService/cloudLessonDetail/:id',
        name     : '/knowledgeService/cloudLessonDetail',
        component: cloudLessonDetail,
        meta     : { title: '云课堂详情' }
      },
      {
        path     : '/homepage/knowledgeService',
        name     : 'knowledgeService',
        component: KnowledgeService,
        meta     : { title: '知识服务' },
        children : [
          {
            path     : '/homepage/knowledgeService/farmingTechList',
            name     : 'farmingTechList',
            component: FarmingTechContent,
            meta     : { 
              sectionId: '420295374075158528',
              index    : '0',
              title    : '养殖技术' 
            }
          },
          {
            path     : '/homepage/knowledgeServiceList',
            name     : 'knowledgeServiceList',
            component: knowledgeServiceList,
            meta     : { 
              sectionId: '420295378927968256',
              index    : '1',
              title    : '科普知识' 
            }
          },
          {
            path     : '/homepage/cloudLessonList',
            name     : 'cloudLessonList',
            component: CloudLessonContent,
            meta     : { 
              sectionId: '420295382191136768',
              index    : '2',
              title    : '云课堂' 
            }
          },
        ]
      },
      {
        path     : '/homepage/topicReportList',
        name     : 'topicReportList',
        component: TopicReportList,
        meta     : { title: '专题报告列表' }
      },
      {
        path     : '/homepage/topicReportDetail/:id',
        name     : 'topicReportDetail',
        component: TopicReportDetail,
        meta     : { title: '专题报告' }
      },
      {
        path     : '/homepage/dataSearch',
        name     : 'dataSearch',
        component: DataSearch,
        meta     : { title: '数据查询' },
        children : [
          {
            path     : '/homepage/dataSearch/result',
            name     : 'searchResult',
            component: DataSearchResult,
            meta     : { title: '查询结果' }
          }
        ]
      }
    ]
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
  // 匿名浏览行业动态
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
  },
  // {
  //   path     : '/login',
  //   name     : 'login',
  //   component: LoginPage,
  //   meta     : { title: '登录' }
  // },
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
  // 匿名浏览行业动态
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
