<template>
  <div>

  </div>
</template>

<script>
import {  permission } from '@/util/mixins'
export default {
  name: 'VerifyLogin',
  components: {
  },
  mixins: [permission],

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
              this.$router.push({name:'home'})
            }else{
              if(this.verOldSysAuth(checkResult)){
                this.$cookie.remove('token')
                this.$cookie.remove('refresh_token')
                this.$router.push({name:'bindPhone',query:{ logined:1 }})
              }else{
                this.$com.handleLogOut()
              }
            }
          }
        })
      }
    }
  },
  methods: {
    /**
     * 验证当前从老系统【安全退出】的用户，是否拥有老系统权限。并在有多个老系统权限的情况下，跳转重选系统界面
     * @param {Object} 当前用户下拥有的老系统清单
     * @return {Boolean} true：有多个老系统权限； false：没有或者有一个老系统权限
     */
    verOldSysAuth(oldSys){
      if(Array.isArray(oldSys) && oldSys.length>1){
        this.$cookie.set('canEnterBind', '200')
        this.$cookie.set('systemLists', oldSys)
        return true
      }else{
        return false
      }
    }
  }
}
</script>

