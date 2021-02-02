<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span class="title">基本信息</span>
      <div class="detailOperations">
        <a-button @click='handleReturn'>返回</a-button>
        <a-button type="primary" @click='delwithSave' html-type="submit">保存</a-button>
      </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="layoutMargin layoutPadding ">
        <a-form class="protalForm ">
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="系统名称" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.systemId"></a-input>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="formItem" label="数据源" v-bind="colSpe">
                <a-select placeholder="请选择" v-model="scriptForm.datasourceId">
                  <a-select-option v-for="item in allDataSource" :key="item.dsId" :label="item.dsName"
                                   :value="item.dsId">{{item.dsName}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="脚本名称" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.scriptName"></a-input>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="formItem" label="ETL服务器" v-bind="colSpe">
                <a-select placeholder="请选择" v-model="scriptForm.etlSrvId">
                  <a-select-option v-for="item in allETL" :key="item.srvId" :label="item.srvName"
                                   :value="item.srvId">{{item.srvName}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="关联任务" v-bind="colSpe">
                <a-input disabled v-model="scriptForm.cqNo">{{scriptForm.cqNo}}
                </a-input>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="formItem" label="GIT路径" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.scriptPath"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <p class="gayLine"></p>
        <span class="title">转换逻辑</span>
        <div style="border:1px solid #ccc;">
          <SqlEditor ref="sql" class='textasql'/>
        </div>
        <p class="gayLine"></p>
        <span class="title">历史版本</span>
        <ActiveTable
          rowKey="platformId"
          :columns="columns"
          :data="list"
          showPager
          :currentPage="pageNum"
          :pageSize="pageSize"
          :total="total"
          @on-page-change="handlePageChange"
          class="portalTable"
        >
        <span slot="actions" slot-scope="{ text, record }">
          <a-button
            icon="edit"
            type="link"
            @click="showScriptHistory(record.platformId)">查看</a-button>
        </span>
        </ActiveTable>
      </div>
    </div>
  </div>
</template>

<script>
  const columns = [
    {
      title: '日期',
      dataIndex: 'DATE',
      align: 'center',
      width: 120
    },
    {
      title: '版本说明',
      dataIndex: 'SYSTEM_NAME',
      align: 'center',
      width: 120
    },
    {
      title: '提交人',
      dataIndex: 'SCRIPT_NAME',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 100,
      align: 'center',
      scopedSlots: {customRender: 'actions'}
    }
  ]
  import SqlEditor from './sqleditor'

  export default {
    components: {
      SqlEditor
    },
    data() {
      return {
        list: [],
        columns: columns,
        scriptId: this.$route.query.scriptId,
        taskId: this.$route.query.taskId,
        allDataSource: [],
        allTask: [],
        allETL: [],
        allPlatform: [],
        scriptForm: {},
        colSpe: {
          labelCol: {
            span: 6
          },
          wrapperCol: {
            span: 15
          }
        },
        pageNum: 1,
        pageSize: 10,
        total: 0,
      }
    },
    created() {
      this.getAllDataSource()
      this.getAllETL()
      this.getAllPlatForm();
      this.resetQuery();
    },
    mounted() {
      this.getCqNo()
    },
    methods: {
      getAllDataSource() {
        //FIXME 1 和 100 是魔鬼数字 之后 修改
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllDataSource,
            params: {
              pageNum: 1,
              pageSize: 100
            }
          })
          .then(res => {
            this.allDataSource = res.body.list
          })
      },
      getAllETL() {
        //FIXME 1 和 100 是魔鬼数字 之后 修改
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllETL,
            params: {
              pageNum: 1,
              pageSize: 100
            }
          })
          .then(res => {
            this.allETL = res.body.list
          })
      },
      getAllPlatForm() {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getAllPlatform,
          })
          .then(res => {
            this.allPlatform = res.body
          })
      },
      async resetQuery() {
        this.pageNum = 1
        this.pageSize = 10
        this.total = 0
        if (this.scriptId) {
          this.getList()
        }

      },
      getList() {
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getScriptInfo,
            params: {scriptId: this.$route.query.scriptId}
          })
          .then(res => {
            this.scriptForm = res.body
            this.scriptForm.cqNo = ''
            this.sql = res.body.content
            this.$refs.sql.setmVal(this.sql)
          })
      },
      async getCqNo() {
        if (this.scriptId) {
          if (this.scriptForm.taskIds.filter(this.taskId)) {
            this.scriptForm.taskIds.push(this.taskId)
          }
        } else {
          this.scriptForm.taskIds = []
          this.scriptForm.taskIds.push(this.taskId)
        }
        this.scriptForm.cqNo = "";
        for (var i = 0; i < this.scriptForm.taskIds.length; i++) {
          debugger
          var cqNo = await this.getTaskByTaskId(this.scriptForm.taskIds[i])
          debugger
          this.scriptForm.cqNo += cqNo + ','
        }
        debugger;
        this.scriptForm.cqNo = this.scriptForm.cqNo.substr(0, this.scriptForm.cqNo.length - 1);

      },
      async getTaskByTaskId(item) {
        var result = ''
        this.$bankOfCommunicationAjax
          .get({
            url: this.$bankOfCommunicationApi.getTaskByTaskId,
            params: {taskId: item}
          })
          .then(res => {
            if (res.status == '0') {
              result = res.body.cqNo
            }
          })
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(result)
          }, 2000)
        })
      },
      handleReturn() {
        this.$router.push({
          name: '/scriptMaintenance',
          query: {
            taskId: this.taskId,
          }
        })
      },
      delwithSave() {
        if (this.scriptId) {
          this.updateScript()
        } else {
          this.addScript()
        }
      },
      addScript() {
        this.scriptForm.content = this.$refs.sql.getmVal()
        this.$bankOfCommunicationAjax
          .post({
            url: this.$bankOfCommunicationApi.saveScriptInfo,
            params: this.generateparam()
          })
          .then(res => {
            if (res.status == '0') {
              this.$router.push({
                name: '/scriptMaintenance',
                query: {
                  taskId: this.taskId,
                }
              })
            }
          })
      },
      updateScript() {
        this.scriptForm.content = this.$refs.sql.getmVal()
        this.$bankOfCommunicationAjax
          .post({
            url: this.$bankOfCommunicationApi.updateScriptInfo,
            params: this.generateparam()
          })
          .then(res => {
            if (res.status == '0') {
              this.$router.push({
                name: '/scriptMaintenance'
              })
            }
          })
      },
      handlePageChange({current}) {
        this.pageNum = current
        this.getList()
      },
      generateparam() {
        debugger
        if (this.scriptId) {
          let param = {
            systemId: this.scriptForm.systemId,
            datasourceId: this.scriptForm.datasourceId,
            platformId: this.scriptForm.platformId,
            etlSrvId: this.scriptForm.etlSrvId,
            scriptName: this.scriptForm.scriptName,
            scriptPath: this.scriptForm.scriptPath,
            scriptDesc: this.scriptForm.scriptDesc,
            scriptStatus: this.scriptForm.scriptStatus,
            taskIds: this.scriptForm.taskIds.join(','),
            content: this.scriptForm.content,
            scriptId: this.scriptId,
            //TODO
            platformId: '1',
            updatedBy: 'TBH',
          }
          return param
        } else {
          let param = {
            systemId: this.scriptForm.systemId,
            datasourceId: this.scriptForm.datasourceId,
            platformId: this.scriptForm.platformId,
            etlSrvId: this.scriptForm.etlSrvId,
            scriptName: this.scriptForm.scriptName,
            scriptPath: this.scriptForm.scriptPath,
            scriptDesc: this.scriptForm.scriptDesc,
            scriptStatus: this.scriptForm.scriptStatus,
            taskIds: this.scriptForm.taskIds.join(','),
            content: this.scriptForm.content,
            //TODO
            platformId: '1',
            updatedBy: 'TBH',
          }
          return param
        }
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
