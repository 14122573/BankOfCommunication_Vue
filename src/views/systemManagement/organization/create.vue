<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot="title" align="middle">
			<a-col>组织机构创建</a-col>
			<a-col>
				<a-button type="primary" ghost @click="handleReturn">
					取消
				</a-button>
				<a-button type="primary" @click="handleSave" html-type="submit">
					保存
				</a-button>
			</a-col>
		</a-row>
		<a-form :form="organizationForm" :hideRequiredMark='true'>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="组织机构名称" v-bind="formItemLayout">
						<a-input v-decorator="[
										 'name',
										 { rules: [{ required: true,whitespace:true, message: '请输入组织机构名称!' }] }
									 ]"
						 placeholder="组织机构名称" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系人" v-bind="formItemLayout">
						<a-input v-decorator="[
										 'contractName',
										 { rules: [{ required: true,whitespace:true, message: '请输入联系人!' }] }
									 ]"
						 placeholder="联系人" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系电话" v-bind="formItemLayout">
						<a-input v-decorator="[
										 'phone',
										 { rules: [{ required: true,whitespace:true, message: '请输入联系电话!' }] }
									 ]"
						 placeholder="联系电话" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="单位类型" v-bind="formItemLayout">
						<a-input v-decorator="[
										 'type',
										 { rules: [{ required: true,whitespace:true, message: '请输入单位类型!' }] }
									 ]"
						 placeholder="单位类型" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="所属行政区域" v-bind="formItemLayout">
						<a-input v-decorator="[
										 'area',
										 { rules: [{ required: true,whitespace:true, message: '请输入所属行政区域!' }] }
									 ]"
						 placeholder="所属行政区域" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址" v-bind="formItemSingle">
						<a-input v-decorator="[
										 'address',
										 { rules: [{ required: true,whitespace:true, message: '请输入地址!' }] }
									 ]"
						 placeholder="请输入地址信息(格式要求:XX省XX市XX县XX乡镇XX路XX号)" @blur="handleSearchPoint" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址微调" v-bind="formItemSingle">
						<BMapComponent :height="250" :width="830" :keyWords="position" @on-change="getNewAddress" />
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
  beforeCreate() {
    this.organizationForm = this.$form.createForm(this)
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
    }
  },
  methods: {
    handleSave() {
			
      this.organizationForm.validateFields((err, values) => {
        if (!err) {
					
        }
      })
    },
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/organization'
      })
    },
    handleSearchPoint(e) {
      const value = e.target.value
      this.position = value
    },
    //拖拽或点击获取新的地址
    getNewAddress(data, addressTemp) {
      let address = addressTemp
      let province = '',
        city = '',
        district = ''
      if (data.province) {
        province = data.province
      }
      if (data.city) {
        city = data.city
      }
      if (data.district) {
        district = data.district
      }
      if (province == city) {
        if (address.indexOf(province) == -1) {
          if (district != '') {
            address = district + address
          }
          if (province != '') {
            address = province + address
          }
        }
      } else {
        if (address.indexOf(district) != -1) {
          if (district != '') {
            address = district + address
          }
        }
        if (address.indexOf(city) == -1) {
          if (city != '') {
            address = city + address
          }
        }

        if (address.indexOf(province) == -1) {
          if (province != '') {
            address = province + address
          }
        }
      }
      this.organizationForm.setFieldsValue({
        address: address
      })
    },

  }
}
</script>

<style scoped>

</style>
