<template>
<div class="routerWapper">
	<div v-if="$route.name == '/expertManagement/base'" class="layoutMargin layoutPadding" >
		<a-tabs :animated="false" :activeKey="key" @change="rememberTab">
			<a-tab-pane v-if="$permission('P14010')" tab="民族" key="expertBase0">
				<ProfessionalTitle :baseType='"0"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14020')" tab="单位性质" key="expertBase1">
				<ProfessionalTitle :baseType='"1"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14030')" tab="职务" key="expertBase2">
				<ProfessionalTitle :baseType='"2"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14040')" tab="职称" key="expertBase3">
				<ProfessionalTitle :baseType='"3"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14050')" tab="学历" key="expertBase4">
				<ProfessionalTitle :baseType='"4"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14060')" tab="学位" key="expertBase5">
				<ProfessionalTitle :baseType='"5"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14070')" tab="工作领域" key="expertBase6">
				<ProfessionalTitle :baseType='"6"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14080')" tab="专业组别" key="expertBase7">
				<ProfessionalTitle :baseType='"7"' />
			</a-tab-pane>
			<a-tab-pane v-if="$permission('P14090')" tab="研究方向" key="expertBase8">
				<ProfessionalTitle :baseType='"8"' />
			</a-tab-pane>
		</a-tabs>
	</div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import ProfessionalTitle from './components/list'
export default {
  name      : 'ExpertBase',
  components: {
    ProfessionalTitle,
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
      if (from.name!=null&&from.path.indexOf('/expertManagement/base') == -1) {
        vm.$store.commit('SET_TABNAME', 'expertBase0')
      }
    })
  }
}
</script>
