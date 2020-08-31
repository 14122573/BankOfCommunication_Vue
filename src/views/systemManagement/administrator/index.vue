<template>
<div class="routerWapper">
	<div v-if="$route.name == '/systemManagement/administrator'" class="layoutMargin layoutPadding" >
		<a-tabs :animated="false" :defaultActiveKey="2"  :activeKey="tabKey" @change="callback">
			<!-- <a-tab-pane v-if="$permission('P03100')" tab="待分配权限" key="1">
				<Pendingpermissions />
			</a-tab-pane> -->
			<a-tab-pane v-if="$permission('P03200')" tab="老用户管理" key="1">
				<OldUser :roleList="roleList" />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P03300')" tab="新用户管理" key="2">
				<NewUser :roleList="roleList" />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P03400')" tab="临时账户管理" key="3">
				<TempUser :roleList="roleList" />
			</a-tab-pane>
		</a-tabs>
	</div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import Pendingpermissions from './pending-permissions'
import OldUser from './old-user'
import NewUser from './new-user'
import TempUser from './tempAccount/temp-user'
export default {
  name      : 'Administrator',
  components: {
    Pendingpermissions,
    OldUser,
    NewUser,
    TempUser
  },
  data() {
    return {
      tabKey  : this.$com.oneOf(this.$store.state.tabName, [ '1', '2', '3' ])?this.$store.state.tabName:'2',
      roleList: []
    }
  },
  methods: {
    callback(key) {
      this.tabKey = key
      this.$store.commit('SET_TABNAME', key)
    },
    // 查询角色列表
    getRoleList() {
      this.$ajax.get({
        url   : this.$api.GET_CHOOSE_ROLE_LIST,
        params: {
          pageNo  : 1,
          pageSize: 10000
        }
      }).then(res => {
        if (res.code === '200') {
          const data = res.data.content
          this.roleList = data.map(item => {
            return {
              label: item.roleName,
              value: item.id
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  },
  mounted() {
    this.getRoleList()
  },
}
</script>
