<template>
<div class="">
	<div v-if="$route.name == '/systemManagement/basic'" class="layoutMargin" >
    <a-collapse defaultActiveKey="breed" :bordered="false" style="background:#eff1f4;">
      <template v-slot:expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template>
      <a-collapse-panel  v-if="$permission('P04100')" header="水产品种大类" key="breed" :style="customStyle">
        <basicInfo :baseType='"breed"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14010')" header="民族" key="expertBase0" :style="customStyle">
        <ProfessionalTitle :baseType='"0"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14020')" header="单位性质" key="expertBase1" :style="customStyle">
        <ProfessionalTitle :baseType='"1"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14030')" header="职务" key="expertBase2" :style="customStyle">
        <ProfessionalTitle :baseType='"2"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14040')" header="职称" key="expertBase3" :style="customStyle">
        <ProfessionalTitle :baseType='"3"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14050')" header="学历" key="expertBase4" :style="customStyle">
        <ProfessionalTitle :baseType='"4"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14060')" header="学位" key="expertBase5" :style="customStyle">
        <ProfessionalTitle :baseType='"5"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14070')" header="工作领域" key="expertBase6" :style="customStyle">
        <ProfessionalTitle :baseType='"6"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14080')" header="专业组别" key="expertBase7" :style="customStyle">
        <ProfessionalTitle :baseType='"7"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P14090')" header="研究方向" key="expertBase8" :style="customStyle">
        <ProfessionalTitle :baseType='"8"' />
      </a-collapse-panel>
      <a-collapse-panel v-if="$permission('P04200')" header="行政区划" key="division" :style="customStyle">
        <Administrative />
      </a-collapse-panel>
    </a-collapse>

		<!-- <a-tabs :animated="false" :activeKey="key" @change="rememberTab">
			<a-tab-pane v-if="$permission('P04100')" tab="水产品种大类" key="breed">
				<basicInfo :baseType='"breed"' />
			</a-tab-pane>
      <a-tab-pane v-if="$permission('P04200')" tab="行政区划" key="division">
				<Administrative />
			</a-tab-pane>
		</a-tabs> -->
	</div>
  <RouterWapper v-else></RouterWapper>
</div>
</template>
<script>
import basicInfo from './components/list'
import Administrative from './administrative/list'
import ProfessionalTitle from './../../expertManagement/base/components/list'
export default {
  name: 'SysBasic',
  components: {
    basicInfo,
    Administrative,
    ProfessionalTitle,
  },
  data() {
    return {
      customStyle: 'background: #fff; ;margin-bottom: 12px;border: 0;overflow: hidden',
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
