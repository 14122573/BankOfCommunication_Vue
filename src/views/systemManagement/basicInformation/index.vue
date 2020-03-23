<template>
<div class="routerWapper">
	<div v-if="$route.name == '/systemManagement/basic'" class="layoutMargin layoutPadding" >
		<a-tabs :animated="false" :activeKey="key" @change="rememberTab">
			<a-tab-pane v-if="$permission('P04100')" tab="水产品种大类" key="breed">
				<basicInfo :baseType='"breed"' />
			</a-tab-pane>
      <a-tab-pane v-if="$permission('P04200')" tab="行政区划" key="division">
				<Administrative />
			</a-tab-pane>
		</a-tabs>
	</div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import basicInfo from './components/list'
import Administrative from './administrative/list'
export default {
  name: 'SysBasic',
  components: {
    basicInfo,
    Administrative,
  },
  data() {
    return {
    }
  },
  methods: {
    rememberTab(key) {
      this.$store.commit('SET_TABNAME', key)
    },
  },
  computed: {
    key() {
      return this.$store.state.tabName
    }
  },
  mounted() {

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name!=null&&from.path.indexOf('/systemManagement/basic') == -1) {
        vm.$store.commit('SET_TABNAME', 'breed')
      }
    })
  }
}
</script>
