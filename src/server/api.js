let BASE_URL = ''
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
  BASE_URL = 'http://iftp.omniview.pro/api'
  break
default: // 默认环境下（开发环境）
  BASE_URL = 'http://fish.omniview.pro/api'
  // BASE_URL = 'http://iftp.omniview.pro/api'
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
  GET_ROLE_LIST: '/service-permission/perm/roles', //获取角色列表
  GET_ALL_ROLE: '/service-permission/perm/menu/tree', //获取权限
  ADD_ROLE_POST: '/service-permission/perm/role', // 新增角色
  ROLE_DETAIL: '/service-permission/perm/roles/{id}', // 查询角色权限
  PUT_CHARACTER: '/service-permission/perm/role/{id}', //编辑角色
  DELETE_CHARACTER: '/service-permission/perm/role/{id}', //删除角色
  USER_LIST_TYPE_GET: '/service-user/user/accounts/{type}', // 用户{type} old老用户列表   new-新用户列表
  SYSTEM_LIST_ALL_GET: '/service-user/user/systems', //查询系统列表
  CHECK_USER_STATUS: '/service-user/user/acct/{id}/status/{status}/{type}', //切换用户状态
}