<template>
  <div class="dataService">
    <a-modal :footer="null" centered v-model="visible" >
      <a-row type="flex" justify="space-around" class="demo">
        <a-col :span="10" class="dataModal" @click="toVeterinary">
            <img src="@/assets/images/veterinary.png" alt="" class="icon2">
            <p class="title">官方兽医</p>
        </a-col>
        <a-col :span="10" class="dataModal">
            <img src="@/assets/images/fishProduction.png" alt="" class="icon2">
            <p class="title">全国渔业生产情况</p>
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
    toVeterinary() {
      this.$router.push({ name: '/veterinary'})

    }
  },
}
</script>
<style scoped>
.demo{ margin-top: 40px;}
.demo .dataModal {border: 1px solid rgb(189, 240, 237) ; background-color: rgb(239, 243, 245); text-align: center; margin-bottom: 20px;}
.demo .dataModal img { width: 100px; margin:20px;}
.dataModal .title{ padding-top: 8px; display: block; clear: both; font-size: 16px; font-weight: 600;}
</style>
