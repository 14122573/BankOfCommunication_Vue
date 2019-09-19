<template>
<div class="layoutMargin layoutPadding">
  <template v-if='sysListForSearch.length>0 && pointsList && isReady'>
    <a-form class="protalForm" :form="porintSearchForm">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col span="6">
          <a-form-item class='formItem' label="业务系统名称" :label-col="{span:8}" :wrapper-col="{span:16}">
            <a-select placeholder="请选择业务系统" :options="sysListForSearch" v-model="searchForm.type" />
          </a-form-item>
        </a-col>
        <a-col span="6" v-show="searchForm.type">
          <a-form-item label="功能点名称" :label-col="{span:8}" :wrapper-col="{span:16}">
						<a-input v-decorator="['pointName']" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="6" class="algin-right" style="padding-right:8px">
          <a-button @click="reset">重置</a-button>
          <a-button type="primary" @click="getPointList">搜索</a-button>
        </a-col>
      </a-row>
    </a-form>
    <p class="gayLine"></p>
    <div class="portalTableOperates">
      <a-button icon='plus' @click="goToAddPoint">添加功能点</a-button>
      <a-button icon='rollback' @click="$router.push({name:'/systemManagement/permissionConfig'})">返回权限配置</a-button>
    </div>
    <a-collapse v-if='pointsArray.length>0' defaultActiveKey="0" class='reviewSeationGroup' :bordered="false">
      <template v-for="(pointGroup,index) in pointsArray">
        <a-collapse-panel :key='index' class='reviewSeation' >
          <template slot="header">
            <div class="reviewSeationTitle">
              <span class="sysName">{{pointGroup.name}}<span class="points">已有功能点<span class="pointNum">{{pointGroup.children.length}}</span>个</span></span>
            </div>
          </template>
          <a-row class="reviewSeationContent" :gutter="16">
            <template v-for="(point) in pointGroup.children">
              <a-col span="4" class="reviewCard" :key="point.id">
                <div class="contentBody">
                  <p class="title">{{point.pointName}}</p>
                  <p class="des">{{point.pointKey}}</p>
                  <p class="perm"> <img :src="permIcon" class="group-icon" alt="人数"><span>已归属权限<span class="permNum">{{point.permSet.length || '0'}}</span>个</span> </p>
                </div>
                <div class="contentOperate">
                  <span @click="goToEditPoint(point)">修改</span>
                  <template v-if="point.permSet.length==0">
                    <a-divider type="vertical" />
                    <span @click="confirmDeletePoint(point)">删除</span>
                  </template>
                </div>
              </a-col>
            </template>
          </a-row>
        </a-collapse-panel>
      </template>
    </a-collapse>
  </template>
  <template v-else>
    <a-skeleton active />
  </template>
</div>
</template>
<script>
export default {
  data() {
    return {
      isReady:false,
      searchForm:{},
      sysListForSearch:[],
      pointsArray:[],
      pointsList:null,
      deleteData:null,
      permIcon:require('@/assets/images/group.png'),
    }
  },
  watch: {
  },
  beforeCreate() {
    this.porintSearchForm = this.$form.createForm(this)
  },
  mounted(){
    this.getSysCodOptions()
    this.getPointList()
    this.isReady = true
  },
  watch:{
    pointsList(){
      // 整理数据，可用于collapse展示
      this.pointsArray = []
      for(let item in this.pointsList){
        this.pointsArray.push({
          name:item,
          children:[].concat(this.pointsList[item])
        })
      }
    }
  },
  methods:{
    reset(){
      delete this.searchForm.type
      this.porintSearchForm.resetFields()
    },
    /**
     * 搜索获取功能点清单
     */
    getPointList(){
      let searchParms
      if(!!this.porintSearchForm.getFieldValue('pointName')){
        searchParms = Object.assign({},{
          type:this.searchForm.type,
          pointName:this.porintSearchForm.getFieldValue('pointName')
        })
      }else{
        searchParms = Object.assign({},{
          type:this.searchForm.type,
        })
      }
      this.$ajax.get({
        url: this.$api.GET_PREMSPOINT_LIST,
        params: searchParms
      }).then(res=>{
        if(res.code === '200'){
          this.pointsList = this.$com.confirm(res, 'data.content', [])
          console.log('pointsList',this.pointsList)
        }else{
          this.$message.error(res.msg)
        }
        this.isReady =true
      })
    },
    /**
     * 确认是否删除功能点
     * @param {Object} point 功能点对象
     */
    confirmDeletePoint(point){
      if(!!point) {
        let vm = this
        this.deleteData = point
        this.$model.confirm({
          title: '是否确认删除此功能点？',
          content: '此操作不可撤销',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            vm.handleDeletePoint()
          }
        })
      }
    },
    /**
     * 执行删除功能点，成功后刷新页面
     */
    handleDeletePoint(){
      this.$ajax.delete({
        url: this.$api.DELETE_PREMSPOINT.replace('{id}', this.deleteData.id)
      }).then(res => {
        if (res.code === '200') {
          this.$message.success('删除成功')
          // this.$router.go(0)
          this.getPointList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    goToAddPoint(){
      this.$router.push({name:'/systemManagement/permissionConfig/point/add'})
    },
    /**
     * 进入功能点编辑页面
     * @param {Object} point 功能点对象
     */
    goToEditPoint(point){
      this.$router.push({
        name:'/systemManagement/permissionConfig/point/edit',
        query:{point:JSON.stringify(point)}
      })
    },
    /**
     * 获取可选的子系统清单
     */
    getSysCodOptions(){
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res=>{
        if(res.code === '200'){
          let data = this.$com.confirm(res, 'data.content', [])
          this.sysListForSearch = data.map((item) => {
            return {
              label: item.sysName,
              value: item.sysCode
            }
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
<style scoped>
.reviewSeationGroup { padding-bottom:16px; }
.reviewSeationTitle span{  padding-right:10px; font-size: 12px; color:rgb(0, 0, 0,0.6);}
.reviewSeationTitle .sysName{ color:rgb(0, 0, 0,0.8); font-weight: bold; font-size: 14px;}
.reviewSeationTitle .points{ padding-left: 10px;}
.reviewSeationTitle .pointNum{ padding:0 4px; color: rgb(255, 0, 0,0.6); font-weight: bold }
.reviewSeationContent { padding:0; margin:0;}
.reviewCard { height:120px; margin-bottom:20px;}
.reviewCard .contentBody{ height:80px; padding:10px 10px; vertical-align: middle; background: #fff;  border-radius: 2px; border:1px solid #e0e0e0; }
.reviewCard .contentBody p{ margin: 0}
.reviewCard .contentBody .title, .reviewCard .contentBody .des {line-height: 20px; font-size: 12px; color:rgb(0, 0, 0,0.6)}
.reviewCard .contentBody .title { font-size: 14px; font-weight: bold; color:rgb(0, 0, 0,0.8)}
.reviewCard .contentOperate{ border:1px solid #e0e0e0; border-top: none; height: 38px;background-color: rgb(234, 244, 254,0.4); padding-right:20px;text-align: right;line-height: 38px;}
.reviewCard .perm{ font-size: 12px}
.reviewCard .group-icon{ width: 16px; position: relative; top: -2px; margin-right: 5px}
.reviewCard .permNum{ padding: 0 4px; color: rgb(255, 0, 0,0.6); font-weight: bold }
.contentOperate span{ color:#1890ff; cursor: pointer;display: inline-block; }
.contentOperate .title{color:#000;font-weight:bold;}
</style>



