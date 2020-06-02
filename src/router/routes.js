
const contentWrapper = () => import ('@/components/Layout/content-wrapper')
const main = () => import ('@/components/Layout/main')
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
const BindTemporarayAccount = () => import ('@/views/login/bindTemporarayAccount')
// 个人信息
const PersonCenter = () => import ('@/views/personal/person-center')
const PersonTransferDatas = () => import ('@/views/personal/transferDatas/list')
// 系统管理
const SysBasicInfo = () => import ('@/views/systemManagement/basicInformation/index')
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
const demo = () => import ('@/views/demo/use-ueditor')
const ExtractExample = () => import('@/components/ActiveExtract/example')
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
const appRoutes = [ {
  path     : '/',
  name     : 'Layout',
  redirect : '/login',
  component: main,
  children : [
    {
      path     : '/home', name     : 'home', component: HomePage,
      meta     : { title: '首页' },
    },
    {//子项目scsd
      path     : '/scsd', name     : 'scsd',
      component: contentWrapper,
      meta     : { title: '水产新品种审定', menuPath: true, authCode: 'S0501', hideInBread: true, menuIcon: 'appstore' },
      children : [
        {
          path: '/scsd/forma/scsdForma', name: 'scsdForma', 
          meta: { title: '形式审查信息', menuPath: true, authCode: 'S050103', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/exam/scsdExam', name: 'scsdExam', 
          meta: { title: '函审信息', menuPath: true, authCode: 'S050104', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/expert/scsdOrgaExpert', name: 'scsdOrgaExpert', 
          meta: { title: '组织专家', menuPath: true, authCode: 'S050102', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/local/scsdLocal', name: 'scsdLocal', 
          meta: { title: '现场审定确认', menuPath: true, authCode: 'S050106', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/selectPost', name: 'scsdSelectPost', 
          meta: { title: '查看申报记录', menuPath: true, authCode: 'S050108', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/localexam/scsdLocalExam', name: 'scsdLocalExam', 
          meta: { title: '现场审定专家意见', menuPath: true, authCode: 'S050105', hideInBread: false, menuIcon: 'appstore' }
        },
        {
          path: '/scsd/post/scsdPost', name: 'scsdPost', 
          meta: { title: '新品申报', menuPath: true, authCode: 'S050101', hideInBread: false, menuIcon: 'appstore' },
        },
        {
          path: '/scsd/post/scsdPost/view/:id', name: 'scsdPostDetail', 
          meta: { title: '查看申报信息', menuPath: false, authCode: 'S05010106', hideInBread: false },
        },
        {
          path: '/scsd/post/scsdPost/edit/:id', name: 'scsdPostDetailEdit',
          meta: { title: '编辑申报信息', menuPath: false, authCode: 'S05010104', hideInBread: false },
        },
        {
          path: '/scsd/review/scsdReview', name: 'scsdReview', 
          meta: { title: '评审结果信息', menuPath: true, authCode: 'S050107', hideInBread: false, menuIcon: 'appstore' }
        },
      ]
    },
    {//渔业兽医
      path    : '/yysygl', name    : 'yysygl',
      meta    : { title: '渔业兽医', menuPath: true, authCode: 'S0602', hideInBread: true, menuIcon: 'appstore' },
      children: [
        {
          path: '/yysygl/secrchpage/list', name: 'secrchpage', 
          meta: { title: '兽医查询', menuPath: true, authCode: 'S060201', hideInBread: true, menuIcon: 'appstore' },
        },
        {
          path: '/yysygl/yyVeternary/list', name: 'yyVeternary', 
          meta: { title: '渔业乡村兽医', menuPath: true, authCode: 'S060202', hideInBread: true, menuIcon: 'appstore' },
        },
        {
          path: '/yysygl/official/list', name: 'official', 
          meta: { title: '渔业官方兽医', menuPath: true, authCode: 'S060203', hideInBread: true, menuIcon: 'appstore' },
        },
        {
          path: '/yysygl/practising/list', name: 'practising', 
          meta: { title: '渔业执业兽医', menuPath: true, authCode: 'S060204', hideInBread: true, menuIcon: 'appstore' },
        },
  
        {
          path: '/yysygl/yyVeternary/edit', name: 'yyVeternaryEdit', 
          meta: { title: '修改渔业乡村兽医信息', menuPath: false, authCode: 'S06020204', hideInBread: false },
        },
        {
          path: '/yysygl/yyVeternary/details', name: 'yyVeternaryDetail', 
          meta: { title: '查看渔业乡村兽医信息', menuPath: false, authCode: 'S06020205', hideInBread: false },
        },
        {
          path: '/yysygl/official/edit', name: 'officialEdit', 
          meta: { title: '修改渔业官方兽医信息', menuPath: false, authCode: 'S06020304', hideInBread: false },
        },    
        {
          path: '/yysygl/official/details', name: 'officialDetail', 
          meta: { title: '查看渔业官方兽医信息', menuPath: false, authCode: 'S06020305', hideInBread: false },
        },    
        {
          path: '/yysygl/practising/edit', name: 'practisingEdit', 
          meta: { title: '修改渔业执业兽医信息', menuPath: false, authCode: 'S06020404', hideInBread: false },
        },
        {
          path: '/yysygl/practising/details', name: 'practisingDetail', 
          meta: { title: '查看渔业执业兽医信息', menuPath: false, authCode: 'S06020405', hideInBread: false },
        },
      ]
    },
    {//水产原良种场验收审定
      'path'    : '/scylzc',
      'name'    : 'scylzc',
      'meta'    : { 'title': '水产原良种场验收审定', 'menuPath': true, 'authCode': 'S0503', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/scylzc/account/list',
          'name': '/scylzc/account/list',
          'meta': { 'title': '申报单位管理', 'menuPath': true, 'authCode': 'S050307', 'menuIcon': 'cluster', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/scylzc/acceptance/list',
          'name': '/scylzc/acceptance/list',
          'meta': { 'title': '验收申请填写', 'menuPath': true, 'authCode': 'S050301', 'menuIcon': 'exception', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/scylzc/afApply/list',
          'name': '/scylzc/afApply/list',
          'meta': { 'title': '验收审查管理', 'menuPath': true, 'authCode': 'S050302', 'menuIcon': 'barcode', 'hideInBread': false, 'openMode': 'spa'  }
        },
        {
          'path': '/scylzc/afReview/list',
          'name': '/scylzc/afReview/list',
          'meta': { 'title': '验收初审管理', 'menuPath': true, 'authCode': 'S050303', 'menuIcon': 'exception', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/scylzc/afOrgaExpert/list',
          'name': '/scylzc/afOrgaExpert/list',
          'meta': { 'title': '组织专家评审', 'menuPath': true, 'authCode': 'S050304',  'menuIcon': 'database', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path'    : '/scylzc/afVerification/list',
          'name'    : '/scylzc/afVerification/list',
          'meta'    : { 'title': '专家评审', 'menuPath': true, 'authCode': 'S050305', 'menuIcon': 'team', 'hideInBread': false, 'openMode': 'spa' },
          'children': [ {
            'path': '/scylzc/afVerification/list/check',
            'name': '/scylzc/afVerification/list/check',
            'meta': { 'title': '评审', 'menuPath': false, 'authCode': 'S05030501', 'menuIcon': 'appstore', 'hideInBread': false,'openMode': 'spa' }
          },
          {
            'path': '/scylzc/afVerification/list/view',
            'name': '/scylzc/afVerification/list/view',
            'meta': { 'title': '查看申请', 'menuPath': false, 'authCode': 'S05030103', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
          } ]
        },
        {
          'path': '/scylzc/allApplyInfo/list',
          'name': '/scylzc/allApplyInfo/list',
          'meta': { 'title': '查看全部申报信息', 'menuPath': true, 'authCode': 'S050306', 'menuIcon': 'team', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/scylzc/nodeConfig/list', 'name': '/scylzc/nodeConfig/list',
          'meta': { 'title': '流程配置', 'menuPath': true, 'authCode': 'S050308', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        }

      ]
    },
    {//水产原良种场复查审定
      'path'    : '/ylzcre',
      'name'    : 'ylzcre',
      'meta'    : { 'title': '水产原良种场复查审定', 'menuPath': true, 'authCode': 'S0502', 'menuIcon': 'barcode', 'hideInBread': true, 'openMode': 'spa' },
      'children': [
        {
          'path': '/ylzcre/review/information',
          'name': '/ylzcre/review/information',
          'meta': { 'title': '监测数据管理', 'menuPath': true, 'authCode': 'S050201', 'menuIcon': 'exception', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/ylzcre/acceptance/list',
          'name': '/ylzcre/acceptance/list',
          'meta': { 'title': '复查申请填写', 'menuPath': true, 'authCode': 'S050202', 'menuIcon': 'profile', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/ylzcre/afApply/list',
          'name': '/ylzcre/afApply/list',
          'meta': { 'title': '复查申请审查', 'menuPath': true, 'authCode': 'S050203', 'menuIcon': 'barcode', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/ylzcre/afReview/list',
          'name': '/ylzcre/afReview/list',
          'meta': { 'title': '复查申请初审', 'menuPath': true, 'authCode': 'S050204', 'menuIcon': 'exception', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/ylzcre/afOrgaExpert/list',
          'name': '/ylzcre/afOrgaExpert/list',
          'meta': { 'title': '组织专家管理', 'menuPath': true, 'authCode': 'S050205', 'menuIcon': 'database', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path'    : '/ylzcre/afVerification/list',
          'name'    : '/ylzcre/afVerification/list',
          'meta'    : { 'title': '专家评审', 'menuPath': true, 'authCode': 'S050206', 'menuIcon': 'team', 'hideInBread': false, 'openMode': 'spa' },
          'children': [
            {
              'path': '/ylzcre/afVerification/list/check',
              'name': '/ylzcre/afVerification/list/check',
              'meta': { 'title': '评审', 'menuPath': false, 'authCode': 'S05020601', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/ylzcre/afVerification/list/view',
              'name': '/ylzcre/afVerification/list/view',
              'meta': { 'title': '查看申请', 'menuPath': false, 'authCode': 'S05020203', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            }
          ]
        },
        {
          'path': '/ylzcre/allApplyInfo/list',
          'name': '/ylzcre/allApplyInfo/list',
          'meta': { 'title': '查看全部申报信息', 'menuPath': true, 'authCode': 'S050207', 'menuIcon': 'team', 'hideInBread': false, 'openMode': 'spa' }
        }
      ]
    },
    {//范蠡奖评审
      'path'    : '/fljps',
      'name'    : 'fljps',
      'meta'    : { 'title': '范蠡奖评审', 'menuPath': true, 'authCode': 'S1002', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/fljps/notf/flaNotf', 'name': '/fljps/notf/flaNotf',
          'meta': { 'title': '评审管理', 'menuPath': true, 'authCode': 'S100201', 'hideInBread': false, 'menuIcon': 'sound', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/firsttrial/flaFirstTrial', 'name': '/fljps/firsttrial/flaFirstTrial',
          'meta': { 'title': '初审管理', 'menuPath': true, 'authCode': 'S100203', 'hideInBread': false, 'menuIcon': 'sound', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/expert/flaOrgaExpert', 'name': '/fljps/expert/flaOrgaExpert',
          'meta': { 'title': '组织专家', 'menuPath': true, 'authCode': 'S100204', 'hideInBread': false, 'menuIcon': 'team', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/reviewShow/flaReviewShow', 'name': '/fljps/reviewShow/flaReviewShow',
          'meta': { 'title': '评审结果汇总', 'menuPath': true, 'authCode': 'S100205', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/reportNote/flaReviewNotf', 'name': '/fljps/reportNote/flaReviewNotf',
          'meta': { 'title': '评审管理', 'menuPath': true, 'authCode': 'S100209', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/scitechrep/scitechrep', 'name': '/fljps/scitechrep/scitechrep',
          'meta': { 'title': '技术类申报', 'menuPath': true, 'authCode': 'S100210', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/innoteamrep/innoteamrep', 'name': '/fljps/innoteamrep/innoteamrep',
          'meta': { 'title': '团队类申报', 'menuPath': true, 'authCode': 'S100211', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/checkconf/checkconfirmpost', 'name': '/fljps/checkconf/checkconfirmpost',
          'meta': { 'title': '检查并确认申报', 'menuPath': true, 'authCode': 'S100212', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path'    : '/fljps/review/flaReview', 'name'    : '/fljps/review/flaReview',
          'meta'    : { 'title': '评审管理', 'menuPath': true, 'authCode': 'S100208', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' },
          'children': [
            {
              'path': '/fljps/flaReportDetail/flaReportDetail/:id', 'name': '/fljps/flaReportDetail/flaReportDetail',
              'meta': { 'title': '查看成果详情', 'menuPath': false, 'authCode': 'S10020304', 'hideInBread': false , 'menuIcon': 'table', 'openMode': 'spa' }
            }
          ]
        },
        {
          'path': '/fljps/recomanage/flaRrua', 'name': '/fljps/recomanage/flaRrua',
          'meta': { 'title': '申报单位推荐', 'menuPath': true, 'authCode': 'S100206', 'hideInBread': false, 'menuIcon': 'sound', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/recomanage/flaRecConf', 'name': '/fljps/recomanage/flaRecConf',
          'meta': { 'title': '推荐材料审查', 'menuPath': true, 'authCode': 'S100207', 'hideInBread': false, 'menuIcon': 'sound', 'openMode': 'spa' }
        },
        {
          'path': '/fljps/node/nodeConfig','name': '/fljps/node/nodeConfig',
          'meta': { 'title': '流程配置','menuPath': true,'authCode': 'S100213','hideInBread': false,'menuIcon': 'appstore', 'openMode': 'spa' }
        }
      ]
    },
    {//中国水产学会团体标准管理
      'path'    : '/ttbz',
      'name'    : 'ttbz',
      'meta'    : { 'title': '中国水产学会团体标准管理', 'menuPath': true, 'authCode': 'S0201', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/ttbz/standardApplyManager/StandardApply', 'name': '/ttbz/standardApplyManager/StandardApply',
          'meta': { 'title': '管理立项申请', 'authCode': 'S020101', 'menuPath': true, 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
       
        {
          'path': '/ttbz/organizationExpert/RereviewExpert', 'name': '/ttbz/organizationExpert/RereviewExpert',
          'meta': { 'title': '团体标准管理', 'authCode': 'S020107','menuPath': true, 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
       

        {
          'path'    : '/ttbz/projectArgumentation/StandardReview', 'name'    : '/ttbz/projectArgumentation/StandardReview',
          'meta'    : { 'title': '专家评审', 'authCode': 'S020106', 'menuPath': true, 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' },
          'children': [
            {
              'path': '/ttbz/standardApplyManager/StandardReview/standardApplyDetail', 'name': '/ttbz/standardApplyManager/StandardReview/standardApplyDetail',
              'meta': { 'title': '录入专家立项论证结论', 'menuPath': false, 'authCode': 'S02010602', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
            },
            {
              'path': '/ttbz/projectArgumentation/ExpertReviewDetail', 'name': '/ttbz/projectArgumentation/ExpertReviewDetail',
              'meta': { 'title': '录入专家复审结论', 'menuPath': false, 'authCode': 'S02010602', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
            },
            {
              'path': '/ttbz/letterReviewmanager/letterReview/addLetterReview', 'name': '/ttbz/letterReviewmanager/letterReview/addLetterReview',
              'meta': { 'title': '标准申报函审结论录入', 'menuPath': false, 'authCode': 'S02010602', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
            }
          ]
        },
        
        {
          'path': '/ttbz/organizationExpert/standardExpertDetail', 'name': '/ttbz/organizationExpert/standardExpertDetail',
          'meta': { 'title': '查看申报内容', 'menuPath': false, 'authCode': 'S02010601', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        }
       
      ]
    },
    {//水生动物防疫系统实验室能力验证
      'path': '/ssdw',
      'name': 'ssdw',

      'meta'    : { 'title': '水生动物防疫系统实验室能力验证', 'menuPath': true, 'authCode': 'S0601', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/ssdw/disease/ssdwDisease', 'name': '/ssdw/disease/ssdwDisease',
          'meta': { 'title': '疾病信息管理', 'menuPath': true, 'authCode': 'S060101', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/unitInfo/ssdwUnitInfo', 'name': '/ssdw/unitInfo/ssdwUnitInfo',
          'meta': { 'title': '单位信息管理', 'menuPath': true, 'authCode': 'S060102', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/plan/ssdwPlan', 'name': '/ssdw/plan/ssdwPlan',
          'meta': { 'title': '能力验证计划管理', 'menuPath': true, 'authCode': 'S060103', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/tech/ssdwTechGet', 'name': '/ssdw/tech/ssdwTechGet',
          'meta': { 'title': '技术方案上报', 'menuPath': true, 'authCode': 'S060104', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/tech/ssdwTech', 'name': '/ssdw/tech/ssdwTech',
          'meta': { 'title': '技术方案审批', 'menuPath': true, 'authCode': 'S060105', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/enroll/ssdwEnrollGet', 'name': '/ssdw/enroll/ssdwEnrollGet',
          'meta': { 'title': '能力验证计划报名', 'menuPath': true, 'authCode': 'S060111', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/enroll/ssdwEnroll', 'name': '/ssdw/enroll/ssdwEnroll',
          'meta': { 'title': '能力验证计划报名审核', 'menuPath': true, 'authCode': 'S060106', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/enroll/assdwEnrollReview', 'name': '/ssdw/enroll/assdwEnrollReview',
          'meta': { 'title': '能力验证计划报名复审', 'menuPath': true, 'authCode': 'S060114', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/sample/ssdwSample', 'name': '/ssdw/sample/ssdwSample',
          'meta': { 'title': '样品管理', 'menuPath': true, 'authCode': 'S060107', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/sample/assdwSampleRecive', 'name': '/ssdw/sample/assdwSampleRecive',
          'meta': { 'title': '样品接收管理', 'menuPath': true, 'authCode': 'S060112', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/sample/cssdwSampleVerify', 'name': '/ssdw/sample/cssdwSampleVerify',
          'meta': { 'title': '验证报告上传', 'menuPath': true, 'authCode': 'S060108', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/sample/bssdwSampleReport', 'name': '/ssdw/sample/bssdwSampleReport',
          'meta': { 'title': '验证报告结果判定', 'menuPath': true, 'authCode': 'S060109', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/report/ssdwReport', 'name': '/ssdw/report/ssdwReport',
          'meta': { 'title': '总结报告上传', 'menuPath': true, 'authCode': 'S060110', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/report/assdwReportDown', 'name': '/ssdw/report/assdwReportDown',
          'meta': { 'title': '总结报告下载', 'menuPath': true, 'authCode': 'S060113', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/mould/ssdwMould', 'name': '/ssdw/mould/ssdwMould',
          'meta': { 'title': '模板管理', 'menuPath': true, 'authCode': 'S060115', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        },
        {
          'path': '/ssdw/nodeConfig/list', 'name': '/ssdw/nodeConfig/list',
          'meta': { 'title': '流程配置', 'menuPath': true, 'authCode': 'S060116', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
        }
      ]
    },
    {//中国水产学会学术会议管理
      'path': '/xshy',
      'name': 'xshy',

      'meta'    : { 'title': '中国水产学会学术会议管理', 'menuPath': true, 'authCode': '', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/xshy/release/acmMeetingRelease','name': '/xshy/release/acmMeetingRelease',
          'meta': { 'title': '会议管理', 'menuPath': true, 'authCode': 'S100102', 'hideInBread': false, 'menuIcon': 'sound', 'openMode': 'spa'  }
        },
        {
          'path': '/xshy/push/acmPushNotf','name': '/xshy/push/acmPushNotf',
          'meta': { 'title': '会议信息推送', 'menuPath': true, 'authCode': 'S100103', 'hideInBread': false, 'menuIcon': 'bell', 'openMode': 'spa'  }
        },
        {
          'path': '/xshy/pushConfig/acmPushNotfConfig', 'name': '/xshy/pushConfig/acmPushNotfConfig',
          'meta': { 'title': '短信配置管理', 'menuPath': true, 'authCode': 'S100120', 'hideInBread': true, 'menuIcon': 'form', 'openMode': 'spa'  }
        },
        {
          'path': '/xshy/pushEmailConfig/acmPushNotfEmailConfig', 'name': '/xshy/pushEmailConfig/acmPushNotfEmailConfig',
          'meta': { 'title': '邮件配置管理', 'menuPath': true, 'authCode': 'S100121', 'hideInBread': true, 'menuIcon': 'team', 'openMode': 'spa'  }
        },
        {
          'path': '/xshy/sign/acmMeetingHome', 'name': '/xshy/sign/acmMeetingHome',
          'meta': { 'title': '会议报名', 'menuPath': true, 'authCode': '', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa'  }
        },
        {
          'path': '/xshy/sign/acmMeetingSignSingle', 'name': '/xshy/sign/acmMeetingSignSingle',
          'meta': { 'title': '报名历史', 'menuPath': true, 'authCode': '', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa'  }
        }
      ]
    },
    {//中国水产学会理事会议
      'path'    : '/lshy',
      'name'    : 'lshy',
      'meta'    : { 'title': '中国水产学会理事会议', 'menuPath': true, 'authCode': 'S1003', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/lshy/menber/acmBoardMenber',
          'name': '/lshy/menber/acmBoardMenber',
          'meta': { 'title': '理事成员管理', 'menuPath': true, 'authCode': 'S100307', 'hideInBread': false, 'menuIcon': 'team', 'openMode': 'spa' }
        },
        {
          'path': '/lshy/meeting/acmBoardMeeting',
          'name': '/lshy/meeting/acmBoardMeeting',
          'meta': { 'title': '理事会议管理', 'menuPath': true, 'authCode': 'S100304', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/lshy/meeting/acmBoardMeetingIssueStatis',
          'name': '/lshy/meeting/acmBoardMeetingIssueStatis',
          'meta': { 'title': '理事议题结果', 'menuPath': true, 'authCode': 'S100305', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        },
        {
          'path': '/lshy/meetingMem/acmBoardMeetingIssueVote', 'name': '/lshy/meetingMem/acmBoardMeetingIssueVote',
          'meta': { 'title': '理事议题投票', 'menuPath': true, 'authCode': 'S100312', 'hideInBread': false, 'menuIcon': 'table', 'openMode': 'spa' }
        }
      ]
    },
    {//科普教育基地申报管理
      'path'    : '/kpjd',
      'name'    : 'kpjd',
      'meta'    : { 'title': '科普教育基地申报管理', 'menuPath': true, 'authCode': 'S0101', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [ {
        'path': '/kpjd/declare/Declare',
        'name': '/kpjd/declare/Declare',
        'meta': { 'title': '申报管理 ', 'menuPath': true, 'authCode': 'S010101', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
      },
      {
        'path': '/kpjd/declare/FirstReview',
        'name': '/kpjd/declare/FirstReview',
        'meta': { 'title': '申报初审', 'menuPath': true, 'authCode': 'S010102', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
      },
      
      {
        'path': '/kpjd/declare/Trial',
        'name': '/kpjd/declare/Trial',
        'meta': { 'title': '科普教育基地', 'menuPath': true, 'authCode': 'S010103', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
      },
      
      {
        'path'    : '/kpjd/declare/organizationExpert',
        'name'    : '/kpjd/declare/organizationExpert',
        'meta'    : { 'title': '专家评分', 'menuPath': true, 'authCode': 'S010104', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' },
        'children': [
          {
            'path': '/kpjd/declare/organizationExpert/expertAdd',
            'name': '/kpjd/declare/organizationExpert/expertAdd',
            'meta': { 'title': '评分录入', 'menuPath': false, 'authCode': 'S01010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
          },
          {
            'path': '/kpjd/declare/organizationExpert/Evaluation',
            'name': '/kpjd/declare/organizationExpert/Evaluation',
            'meta': { 'title': '评分录入', 'menuPath': false, 'authCode': 'S01010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
          }
        ]
      },
      
      {
        'path': '/kpjd/declare/Declare/DeclareInfo',
        'name': '/kpjd/declare/Declare/DeclareInfo',
        'meta': { 'title': '查看详情', 'menuPath': false, 'authCode': 'S01010104', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
      },
      
      {
        'path': '/kpjd/judge/judgeTable',
        'name': '/kpjd/judge/judgeTable',
        'meta': { 'title': '评判标准', 'menuPath': true, 'authCode': 'S010108', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
      }
      ]
    },
    {//质量追溯
      'path'    : '/zlzs',
      'name'    : 'zlzs',
      'meta'    : { 'title': '质量追溯', 'menuPath': true, 'authCode': 'S0703', 'menuIcon': 'barcode', 'hideInBread': true, 'openMode': 'spa' },
      'children': [ {
        'path': '/zlzs/company/zlzsCompany',
        'name': '/zlzs/company/zlzsCompany',
        'meta': { 'title': '企业信息管理', 'menuPath': true, 'authCode': 'S070301', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      }, {
        'path': '/zlzs/seedingout/zlzsSeedingout',
        'name': '/zlzs/seedingout/zlzsSeedingout',
        'meta': { 'title': '苗种投放管理', 'menuPath': true, 'authCode': 'S070302', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      }, {
        'path': '/zlzs/fodderout/zlzsFodderout',
        'name': '/zlzs/fodderout/zlzsFodderout',
        'meta': { 'title': '饲料投入管理', 'menuPath': true, 'authCode': 'S070303', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      }, {
        'path': '/zlzs/drugout/zlzsDrugout',
        'name': '/zlzs/drugout/zlzsDrugout',
        'meta': { 'title': '渔药投入管理', 'menuPath': true, 'authCode': 'S070304', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      }, {
        'path': '/zlzs/sale/zlzsSale',
        'name': '/zlzs/sale/zlzsSale',
        'meta': { 'title': '销售信息管理', 'menuPath': true, 'authCode': 'S070305', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      }, {
        'path': '/zlzs/review/zlzsReview',
        'name': '/zlzs/review/zlzsReview',
        'meta': { 'title': '追溯信息管理', 'menuPath': true, 'authCode': 'S070306', 'hideInBread': false, 'menuIcon': 'appstore', 'openMode': 'spa' }
      } ]
    },
    {//稻渔综合种养dyzh
      'path'    : '/dyzh',
      'name'    : 'dyzh',
      'meta'    : { 'title': '稻渔综合种养', 'menuPath': true, 'authCode': 'S1301', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path'    : '/dyzh/dyzhzy',
          'name'    : 'dyzh/dyzhzy',
          'meta'    : { 'title': '县域稻渔综合种养信息上报', 'menuPath': true, 'authCode': 'S130127', 'menuIcon': 'appstore' },
          'children': [
            {
              'path': '/dyzh/dyzhzy/OutputInfo',
              'name': '/dyzh/dyzhzy/OutputInfo',
              'meta': { 'title': '稻渔综合种养产量和面积上报', 'menuPath': true, 'authCode': 'S130121', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/dyzh/ecologicalFishery/MainStay',
              'name': '/dyzh/ecologicalFishery/MainStay',
              'meta': { 'title': '稻渔综合种养主体数量上报', 'menuPath': true, 'authCode': 'S130124', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/dyzh/dyzhzy/ScaleOut',
              'name': '/dyzh/dyzhzy/ScaleOut',
              'meta': { 'title': '小龙虾产量面积上报', 'menuPath': true, 'authCode': 'S130107', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/dyzh/dyzhzy/LittleDragon',
              'name': '/dyzh/dyzhzy/LittleDragon',
              'meta': { 'title': '小龙虾规模以上加工企业情况上报', 'menuPath': true, 'authCode': 'S130110', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            }
          ]
        },
        {
          'path'    : '/dyzh/ecologicalFisherys',
          'name'    : 'dyzh/ecologicalFisherys',
          'meta'    : { 'title': '示范区经营主体信息上报', 'menuPath': true, 'authCode': 'S130130', 'menuIcon': 'appstore' },
          'children': [
            {
              'path': '/dyzh/ecologicalFishery/RiceFishInfor',
              'name': '/dyzh/ecologicalFishery/RiceFishInfor',
              'meta': { 'title': '示范区经营主体基本信息上报', 'menuPath': true, 'authCode': 'S130114', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/dyzh/cultivation/Cultivation',
              'name': '/dyzh/cultivation/Cultivation',
              'meta': { 'title': '示范区稻渔综合种养上报', 'menuPath': true, 'authCode': 'S130117', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            }
          ]
        }
      ]
    },
    {//大水面生态渔业styy
      'path': '/styy',
      'name': 'styy',

      'meta'    : { 'title': '大水面生态渔业 ', 'menuPath': true, 'authCode': 'S1401', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/styy/bigWaterSurface/WaterInfor',
          'name': '/styy/bigWaterSurface/WaterInfor',
          'meta': { 'title': '大水面生态渔业主体信息', 'menuPath': true, 'menuIcon': 'appstore','authCode': 'S140101','hideInBread': false,'openMode': 'spa' }
        },
        {
          'path': '/styy/bigWaterSurface/BreedInfo',
          'name': '/styy/bigWaterSurface/BreedInfo',
          'meta': { 'title': '大水面生态渔业养殖信息', 'menuPath': true, 'menuIcon': 'appstore','authCode': 'S140105','hideInBread': false,'openMode': 'spa' }
        }
      ]
    },
    {//海洋牧场hymc
      'path'    : '/hymc',
      'name'    : 'hymc',
      'meta'    : { 'title': '海洋牧场', 'menuPath': true, 'authCode': 'S1301', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path'    : '/hymc/hyBases',
          'name'    : 'hymc/hyBases',
          'meta'    : { 'title': '国家级海洋牧场示范区管理', 'menuPath': true, 'authCode': 'S040101', 'menuIcon': 'appstore' },
          'children': [
            {
              'path': '/hymc/uddDeclare/UddDeclare',
              'name': '/hymc/uddDeclare/UddDeclare',
              'meta': { 'title': '示范区创建申报', 'menuPath': true, 'authCode': 'S040104', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/uddDeclare/UddDeclareSpList',
              'name': '/hymc/uddDeclare/UddDeclareSpList',
              'meta': { 'title': '示范区创建管理', 'menuPath': true, 'authCode': 'S040105', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/annualreview/Annualreview',
              'name': '/hymc/annualreview/Annualreview',
              'meta': { 'title': '示范区年度评价申报', 'menuPath': true, 'authCode': 'S040106', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/annualreview/AnnualreviewSpList',
              'name': '/hymc/annualreview/AnnualreviewSpList',
              'meta': { 'title': '示范区年度评价管理', 'menuPath': true, 'authCode': 'S040107', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reviewmaterials/Reviewmaterials',
              'name': '/hymc/reviewmaterials/Reviewmaterials',
              'meta': { 'title': '示范区复查申报', 'menuPath': true, 'authCode': 'S040108', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reviewmaterials/ReviewmaterialsSpList',
              'name': '/hymc/reviewmaterials/ReviewmaterialsSpList',
              'meta': { 'title': '示范区复查管理', 'menuPath': true, 'authCode': 'S040109', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/uddDeclareChange/UddDeclareChange',
              'name': '/hymc/uddDeclareChange/UddDeclareChange',
              'meta': { 'title': '示范区变更申报', 'menuPath': true, 'authCode': 'S040110', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/uddDeclareChange/UddDeclareChangeSpList',
              'name': '/hymc/uddDeclareChange/UddDeclareChangeSpList',
              'meta': { 'title': '示范区变更管理', 'menuPath': true, 'authCode': 'S040111', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/uddDeclare/UddInfoSearch',
              'name': '/hymc/uddDeclare/UddInfoSearch',
              'meta': { 'title': '示范区信息查询', 'menuPath': true, 'authCode': 'S040112', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/expertScore/UdddeclareExpert',
              'name': '/hymc/expertScore/UdddeclareExpert',
              'meta': { 'title': '示范区评审评分', 'menuPath': true, 'authCode': 'S040113', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/expertScore/AnnualreviewExpert',
              'name': '/hymc/expertScore/AnnualreviewExpert',
              'meta': { 'title': '示范区年度评价评分', 'menuPath': true, 'authCode': 'S040114', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/expertScore/ReviewmaterialsExpert',
              'name': '/hymc/expertScore/ReviewmaterialsExpert',
              'meta': { 'title': '示范区复查评分', 'menuPath': true, 'authCode': 'S040115', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/projectDemo/HyProjectDemo',
              'name': '/hymc/projectDemo/HyProjectDemo',
              'meta': { 'title': '海洋牧场项目模板', 'menuPath': true, 'authCode': 'S040103', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/GisInfo',
              'name': '/hymc/GisInfo',
              'meta': { 'title': '地理信息', 'menuPath': true, 'authCode': 'S040127', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/video',
              'name': '/hymc/video',
              'meta': { 'title': '海洋牧场可视化信息管理', 'menuPath': true, 'authCode': 'S040128', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/UdddeclareExpert/UdddeclareScore/:id', 'name': '/expertScore/UdddeclareExpert/UdddeclareScore',
              'meta': { 'title': '示范区专家评分', 'authCode': 'S04011301', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/UdddeclareExpert/UdddeclareESCheck/:id', 'name': '/expertScore/UdddeclareExpert/UdddeclareESCheck',
              'meta': { 'title': '示范区专家评分详情', 'authCode': 'S04012603', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/UdddeclareExpert/AnnualreviewScore/:id', 'name': '/expertScore/UdddeclareExpert/AnnualreviewScore',
              'meta': { 'title': '年度评审专家评分', 'authCode': 'S04011401', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/AnnualreviewESCheck/:id', 'name': '/expertScore/AnnualreviewESCheck',
              'meta': { 'title': '年度评审专家评分详情', 'authCode': 'S04012603', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/UdddeclareExpert/ReviewmaterialsScore/:id', 'name': '/expertScore/UdddeclareExpert/ReviewmaterialsScore',
              'meta': { 'title': '复查专家评分', 'authCode': 'S04011501', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/ReviewmaterialsESCheck/:id', 'name': '/expertScore/ReviewmaterialsESCheck',
              'meta': { 'title': '复查专家评分详情', 'authCode': 'S04012603', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            }
          ]
        },
        {
          'path'    : '/hymc/yjBase',
          'name'    : 'hymc/yjBase',
          'meta'    : { 'title': '人工鱼礁项目建设管理', 'menuPath': true, 'authCode': 'S040102', 'menuIcon': 'appstore' },
          'children': [
            {
              'path': '/hymc/reefDeclare/ReefDeclare',
              'name': '/hymc/reefDeclare/ReefDeclare',
              'meta': { 'title': '人工鱼礁项目申报', 'menuPath': true, 'authCode': 'S040117', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reefDeclare/ReefDeclareSpList',
              'name': '/hymc/reefDeclare/ReefDeclareSpList',
              'meta': { 'title': '人工鱼礁项目管理', 'menuPath': true, 'authCode': 'S040118', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/implementation/Implementation',
              'name': '/hymc/implementation/Implementation',
              'meta': { 'title': '人工鱼礁项目具体实施方案申报', 'menuPath': true, 'authCode': 'S040123', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/implementation/ImplementationSpList',
              'name': '/hymc/implementation/ImplementationSpList',
              'meta': { 'title': '人工鱼礁项目具体实施方案管理', 'menuPath': true, 'authCode': 'S040124', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/accept/Accept',
              'name': '/hymc/accept/Accept',
              'meta': { 'title': '人工鱼礁项目验收申报', 'menuPath': true, 'authCode': 'S040121', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/accept/AcceptSpList',
              'name': '/hymc/accept/AcceptSpList',
              'meta': { 'title': '人工鱼礁项目验收管理', 'menuPath': true, 'authCode': 'S040122', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reefDeclareChange/ReefDeclareChange',
              'name': '/hymc/reefDeclareChange/ReefDeclareChange',
              'meta': { 'title': '人工鱼礁项目变更申报', 'menuPath': true, 'authCode': 'S040119', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reefDeclareChange/ReefDeclareChangeSpList',
              'name': '/hymc/reefDeclareChange/ReefDeclareChangeSpList',
              'meta': { 'title': '人工鱼礁项目变更管理', 'menuPath': true, 'authCode': 'S040120', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/projectDemo/YjProjectDemo',
              'name': '/hymc/projectDemo/YjProjectDemo',
              'meta': { 'title': '人工鱼礁项目模板', 'menuPath': true, 'authCode': 'S040116', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/expertScore/YjExpert',
              'name': '/hymc/expertScore/YjExpert',
              'meta': { 'title': '人工鱼礁项目评分', 'menuPath': true, 'authCode': 'S040126', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/reefDeclare/ReefInfoSearch',
              'name': '/hymc/reefDeclare/ReefInfoSearch',
              'meta': { 'title': '人工鱼礁项目信息查询', 'menuPath': true, 'authCode': 'S040125', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/hymc/implementationProgress/ImplementationProgress',
              'name': '/hymc/implementationProgress/ImplementationProgress',
              'meta': { 'title': '人工鱼礁项目进度情况', 'menuPath': true, 'authCode': 'S040129', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/YjExpert/YjScore/:id', 'name': '/expertScore/YjExpert/YjScore',
              'meta': { 'title': '鱼焦专家评分', 'authCode': 'S04012601', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            },
            {
              'path': '/expertScore/YjESCheck/:id', 'name': '/expertScore/YjESCheck',
              'meta': { 'title': '鱼焦评分详情', 'authCode': 'S04012603', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
            }
          ]
        }
      ]
    },
    {//休闲渔业品牌管理xxyy
      'path'    : '/xxyy',
      'name'    : 'xxyy',
      'meta'    : { 'title': '休闲渔业品牌管理', 'menuPath': true, 'authCode': 'S0301', 'menuIcon': 'barcode', 'hideInBread': true },
      'children': [
        {
          'path': '/xxyy/system/ManageUnit', 'name': '/xxyy/system/ManageUnit',
          'meta': { 'title': '品牌申报单位管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030119', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/projectTemplate', 'name': '/xxyy/beautifulFish/projectTemplate',
          'meta': { 'title': '项目模板管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030101', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/projectList', 'name': '/xxyy/beautifulFish/projectList',
          'meta': { 'title': '中国最美渔村项目审批管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030102', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/expertExtraction', 'name': '/xxyy/beautifulFish/expertExtraction',
          'meta': { 'title': '中国最美渔村抽取专家', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030118', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/annualReview', 'name': '/xxyy/beautifulFish/annualReview',
          'meta': { 'title': '中国最美渔村提交年度评审', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030103', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/expertRating', 'name': '/xxyy/beautifulFish/expertRating',
          'meta': { 'title': '中国最美渔村专家评分', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030104', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/baseProjectList', 'name': '/xxyy/demonstrationBase/baseProjectList',
          'meta': { 'title': '全国休闲渔业示范基地项目审批管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030105', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/baseExpertExtraction', 'name': '/xxyy/demonstrationBase/baseExpertExtraction',
          'meta': { 'title': '全国休闲渔业示范基地抽取专家', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030117', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/baseAnnualReview', 'name': '/xxyy/demonstrationBase/baseAnnualReview',
          'meta': { 'title': '全国休闲渔业示范基地提交年度评审', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030106', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/expertRating', 'name': '/xxyy/demonstrationBase/expertRating',
          'meta': { 'title': '全国休闲渔业示范基地专家评分', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030107', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/festProjectList', 'name': '/xxyy/culturalFestivals/festProjectList',
          'meta': { 'title': '中国渔业优秀文化节庆会展项目审批管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030108', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/FestExpertExtraction', 'name': '/xxyy/culturalFestivals/FestExpertExtraction',
          'meta': { 'title': '中国渔业优秀文化节庆会展抽取专家', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030116', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/festAnnualReview', 'name': '/xxyy/culturalFestivals/festAnnualReview',
          'meta': { 'title': '中国渔业优秀文化节庆（会展）提交年度评审', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030109', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/expertRating', 'name': '/xxyy/culturalFestivals/expertRating',
          'meta': { 'title': '中国渔业优秀文化节庆（会展）专家评分', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030110', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/eventProjectList', 'name': '/xxyy/excitingEvents/eventProjectList',
          'meta': { 'title': '中国渔业精彩赛事项目审批管理', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030111', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/eventExpertExtraction', 'name': '/xxyy/excitingEvents/eventExpertExtraction',
          'meta': { 'title': '中国渔业精彩赛事抽取专家', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030115', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/eventAnnualReview', 'name': '/xxyy/excitingEvents/eventAnnualReview',
          'meta': { 'title': '中国渔业精彩赛事提交年度评审', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030112', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/expertRating', 'name': '/xxyy/excitingEvents/expertRating',
          'meta': { 'title': '中国渔业精彩赛事专家评分', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030113', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/logo/logoInfo', 'name': '/xxyy/logo/logoInfo',
          'meta': { 'title': '标识使用申请', 'menuPath': true, 'menuIcon': 'appstore', 'authCode': 'S030114', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/projectListSbPf/:id', 'name': '/xxyy/beautifulFish/projectListSbPf',
          'meta': { 'title': '中国最美渔村专家评分', 'authCode': 'S03010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/beautifulFish/projectListSbPfCheck/:id', 'name': '/xxyy/beautifulFish/projectListSbPfCheck/:id',
          'meta': { 'title': '中国最美渔村专家评分查看', 'authCode': 'S03010403', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/baseProjectListSbPf/:id', 'name': '/xxyy/demonstrationBase/baseProjectListSbPf',
          'meta': { 'title': '全国休闲渔业示范基地专家评分', 'authCode': 'S03010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/demonstrationBase/baseProjectListSbPfCheck/:id', 'name': '/xxyy/demonstrationBase/baseProjectListSbPfCheck',
          'meta': { 'title': '全国休闲渔业示范基地专家评分查看', 'authCode': 'S03010403', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/festProjectListSbPf/:id', 'name': '/xxyy/culturalFestivals/festProjectListSbPf',
          'meta': { 'title': '中国渔业优秀文化节庆会展专家评分', 'authCode': 'S03010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/culturalFestivals/festProjectListSbPfCheck/:id', 'name': '/xxyy/culturalFestivals/festProjectListSbPfCheck/:id',
          'meta': { 'title': '中国渔业优秀文化节专家评分查看', 'authCode': 'S03010403', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/eventProjectListSbPf/:id', 'name': '/xxyy/excitingEvents/eventProjectListSbPf',
          'meta': { 'title': '中国渔业精彩赛事专家评分', 'authCode': 'S03010402', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        },
        {
          'path': '/xxyy/excitingEvents/eventProjectListSbPfCheck/:id', 'name': '/xxyy/excitingEvents/eventProjectListSbPfCheck',
          'meta': { 'title': '中国渔业精彩赛事专家评分查看', 'authCode': 'S03010403', 'menuIcon': 'appstore', 'hideInBread': false, 'openMode': 'spa' }
        }
      ]
    },
    {
      path     : '/demo', name     : 'demo', component: demo,
      meta     : { title: 'demo', },
    },
    {
      path     : '/home/homeVeterinaryList', name     : 'homeVeterinaryList', component: VeterinaryList,
      meta     : { title: '兽医' },
    },
    {
      path     : '/home/veterinaryView', name     : 'homeVeterinaryView', component: VeterinaryView,
      meta     : { title: '数据服务' },
    },
    {
      path     : '/noauth', name     : 'noautherr', component: TipsNoAuth,
      meta     : { title: '没有权限', },
    },
    {
      path     : '/innerNetworkerr',
      name     : 'innerNetworkerr',
      component: TipsInnerNetworkErr,
      meta     : { title: '系统异常', },
    },
    {
      path     : '/person', name     : 'person', component: PersonCenter,
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
      path     : '/person/expert', name     : '/person/expert', component: LibraryEdit,
      meta     : { title: '专家个人信息维护' },
    },

    // 系统管理
    {
      path     : '/systemManagement', name     : 'systemManagement', component: contentWrapper,
      meta     : { title: '系统管理', menuPath: true, authCode: 'P00000', menuIcon: 'setting', hideInBread: true },
      children : [
        //专家抽取 样例
        {
          path     : '/systemManagement/extractExample',
          name     : '/systemManagement/extractExample',
          component: ExtractExample,
          meta     : { title: '专家抽取', menuPath: false, authCode: 'super', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
        },
        //角色权限配置
        {
          path     : '/systemManagement/permissionConfig',
          name     : '/systemManagement/permissionConfig',
          component: RolePermissionConfig,
          meta     : { title: '角色权限配置', menuPath: true, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children : [ {
            path     : '/systemManagement/permissionConfig/point',
            name     : '/systemManagement/permissionConfig/point',
            component: RolePermissionPoint,
            meta     : { title: '功能点管理', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
            children : [
              {
                path     : '/systemManagement/permissionConfig/point/add',
                name     : '/systemManagement/permissionConfig/point/add',
                component: RolePermissionAddPoint,
                meta     : { title: '添加功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              },
              {
                path     : '/systemManagement/permissionConfig/point/addBatch',
                name     : '/systemManagement/permissionConfig/point/addBatch',
                component: RolePermissionAddPointBatch,
                meta     : { title: '批量添加功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              },
              {
                path     : '/systemManagement/permissionConfig/point/edit',
                name     : '/systemManagement/permissionConfig/point/edit',
                component: RolePermissionEditPoint,
                meta     : { title: '编辑功能点', menuPath: false, authCode: 'super', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
              }
            ]
          },
          ]
        },
        // RoleManagement角色管理
        {
          path     : '/systemManagement/role',
          name     : '/systemManagement/role',
          component: RoleManagement,
          meta     : { title: '角色管理', menuPath: true, authCode: 'P02000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children : [ {
            path     : '/systemManagement/role/create',
            name     : '/systemManagement/role/create',
            component: RoleCreate,
            meta     : { title: '角色创建', menuPath: false, authCode: 'P02001', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
          },
          {
            path     : '/systemManagement/role/edit',
            name     : '/systemManagement/role/edit',
            component: RoleCreate,
            meta     : { title: '角色修改', menuPath: false, authCode: 'P02003', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
          },
          {
            path     : '/systemManagement/role/view',
            name     : '/systemManagement/role/view',
            component: RoleCreate,
            meta     : { title: '角色查看', menuPath: false, authCode: 'P02002', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' }
          },
          ]
        },
        // AdministratorManagement管理员管理
        {
          path     : '/systemManagement/administrator',
          name     : '/systemManagement/administrator',
          component: AdministratorManagement,
          meta     : { title: '用户管理', menuPath: true, authCode: 'P03000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children : [ {
            path     : '/systemManagement/administrator/createNewUser',
            name     : '/systemManagement/administrator/createNewUser',
            component: CreateNewUser,
            meta     : { title: '新增用户信息', menuPath: false, authCode: 'P03303', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          },
          {
            path     : '/systemManagement/administrator/editNewUser',
            name     : '/systemManagement/administrator/editNewUser',
            component: CreateNewUser,
            meta     : { title: '账户信息修改', menuPath: false, authCode: 'P03302', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          },
          {
            path     : '/systemManagement/administrator/edit',
            name     : '/systemManagement/administrator/edit',
            component: LibraryEdit,
            meta     : { title: '人员信息修改', menuPath: false, authCode: 'P11003', menuIcon: 'user', hideInBread: false, openMode: 'normal' }
          },
          {
            path     : '/systemManagement/administrator/newUserView',
            name     : '/systemManagement/administrator/newUserView',
            component: NewUserView,
            meta     : { title: '查看新用户信息', menuPath: false, authCode: 'P03301', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          },
          {
            path     : '/systemManagement/administrator/pendingView',
            name     : '/systemManagement/administrator/pendingView',
            component: PendingView,
            meta     : { title: '待分配权限查看', menuPath: false, authCode: 'P03101', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          },
          {
            path     : '/systemManagement/administrator/distribution',
            name     : '/systemManagement/administrator/distribution',
            component: Distribution,
            meta     : { title: '权限分配', menuPath: false, authCode: 'P03102', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          },
          ]
        },
        // 公共基础信息维护
        {
          path     : '/systemManagement/basic',
          name     : '/systemManagement/basic',
          component: SysBasicInfo,
          meta     : { title: '基础信息维护', menuPath: true, authCode: 'P04000', menuIcon: 'cluster', hideInBread: false, openMode: 'normal' },
          children : []
        },
      ]
    },
    //内容发布
    {
      path     : '/cms', name     : 'cms', component: contentWrapper,
      meta     : { title: '内容管理', menuPath: true, authCode: 'P30000', menuIcon: 'file-text', hideInBread: true },
      children : [
        {
          path     : '/cms/knowledge', name     : '/cms/knowledge', component: KnowledgeList,
          meta     : { title: '知识文库管理', menuPath: true, authCode: 'P32000', menuIcon: 'file-text', hideInBread: false },
          children : [
            {
              path     : '/cms/knowledge/create', name     : '/cms/knowledge/create', component: KnowledgeCreate,
              meta     : { title: '新建知识文献', menuPath: false, authCode: 'P32001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path     : '/cms/knowledge/edit/:id', name     : '/cms/knowledge/edit', component: KnowledgeEdit,
              meta     : { title: '修改知识文献', menuPath: false, authCode: 'P32001', menuIcon: 'file-text', hideInBread: false },
            }, {
              path     : '/cms/knowledge/:id', name     : '/cms/knowledge/details', component: KnowledgeDetail,
              meta     : { title: '查看知识文献详情', menuPath: false, authCode: 'P33003', menuIcon: 'file-text', hideInBread: false },
            }
          ]
        },
        {
          path     : '/cms/knowledgePublish', name     : '/cms/knowledgePublish', component: KnowledgePublishedList,
          meta     : { title: '知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
        },
        {
          path     : '/cms/notice', name     : '/cms/notice', component: NoticeList,
          meta     : { title: '通知公告管理', menuPath: true, authCode: 'P31000', menuIcon: 'file-text', hideInBread: false },
          children : [
            {
              path     : '/cms/notice/create', name     : '/cms/notice/create', component: NoticeCreate,
              meta     : { title: '新建通知公告', menuPath: false, authCode: 'P31001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path     : '/cms/notice/edit/:id', name     : '/cms/notice/edit', component: NoticeEdit,
              meta     : { title: '修改通知公告', menuPath: false, authCode: 'P31001', menuIcon: 'file-text', hideInBread: false },
            }, {
              path     : '/cms/notice/:id', name     : '/cms/notice/details', component: NoticeDetail,
              meta     : { title: '通知公告详情', menuPath: false, authCode: 'P31005', menuIcon: 'file-text', hideInBread: false },
            }
          ]
        },
        {
          path     : '/cms/manual', name     : '/cms/manual', component: ManualList,
          meta     : { title: '操作手册管理', menuPath: true, authCode: 'P34000', menuIcon: 'file-text', hideInBread: false },
          children : [
            {
              path     : '/cms/manual/file-list', name     : '/cms/manual/file-list', component: ManualFileList,
              meta     : { title: '操作手册列表', menuPath: false, authCode: 'P34000', menuIcon: 'file-text', hideInBread: false },
            },
          ],
        },
        {
          path     : '/cms/vote', name     : '/cms/vote', component: VoteList,
          meta     : { title: '投票管理', menuPath: true, authCode: 'P33000', menuIcon: 'file-text', hideInBread: false },
          children : [
            {
              path     : '/cms/vote/edit', name     : '/cms/vote/edit', component: VoteEdit,
              meta     : { title: '投票详情', menuPath: false, authCode: 'P33001', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path     : '/cms/vote/result', name     : '/cms/vote/result', component: VoteResult,
              meta     : { title: '投票结果预览', menuPath: false, authCode: 'P33005', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path     : '/cms/vote/view', name     : '/cms/vote/view', component: VoteView,
              meta     : { title: '投票信息查看', menuPath: false, authCode: 'P33003', menuIcon: 'file-text', hideInBread: false },
            },
            {
              path     : '/cms/vote/qr-list', name     : '/cms/vote/qr-list', component: VoteQrList,
              meta     : { title: '投票二维码列表', menuPath: false, authCode: 'P33000', menuIcon: 'file-text', hideInBread: false },
            },
          ]
        }
      ]
    },
  ],
},
{
  path     : '/login', name     : 'login', component: LoginPage,
  meta     : { title: '登录' },
},
{
  path     : '/register', name     : 'register', component: RegisterPage,
  meta     : { title: '注册' },
},
{
  path     : '/bindPhone', name     : 'bindPhone', component: BindPhone,
  meta     : { title: '选择系统绑定手机号', },
},
{
  path     : '/bindTemporarayAccount', name     : 'bindTemporarayAccount', component: BindTemporarayAccount,
  meta     : { title: '选择系统绑定手机号', },
},
{
  path     : '/oldSysLogout', name     : 'oldSysLogout', component: OldSysLogout,
  meta     : { title: '老系统安全登出', },
},
{
  path     : '/networkerr', name     : 'networkerr', component: TipsNetworkErr,
  meta     : { title: '网络错误', },
},
{
  path     : '/error-page', name     : 'error-page', component: ErrorPage,
  meta     : { title: '404', },
},
{
  path     : '/upperLimitErr', name     : 'upperLimitErr', component: TipsUpperLimitErr,
  meta     : { title: '访问频繁', },
},
// 匿名浏览知识文库
{ path     : '/cms/knowledgeAnonymous', name     : '/cms/knowledgeAnonymous', component: KnowledgePublishedAnonymousList,
  meta     : { title: '知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path     : '/cms/knowledgePublish/:id', name     : '/cms/knowledgePublish/view', component: KnowledgeView,
  meta     : { title: '浏览知识文献', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 浏览通知公告
{ path     : '/cms/noticePublish', name     : '/cms/noticePublish', component: NoticePublishedList,
  meta     : { title: '通知公告', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path     : '/cms/noticePublish/:id', name     : '/cms/noticePublish/view', component: NoticeView,
  meta     : { title: '浏览通知公告', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 浏览操作手册
{ path     : '/cms/manualPublish', name     : '/cms/manualPublish', component: ManualView,
  meta     : { title: '操作手册', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
// 渔业兽医
{ path     : '/veterinary', name     : '/veterinary', component: VeterinaryList,
  meta     : { title: '渔业兽医', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
{ path     : '/veterinary/view', name     : '/veterinary/view', component: VeterinaryView,
  meta     : { title: '渔业兽医', menuPath: false, menuIcon: 'file-text', hideInBread: false },
},
]

// import Axios from 'axios'
// import API from '@/server/api'
// // import store from '@/store'

// (async function loadMicRouter() {
//   let MicRouters = (await Axios.get(API.CONFIGS_MICSYSTEMS_ROUTERS)).data
//   let micSystemRoutersConfigs = Object.assign({},MicRouters)
//   // console.log(micSystemRoutersConfigs)

//   for(let key in micSystemRoutersConfigs){
//     for(let i=0;i<micSystemRoutersConfigs[key].length;i++){
//       let firstRouter = Object.assign({}, micSystemRoutersConfigs[key][i])
//       if(!!firstRouter.meta.openMode && firstRouter.meta.openMode == 'outsite') {
//         firstRouter['component'] = TipsOutsite
//       }else{
//         // firstRouter['component'] = contentWrapper
//       }
//       appRoutes[0].children.push(Object.assign({}, firstRouter))
//     }
//   }
//   // console.log('merged appRoutes',appRoutes)

// })()
export const routes = [
  ...appRoutes
]
