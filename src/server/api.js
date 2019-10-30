let BASE_URL = '',MOCK_URL=''
switch (process.env.NODE_ENV) {
case 'devol': // 本地线上部署环境下
  BASE_URL = 'http://fish.omniview.pro/api'
  break
case 'sit': // sit环境下
  BASE_URL = 'http://iftp.omniview.pro/api'
  break
case 'uat': // uat环境下
  BASE_URL = 'http://fish.szjoin.net/api'
  break
case 'production': // 生产环境下
  BASE_URL = 'http://znyj.nftec.agri.cn/api'
  break
default: // 默认环境下（开发环境）
  // BASE_URL = 'http://fish.omniview.pro/api'
  BASE_URL = 'http://iftp.omniview.pro/api'
  MOCK_URL = 'http://47.100.45.230:30000/mock/267'
  break
};

export default {
  BASE_URL,
  GET_USER_INFO: '/service-user/user/login/user/info', // 获取用户信息
  POST_LOGIN: '/service-user/user/public/login', //登录
  POST_LOGOUT: '/service-user/user/logout', //登出
  POST_REGISTER: '/service-user/user/public/register/acct', //注册
  CHECKTOKEN_POST: '/service-user/user/scrt/check/token', //验证token是否有效
  REFRESH_TOKEN_POST: '/service-user/user/public/refresh/token', //刷新token
  GET_USER_PEIMISSION: '/service-permission/perm/user/menus/code', //用户菜单权限
  GET_SEND_CODE: '/service-user/user/public/send/bindPhone/{phone}', //发送验证码
  POST_CHECK_CODE: '/service-user/user/public/bind/phone/check', //校验手机验证码
  POST_BIND_USERINFO_UNBIND: '/service-user/user/public/login/bind/info', //绑定用户信息 (false)
  POST_BIND_USERINFO_BIND: '/service-user/user/public/bind/phone', //绑定用户信息 (true)
  GET_SELECT_SYSTEM: '/service-user/user/public/login/chooseSys', //选择系统
  GET_CHECK_PHONE: '/service-user/user/public/check/phone/bind', //是否绑定
  POST_FIND_PASSWORD: '/service-user/user/public/forget/pwd', //找回密码
  GET_CODE: '/service-user/user/public/captcha/code', //得到验证码
  GET_CHECK_PHONE_EXIST: '/service-user/user/public/check/phone/exist', //判断手机是否存在
  GET_PHONE_CODE: '/service-user/user/public/send/{type}/{phone}', // 发送验证码 （用于注册、忘记密码）
  POST_CHECK_PHONE_CODE: '/service-user/user/public/check/{type}/{phone}/{code}', // 验证手机验证码 （用于注册、忘记密码）
  PUT_PERSONAL_RESET_PWD: 'service-user/user/pwd', // 个人中心重置密码

  // 系统配置
  // 系统配置 -- 权限配置管理
  POST_PREMSBRANCH: '/service-permission/perm/perm', //单个新增权限分支
  PUT_PREMSBRANCH: '/service-permission/perm/perm/{id}', //修改权限分支
  DELETE_PREMSBRANCH: '/service-permission/perm/perm/{id}', //删除权限分支
  GET_PREMSPOINT_LIST: '/service-permission/perm/points', //获取功能点清单
  POST_PREMSPOINT: '/service-permission/perm/point', //单个添加功能点
  POST_PREMSPOINT_BATCH: '/service-permission/perm/point/batch', //批量添加功能点
  PUT_PREMSPOINT: '/service-permission/perm/point/{id}', //修改功能点
  DELETE_PREMSPOINT: '/service-permission/perm/point/{id}', //删除功能点
  GET_CHECK_POINTCODE_EXIT: '/service-permission/perm/pointKey/repeat', //确认功能码是否已存在
  // 系统配置 -- 角色管理
  GET_ROLE_LIST: '/service-permission/perm/roles', //获取角色列表
  GET_ALL_ROLE: '/service-permission/perm/menu/tree', //获取权限
  ADD_ROLE_POST: '/service-permission/perm/role', // 新增角色
  ROLE_DETAIL: '/service-permission/perm/roles/{id}', // 查询角色权限
  PUT_CHARACTER: '/service-permission/perm/role/{id}', //编辑角色
  DELETE_CHARACTER: '/service-permission/perm/role/{id}', //删除角色
  USER_LIST_TYPE_GET: '/service-user/user/accounts/{type}', // 用户{type} old老用户列表   new-新用户列表
  SYSTEM_LIST_ALL_GET: '/service-user/user/systems', //查询系统列表
  CHECK_USER_STATUS: '/service-user/user/acct/{id}/status/{status}/{type}', //切换用户状态
  GET_AREA_NEXT: '/service-user/user/area/next', //获取下级地区
  USER_ACCOUNT_DETAIL: '/service-user/user/account/{id}', //待分配权限详情
  GET_ORGANIZATION_LIST: '/service-permission/perm/groups', //组织机构列表
  CONFIG_ROLES_TO_USER: '/service-user/user/config/roles', //给用户分配权限
  USER_UPDATE_PWD: '/service-user/user/update/pwd', //管理员修改密码
  POST_ADD_USER: '/service-user/user/account', //管理员新增用户
  GET_USER_DETAIL: '/service-user/user/account/{id}', //新用户详情
  PUT_USER_LIST: '/service-user/user/account/{id}', //新用户修改
  POST_ADD_ORGANIZATION_LIST: '/service-permission/perm/group', //新增组织机构
  PUT_EDIT_ORGANIZATION_LIST: '/service-permission/perm/group/{id}', //修改组织机构
  DELETE_ORGANIZATION_LIST: '/service-permission/perm/group/{id}', //删除组织机构
  GET_ORGANIZATION_LIST_DETAIL: '/service-permission/perm/group/{id}', //组织机构详情
  // 系统配置 --- 基础信息
  GET_SYSBASICINFO_BREED_LIST: '/service-expert/expert/breed', // 获取水产品种大类列表
  POST_SYSBASICINFO_BREED: '/service-expert/expert/breed', //新增水产品种大类
  PUT_SYSBASICINFO_BREED: '/service-expert/expert/breed/{id}', //修改水产品种大类
  DELETE_SYSBASICINFO_BREED: '/service-expert/expert/breed/{id}', //删除水产品种大类
  // 专家管理
  GET_EXPERT_BASE_LIST: '/service-expert/expert/dictionary/{type}', //专家字典信息列表接口，type: 0-民族 1-单位性质 2-职务 3-职称 4-学历 5-学位 6-工作领域 7-专业组别 8-研究方向
  POST_EXPERT_BASE: '/service-expert/expert/dictionary', //新增专家字典信息列表接口，
  PUT_EXPERT_BASE: '/service-expert/expert/dictionary/{id}', //修改专家字典信息列表接口，
  DELETE_EXPERT_BASE: '/service-expert/expert/dictionary/{id}', //删除专家字典信息列表接口，
  GET_EXPERT_LIST: '/service-expert/expert/expert', //专家库列表
  GET_EXPERT_DETAIL: '/service-expert/expert/expert/{experId}', //专家库明细
  DICTIONARY_TYPE_GET: '/service-expert/expert/dictionary/{type}', //字典
  EXPORT_TYPE: '/service-expert/expert/expert', //新增专家人员
  PUT_CHANGE_EXPERT: '/service-user/user/become/expert', //成为专家
  GET_USER_EXPERT_LIST: '/service-user/user/accounts/new/expert',
  IMPORT_EXPERT_ALL: '/service-expert/expert/expert/import', //专家库导入
  EXPORT_TYPE_EDIT: '/service-expert/expert/expert/{experId}',
  UPLOAD_TEMP: '/zuul/service-file/file/upload/1/temp', //上传图片
  TEMPLAT_DOWNLOAD_EXPERT_AND_TALENT: '/template/导入模版.xlsx', //专家库人才库导入模板下载
  // 专家管理--项目评审
  GET_EXPERT_REVIEW_TODO_LIST: '/service-expert/expert/extract/{expertId}', //获取当前接口传参专家需要评审的数据,? status:0-未完成 1-完成 null/""-全部
  // 内容发布-知识库
  GET_CMS_KNOWLEDGE_LIST: MOCK_URL+'/service-release/release/knowledge', //获取知识库文档列表
  POST_CMS_KNOWLEDGE: MOCK_URL+'/service-release/release/knowledge', //新建知识文档
  GET_CMS_KNOWLEDGE_DETAIL: MOCK_URL+'/service-release/release/knowledge/{id}', //获取知识库详情信息
  PUT_CMS_KNOWLEDGE_DETAIL: MOCK_URL+'/service-release/release/knowledge/{id}', //修改知识库详情信息
  DELETE_CMS_KNOWLEDGE: MOCK_URL+'/service-release/release/knowledge/{id}', //删除单条知识库文档
  PUT_CMS_KNOWLEDGE_STATUS: MOCK_URL+'/service-release/release/knowledge/{id}/{status}', //修改单条知识库文档状态
  // 内容发布-投票管理
  GET_VOTE_LIST: MOCK_URL + '/service-release/release/public/vote', // 获取投票列表
  POST_ADD_VOTE: MOCK_URL + '/service-release/release/vote', // 新增投票
  GET_VOTE_DETAIL: MOCK_URL + '/service-release/release/public/vote/{id}', // 获取投票详情
  GET_VOTE_VIEW: MOCK_URL + '/service-release/release/vote/result/{id}', // 查看投票信息
  PUT_EDIT_VOTE: MOCK_URL + '/service-release/release/vote/{id}', // 修改投票
  DELETE_VOTE: MOCK_URL + '/service-release/release/vote/{id}', // 删除投票
  PUT_VOTE_STATUS: MOCK_URL + '/service-release/release/vote/{id}/{status}', // 修改投票的状态
  GET_VOTE_RESULT: MOCK_URL + '/service-release/release/vote/result/count/{id}', // 获取投票结果公示
}
