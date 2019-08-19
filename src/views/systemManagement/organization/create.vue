<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" align="middle">
			<a-col>组织机构创建</a-col>
			<a-col>
				<a-button type="primary" ghost @click="handleReturn">
					取消
				</a-button>
				<a-button type="primary" @click="handleSave">
					保存
				</a-button>
			</a-col>
		</a-row>
		<a-form layout="inline">
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="组织机构名称" v-bind="formItemLayout">
						<a-input placeholder="组织机构名称" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系人" v-bind="formItemLayout">
						<a-input placeholder="联系人" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系电话" v-bind="formItemLayout">
						<a-input placeholder="联系电话" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="单位类型" v-bind="formItemLayout">
						<a-input placeholder="单位类型" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="所属行政区域" v-bind="formItemLayout">
						<a-input placeholder="所属行政区域" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址" v-bind="formItemLayout">
						<a-input placeholder="地址" v-model="position" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址微调">
						<BMapComponent :height="250" :width="830" :keyWords="position" :position="positionXY" @on-change="getNewAddress" />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
</template>

<script>
import BMapComponent from '@/components/BaiduMap/BMapComponent.vue'
export default {
  components: {
    BMapComponent
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 2
        },
        wrapperCol: {
          span: 8
        },
      },
      position: '',
      positionXY: {},
    }
  },
  methods: {
    handleSave() {

    },
    handleReturn() {},
    //拖拽或点击获取新的地址
    getNewAddress(data, addressTemp) {},

  }
}
</script>

<style scoped>

</style>
