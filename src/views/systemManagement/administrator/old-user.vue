<template>
    <div class="old-user">
        <a-form :form="searchForm">
            <a-row type="flex" justify="space-between">
                <!-- <a-col span="6">
                    <a-form-item
                        label="姓名："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.name"
                    />
                    </a-form-item>
                </a-col> -->
                <a-col span="6">
                    <a-form-item
                        label="账号："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.username_l"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select
                        placeholder="请选择"
                        v-model="searchForm.roleId"
                        :options="roleList"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="12">
                    <a-form-item
                        label="角色状态："
                        :label-col="{span:4}"
                        :wrapper-col="{span:20}"
                    >
                    <a-checkbox-group :options="plainOptions" v-model="searchForm.checkedList" />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="所属老系统："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.sysDicName_l"
                    />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="reset" ghost>重置</a-button>
                    <a-button type="primary" @click="search">搜索</a-button>
                </a-col>

            </a-row>
        </a-form>
        <a-table :columns="columns" :pagination="false" rowKey="id" :dataSource="data">
            <span slot="sysDic" slot-scope="text,record">
                {{record.sysDic.sysName || '无'}}
            </span>
            <span slot="status" slot-scope="text, record">
                <!-- <userStatus :status="record.status"/> -->
            </span>
            <span slot="action" slot-scope="text, record">
                <a @click="resetBtn(record)">重置密码</a>
                <a-divider type="vertical" />
                <a @click="viewModal('0',record)">启用</a>
                <a-divider type="vertical" />
                <a @click="viewModal('1',record)">禁用</a>
                <a-divider type="vertical" />
                <a @click="viewModal('2',record)">注销</a>
                <a-divider type="vertical" />
                <a @click="viewModal('3',record)">解冻</a>
            </span>
        </a-table>
        <a-row class="page-row" type="flex" justify="end">
            <a-col>
                <a-pagination showQuickJumper @change="onChange" :current="params.pageNo" :total="total" />
            </a-col>
        </a-row>
        <a-modal 
        :title="modal.title" 
        v-model="modal.show" 
        @ok="handleOk" 
        cancelText="取消"
        okText="确认"
        :maskClosable="false"
        :width="465"
        >
        <p class="center-p">{{modal.content}}</p>
        <p class="center-p">{{modal.tips}}</p>
        </a-modal>
        <a-modal cancelText="取消" okText="确认" @ok="handleResetOk" @cancel="hadnleCancel" :width="465" title="重置密码" v-model="resetPwdShow">
            <a-form :form="resetData">
                <a-row>
                    <a-col span="24">
                        <a-form-item
                            label="原密码："
                            :label-col="{span:8}"
                            :wrapper-col="{span:16}"
                        >
                        123456
                        </a-form-item>
                    </a-col>
                    <a-col span="24">
                        <a-form-item
                            label="新密码："
                            :label-col="{span:8}"
                            :wrapper-col="{span:16}"
                        >
                        <a-input v-decorator="[
		  						'pwd',
		  						{
		  							rules: [ {
		  							validator: validateToNextPassword,
		  							}]
		  						 }
		  					]"
                            :type="pswType" @focus='pasBlur' placeholder="新密码需大于6位且含字母和数字" autocomplete="off">
                            <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" /> -->
                            </a-input>                        
                        </a-form-item>
                    </a-col>
                    <a-col span="8"></a-col>
                    <a-col span="16">
                        <testStrong id="strong" :width="90" :pwd='resetData.getFieldValue("pwd")'  v-if='passwordStrength'></testStrong>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import userStatus from '../components/user-status'
import testStrong from '@/components/testPwd'
export default {
  name:'old-user',
  components:{userStatus,testStrong},
  props:{
    roleList:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data(){
    return{
      searchForm:{
        checkedList:[]
      },
      dateFormat: 'YYYY-MM-DD',
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      params:{
        pageNo:1,
        pageSize:10,
        'ui.createTime_desc':1
      },
      total:0,
      data:[],
      columns:[
        {
          title:'账号',
          dataIndex:'username',
          key:'username'
        },
        // {
        //     title:'角色名称',
        // },
        // {
        //   title:'所属组织机构',
        //   dataIndex:'groupId',
        //   key:'groupId'
        // },
        {
          title:'所属老系统',
          dataIndex:'sysDic',
          key:'sysDic',
          scopedSlots:{customRender:'sysDic'}
        },
        // {
        //   title:'关联手机号',
        //   dataIndex:'phone',
        //   key:'phone'
        // },
        // {
        //   title:'用户状态',
        //   dataIndex:'status',
        //   key:'status',
        //   scopedSlots: { customRender: 'status' }
        // },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      plainOptions: ['正常', '禁用', '已冻结', '已注销'],
      modal:{
        show:false
      },
      modalData:{},
      //   重置密码
      resetPwdShow:false,
      resetData: this.$form.createForm(this),
      pswType:'text',
      passwordStrength:false,
    }
  },
  methods:{
    pasBlur(){
      this.pswType='password'
    },
    //密码重复密码校验
    validateToNextPassword(rule, value, callback) {
      const form = this.formRegister
	  if(!value || value == undefined || value.split(' ').join('').length === 0){
	    callback('请输入密码！')
	    this.passwordStrength=false
	  }else{
	    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(value)){
	      callback('请输入6位以上的数字字母组合！')
	      this.passwordStrength=false
	    }else{
	      callback()
	      this.passwordStrength=true
	    }
	  }
    },
    // 查询按钮
    search(){
      this.params.pageNo=1
      this.getList()
    },
    // 重置按钮
    reset(){
      this.searchForm={}
      this.params.pageNo=1
      this.getList()
    },
    onChange(current) {
      this.params.pageNo = current
      this.getList()
    },
    // 查询列表
    getList(){
      this.$ajax.get({
        url:this.$api.USER_LIST_TYPE_GET.replace('{type}','old'),
        params:Object.assign(this.searchForm,this.params)
      })
        .then(res=>{
          if(res.code === '200'){
            this.data=res.data.content
          }else{
            this.$message.error(res.msg)
          }
        })
    },
    // 重置密码按钮
    resetBtn(item){
      // this.resetData=item;
      this.resetPwdShow=true
    },
    // 操作按钮
    viewModal(key,item){
      switch(key){
      case '0':
        this.modal.title='启用'
        this.modal.content='启用后，该账号将被允许登录平台'
        this.modal.tips='您确认要启用该账号吗？'
        break
      case '1':
        this.modal.title='禁用'
        this.modal.content='禁用后，该账号将不被允许登录平台直到再次启用'
        this.modal.tips='您确认要禁用该账号吗？'
        break
      case '2':
        this.modal.title='注销'
        this.modal.content='注销后，该账号将不被使用'
        this.modal.tips='您确认要注销该账号吗？'
        break
      case '3':
        this.modal.title='解冻'
        this.modal.content='解冻后，该账号将可以重新登录'
        this.modal.tips='您确认要解冻该账号吗？'
        break
      default:
        break
      }
      this.modal.key=key
      this.modalData=item
      this.modal.show=true
    },
    handleOk(){

    },
    // 确认重置
    handleResetOk(){
      this.resetData.validateFields((err)=>{
        if(!err){

        }
      })
    },
    // 取消重置密码
    hadnleCancel(){
      this.resetPwdShow=false
      this.passwordStrength=false
      this.resetData.resetFields()
    }
  },
  mounted(){
    this.getList()
  }
}
</script>
<style scoped>
    .ant-badge-status-dot{
        width: 9px 9px;
    }
    .page-row{
        margin-top: 20px;
    }
    .center-p{
        text-align: center;
    }
</style>



