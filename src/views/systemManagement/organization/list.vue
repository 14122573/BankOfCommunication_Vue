<template>
     <a-card :bordered="false">
         <a-row>
             <a-form :form="searchForm">
                <a-col span="6">
                    <a-form-item
                        label="单位类型："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.type"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="组织机构："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="searchForm.name"
                        :options='options.nameOptions'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="行政区域："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="searchForm.space"
                        :options='options.spaceOptions'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6" class="algin-right">
                    <a-button type="primary" ghost>重置</a-button>
                    <a-button type="primary">搜索</a-button>
                </a-col>
             </a-form>
         </a-row>
         <a-row>
            <a-button type="primary">新建单位</a-button>
            <a-button type="primary" @click="toUpload">导入</a-button>
         </a-row>
         <a-table :columns="columns" class="table-margin" :dataSource="data">
             <span slot="action" slot-scope="text, record">
                <a href="javascript:;">查看</a>
                <a-divider type="vertical" />
                <a href="javascript:;">修改</a>
                <a-divider type="vertical" />
                <a @click="deleteBtn(text,record)">删除</a>
             </span>
         </a-table>
         <!-- 删除确认 -->
         <a-modal
            title="操作确认"
            v-model="visible"
            @ok="handleOk"
            cancelText="取消"
            okText="删除"
            >
        <p>是否确认删除此组织机构？</p>
        <p>此操作不可撤销</p>
        </a-modal>
     </a-card>
</template>
<script>
export default {
  name: 'organization',
  data() {
    const columns = [
      {
        title: '组织机构',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '单位类型',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '所属行政区域',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title:'操作',
        dataIndex:'action',
        scopedSlots: { customRender: 'action' }
      }
    ]

    const data = [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park'
          },
          {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [
              {
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park'
              }
            ]
          },
          {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            children: [
              {
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [
                  {
                    key: 1311,
                    name: 'Jim Green jr.',
                    age: 25,
                    address: 'London No. 3 Lake Park'
                  },
                  {
                    key: 1312,
                    name: 'Jimmy Green sr.',
                    age: 18,
                    address: 'London No. 4 Lake Park'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      }
    ]

    return {
      searchForm: {},
      labelCol:{ span: 10 },
      wrapperCol:{span: 14 },
      options:{
        nameOptions: [{ label: '1', value: '1' }],
        spaceOptions: [{ label: '1', value: '1' }],
      },
      data:data,
      columns,
      visible:false,
    }
  },
  methods:{
    toUpload(){
      this.$router.push({
        name:'/systemManagement/organization/upload'
      })
    },
    //   删除按钮
    deleteBtn(text,record){
      console.log(text,record)
      this.visible=true
    },
    //   确认删除
    handleOk(){

    }
  }
}
</script>
<style scoped>
    .algin-right{
        text-align: right;
    }
    .table-margin{
        margin-top:20px;
    }
</style>

