export default {
  SET_LOADING(state, data) {
    state.showLoading = data
  },
  SET_MENU(state, {authMenuAll, authCodeList, isAllPerm}) {
    // console.log('SET_MENU',state,authMenuAll)
    state.menuList = JSON.parse(JSON.stringify(authMenuAll)) // 保存菜单
    // state.menuList = authMenuAll
    state.permissionCodeList = authCodeList // 保存权限code数组
    state.hasAllRight = isAllPerm // 保存是否拥有全部权限
  },
  SET_SHOWSPACONTENT(state, data) {
    state.showSpaContent = data
  },
}
