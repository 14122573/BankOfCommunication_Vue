<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot="title" align="middle">
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
		<a-form>
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
					<a-form-item label="地址" v-bind="formItemSingle">
						<a-input placeholder="请输入地址信息(格式要求:XX省XX市XX县XX乡镇XX路XX号)" @blur="handleSearchPoint" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址微调" v-bind="formItemSingle">
						<BMapComponent :height="250" :width="830" :keyWords="position" :position="positionXY" @on-result="gainSearchList"
						 @on-change="getNewAddress" />
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
          span: 8
        },
        wrapperCol: {
          span: 14
        },
      },
      formItemSingle: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 19
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
    handleSearchPoint(e) {
      const value = e.target.value
      this.position=value
    },
    //拖拽或点击获取新的地址
    getNewAddress(data, addressTemp) {},
    gainSearchList(val) {
      this.positionList = val.Ar
    }

  }
}
</script>

<style scoped>

</style>
