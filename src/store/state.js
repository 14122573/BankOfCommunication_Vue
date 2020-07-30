export default {
  content                : null,
  showLoading            : false,
  routes                 : [],
  webviewSrc             : null,
  micSystemResourceConfig: null, // 需要加载子系统的资源地址配置信息
  isLoadingResource      : true, // 首次登陆显示加载子项目
  loadingProgress        : 0, // 首次登陆加载子项目进度条进度
  token                  : null,
  // showLoading            : false,
  menuList               : [],
  permissionCodeList     : [],
  hasAllRight            : false,
  userName               : '',
  userInfos              : null,
  defaultMenuStatus      : {
    defaultSelectedKeys: [],
    defaultOpenKeys    : [],
  },
  tabName          : '',
  listSearchParams : {},
  chooseSystemLists: [],
  isLogin          : false,
  homeSectionTitle : []
}
