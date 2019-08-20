export default {
  SET_LOADING(state, data) {
    state.showLoading = data
  },
  SET_MENU(state, {authMenuAll, authCodeList, isAllPerm}) {
    state.menuList = JSON.parse(JSON.stringify(authMenuAll)) // 保存菜单
    state.permissionCodeList = authCodeList // 保存权限code数组
    state.hasAllRight = isAllPerm // 保存是否拥有全部权限
  },
  SET_SHOWSPACONTENT(state, data) {
    state.showSpaContent = data
  },
  SET_USERNAME(state, name) {
    state.userName = name
  },
  SET_CLEAR(state) {
    state.token =null
    state.showLoading=false
    state.menuList=[]
    state.permissionCodeList=[]
    state.hasAllRight=false
    state.showSpaContent=false
    state.userName=''
  },
}
