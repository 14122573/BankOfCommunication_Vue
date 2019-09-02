<template>
    <a-card :style="{margin:'0px 0 0 14px'}" :bordered="false">
        <a-tabs :animated="false" :activeKey="key" @change="callback">
            <a-tab-pane tab="待分配权限" key="1">
                <PendingPermissions/>
            </a-tab-pane>
            <a-tab-pane tab="老用户管理" key="2">
              <OldUser :roleList="roleList"/>
            </a-tab-pane>
            <a-tab-pane tab="新用户管理" key="3">
                <NewUser :roleList="roleList"/>
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>
<script>
import PendingPermissions from './pending-permissions'
import OldUser from './old-user'
import NewUser from './new-user'
export default {
  name:'Administrator',
  components: {
    PendingPermissions,OldUser,NewUser
  },
  data(){
    return{
      key:'1',
      roleList:[]
    }
  },
  methods:{
    callback(keyName){
      this.key=keyName
    },  
    // 查询角色列表
    getRoleList(){
      this.$ajax.get({
        url:this.$api.GET_ROLE_LIST,
        params:{
          pageNo:1,
          pageSize:10000
        }
      })
        .then(res=>{
          if(res.code === '200'){
            let data=res.data.content
            this.roleList=data.map(item=>{
              return{
                label:item.roleName,
                value:item.id
              }
            })
          }else{
            this.$message.error(res.msg)
          }
        })
    },
  },
  mounted(){
    this.getRoleList()
  },
  beforeRouteEnter(to, from, next){
    let key
    if(from.name !== null && (from.name.indexOf('newUserView') != -1 || from.name.indexOf('createNewUser') != -1 || from.name.indexOf('editNewUser') != -1)){
      key='3'
    }else{
      key='1'
    }
    next(vm=>{
      vm.key=key
    })
  } 
}
</script>

