import {
  routes
} from '@/router/routes.js'
import common from '@/util/common'

export const permission = {
  methods: {
    /**
     * 调用API获取当前用户信息，并根据组装左侧菜单数据，存入vuex
     */
    getInfo() {
      this.$ajax.get({
        url: this.$api.GET_USER_INFO,
        params: {}
      }).then(res => {
        console.log(res)
        // 本地存储用户基本信息
        let userInfo = res.data.content,
          name = userInfo.username = res.data.content.name||res.data.content.phone
        this.$cookie.set('userInfo', userInfo)
        this.$cookie.set('userName', name)
        this.$store.commit('SET_USERNAME', name)

        // 此处应API获取用户权限信息，先暂写死权限信息
        this.$ajax.get({
          url: this.$api.GET_USER_PEIMISSION,
          params: {}
        }).then(res=>{
          // todo: 目前写死权限，是否有全部权限
          const isAllPerm = false
          // 当前用户全部权限编码，包含菜单及功能操作
          let authCodeList = [ 'S0501', 'S050101', 'S050102', 'S050102', 'S050103', 'S050104', 'S050105', 'S050106', 'S050107', 'SCYJ','YQCB','NYPC','ZXJC' ]
          let authMenuAll = []
          // 写入vuex
          this.$store.commit('SET_MENU', {authMenuAll , authCodeList, isAllPerm})
          // 根据获取的权限信息，从router中获取左侧菜单信息，并重新赋值vuex
          this.getPermission(isAllPerm)
        })

      })
    },
    /**
     * 组装左侧菜单
     * @param {Boolean} isAllPerm
     */
    getPermission(isAllPerm){
      // 如果有菜单了就不重复获取了（除非刷新）
      if (this.$store.state.menuList && this.$store.state.menuList.length > 0) return

      // vuex中不存在，需重新获取
      let authMenuAll = []

      if(isAllPerm){ //有全部权限

        authMenuAll = getSideMenu(routes)
        this.$store.commit('SET_MENU', {authMenuAll, authCodeList, isAllPerm})
      }else { // 只有部分权限，需根据权限码组装菜单

        // 从vuex中取出存入的权限码，若不存在重新声明
        let authCodeList = this.$store.state.permissionCodeList ? this.$store.state.permissionCodeList:[]

        if(authCodeList.length>0){ //vuex中存有权限码信息

          authMenuAll = getSideMenu(routes,authCodeList)
          this.$store.commit('SET_MENU', {authMenuAll, authCodeList, isAllPerm})
        }else{ // vuex中不存在权限码信息，需重新调用接口再获取

          this.$ajax.get({
            url: this.$api.GET_USER_PEIMISSION,
            params: {}
          }).then(res=>{
            // todo:调用权限获取接口，重新获取权限编码
            let authCodeList = [ 'S0501', 'S050101', 'S050102', 'S050102', 'S050103', 'S050104', 'S050105', 'S050106', 'S050107', 'SCYJ','YQCB','NYPC','ZXJC' ]
            authMenuAll = getSideMenu(routes,authCodeList)
            this.$store.commit('SET_MENU', {authMenuAll, authCodeList, isAllPerm})
          })
        }
      }
    },
    /**
     * 判断要目标路由是否需要在面包屑中隐藏
     * @param {String} routerName 路由名称，即router.name
     * @returns {Boolean} true为需要隐藏
     */
    hideInBread(routerName){
      if(!routerName) return false
      let targetRouter = findRouerByName(routes,routerName)
      if( targetRouter && targetRouter.meta && targetRouter.meta.hideInBread){
        return true
      }else{
        return false
      }
    }
  }
}

function checkHideInBread(routerName) {
  routerName = routerName ? routerName : ''

  let targetRouter = findRouerByName(routes, routerName)
  if (targetRouter && targetRouter.meta && targetRouter.meta.hideInBread) {
    return true
  } else {
    return false
  }
}
export {
  checkHideInBread
}
/**
 * 递归遍历所有router，找到某一个router节点
 * @param {Array} allRouter 某一层级的route节点,必传
 * @param {String} routerName 需要查找的路由有名称
 * @returns {Object} 与routerName相同的路由节点
 */
function findRouerByName(allRouter, routerName) {
  routerName = routerName ? routerName : ''
  let targetRouter
  allRouter.forEach((router) => {
    if (routerName === router.name) {
      targetRouter = {
        path: router.path,
        name: router.name,
        meta: router.meta
      }

      return targetRouter
    } else {
      if (router.children && router.children.length > 0) {
        let target = findRouerByName(router.children, routerName)
        if (target && target.name) {
          targetRouter = {
            path: target.path,
            name: target.name,
            meta: target.meta
          }
          if (targetRouter.name) { //判断当前target是否为 null 或 undefined
            return targetRouter
          }
        }
      }
    }
  })
  return targetRouter
}
/**
 * 递归遍历所有router，根据权限code，组装左侧菜单需展示router数据
 * @param {Array} allRouter 某一层级的route节点,必传
 * @param {Array} authCodeList 当前用户全部权限code
 * @returns {Array} 根据当前传入节点，组装的左侧菜单数组
 */
function getSideMenu(allRouter, authCodeList) {
  let authMenu = []
  authCodeList = authCodeList ? authCodeList : []

  allRouter.forEach((router) => {
    let menu = {}
    if (router.meta && router.meta.menuPath) {
      if (router.meta.authCode) {
        if (common.oneOf(router.meta.authCode, authCodeList)) {
          menu = {
            name: router.name,
            meta: router.meta
          }
        }
      } else {
        menu = {
          name: router.name,
          meta: router.meta
        }
      }
    }
    if (router.children && router.children.length > 0) {
      let children = getSideMenu(router.children, authCodeList)
      if (children.length > 0) {
        menu.children = children
        if (!menu.name) {
          authMenu = children
          return authMenu
        }
      }
    }
    if (menu.name) {
      authMenu.push(menu)
    }
  })
  return authMenu
}
