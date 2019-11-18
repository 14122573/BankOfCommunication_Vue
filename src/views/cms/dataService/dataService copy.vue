<template>
  <div class="dataService">
    <a-modal :footer="null" centered v-model="visible">
    <a-row type="flex" justify="space-around" align="bottom" >
      <a-col :span="10" style="text-align:center">
        <p class="dataModal">
          <img src="@/assets/images/生产@3x.png" alt="" class="icon2">
          <span class="title">官方兽医</span>
        </p>
      </a-col>
      <a-col :span="10" style="text-align:center">
        <p class="dataModal" >
          <img src="@/assets/images/兽医@3x.png" alt="" class="icon2">
          <span class="title">全国渔业生产情况</span>
        </p>
      </a-col>
    </a-row>

    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
  },
}
</script>
<style scoped>
/* .dataService{ background-color: #ccc; margin: 10px;} */
.dataModal{  text-align: center; border: 1px solid #ccc ;}
.dataModal img { height: 80px;}
.dataModal .title{ padding-top: 8px; display: block; clear: both; font-size: 16px; font-weight: bold;}
</style>
