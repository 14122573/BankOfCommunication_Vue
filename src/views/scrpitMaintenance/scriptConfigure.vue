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
            <a-col span="12">
              <a-form-item class="formItem" label="数据源" v-bind="colSpe">
                <a-select placeholder="请选择" v-model="scriptForm.datasource">
                  <!--TODO label名称待定-->
                  <a-option v-for="(item,index) in allDataSource" :key="index" :label="item.datasource_key"
                            :value="item.datasource_value"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="脚本名称" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.scriptname"></a-input>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="formItem" label="ETL服务器" v-bind="colSpe">
                <a-select placeholder="请选择" v-model="scriptForm.datasource">
                  <!--TODO label名称待定-->
                  <a-option v-for="(item,index) in allETL" :key="index" :label="item.ETL_value"
                            :value="item.ETL_key"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="formItemLine">
            <a-col span="12">
              <a-form-item class="formItem" label="关联任务" v-bind="colSpe">
                <a-select placeholder="请选择" v-model="scriptForm.taskname">
                  <!--TODO label名称待定-->
                  <a-option v-for="(item,index) in allTask" :key="index" :label="item.task_name"
                            :value="item.task_key"></a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item class="formItem" label="GIT路径" v-bind="colSpe">
                <a-input placeholder="请输入" v-model="scriptForm.gitpath"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <p class="gayLine"></p>
        <span class="title">转换逻辑</span>
        <div style="border:1px solid #ccc;">
          <SqlEditor ref="_firstRefs" v-model="sql" class='textasql'/>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import SqlEditor from './sqleditor'

  export default {
    components: {
      SqlEditor
    },
    data() {
      return {
        id:this.$route.query.id,
        allDataSource: [],
        allTask: [],
        allETL: [],
        scriptForm: {},
        sql:"",
        colSpe: {
          labelCol: {
            span: 6
          },
          wrapperCol: {
            span: 15
          }
        },
      }
    },
    created() {

    },
    mounted() {
    },
    methods: {
      handleReturn(){
        this.$router.push({
          name: '/scriptMaintenance'
        })
      },
      handleSave() {

      }
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
