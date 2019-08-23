<template>
    <a-card :bordered="false">
        <a-tabs :animated="false" :defaultActiveKey="key" @change="callback">
            <a-tab-pane tab="待分配权限" key="1">
                <PendingPermissions/>
            </a-tab-pane>
            <a-tab-pane tab="老用户管理" key="2">

            </a-tab-pane>
            <a-tab-pane tab="新用户管理" key="3">
                <NewUser/>
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
      key:'1'
    }
  },
  methods:{
    callback(){

    }
  }
}
</script>

