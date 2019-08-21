<template>
  <div>
    <h1>暂未开放，敬请期待</h1>
    <!-- <a-row>
      <a-col class="homeRow" :span="24">
        <FastEntrance></FastEntrance>
      </a-col>
    </a-row>
    <a-row class="homeRow" :gutter="16">
      <a-col :span="12">
        <Todolist></Todolist>
      </a-col>
      <a-col :span="12">
        <Todolist></Todolist>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import { permission } from '@/util/mixins'
import FastEntrance from '@/views/home/fastEntrance.vue'
import Todolist from '@/views/home/todolist'
import MyMessages from '@/views/home/message'

export default {
  name: 'HomePage',
  mixins: [permission],
  components: {
    FastEntrance,
    Todolist,
    MyMessages
  },
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
</style>
<style>
.homeRow {padding-top:20px;}
</style>

