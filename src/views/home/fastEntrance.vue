
<template>
  <div>
    <p class="fastEntranceTitle">
      <span class="name">快速入口</span> <a-icon class="settingBtn" theme="filled" type="setting" />
    </p>
    <div class="fastEntranceWapper">
      <a-skeleton :loading="loadingSkeleton">
        <a-row class="entranceList" :gutter="16">
          <a-col :span="8">
            <p class="entranceGname">老系统入口</p>
            <a-row class="entrancePlist" type="flex" justify="start" :gutter="16">
              <a-col :span="12"><p class="entrance"><a href="#">水产养殖动物病原菌耐药性普查数据分析</a></p></a-col>
              <a-col :span="12"><p class="entrance"><a href="#">水产预警系统</a></p></a-col>
            </a-row>

          </a-col>
          <a-col :span="8">
            <p class="entranceGname">新品种审定</p>
            <a-row class="entrancePlist" type="flex" justify="start" :gutter="16">
              <a-col :span="12"><p class="entrance"><a href="#">组织专家</a></p></a-col>
              <a-col :span="12"><p class="entrance"><a href="#">公布结果</a></p></a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-skeleton>
    </div>
  </div>
</template>
<script>

export default {
  name: 'FastEntrance',
  components: {
  },
  data() {
    return {
      loadingSkeleton:false
    }
  },
  created() {

  },
  watch:{


  },
  computed: {

  },
  methods: {
  }
}
</script>

<style>
.fastEntranceTitle {  font-size: 20px; color:#4D4D4D; line-height: 1rem }
.fastEntranceWapper { padding: 10px; background-color:#fff }
.entranceList { padding: 10px}
.entranceGname { font-size: 16px; color:#4D4D4D; padding-left: 10px; border-left:4px solid #3391FF; height: 16px; line-height: 16px }
.entrancePlist { margin-top: 10px;}
.entrance { line-height: 1.3rem; padding:1rem;  height: 4.6rem; text-align: center; font-size: 14px; background: #F2F7FA url('../../assets/images/fastEntrance-bg.png') no-repeat bottom right;  }
.entrance a { color:#4D4D4D; }
.entrance a:hover { color: #3391FF}
</style>
