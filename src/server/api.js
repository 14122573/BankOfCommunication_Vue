let BASE_URL = ''
switch (process.env.NODE_ENV) {
case 'sit': // sit环境下
  BASE_URL = 'https://tw.devops.omniview.pro/api'
  break
case 'uat': // uat环境下
  BASE_URL = 'https://tw.devops.omniview.pro/api'
  break
case 'production': // 生产环境下
  BASE_URL = 'https://tw.devops.omniview.pro/api'
  break
default: // 默认环境下（开发环境）
  // BASE_URL = 'http://88.88.88.175:9080'
  BASE_URL = 'https://tw.devops.omniview.pro/api'
  break
};

export default {
  BASE_URL,
  GET_USER_INFO: '/service-user/user/login/user/info', // 获取用户信息	
  POST_LOGIN:BASE_URL+'/service-user/user/public/login',//登录
  POST_REGISTER:BASE_URL+'/service-user/user/public/register/acct',//注册
  GET_USER_PEIMISSION:BASE_URL+'/service-permission/perm/user/menus/code',//用户菜单权限
  GET_SEND_CODE:BASE_URL+'/service-user/user/public/send/bindPhone/{phone}',//发送验证码
  POST_CHECK_CODE:BASE_URL+'/service-user/user/public/bind/phone/check',//校验手机验证码 
  POST_BIND_USERINFO_UNBIND:BASE_URL+'/service-user/user/public/login/bind/info',//绑定用户信息 (false)
  POST_BIND_USERINFO_BIND:BASE_URL+'/service-user/user/public/bind/phone/check',//绑定用户信息 (true)
  GET_SELECT_SYSTEM:BASE_URL+'/service-user/user/public/login/chooseSys',//选择系统 
  GET_CHECK_PHONE:BASE_URL+'/service-user/user/public/check/phone/bind'//是否绑定
	
}
