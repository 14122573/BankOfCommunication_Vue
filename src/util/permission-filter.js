import store from '@/store'
import api from '@/server/api'

export const PermissionFilter = (value, vnode) => {
  value = value + ''
  if (store.state.hasAllRight) { // 如果有全部权限则一律通过
    return true
  }
  let isExist = false
  // 获取用户按钮权限
  // const btnPermissionsArr = vnode.context.$route.meta.btnPermission;
  const btnPermissionsArr = store.state.permissionCodeList

  if (!btnPermissionsArr || btnPermissionsArr.length<=0) {
    return false
  }
  if (btnPermissionsArr.indexOf(value) >= 0) {
    isExist = true
  }
  return isExist
}
