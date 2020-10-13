<template>
  <div>
    <a-row class="sectionTitle" type="flex" justify="space-between" align="middle">
      <a-col :span="18"><a-divider class="divider" type="vertical" /><span class="title">帮助中心</span></a-col>
      <a-col v-if="manualList.length > 0" :span="6" class="algin-right">
        <!-- <span @click="routerTo('/cms/manual/file-list')" class="more">查看全部</span> -->
        <a-popover placement='topLeft'>
          <template slot="content">
            <a-list item-layout="horizontal" size='small' split='false'>
              <a-list-item>
                <a-list-item-meta
                  description="张桓"
                >
                  <a slot="title">管理员姓名</a>
                </a-list-item-meta>
              </a-list-item>
              
              <a-list-item>
                <a-list-item-meta
                  description="15068974582"
                >
                  <a slot="title">管理员联系方式</a>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </template>
          <a-button type="link">
            <img src="@/assets/images/contact_icon.png" style="zoom: 0.7">
          </a-button>
        </a-popover>
      </a-col>
    </a-row>
    <a-modal
      :width="465"
      :closable="false"
      :visible="modifyVisible"
      :footer="null"
    >
        <span slot="title">
          <a-row>
            <a-col :span='22'>
              <a-divider type='vertical' style="width: 5px; height: 16px; background-color: #1890ff"/>全部操作手册
            </a-col>
            <a-col :span='2'>
              <a @click="changeModalState()" style="color: grey; font-size: 12px">关闭</a>
            </a-col>
          </a-row>
        </span>

        <a-row>
          <div v-for="(item, index) in manualList" :key="index">
            <div v-if="index % 5 == 0">
              <a-col :span='4' style="font-size: 10px; margin-bottom: 16px; cursor: pointer;">
                <span @click="handleView(item.path)">
                  <img src="@/assets/images/pdf.png" width='50px' height="50px" style="display: block"/>
                  {{item.name.length > 3? item.name.substring(0, 4) + '...':item.name}}
                </span>
              </a-col>
            </div>
            <div v-else>
              <a-col :span='4' :offset='1' style="font-size: 10px; margin-bottom: 16px; cursor: pointer;">
                <span @click="handleView(item.path)">
                  <img src="@/assets/images/pdf.png" width='50px' height="50px" style="display: block"/>
                  {{item.name.length > 3? item.name.substring(0, 4) + '...':item.name}}
                </span>
              </a-col>
            </div>
          </div>
        </a-row>
        
    </a-modal>
    <div class="sectionContent">
      <a-row style="height: 70px"></a-row>
      <a-row align='middle' justify='center'>
        <div v-if="manualList.length > 0" class="manual-wrapper">
          <div v-for="(item, index) in manualList" :key="index">
            <!-- 如果当前的文件数量少于5个（不包括5个），则不显示查看更多 -->
            <div v-if="index == 0" style="cursor: pointer;">
              <a-col :span='4' style="font-size: 10px;">
                <span @click="handleView(item.path)">
                  <img src="@/assets/images/pdf.png" width='50px' height="50px" style="display: block"/>
                  {{item.name.length > 3? item.name.substring(0, 4) + '...':item.name}}
                </span>
              </a-col>
            </div>

            <div v-else-if="index > 0 && index < 4" style="cursor: pointer">
              <a-col :span='4' :offset='1' style="font-size: 10px;">
                <span @click="handleView(item.path)">
                  <img src="@/assets/images/pdf.png" width='50px' height="50px" style="display: block"/>
                  {{item.name.length > 3? item.name.substring(0, 4) + '...':item.name}}
                </span>
              </a-col>
            </div>

            <div v-else-if="index == 4" style="cursor: pointer">
              <a-col :span='4' :offset='1' style="font-size: 10px;">
                <span @click="changeModalState()">
                  <img src="@/assets/images/all.png" width='50px' height="50px" style="display: block;"/>
                  查看全部
                </span>
              </a-col>
            </div>
          </div>
          <!-- {{manualList}} -->
        </div>
        <!-- <div v-if="manualList.length > 0" @click="handleView" class="manual-wrapper">
          <img src="@/assets/images/pdf.png" />
          {{manualList[0].name}}
        </div> -->
        <div v-else class="noDataBox">
          <p>暂无操作手册</p>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManualPublish',
  data() {
    return {
      manualList   : [],
      modifyVisible: false
    }
  },
  mounted() {
    this.getManualList()
  },
  methods: {
    getManualList() {
      const params = {
        // pageNo  : 1,
        // pageSize: 10
      }
      this.$ajax.get({
        url: this.$api.GET_MANUAL_LIST,
        params,
      }).then(res => {
        this.manualList = this.$com.confirm(res, 'data.content', [])
      })
    },
    handleView(path) {
      window.open(path, '_blank')
    },
    routerTo(name) {
      this.$router.push({
        name,
      })
    },
    changeModalState() {
      this.modifyVisible = !this.modifyVisible
    }
  },
}
</script>

<style scoped>
.sectionBody{ margin: 0 16px; padding-top: 16px;}
.sectionTitle { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid  rgba(0,0,0,0.1)}
.sectionTitle .divider{ font-size: 16px; background-color:#1890ff; height: 16px; width: 5px; border-radius: 4px;}
.sectionTitle .title{ font-size: 16px;}
.sectionTitle .more{ cursor: pointer; color: #1890ff}
/* .manual-wrapper {text-align: center; padding-bottom: 16px; cursor: pointer;} */
.manual-wrapper {text-align: center; padding-bottom: 16px;}
/* .manual-wrapper:hover {color: #1890ff} */
.manual-wrapper > img {width: 50px;}
.noDataBox {height: 70px; color:rgba(0,0,0,0.6); font-size: 30px; display: flex;flex-direction: column; align-items: center;justify-content: center;}
.sectionContent {height: 230px}

</style>
