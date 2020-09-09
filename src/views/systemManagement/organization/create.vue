<template>
	<div class="portalDetailWapper">
    <div class="portalDetailTitle">
			<span class="title">{{$route.meta.title}}</span>
			<div class="detailOperations">
				<a-button @click='handleReturn'>取消</a-button>
				<a-button type="primary" @click='handleSave' html-type="submit">保存</a-button>
			</div>
		</div>
    <div class="portalDetailContentWapper">
      <a-form class="portalDetailContentBody" :form="organizationForm">
        <div class="layoutMargin detailsPartSection contentPadding">
        <a-row class="formItemLine">
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
        <a-row class="formItemLine">
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
        <a-row class="formItemLine">
          <a-col :span="16">
            <a-form-item label="地址" v-bind="formItemSingle">
              <a-input v-decorator="['addr',rules.addr]" placeholder="请输入地址信息(格式要求:XX省XX市XX县XX乡镇XX路XX号)"  />
            </a-form-item>
          </a-col>
        </a-row>
        </div>
      </a-form>
    </div>
	</div>
</template>
<script>
export default {
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
          span: 16
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
      options: {
        areaLists: [],
        upLists  : [],
      },
      rules: {
        groupName: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请输入组织机构名称!'
          } ]
        },
        contact: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请输入联系人!'
          } ]
        },
        contactPhone: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请输入联系电话!'
          }, {
            validator: this.validatePhone
          } ]
        },
        addr: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请输入地址!'
          } ]
        },
        areaCode: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请输入行政区名称!'
          } ]
        }
      }
    }
  },
  mounted() {
    this.options.areaLists = [ JSON.parse(this.$route.query.data).area ]
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
              url   : this.$api.POST_ADD_ORGANIZATION_LIST,
              params: values
            }).then(res => {
              if (res.code == '200') {
                this.$modal.success({
                  title  : '提示',
                  content: '新增成功!'
                })
                this.$router.push({
                  name: '/systemManagement/organization'
                })
              }
            })
          } else {
            this.$ajax.post({
              url   : this.$api.PUT_EDIT_ORGANIZATION_LIST.replace('{id}', this.$route.query.id),
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
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    },
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/organization'
      })
    },
    validatePhone(rule, value, callback) {
      if (value && !this.$com.checkPhone(value) && !this.$com.checkTel(value)) {
        callback('请填写正确手机号/座机请用‘-’隔开区号!')
      } else {
        callback()
      }
    },
    getUpLists(query) {
      const params = {
        pageSize: 1000,
        pageNo  : 1,
        areaCode: query
      }
      this.$ajax.get({
        url   : this.$api.GET_ORGANIZATION_LIST,
        params: params
      }).then(res => {
        this.options.upLists = this.$com.confirm(res, 'data.content', [])
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        const { addr, contact, contactPhone, areaCode, groupName }=this.$com.confirm(res, 'data.content', {})
        const parentId=this.$com.confirm(res, 'data.content.parentId', '0')=='0'?'':this.$com.confirm(res, 'data.content.parentId', '0')
        this.organizationForm.setFieldsValue({ addr, contact, contactPhone, areaCode, parentId, groupName })
      })
    }
  }
}
</script>

<style scoped>
  .organization-edit{
    padding-top:20px;
  }
</style>
