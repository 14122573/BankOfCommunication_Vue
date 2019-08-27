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
                        label="邮箱"
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
                        label="单位："
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
                        label="注册时间端："
                        :label-col="{span:4}"
                        :wrapper-col="{span:20}"
                    >
                        <a-range-picker v-model="time" :format="dateFormat" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']" @change="onDateChange" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="reset" ghost>重置</a-button>
                    <a-button type="primary" @click="search">搜索</a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table row-key="name" :pagination="false" :columns="columns" :dataSource="data">
            <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="viewBtn(record)">查看</a>
                <a-divider type="vertical" />
                <a href="javascript:;" @click="distributionBtn(record)">权限分配</a>
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
export default {
  data(){
    return{
      searchForm:{},
      dateFormat: 'YYYY-MM-DD',
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      params:{
        pageNo:1,
        pageSize:20,
      },
      time:[],
      total:0,
      data:[{
        name:'张三',
        account:'account',
        email:'email',
        unit:'unit',
        time:'time',
      }],
      columns:[
        {
          title:'姓名',
          dataIndex:'name',
          key:'name'
        },
        {
          title:'账号',
          width:240,
          dataIndex:'account',
          key:'account'
        },
        {
          title:'邮箱',
          dataIndex:'email',
          key:'email'
        },
        {
          title:'单位',
          dataIndex:'unit',
          key:'unit'
        },
        {
          title:'注册时间',
          dataIndex:'time',
          key:'time',
          width:240,
          sorter: true,
        },
        {
          title:'操作',
          dataIndex:'action',
          key:'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
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
      this.time=[]
      this.params.pageNo=1
      this.getList()
    },
    onChange(current) {
      this.params.pageNo = current
      this.getList()
    },
    // 查询列表
    getList(){},
    
    onDateChange(date,dateString){
      this.searchForm.time=dateString
      console.log(date,dateString,this.searchForm.time)
    },
    // 查看按钮
    viewBtn(item){
      this.$router.push({
        name:'/systemManagement/administrator/pendingView'
      })
    },
    // 权限分配按钮
    distributionBtn(item){
      this.$router.push({
        name:'/systemManagement/administrator/distribution'
      })
    }
  },
  mounted(){
      
    this.getList()
  },
}
</script>
<style scoped>
    .page-row{
        margin-top: 20px;
    }
</style>


