<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span class="title">基本信息</span>
      <div class="detailOperations">
        <a-button @click='handleReturn'>返回</a-button>
        <a-button type="primary" @click='handleSave' html-type="submit">保存</a-button>
      </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="layoutMargin layoutPadding ">
        <a-form class="protalForm ">
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="系统名称" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.name"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="作业名称" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.name"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-form-item class="formItem" label="运行周期" v-bind="colSpe2">
              <a-radio placeholder="请选择" v-model="scriptForm.taskname">
                <!--TODO label名称待定-->
                <a-option v-for="(item,index) in allTask" :key="index" :label="item.task_name"
                          :value="item.task_key"></a-option>
              </a-radio>
            </a-form-item>
          </a-row>
        </a-form>
        <p class="gayLine"></p>
        <span class="title">关联脚本</span>
        <ActiveTable
          rowKey="platformId"
          :columns="columns"
          :data="list"
          showPager
          :currentPage="pageIndex"
          :pageSize="pageSize"
          :total="total"
          @on-page-change="handlePageChange"
          class="portalTable"
        >
        <span slot="actions" slot-scope="{ text, record }">
          <a-button
            icon="edit"
            type="link"
            @click="showScriptHistory(record.platformId)">修改</a-button>
          <a-button
            icon="edit"
            type="link"
            @click="showScriptHistory(record.platformId)">删除</a-button>
        </span>
        </ActiveTable>
      </div>

    </div>


  </div>
</template>

<script>
  const columns = [
    {
      title: '系统',
      dataIndex: 'DATE',
      align: 'center',
    },
    {
      title: '脚本名称',
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

  export default {
    data() {
      return {
        list: [],
        columns: columns,
        id: this.$route.query.id,
        allDataSource: [],
        allTask: [],
        allETL: [],
        scriptForm: {},
        sql: '',
        colSpe: {
          labelCol: {
            span: 6
          },
          wrapperCol: {
            span: 15
          }
        },
        colSpe2: {
          labelCol: {
            span: 3
          },
          wrapperCol: {
            span: 15
          }
        },
        pageIndex: 1,
        pageSize: 10,
        total: 0,

      }
    },
    created() {
      this.resetQuery()
    },
    mounted() {


    },
    methods: {
      resetQuery() {
        this.pageIndex = 1
        this.pageSize = 10
        this.total = 0
        this.getList()
      },
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
      handleReturn() {
        this.$router.push({
          name: '/scriptMaintenance'
        })
      },
      handleSave() {

      },
      handlePageChange({current}) {
        this.pageIndex = current
        this.getList()
      },
    }
  }
</script>

<style scoped>
  .position {
    margin-left: 5px;
    color: #1890ff;
    cursor: pointer;
    display: inline;
  }

  .textasql >>> .CodeMirror {
    height: 200px !important;
    /* width:200px !important; */
  }
</style>
<style>

</style>
