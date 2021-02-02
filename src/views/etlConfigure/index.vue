<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/etlConfigure'" class="layoutMargin layoutPadding">
      <a-form-model
        class="ant-advanced-search-form"
        ref="queryForm"
        :border="false"
        :form="queryParams"
        :label-col=" { span: 7 }"
        :style="{ padding: '0',border:'none' }"
      >
        <a-row :gutter="12">
          <a-col :span="6" :style="{ textAlign: 'left' ,marginTop:'4px'}">
            <a-button type="primary" html-type="submit" @click="addetl">新增ETL服务器</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="platformId"
        :columns="columns"
        :data="list"
        showPager
        :currentPage="queryParams.pageIndex"
        :pageSize="queryParams.pageSize"
        :total="total"
        @on-page-change="handlePageChange"
        class="portalTable"
      >
        <span slot="actions" slot-scope="{ text, record }">
          <a-button
            icon="edit"
            type="link"
            @click="editetl(record.platformId)">编辑</a-button>
          <a-button
            icon="edit"
            type="link"
            @click="deleteetl(record.platformId)">删除</a-button>
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else/>
    <a-modal title="数据源配置" v-model="dialogetl" width="80%" >
      <a-form class="protalForm ">
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="ETL服务器名称" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="服务器类型" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="IP地址" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="端口" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="ETL服务器用户" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="ETL服务器密码" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.name"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button type="danger" size="mini" @click="dialogetl = false">取 消</a-button>
        <a-button type="primary" size="mini" @click="saveetl()">保 存</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  //TODO
  const columns = [
    {
      title: 'ETL服务器名称',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    },
    {
      title: '服务器类型',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: 'IP地址',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: '端口',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    }, {
      title: '服务器用户',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
    },
    {
      title: '创建日期',
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
  import {FormModel} from 'ant-design-vue'

  export default {
    components: {
      'a-form-model': FormModel
    },
    data() {
      return {
        daraSourceForm:{},

        colSpe: {
          labelCol: {
            span: 6
          },
          wrapperCol: {
            span: 15
          }
        },
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
        dialogetl:false,
        }
    },
    watch: {
      $route(to, from) {
        //当监听到路由返回时候刷新列表
        if (to.path == '/etlConfigure') {
          this.getList()
        }
      }
    },
    created() {
      this.resetQuery()
    },
    methods: {
      addetl() {
        this.dialogetl = true;
      },
      editetl(id) {
      },
      deleteetl(id) {
        location.reload()
      },
      //初始化
      resetQuery() {
        this.queryParams = {
          pageIndex: 1,
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
        this.queryParams.pageIndex = current
        this.getList()
      },
      saveetl(){

      }
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
