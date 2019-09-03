<template>
	<a-card :bordered='false' :style="{margin:'0 0 0 14px'}">
		<a-row type="flex" justify="space-between" slot="title" align="middle">
			<a-col>{{$route.meta.title}}</a-col>
			<a-col>
				<a-button type="primary" ghost @click="handleReturn">
					取消
				</a-button>
				<a-button type="primary" @click="handleSave" html-type="submit">
					保存
				</a-button>
			</a-col>
		</a-row>
		<a-form :form="organizationForm">
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="组织机构名称" v-bind="formItemLayout">
						<a-input v-decorator="['groupName', rules.groupName]" placeholder="组织机构名称" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系人" v-bind="formItemLayout">
						<a-input v-decorator="['contact',rules.contact]" placeholder="联系人" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="联系电话" v-bind="formItemLayout">
						<a-input v-decorator="['contactPhone',rules.contactPhone]" placeholder="联系电话" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="8">
					<a-form-item label="所属行政区域" v-bind="formItemLayout">
						<a-select placeholder="请选择" :options='options.areaLists' v-decorator="['areaCode',rules.areaCode]" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="上级机构" v-bind="formItemLayout">
						<a-select placeholder="请选择" v-decorator="['parentId']">
							<a-select-option v-for="(item,index) in options.upLists" :key="index" :value="item.id">{{item.groupName}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row type="flex" justify="start" align="middle">
				<a-col :span="16">
					<a-form-item label="地址" v-bind="formItemSingle">
						<a-input v-decorator="['addr',rules.addr]" placeholder="请输入地址信息(格式要求:XX省XX市XX县XX乡镇XX路XX号)" @blur="handleSearchPoint" />
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
      options: {
        areaLists: [],
        upLists: [],
      },
      rules: {
        groupName: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入组织机构名称!'
          }]
        },
        contact: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入联系人!'
          }]
        },
        contactPhone: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入联系电话!'
          }, {
            validator: this.validatePhone
          }]
        },
        addr: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入地址!'
          }]
        },
        areaCode: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入行政区名称!'
          }]
        }
      }
    }
  },
  mounted() {
    this.options.areaLists = [JSON.parse(this.$route.query.data).area]
    this.getUpLists(JSON.parse(this.$route.query.data).area.parentId)
    if (this.$route.query.id) {
      this.getDetail()
    }
  },
  methods: {
    handleSave() {
      this.organizationForm.validateFields((err, values) => {
        if (!err) {
          values.areaName = JSON.parse(this.$route.query.data).area.title
          if (!this.$route.query.id) {
            this.$ajax.post({
              url: this.$api.POST_ADD_ORGANIZATION_LIST,
              params: values
            }).then(res => {
              if (res.code == '200') {
                this.$message.success('新增成功！')
                this.$router.push({
                  name: '/systemManagement/organization'
                })
              }
            })
          } else {
            this.$ajax.put({
              url: this.$api.PUT_EDIT_ORGANIZATION_LIST.replace('{id}',this.$route.query.id),
              params: values
            }).then(res => {
              if (res.code == '200') {
                this.$message.success('修改成功！')
                this.$router.push({
                  name: '/systemManagement/organization'
                })
              }
            })
          }

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
        addr: address
      })
    },
    validatePhone(rule, value, callback) {
      if (value && !this.$com.checkPhone(value)) {
        callback('手机号码不合法!')
      } else {
        callback()
      }
    },
    getUpLists(query) {
      const params = {
        pageSize: 1000,
        pageNo: 1,
        areaCode: query
      }
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.options.upLists = this.$com.confirm(res, 'data.content', [])
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        let {addr,contact,contactPhone,areaCode,groupName}=this.$com.confirm(res, 'data.content', {})
        let parentId=this.$com.confirm(res, 'data.content.parentId', '0')=='0'?'':this.$com.confirm(res, 'data.content.parentId', '0')
        this.organizationForm.setFieldsValue({addr,contact,contactPhone,areaCode,parentId,groupName})
        this.position = this.$com.confirm(res, 'data.content.addr', '上海市')
      })
    }
  }
}
</script>

<style scoped>

</style>
