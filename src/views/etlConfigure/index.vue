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
            <a-button type="primary" html-type="submit" @click="addEtl">新增ETL服务器</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="srvId"
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
            @click="editEtl(record.srvId)">编辑</a-button>
          <a-button
            icon="edit"
            type="link"
            @click="deleteEtlConfirm(record.srvId)">删除</a-button>
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else/>
    <a-modal title="数据源配置" v-model="dialogEtl" width="80%">
      <a-form class="protalForm ">
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="ETL服务器名称" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="EtlForm.srvName"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="服务器类型" v-bind="colSpe">
              <a-select allowClear placeholder="请选择" v-model="EtlForm.srvCat">
                <a-select-option v-for="item in allEtlTypes" :key="item.code" :label="item.desc"
                                 :value="item.code">{{item.desc}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="IP地址" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="EtlForm.srvIpAddr"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item class="formItem" label="端口" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="EtlForm.srvPort"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="formItemLine">
          <a-col span="12">
            <a-form-item class="formItem" label="ETL服务器用户" v-bind="colSpe">
              <a-input placeholder="请输入" v-model="EtlForm.srvUsr"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button type="danger" size="mini" @click="dialogEtl = false">取 消</a-button>
        <a-button type="primary" size="mini" @click="dealwithEtl()">保 存</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  //TODO
  const columns = [
    {
      title: 'ETL服务器名称',
      dataIndex: 'srvName',
      align: 'center',
    },
    {
      title: '服务器类型',
      dataIndex: 'srvCat',
      align: 'center',
    }, {
      title: 'IP地址',
      dataIndex: 'srvIpAddr',
      align: 'center',
    }, {
      title: '端口',
      dataIndex: 'srvPort',
      align: 'center',
    }, {
      title: '服务器用户',
      dataIndex: 'srvUsr',
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
        EtlForm: {},
        allEtlTypes:[],
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
        dialogEtl: false,
        is_add: false,
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
      this.resetQuery();
      this.getEtlType();
    },
    methods: {
      getEtlType(){
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getEtlType,
          })
          .then(res => {
            this.allEtlTypes = res.body;
            console.log(this.allEtlTypes);
          })
      },
      addEtl() {
        this.dialogEtl = true
        this.is_add = false
      },
      editEtl(id) {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getETLBySrvId,
            params: {srvId: id}
          })
          .then(res => {
            this.EtlForm = res.body
            this.dialogEtl = true
            this.is_add = true
          })
      },
      deleteEtlConfirm(id) {
        const vm = this
        this.$modal.confirm({
          title: '是否确认删除此组织机构？',
          content: '此操作不可撤销',
          okText: '确认删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.deleteEtl(id)
          }
        })
      },
      deleteEtl(id) {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.deleteEtl,
            params: {srvId: id}
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
            url: this.$bankOfCommunicationApi.getAllETL,
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
      dealwithEtl() {
        if (this.is_add) {
          this.updateEtl()
        } else {
          this.saveEtl()
        }
      },
      saveEtl() {
        this.$bankOfCommunicationAjax.post({
          url: this.$bankOfCommunicationApi.saveEtl,
          params: this.generateparam()
        }).then(res => {
          if (res.status == '0') {
            this.dialogEtl = false;
            this.resetQuery();
          }
        })
      },
      updateEtl() {
        this.$bankOfCommunicationAjax.post({
          url: this.$bankOfCommunicationApi.updateEtl,
          params: this.generateparam()
        }).then(res => {
          if (res.status == '0') {
            this.dialogEtl = false;
            this.resetQuery();
          }
        })
      },
      generateparam() {
        if (this.is_add) {
          var param = {
            srvId: this.EtlForm.srvId,
            srvIpAddr: this.EtlForm.srvIpAddr,
            srvName: this.EtlForm.srvName,
            srvPort: this.EtlForm.srvPort,
            srvUsr: this.EtlForm.srvUsr,
            srvCat: this.EtlForm.srvCat,
          }
          return param
        } else {
          var param = {
            srvIpAddr: this.EtlForm.srvIpAddr,
            srvName: this.EtlForm.srvName,
            srvPort: this.EtlForm.srvPort,
            srvUsr: this.EtlForm.srvUsr,
            srvCat: this.EtlForm.srvCat,
          }
          return param
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
