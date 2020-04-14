<template>
<div class="wrapper">
  <template v-if='!isReady'>
    <a-skeleton active />
  </template>
  <template v-else>
    <div class="box">
      <div class="inner add-btn">
        <a-button icon="plus" @click="showCreateModal" class="add-btn" type="default" >新增</a-button>
      </div>
    </div>
    <div class="box" v-for="(item,index) in list" :key="index">
      <div class="inner">
        <div class="content">
          <p class="name">{{item.name}} <br /> 
            <span v-if="item.lv">({{item.lv}})</span>
          </p>

          <DataOperatorInList :creator='!item.creator?"":item.creator' :lv='!item.lv?"":item.lv' :lastOperator='!item.operator?"":item.operator'></DataOperatorInList>
        </div>
        <div class="operate">
          <template>
            <span @click="showEditModal(item)">修改</span>
            <a-divider type="vertical" />
          </template>
          <span @click="handleDelete(item)">删除</span>
        </div>
      </div>
    </div>
  </template>
  <CreatBase @on-success='closeCreateModal' :baseType='baseType' :resetShow='isShow.createModal'></CreatBase>
  <EditBase @on-success='closeEditModal' :baseType='baseType' :resetShow='isShow.editModal' :item="!editData?{}:editData"></EditBase>
</div>
</template>
<script>
import common from '@/util/common'
import CreatBase from './add'
import EditBase from './edit'
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
export default {
  name : 'ExpertListByType',
  props: {
    baseType: {
      type    : String,
      required: true,
      validator (value) {
        // 0-民族 1-单位性质 2-职务 3-职称 4-学历 5-学位 6-工作领域 7-专业组别 8-研究方向
        return common.oneOf(value, [ '0', '1', '2', '3', '4', '5', '6', '7', '8' ])
      }
    }
  },
  components: {
    CreatBase,EditBase,DataOperatorInList
  },
  data() {
    return {
      isReady   : false,
      list      : [],
      deleteData: null,
      editData  : null,
      isShow    : {
        createModal: false,
        editModal  : false
      }
    }
  },
  watch: {
    baseType(){
      this.getList()
    }
  },
  mounted(){
    this.getList()
  },
  methods: {
    showEditModal(item){
      this.editData = item
      this.isShow.editModal = true
    },
    closeEditModal(isReload){
      this.isShow.editModal = false
      this.editData = null
      if(isReload){
        this.getList()
      }
    },
    showCreateModal(){
      this.isShow.createModal = true
    },
    closeCreateModal(isReload){
      this.isShow.createModal = false
      if(isReload){
        this.getList()
      }
    },
    //   查询列表
    getList(){
      this.$ajax.get({
        url: this.$api.GET_EXPERT_BASE_LIST.replace('{type}', this.baseType)
      }).then(res=>{
        if(res.code === '200'){
          this.list= this.$com.confirm(res, 'data.content', [])
        }else{
          this.$message.error(res.msg)
        }
        this.isReady = true
      })
    },
    //   删除按钮
    handleDelete(item){
      if(!!item) {
        let vm = this
        this.deleteData = item
        this.$modal.confirm({
          title     : '是否确认删除此数据？',
          content   : '此操作不可撤销',
          okText    : '确认',
          okType    : 'danger',
          cancelText: '取消',
          onOk() {
            vm.confirmDelete()
          }
        })
      }

    },
    confirmDelete(){
      this.$ajax.delete({
        url   : this.$api.DELETE_EXPERT_BASE.replace('{id}', this.deleteData.id),
        params: {
          type: this.baseType
        }
      }).then(res => {
        if (res.code === '200') {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
  }
}
</script>
<style scoped>
.wrapper { display: flex; flex-wrap: wrap;}
.box { width: 20%; padding: 0 8px 16px 8px;}
.inner {height: 140px; display: flex; flex-direction: column; border: 1px solid #e8eaec;}
.content { display: flex; flex: 1; flex-direction: column; justify-content: center; align-items: start; padding:0px 10px;}
.content .name{ font-weight: bold; padding-bottom: 5px; margin-bottom: 5px; word-break: break-all; display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;  border-bottom: 1px dashed rgba(0,0,0,0.2) }
.operate { border-top: 1px solid #e8eaec; height: 40px; text-align: center; line-height: 40px; }
.operate span { cursor: pointer; color: #1890ff}
.inner.add-btn { background: #e8eaec; border: none; }
.inner.add-btn > button {  width: 100%; height: 100%; font-size: 16px; color: #1890ff;}
.center-p{ text-align: center;}
.group-icon{ width: 16px; position: relative; top: -2px;}
</style>


