// 整体布局文件
<template>
  <div>
    <p class="fastEntranceTitle">
      <span class="name">快速入口</span> <a-icon class="settingBtn" type="setting" />
    </p>
    <div class="fastEntranceWapper">
      <a-skeleton :loading="loadingSkeleton">

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
      loadingSkeleton:true
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
.fastEntrance { padding: 10px; background-color:#fff }
</style>
