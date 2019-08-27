<template>
    <div>
        <a-form :form="searchForm">
            <a-row type="flex" justify="space-between">
                <a-col span="6">
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
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="账号："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.name"
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
                        v-model="searchForm.name"
                        :options="roleList"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="手机号："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.name"
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
                <a-col>
                    <a-button type="primary" @click="reset" ghost>重置</a-button>
                    <a-button type="primary" @click="search">搜索</a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table :columns="columns" :pagination="false" rowKey="name" :dataSource="data">
            <span slot="status" slot-scope="text, record">
                <userStatus :status="record.status"/>
            </span>
            <span slot="action" slot-scope="text, record">
                <a href="javascript:;">查看</a>
                <a-divider type="vertical" />
                <a href="javascript:;">修改</a>
                <a-divider type="vertical" />
                <a-dropdown>
                    <a class="ant-dropdown-link" href="#">
                     更多
                     <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                    <a-menu-item>
                        <a href="javascript:;">重置密码</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">禁用</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">注销</a>
                    </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </span>
        </a-table>
        <a-row class="page-row" type="flex" justify="end">
            <a-col>
                <a-pagination showQuickJumper @change="onChange" :current="params.pageNo" :total="total" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import userStatus from '../components/user-status'
export default {
  name:'old-user',
  components:{userStatus},
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
        pageSize:20,
      },
      total:0,
      data:[{
        name:'1',
        status:'1'
      }],
      columns:[
        {
          title:'姓名',
          dataIndex:'name',
          key:'name'
        },
        {
          title:'用户状态',
          dataIndex:'status',
          key:'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      plainOptions: ['正常', '禁用', '已冻结', '已注销'],
    }
  },
  methods:{
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

    },
    
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
</style>


