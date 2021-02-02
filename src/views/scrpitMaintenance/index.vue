<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/scriptMaintenance'" class="layoutMargin layoutPadding">
      <a-form-model
        class="ant-advanced-search-form"
        ref="queryForm"
        :border="false"
        :form="queryParams"
        :label-col=" { span: 7 }"
        :style="{ padding: '0',border:'none' }"
      >
        <a-row :gutter="12">
          <a-col :span="7">
            <a-form-item label="模糊查询">
              <a-input placeholder="请输入内容" v-model="queryParams.keyword"/>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="状态">
              <a-select allowClear placeholder="请选择" v-model="queryParams.scriptStatus">
                <!--TODO label名称待定-->
                <a-select-option v-for="item in allScriptStatus" :key="item.code" :label="item.desc"
                          :value="item.code">{{item.desc}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="平台">
              <a-select allowClear placeholder="请选择" v-model="queryParams.platformId">
                <!--TODO label名称待定-->
                <a-select-option v-for="(item) in allPlatform" :key="item.desc" :label="item.desc"
                          :value="item.desc">{{item.desc}}</a-select-option>
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
            <a-button type="primary" html-type="submit" @click="addscript">新增脚本</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <ActiveTable
        rowKey="scriptId"
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
            @click="editscript(record.scriptId)">编辑</a-button>
          <!--<a-button-->
            <!--icon="edit"-->
            <!--type="link"-->
            <!--@click="deletescript(record.scriptId)">删除</a-button>-->
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else />
  </div>
</template>
<script>
  const columns = [
    {
      title: '系统名称',
      dataIndex: 'systemId',
      align: 'center',
      width: 120
    },
    {
      title: '脚本名称',
      dataIndex: 'scriptName',
      align: 'center'
    },
    {
      title: '脚本描述',
      dataIndex: 'scriptDesc',
      align: 'center'
    },
    {
      title: '平台',
      dataIndex: 'platformId',
      align: 'center'
    },
    {
      title: '当前状态',
      dataIndex: 'scriptStatus',
      align: 'center'
    },
    {
      title: '最后修改人',
      dataIndex: 'updatedBy',
      align: 'center'
    },
    {
      title: '最后修改日期',
      dataIndex: 'lastModified',
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
  import {FormModel} from 'ant-design-vue'

  export default {
    components: {
      'a-form-model': FormModel
    },
    data() {
      return {
        //脚本状态
        allScriptStatus: [{code:"",desc:""}],
        //平台
        allPlatform: [{desc:""}],
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
        if (to.path == '/scriptMaintenance') {
          this.getList()
        }
      }
    },
    created() {


    },
    mounted(){
      this.resetQuery();
      this.getAllScriptStatus();
      this.getAllPlatForm();
    },
    methods: {
      getAllScriptStatus(){
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllScriptStatus,
          })
          .then(res => {
            this.allScriptStatus = res.body;
          })
      },
      getAllPlatForm(){
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllPlatform,
          })
          .then(res => {
            this.allPlatform = res.body;
          })
      },
      addscript() {
        this.$router.push({
          name: '/scriptMaintenance/scriptConfigure'
        })
      },
      editscript(id) {
        this.$router.push({
          name: '/scriptMaintenance/scriptConfigure',
          query: {
            scriptId: id
          }
        })
      },
      deletescript(id){
        location.reload();
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
            url: this.$bankOfCommunicationApi.getAllScriptData,
            params: this.queryParams
          })
          .then(res => {
            this.list = res.body.list;
            this.total= res.body.size;
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
