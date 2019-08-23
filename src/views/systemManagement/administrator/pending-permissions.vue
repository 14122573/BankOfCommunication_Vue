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
                        :label-col="{span:5}"
                        :wrapper-col="{span:19}"
                    >
                        <a-range-picker v-model="searchForm.time" :format="dateFormat" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']" @change="onDateChange" />
                    </a-form-item>
                </a-col>
                <a-col>
                    <a-button type="primary" ghost>重置</a-button>
                    <a-button type="primary">搜索</a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table row-key="name" :columns="columns" :dataSource="data">
            <span slot="action" slot-scope="text, record">
                <a href="javascript:;" @click="viewBtn(record)">查看</a>
                <a-divider type="vertical" />
                <a href="javascript:;">权限分配</a>
            </span>
        </a-table>
    </div>
</template>
<script>
export default {
  data(){
    return{
      searchForm:{},
      dateFormat: 'YYYY-MM-DD',
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
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
    onDateChange(date,dateString){
      console.log(date,dateString,this.searchForm.time)
    },
    // 查看按钮
    viewBtn(item){
      this.$router.push({
        name:'/systemManagement/administrator/pendingView'
      })
    },
  }
}
</script>

