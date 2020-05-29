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
          <p class="name" :title='item.name'>{{item.name}}</p>
          <p class="breedUnit" v-if="baseType=='breed'">计量单位：{{!item.unit?'暂无':item.unit}}</p>
          <DataOperatorInList :creator='!item.creator?"":item.creator' :lastOperator='!item.operator?"":item.operator'></DataOperatorInList>
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
import CreatBase from './add'
import EditBase from './edit'
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
export default {
  name : 'ExpertListByType',
  props: {
    baseType: {
      type    : String,
      required: true
    }
  },
  components: {
    CreatBase, EditBase,
    DataOperatorInList
  },
  data() {
    return {
      apis: {
        list  : '',
        delete: '',
      },
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
      this.preparate()
    }
  },
  mounted(){
    this.preparate()
  },
  methods: {
    preparate(){
      switch(this.baseType){
      case 'breed':
        this.apis.list = this.$api.GET_SYSBASICINFO_BREED_LIST
        this.apis.delete = this.$api.DELETE_SYSBASICINFO_BREED
        break
      default:
        break
      }
      this.getList()
    },
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
        url: this.apis.list
      }).then(res => {
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
        const vm = this
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
        url: this.apis.delete.replace('{id}', this.deleteData.id)
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
.inner {height: 160px; display: flex; flex-direction: column; border: 1px solid #e8eaec;}
.content { display: flex; flex: 1; flex-direction: column; justify-content: center; align-items: start; padding:0px 10px;}
.content p{ margin-bottom: 0 }
.content .name{ font-weight: bold; margin-bottom: 5px; word-break: break-all; display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
.content .breedUnit{ color: rgba(0,0,0,0.7); width: 100%; margin-bottom: 8px; padding-bottom: 5px;  border-bottom: 1px dashed rgba(0,0,0,0.2)}
.operate { border-top: 1px solid #e8eaec; height: 40px; text-align: center; line-height: 40px; }
.operate span { cursor: pointer; color: #1890ff}
.inner.add-btn { background: #e8eaec; border: none; }
.inner.add-btn > button {  width: 100%; height: 100%; font-size: 16px; color: #1890ff;}
.center-p{ text-align: center;}
.group-icon{ width: 16px; position: relative; top: -2px;}
</style>

