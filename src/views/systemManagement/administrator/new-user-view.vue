<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span :class="showInfo?'title transparent':'title underLine bule'" @click="showInfo?changeShow(true):changeShow(false)"
        style="padding:0px;margin-left:32px;">账户信息</span>
      <a-divider type="vertical" />
      <span :class="showInfo?'title underLine bule':'title transparent'" @click="showInfo?changeShow(false):changeShow(true)"
        style="padding:0px;">人员信息</span>
      <div class="detailOperations" v-if="!showInfo">
        <a-button type="primary" ghost @click='handleReturn'>返回</a-button>
        <a-button type="primary" v-if="$permission('P03302')" @click='handleEdit(1)'>修改</a-button>
      </div>
      <div class="detailOperations" v-else>
        <a-button type="primary" ghost @click="handleReturn"> 返回 </a-button>
        <a-button type="primary" v-if="$permission('P03302')" @click="handleEdit(2)">修改</a-button>
      </div>
    </div>
    <div v-if="!showInfo" class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <div class="layoutMargin layoutPadding detailsPartSection">
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"姓名"' :text='!detail.name?"暂无":detail.name'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"账户"' :text='!detail.phone?"暂无":detail.phone'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮箱"' :text='!detail.mail?"暂无":detail.mail'></DetailsItem>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"单位名称"' :text='!detail.dept?"暂无":detail.dept'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"邮编"' :text='!detail.zipCode?"暂无":detail.zipCode'></DetailsItem>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="16">
              <a-row type="flex" justify="start">
                <a-col span="4" style="text-align:right;color:#999">地址：</a-col>
                <a-col span="18">
                  {{detail.addr || "暂无"}}
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="8" class="detailsPartLine">
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"角色名称"' :text='!detail.roleNames?"暂无":detail.roleNames'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"组织机构名称"' :text='(!detail.group||!detail.group.groupName)?"暂无":detail.group.groupName'></DetailsItem>
            </a-col>
            <a-col span="8">
              <DetailsItem :labelSpan='8' :textSpan="16" :label='"所属行政区域"' :text='(!detail.area||!detail.area.areaName)?"暂无":detail.area.areaName'></DetailsItem>
            </a-col>
          </a-row>
          <div class="layoutMargin detailsPartLine" >
            <a-tree class="portalRoleTree" v-if="detailReady==2" checkable :treeData="treeData" v-model="checkedKeys" disabled />
          </div>
        </div>
      </div>
    </div>
    <ExpertLibaryView v-else :id="$route.query.id" :loginPhone='detail.phone'/>
  </div>
</template>
<script>
import ExpertLibaryView from '@/views/expertManagement/expertLibrary/view'
export default {
  components: {
    ExpertLibaryView,
  },
  data() {
    return {
      showInfo           : false,
      defaultExpandedKeys: [],
      checkedKeys        : [],
      detail             : {},
      treeData           : [],
      detailReady        : 0
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    changeShow(bool){
      if(bool){
        this.showInfo=!this.showInfo
      }
    },
    handleReturn() {
      this.$router.back()
    },
    handleEdit(num) {
      if(num==1){
        this.$router.push({
          name : '/systemManagement/administrator/editNewUser',
          query: {
            id: this.$route.query.id
          }
        })
      }else if(num==2){
        this.$router.push({
          name : '/systemManagement/administrator/edit',
          query: {
            id        : this.$route.query.id,
            loginPhone: this.detail.phone,
          }
        })
      }

    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_USER_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.detail = res.data.content
        this.getTree()
        this.getDefaultRole(this.detail.roleIds)
      })
    },
    // 查询权限树
    getTree() {
      this.$ajax.get({
        url: this.$api.GET_ALL_ROLE + '?isTree=true'
      }).then(res => {
        const data = res.data.content
        data.forEach((item, index) => {
          this.treeData.push(this.getTreeData(item, index))
        })
        this.detailReady ++
      })
    },
    // 整理权限树
    getTreeData(item, index) {
      const childrenNode = {
        title: item.permName,
        key  : item.id,
        value: item.id
      }
      if (item.childList && item.childList.length) {
        childrenNode.children = []
        item.childList.forEach((subItem, subIndex) => {
          const subkey = subItem.id
          childrenNode.children.push(this.getTreeData(subItem, subkey))
        })
      }
      return childrenNode
    },
    getDefaultRole(params) {
      this.$ajax.get({
        url: this.$api.ROLE_DETAIL.replace('{id}', params)
      }).then(res => { 
        if (res.code === '200') {
          const data = res.data.content
          for(let i=0;i<data.length;i++){
            this.checkedKeys.push(data[i].id)
          }
          this.detailReady ++
        }
      })
    }
  }
}
</script>
<style scoped>
	.position { margin-left: 5px; color: #1890ff; cursor: pointer; }
  .underLine { border-bottom: 2px solid #1890ff;}
  .bule { color: #1890ff;}
  .transparent { font-weight: normal; color: rgba(0, 0, 0, 0.5); cursor: pointer;}
</style>
