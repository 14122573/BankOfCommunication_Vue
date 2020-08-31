export default {
  setContent(state, data) {
    state.content = data
  },
  setLoading(state, val) {
    state.showLoading = val
  },
  setRoutes(state, data) {
    state.routes = data
  },
  setWebviewSrc(state, src) {
    state.webviewSrc = src
  },
  SET_MICSYSTEMS_RESOURCE_CONFIG(state, micSystemRecourceConfig) {
    state.micSystemResourceConfig = JSON.parse(JSON.stringify(micSystemRecourceConfig)) // 保存配置信息
  },
  SET_LOADING_PROGRESS(state, { progress, len }) {
    state.isLoadingResource = true
    state.loadingProgress = Number(((progress / len) * 100).toFixed(0))
    if (progress >= len) {
      state.isLoadingResource = false
    }
  },
  SET_LOADING(state, data) {
    state.showLoading = data
  },
  SET_MENU(state, { authMenuAll, authCodeList, isAllPerm }) {
    state.menuList = JSON.parse(JSON.stringify(authMenuAll)) // 保存菜单
    state.permissionCodeList = authCodeList // 保存权限code数组
    state.hasAllRight = isAllPerm // 保存是否拥有全部权限
  },
  SET_USERNAME(state, name) {
    state.userName = name
  },
  SET_USERINFO(state, userInfo) {
    state.userInfos = JSON.parse(JSON.stringify(userInfo))
  },
  SET_CLEAR(state) {
    state.token = null
    state.showLoading = false
    state.menuList = []
    state.permissionCodeList = []
    state.hasAllRight = false
    state.userName = ''
    state.userInfos = null
  },
  SET_DEFAULTMENU_STATUS(state, data) { // 菜单的默认展开、选中状态
    state.defaultMenuStatus = data
  },
  SET_TABNAME(state, data) {
    state.tabName = data
    console.log('SET_TABNAME', state.tabName,data)
  },
  SET_SEARCHPARAMS(state, searchParams) {
    state.listSearchParams[searchParams.routeName] = JSON.parse(JSON.stringify(searchParams))
  },
  SET_CHOOSESYSLISTS(state, chooseSystemLists) {
    state.chooseSystemLists = JSON.parse(JSON.stringify(chooseSystemLists))
  },
  SET_ISLOGIN(state, isLogin) {
    state.isLogin = isLogin
  },
  SET_HOMESECTION_TITLE(state, titleList) {
    state.titleList = titleList
  }
}
