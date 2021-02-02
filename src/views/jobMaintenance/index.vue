<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/jobMaintenance'" class="layoutMargin layoutPadding">
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
              <a-input placeholder="请输入内容" v-model="queryParams.fuzzyQueryParam"/>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParams.scriptStatus">
                <!--TODO label名称待定-->
                <a-option v-for="(item,index) in allscriptStatus" :key="index" :label="item.STATUS_NAME"
                          :value="item.SCRIPT_STATUS"></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          </a-col>
          <a-col :span="3" :style="{ textAlign: 'right' ,marginTop:'4px'}">
            <a-button type="primary" html-type="submit" @click="getList">搜索</a-button>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col :span="6" :style="{ textAlign: 'left' ,marginTop:'4px'}">
            <a-button type="primary" html-type="submit" @click="addjob">新增作业</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="platformId"
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
            @click="editjob(record.platformId)">编辑</a-button>
          <a-button
            icon="edit"
            type="link"
            @click="deletejob(record.platformId)">删除</a-button>
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else/>
  </div>
</template>
<script>
  //TODO
  const columns = [
    {
      title: '系统名称',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    },
    {
      title: '作业名称',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: '作业描述',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: '最后修改人',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: '最后修改时间',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
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
        allscriptStatus: [],
        //平台
        allplatform: [],
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
        if (to.path == '/jobMaintenance') {
          this.getList()
        }
      }
    },
    created() {
      this.resetQuery()
    },
    methods: {
      addjob() {
        this.$router.push({
          name: '/jobMaintenance/jobConfigure'
        })
      },
      editjob(id) {
        this.$router.push({
          name: '/jobMaintenance/jobConfigure',
          query: {
            id: id
          }
        })
      },
      deletescript(id) {
        this.resetQuery();
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
        this.$ajax
          .get({
            //TODO 需要修改 GET_OPERLOG_LIST
            url: this.$api.GET_OPERLOG_LIST,
            params: this.queryParams
          })
          .then(res => {
            //TODO 要修改返回值内容
            if (res.code === '200') {
              this.total = res.data.totalRows || 0
              this.list = res.data.content || []
            } else {
              this.$message.error(res.msg)
            }
            //TODO 这里要删除
            this.list = [{'SYSTEM_NAME': 'SYSTEM_NAME', 'platformId': '1'}]
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
