<template>
  <div class="wrapper">
    <a-row>
      <a-col span="15">
        <div class="institutionalTree">
          <a-tree v-if="showTree" showLine @select="onSelect" @expand="expand" :expandedKeys="expandedKeys" :autoExpandParent="true"
            :treeData="treeData" :selectedKeys="selectedKeys" :loadData="onLoadData">
          </a-tree>
        </div>
      </a-col>
      <a-col span="9">
        <a-button type="primary" :disabled="disabled" html-type="submit" @click="addBranch('添加同级行政区')">添加同级行政区</a-button>
        <a-button type="primary" :disabled="disabled" html-type="submit" @click="addBranch('修改行政区')">修改行政区</a-button>
        <a-button type="primary" :disabled="disabled" html-type="submit" @click="deleteBranch">删除行政区</a-button>
      </a-col>
    </a-row>

    <a-modal
      :title="title"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
      :bodyStyle="{padding:'24px 50px'}"
    >
      <a-form class="protalForm" :form="form">
        <a-row>
          <a-col span="24">
            <a-form-item class="formItem" label="请输入行政区名" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入行政区名" v-decorator="['branchName',{
                validateTrigger: 'blur',
                rules: [{ required: true, message: '请输入行政区名' }]
              }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row>
        <a-col span="24">
          <a-button type="primary" @click="submitForm" style="margin-top:20px;float:right;">确定</a-button>
        </a-col>
      </a-row>
    </a-modal>

  </div>
</template>

<script>
export default {
  name: 'Administrative',
  data(){
    return {
      showTree    : false,
      form        : this.$form.createForm(this),
      expandedKeys: [],
      area        : [ 'all' ],
      //当前点击的分支key
      selectedKeys: [],
      //保存树数据的数组
      treeData    : [],
      //当前点击的分支对象
      targetArea  : {},
      disabled    : true,
      title       : '',
      visible     : false,
      branchName  : '',
    }
  },
  mounted(){
    // this.expand(['all'])
    this.getArea()
  },
  methods: {
    /***
     * 点击分支事件
     * selectedKeys {array} 当前点击的分支key
     * info {object} 分支的事件对象
     */
    onSelect(selectedKeys, info) {
      if(selectedKeys.length>0 && selectedKeys[0]!='all'){
        this.disabled=false
        this.targetArea=info
        this.selectedKeys = selectedKeys
      }else{
        this.disabled=true
        this.targetArea=info
        this.selectedKeys = selectedKeys
      }
    },
    //关闭弹框
    handleCancel(){
      this.visible=false
    },
    //点击添加或修改分支按钮
    addBranch(title){
      this.title=title
      this.visible=true
    },
    //提价添加或修改的表单
    submitForm(){
      this.form.validateFields((err, values) => {
        if (!err) {
          if(this.title=='添加同级行政区'){
            this.$ajax.post({
              url   : this.$api.POST_ADD_AREA,
              params: {
                areaName: this.form.getFieldValue('branchName'),
                parentId: this.targetArea.node.dataRef.parentId
              }
            }).then(res => {
              this.visible=false
              this.showTree=false
              if(res.code=='200'){
                this.$message.success('添加成功')
                this.treeData=[]
                this.getArea()
              } else {
                this.$message.info(res.msg, 10)
              }
            })
          }else if(this.title=='修改行政区'){
            this.$ajax.post({
              url   : this.$api.PUT_REVISE_AREA.replace('{id}', this.selectedKeys[0]),
              params: {
                areaName: this.form.getFieldValue('branchName'),
                parentId: this.targetArea.node.dataRef.parentId
              }
            }).then(res => {
              this.visible=false
              this.showTree=false
              if(res.code=='200'){
                this.$message.success('修改成功')
                this.treeData=[]
                this.getArea()
              } else {
                this.$message.info(res.msg, 10)
              }
            })
          }
        }
      })
    },

    /**
     * 删除分支
     */
    deleteBranch(){
      const _this=this
      this.$modal.confirm({
        title: '确定要删除吗？',
        onOk() {
          _this.$ajax.post({
            url: _this.$api.DELETE_AREA.replace('{id}', _this.selectedKeys[0]),
          }).then(res => {
            _this.showTree=false
            if(res.code=='200'){
              _this.$message.success('删除成功')
              _this.getArea()
            } else {
              _this.$message.info(res.msg, 10)
            }
          })
        },
        onCancel() {
        },
      })
    },

    /**
     * 展开关闭分支事件
     * expandedKeys {array} 当前展开/关闭的分支key
     */
    expand(expandedKeys) {
      let index=-1
      for(let i=0;i<this.expandedKeys.length;i++){
        if(expandedKeys.indexOf(this.expandedKeys[i])<0){
          index=i
        }
      }
      if(index>=0){
        this.area = expandedKeys.slice(0, index)
        this.expandedKeys = expandedKeys.slice(0, index)
      }else{
        this.area = expandedKeys
        this.expandedKeys = expandedKeys
      }
    },
    //获取树的数据
    getArea() {
      this.$ajax.get({
        url   : this.$api.GET_AREA_NEXT,
        params: {
          parentId: 0
        }
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        const trees = []
        datas.forEach((ele, index) => {
          trees.push(this.getTreeNode(ele, index))
        })
        this.treeData = [ {
          title   : '全部',
          key     : 'all',
          children: trees
        } ]
        this.expandedKeys=this.area
        this.showTree=true
      })
    },
    getTreeNode(item, index) {
      const childrenNode = {
        title   : item.areaName,
        id      : item.id,
        key     : item.id,
        parentId: item.parentId
      }
      if (item.id.length == '9') {
        childrenNode.isLeaf = true
      }
      return childrenNode
    },

    /**
     * 异步加载数据，获取子节点
     *  treeNade {object} 当前点击的节点
     */
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.$ajax.get({
          url   : this.$api.GET_AREA_NEXT,
          params: {
            parentId: treeNode.dataRef.id
          }
        }).then(res => {
          const datas = this.$com.confirm(res, 'data.content', [])
          const array = []
          datas.forEach((ele, index) => {
            array.push(this.getTreeNode(ele, index))
          })
          treeNode.dataRef.children = array
          this.treeData = [ ...this.treeData ]
          resolve()
        })
      })
    },
  },
}
</script>

<style>

</style>
