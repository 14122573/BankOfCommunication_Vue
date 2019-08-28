<template>
    <span :style="{margin:'14px 0 0 14px'}" class="distribution-span">
        <a-card :bordered="false">
            <a-row type="flex" slot="title" justify="space-between" align="middle">
                <a-col>
                    权限分配
                </a-col>
                <a-col >
                    <a-button type="primary" @click="$router.back();" ghost>返回</a-button>
                    <a-button type="primary">保存</a-button>
                </a-col>
            </a-row>
            <UserDetail/>
        </a-card>
        <a-divider style="margin-top:0px;"  dashed />
        <a-card :bordered="false">
            <a-form :form="formData">
            <a-row>
                <a-col span="8">
                    <a-form-item
                        label="角色名称："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="formData.space"
                        :options='options.roleList'
                        @change="roleChange"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="8">
                    <a-form-item
                        label="所属行政区域："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        allowClear
                    >
                    <a-tree-select
                        :treeData="regionData"
                        :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                        showSearch
                        allowClear
                        :loadData="loadRegion"
                        @search="regionSearch"
                        @select="selectRegion"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="8">
                    <a-form-item
                        label="组织机构："
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                        allowClear
                    >
                    <!-- <a-tree-select
                        :treeData="treeData"
                        :defaultExpandedKeys='expandedKeys'
                        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                        showSearch
                        allowClear
                    /> -->
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <a-tree
          checkable
          :treeData="treeData"
          :defaultExpandedKeys='expandedKeys'
          v-model="checkedKeys"
        />
        </a-card>
    </span>
</template>
<script>
import UserDetail from './user-detail'
export default {
  name: 'pendingPermissions-distribution',
  components:{UserDetail},
  data(){
    return{
      formData:{},
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      options:{
        roleList:[]
      },
      checkedKeys: [],//选择的数组
      treeData:[],
      // 默认展开的数组
      expandedKeys:[],
      // 所属行政区域
      regionData:[],
    }
  },
  methods:{
    // 角色切换
    roleChange(value){
      console.log(value)
      this.$ajax.get({
        url:this.$api.ROLE_DETAIL.replace('{id}',value)
      })
        .then(res=>{
          if(res.code === '200'){
            let data=res.data.content
            this.checkedKeys=data.map((item)=>{
              return item.id
            })
          }else{
            this.$message.error(res.msg)
          }
        })
    },
    // 搜索框发生改变
    regionSearch(value){
      let data=JSON.parse(JSON.stringify(this.allData))
      if(value === ''){
        this.regionData=[]
      }else{
        this.regionData=[]
        data.forEach((item,index)=>{
          this.regionData.push(this.getTreeNode(item,index))
        })
      }

    },
    // 异步加载行政区域树
    loadRegion(){
      
    },
    // 选中行政区域
    selectRegion(value, node, extra){
      console.log(value, node, extra,node.eventKey)
    },
    //   查询options
    getOptions(){
      let optionList=[{url:this.$api.GET_ROLE_LIST,name:'roleList'}]
      optionList.forEach(item=>{
        this.$ajax.get({
          url:item.url,
          params:{
            pageNo:1,
            pageSize:10000
          }
        })
          .then(res=>{
            if(res.code === '200'){
              let data=res.data.content
              this.options[item.name]=data.map(item=>{
                return{
                  label:item.roleName,
                  value:item.id
                }
              })
            }else{
              this.$message.error(res.msg)
            }
          })
      })
    },
    // // 查询权限树
    getTree(){
      this.$ajax.get({
        url:this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res=>{
        let data=res.data.content
        this.allData=data
        
        data.forEach((item,index)=>{
          this.treeData.push(this.getTreeNode(item,index))
        })
      })
    },
    // 整理权限树
    getTreeNode(item,index){
      let childrenNode={
        title:item.permName,
        key:item.id,
        value:item.permName
      }
      if(item.childList && item.childList.length){
        childrenNode.children = []
        item.childList.forEach((subItem,subIndex) =>{
          let subkey = subItem.id
          childrenNode.children.push(this.getTreeNode(subItem,subkey))
        })
      }
      return childrenNode
    }
  },
  mounted(){
    this.$ajax.all(this.getOptions(),this.getTree())
  }
}
</script>
<style scoped>
    .distribution-span{
        background: #fff;
        display: block;
    }
</style>



