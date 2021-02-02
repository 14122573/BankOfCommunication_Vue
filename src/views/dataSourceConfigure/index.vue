<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/dataSourceConfigure'" class="layoutMargin layoutPadding">
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
            <a-button type="primary" html-type="submit" @click="addDataSource">新增数据源</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="dsId"
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
            @click="editDataSource(record.dsId)">编辑</a-button>
          <a-button
            icon="edit"
            type="link"
            @click="deleteDataSourceConfirm(record.dsId)">删除</a-button>
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else/>
    <a-modal title="数据源配置" v-model="dialogDataSource" width="80%">
      <a-form class="protalForm ">
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="数据源名称" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="IP地址" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbIpAddr"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="端口" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbPort"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="数据库用户ID" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbUsr"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="数据库密码" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbPasswd"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="权限范围" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbPermission"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="数据库类型" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="daraSourceForm.dbCat"></a-input>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button type="danger" size="mini" @click="dialogDataSource = false">取 消</a-button>
        <a-button type="primary" size="mini" @click="dealwithDataSource()">保 存</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  //TODO
  const columns = [
    {
      title: '数据源名称',
      dataIndex: 'dsName',
      align: 'center',
    },
    {
      title: 'IP地址',
      dataIndex: 'dbIpAddr',
      align: 'center',
    }, {
      title: '端口',
      dataIndex: 'dbPort',
      align: 'center',
    }, {
      title: '权限范围',
      dataIndex: 'dbPermission',
      align: 'center',
    },
    {
      title: '数据库用户ID',
      dataIndex: 'dbUsr',
      align: 'center',
    },
    {
      title: '创建日期',
      dataIndex: 'created',
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
        daraSourceForm: {},
        is_add:false,
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
        dialogDataSource: false,
      }
    },
    watch: {
      $route(to, from) {
        //当监听到路由返回时候刷新列表
        if (to.path == '/dataSourceConfigure') {
          this.getList()
        }
      }
    },
    created() {
      this.resetQuery()
    },
    methods: {
      addDataSource() {
        this.dialogDataSource = true;
        this.is_add = false;
      },
      editDataSource(id) {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getDataSourceByDsId,
            params: {dsId: id}
          })
          .then(res => {
            this.daraSourceForm = res.body;
            this.dialogDataSource = true;
            this.is_add = true;
          })
      },
      deleteDataSourceConfirm(id) {
        const vm = this
        this.$modal.confirm({
          title: '是否确认删除此组织机构？',
          content: '此操作不可撤销',
          okText: '确认删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.deleteDataSource(id)
          }
        })
      },
      deleteDataSource(id) {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.deleteDataSource,
            params: {dsId: id}
          })
          .then(res => {
            if (res.status == '0') {
              this.resetQuery();
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
            url: this.$bankOfCommunicationApi.getAllDataSource,
            params: this.queryParams
          })
          .then(res => {
            this.list = res.body.list
          })
      },
      //选择分页
      handlePageChange({current}) {
        this.queryParams.pageNum = current
        this.getList()
      },
      dealwithDataSource(){
        if(this.is_add){
          this.updateDataSource();
        }else{
          this.saveDataSource();
        }
      },
      saveDataSource() {
        this.$bankOfCommunicationAjax.post({
          url: this.$bankOfCommunicationApi.saveDataSource,
          params: this.generateparam()
        }).then(res => {
          if (res.status == '0') {
            this.dialogDataSource = false;
            this.resetQuery();
          }
        })
      },
      updateDataSource() {
        this.$bankOfCommunicationAjax.post({
          url: this.$bankOfCommunicationApi.updateDataSource,
          params: this.generateparam()
        }).then(res => {
          if (res.status == '0') {
            this.dialogDataSource = false;
            this.resetQuery();
          }
        })
      },
      generateparam(){
        if(this.is_add) {
          var param = {
            dbIpAddr: this.daraSourceForm.dbIpAddr,
            dbPasswd: this.daraSourceForm.dbPasswd,
            dbPermission: this.daraSourceForm.dbPermission,
            dbPort: this.daraSourceForm.dbPort,
            dbUsr: this.daraSourceForm.dbUsr,
            dsName: this.daraSourceForm.dsName,
            dbCat: this.daraSourceForm.dbCat,
            dsId: this.daraSourceForm.dsId,
          }
          return param;
        }else{
          var param = {
            dbIpAddr: this.daraSourceForm.dbIpAddr,
            dbPasswd: this.daraSourceForm.dbPasswd,
            dbPermission: this.daraSourceForm.dbPermission,
            dbPort: this.daraSourceForm.dbPort,
            dbUsr: this.daraSourceForm.dbUsr,
            dsName: this.daraSourceForm.dsName,
            dbCat: this.daraSourceForm.dbCat,
          }
          return param;
        }
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
