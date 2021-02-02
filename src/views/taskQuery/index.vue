<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/taskQuery'" class="layoutMargin layoutPadding">
      <a-form-model
        class="ant-advanced-search-form"
        ref="queryForm"
        :border="false"
        :form="queryParams"
        :label-col=" { span: 7 }"
        :style="{ padding: '0',border:'none' }"
      >
        <a-row :gutter="12">
          <a-col :span="10">
            <a-form-item label="模糊查询">
              <a-input placeholder="请输入内容" v-model="queryParams.desc"/>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="状态">
              <a-select allowClear placeholder="请选择" v-model="queryParams.taskStatus">
                  <a-select-option v-for="item in allTaskStatus" :key="item.code" :label="item.desc"
                                   :value="item.code">{{item.desc}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          </a-col>
          <a-col :span="3" :style="{ textAlign: 'right' ,marginTop:'4px'}">
            <a-button type="primary" html-type="submit" @click="getList">搜索</a-button>
          </a-col>
        </a-row>

      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="cqNo"
        :columns="columns"
        :data="list"
        showPager
        :currentPage="queryParams.pageNum"
        :pageSize="queryParams.pageSize"
        :total="total"
        @on-page-change="handlePageChange"
        class="portalTable"
      >
        <span slot="actions" slot-scope="{ text, record }">
          <a-button
            icon="edit"
            type="link"
            @click="editscript(record.taskId)">维护</a-button>

        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else />
  </div>
</template>
<script>
  //TODO
  const columns = [
    {
      title: 'CQ号',
      dataIndex: 'cqNo',
      align: 'center',
      width: 120
    },
    {
      title: 'CQ描述',
      dataIndex: 'cqDesc',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'taskStatusName',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 200,
      align: 'center',
      scopedSlots: {customRender: 'actions'}
    }
  ]
  // import particularsModal from "./modal/particularsModal";
  import {FormModel} from 'ant-design-vue'

  export default {
    components: {
      'a-form-model': FormModel
    },
    data() {
      return {
        //脚本状态
        allTaskStatus: [],
        //表头
        columns: columns,
        //数据
        list: [],
        //
        total: 0,
        //查询参数
        queryParams: {},

      }
    },
    watch: {
      $route(to, from) {
        //当监听到路由返回时候刷新列表
        if (to.path == '/taskQuery') {
          this.getList()
        }
      }
    },
    created() {
      this.resetQuery()
    },
    mounted(){
      this.getAllTaskStatus();
    },
    methods: {
      getAllTaskStatus(){
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllScriptStatus,
          })
          .then(res => {
            this.allTaskStatus = res.body;
          })
      },
      editscript(id) {
        this.$router.push({
          name: '/scriptMaintenance',
          query: {
            taskId: id
          }
        })
      },
      //初始化
      resetQuery() {
        this.queryParams = {
          pageNum: 1,
          pageSize: 10,
        }
        this.total = 0
        this.getList()
      },
      //获取列表
      getList() {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllTask,
            params: this.queryParams
          })
          .then(res => {
            this.list = res.body.list;
            for(var i=0;i<this.list.length;i++){
              var status = this.list[i].taskStatus;
              for(var j=0;j<this.allTaskStatus.length;j++){
                var code = this.allTaskStatus[j].code;
                var desc = this.allTaskStatus[j].desc;
                if(code == status){
                  this.list[i].taskStatusName = desc;
                  break;
                }
              }
            }


          })
      },
      //选择分页
      handlePageChange({current}) {
        this.queryParams.pageNum = current
        this.getList()
      },
    }
  }
</script>
<style>
  .ant-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }

  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 100px;
    text-align: center;
    padding-top: 80px;
  }
</style>
