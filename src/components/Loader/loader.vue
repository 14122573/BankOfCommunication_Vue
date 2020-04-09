<template>
  <div class="loader" v-show="$store.state.showLoading">
    <a-spin :tip="msg" :spinning="$store.state.showLoading" size="large"/>
  </div>
</template>

<script>
export default {
  name : 'Loader',
  props: {
    msg: {
      type   : String,
      default: '加载中...',
    }
  }
}
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
