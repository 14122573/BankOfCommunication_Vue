<template>
<div class="routerWapper">
	<div v-if="$route.name == '/cms/homepageInfoMaintain'" class="layoutMargin layoutPadding" >
		<a-tabs :animated="false" defaultActiveKey="1" @change="callback">
			<!-- <a-tab-pane v-if="$permission('P03100')" tab="待分配权限" key="1">
				<Pendingpermissions />
			</a-tab-pane> -->
			<a-tab-pane tab="栏目管理" key="1">
				<titleManage />
			</a-tab-pane>
			<a-tab-pane tab="横幅图管理" key="2">
				<bannerManage />
			</a-tab-pane>
		</a-tabs>
  </div>
	<RouterWapper v-else></RouterWapper>
</div>
</template>

<script>
import titleManage from './titleManage'
import bannerManage from './bannerManage'
export default {
  data() {
    return {
      roleList: []
    }
  },
  components: {
    titleManage,
    bannerManage
  },
  methods: {
    callback(key) {
      this.$store.commit('SET_TABNAME', key)
    },
  }
}
</script>