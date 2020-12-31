<template>
  <!-- <a-row
    type='flex'
    justify='center'
  >
    <a-col :span='24'>
      <img src="@/assets/images/home/db_bg.jpg" alt="" srcset="" style="width: 100%">
    
   -->
  <div class="container">
    <div class="leftBOX">
      <p>主办单位：全国水产技术推广总站、中国水产学会</p>
      <p>地址：北京市朝阳区麦子店街18号</p>
      <p>邮编：100125</p>
      <p>技术支持：博彦科技股份有限公司</p>
      <p>京ICP备05039419号</p>
    </div>
    <div class="rightBOX">
      <div class="oneBOX">
        <img src="@/assets/images/home/15cm-1m.jpg" />
        <p>“智能渔技” 微信小程序</p>
      </div>
      <div class="twoBOX">
        <img src="@/assets/images/home/gzh.jpg" />
        <p>“中国水产” 微信公众号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}; 
</script>

<style scoped>
.container {
  height: 160px;
  width: 100%;
  background: url("../../../../../assets/images/home/db_bg.jpg") no-repeat
    center;
  display: flex;
  padding-right: 19%;
}
.leftBOX {
  flex: 1;
  /* margin-left: 100px; */
  margin-top: 20px;
}
.rightBOX {
  width: 30%;
  display: flex;
  justify-content: space-around;
}
.oneBOX img, .twoBOX img {
  margin-top: 20px;
  width: 100px;
  height: 100px;
}
.container p {
  font-size: 15px;
  color: white;
  margin-top: 6px;
  line-height: 12px;
  text-align: left;
  margin-left: 34%;
}
.rightBOX p {
  font-size: 13px;
  margin-top: 16px;
  margin-left: -1px;
}
</style>