<template>
  <div></div>
</template>

<script>
export default {
  name      : 'VerifyLogin',
  components: {
  },
  data() {
    return {

    }
  },
  mounted() {
    let accessToken = this.$com.getQueryVariable('accessToken')
    let refreshToken = this.$com.getQueryVariable('refreshToken')
    if(!accessToken){
      this.$com.handleLogOut()
    }else{
      this.$com.setToken(accessToken,refreshToken)
      let checkResult = this.$com.checkOldSysAccounts(accessToken,refreshToken)
      if(!checkResult){
        this.$com.handleLogOut()
      }else{
        this.$ajax.get({
          url: this.$api.GET_USER_INFO
        }).then(res => {
          if(!res.data || !res.data.content){
            this.$com.handleLogOut()
          }else{
            let sysList = this.getLastOldSysAuth(checkResult,res.data.content.oldAccountSet)
            this.checkPortalAuth(sysList)
          }
        })
      }
    }
  },
  methods: {
    /**
     * 确定从cookie里获取的当前用户老系统权限信息是否是最新的。针对同一系统code，如果与从用户信息接口获得有差异，取新的，否则取cookie里的
     * @param {Object} orgOldSysList 从cookie里取出来的，登录绑定前获取到的老系统清单
     * @param {Object} newOldSysList 登录系统后，通过userInfo获取的最新老系统清单
     * @returns {Object} 组装好的最新的老系统权限
     */
    getLastOldSysAuth(orgOldSysList,newOldSysList){
      orgOldSysList = !orgOldSysList?[]:orgOldSysList
      newOldSysList = Array.isArray(newOldSysList)?newOldSysList:[]

      if(Array.isArray(orgOldSysList)){
        let resultSysList = []
        for(let i=0;i<orgOldSysList.length;i++){
          let oldSysItem = orgOldSysList[i]
          let isFound = false
          for(let j=0;j<newOldSysList.length;j++){
            let newSysItem = newOldSysList[j]
            if(oldSysItem.sysDic.sysCode == newSysItem.sysDic.sysCode ){
              resultSysList.push(newSysItem)
              isFound = true
            }
          }
          if(!isFound) {
            resultSysList.push(oldSysItem)
          }
        }
        return resultSysList
      }else {
        return []
      }
    },

    /**
     * 判断当前用户对于新老系统的权限情况，如果有系统权限跳转进入home，如有多个老系统权限进入系统选择，如果有一个老系统权限直接登出
     * @param {Object} oldSysList 已经准备好的最新老系统权限清单
     */
    checkPortalAuth(oldSysList){
      oldSysList = !oldSysList?[]:oldSysList

      this.$ajax.get({
        url: this.$api.GET_USER_PEIMISSION
      }).then(res=>{
        if(!res.data || !res.data.content){
          this.$com.handleLogOut()
        }else{
          let authCodes = res.data.content
          let hasNewSysAuth = false
          if(Array.isArray(authCodes)){
            if(authCodes.length ==0)
              for(let i=0;i<authCodes.length;i++){
                if(authCodes[i].indexOf('S')>0){
                  hasNewSysAuth = true
                }
              }
          }

          if(hasNewSysAuth){
            this.$router.push({ name: 'home' })
          }else{
            if(this.verOldSysAuth(oldSysList)){
              this.$cookie.remove('token')
              this.$cookie.remove('refresh_token')
              this.$router.push({ name: 'bindPhone',query: { logined: 1 } })
            }else{
              this.$com.handleLogOut()
            }
          }
        }
      })
    },

    /**
     * 验证当前从老系统【安全退出】的用户，是否拥有老系统权限。并在有多个老系统权限的情况下，跳转重选系统界面
     * @param {Object} oldSys 当前用户下拥有的老系统清单
     * @return {Boolean} true：有多个老系统权限； false：没有或者有一个老系统权限
     */
    verOldSysAuth(oldSys){
      if(Array.isArray(oldSys) && oldSys.length>1){
        this.$cookie.set('canEnterBind', '200')
        // this.$cookie.set('systemLists', oldSys)
        let chooseSystemLists = oldSys
        this.$store.commit('SET_CHOOSESYSLISTS', chooseSystemLists)
        return true
      }else{
        return false
      }
    }
  }
}
</script>

