<template>
  <div class="layoutMargin workpaceBg">
    <div class="loader" v-if="$store.state.isLoadingResource">
      <div>
        <a-spin tip="子项目资源载入中..." :spinning="$store.state.isLoadingResource" size="large"/>
      </div>
      <div style="width: 30%;">
        <a-progress :percent="$store.state.loadingProgress" status="active"/>
      </div>
    </div>
		<img class="workpaceLeftFishBg" src="@/assets/images/workspace-fishLeft.png" alt="logo" />
		<img class="workpaceRightFishBg" src="@/assets/images/workspace-fishRight.png" alt="logo" />
		<img class="workpaceButtomWave" src="@/assets/images/workspace-wave.png" alt="logo" />
		<img class="workpaceTitle" src="@/assets/images/workspace-title.png" alt="欢迎使用智能渔技综合管理平台" />
    <a-row class="workspacDoc">
      <a-col span='18'>
      <p class="workspacDocTitle">
        <span><a-divider class="divider" type="vertical"></a-divider> 操作手册</span>
      </p>
      <a-row class="workspacDocBody" :gutter='10'>
        <a-col span='6'>
          <p class="workspacDocItem"><a>国家水生国家水生国家水生国家水生国家水生.doc</a></p>
        </a-col>
        <a-col span='6'>
          <p class="workspacDocItem"><a>国家水生国家水生国家水生国家水生国家水生.doc</a></p>
        </a-col>
        <a-col span='6'>
          <p class="workspacDocItem"><a>国家水生国家水生国家水生国家水生国家水生.doc</a></p>
        </a-col>
        <a-col span='6'>
          <p class="workspacDocItem"><a>国家水生国家水生国家水生国家水生国家水生.doc</a></p>
        </a-col>
      </a-row>
      </a-col>
      <a-col span='6'>
      <p class="workspacDocTitle">
        <span><a-divider class="divider" type="vertical"></a-divider>管理员联系方式</span>
      </p>
        <div class="workspacHelpItem">
          <p>管理员姓名</p>
          <p>18300562365</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.workpaceBg { position: relative; width: calc(100% - 32px); height: calc(100% - 16px); overflow:hidden; }
.workpaceBg .workpaceLeftFishBg{ position:absolute; top:-2px; left: 0; width: 20%; z-index: 1; }
.workpaceBg .workpaceRightFishBg{ position:absolute; right:0px; bottom: 80px; width: 20%; z-index: 1; }
.workpaceBg .workpaceButtomWave{ position:absolute; left:0px; bottom: -30px;   z-index: 1; }
.workpaceBg .workpaceTitle{ position:absolute; width: 60%; left: 50%; top:20%; margin-left: -30%; z-index: 1; }
.workspacDoc { width: calc(100% - 40px);  position:absolute; left: 20px; right: 20px; bottom: 20px; z-index: 2;}
.workspacDocTitle { border-bottom: 1px solid #ccc; font-size: 16px; font-weight: bold; line-height: 20px; padding-bottom: 10px;}
.workspacDocTitle .divider { width: 5px; height: 16px; background-color: #1890ff}
.workspacDocBody { padding-right: 10px;}
.workspacDocItem { padding:5px 0 0 50px; min-height: 50px; cursor: pointer; background: url('../assets/images/workspace-helperword.png') no-repeat; background-size: 40px; background-position: left top}
.workspacDocItem a{ color: rgba(0, 0, 0, 0.8); font-size: 14px; line-height: 18px;}
.workspacHelpItem { margin:20px 0 0 20px; color: rgba(0, 0, 0, 0.8); font-size: 14px; line-height: 20px; padding-left:50px; min-height: 50px; cursor: pointer; background: url('../assets/images/workspace-service.png') no-repeat; background-size: 40px; background-position: left top}
.workspacHelpItem p{ padding: 0; margin: 0}
</style>

<script>
import { permission } from '@/util/mixins'
export default {
  name: 'HomePage',
  mixins: [permission],
  data() {
    return {

    }
  },
  mounted() {
    const token = this.$cookie.get('token')
    if (token) {
      this.getInfo()
    }
  }
}
</script>

<style scoped>
	h1{ text-align: center; padding: 30px; }
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255,255,255,0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
</style>
<style>
.homeRow {padding-top:20px;}
</style>

