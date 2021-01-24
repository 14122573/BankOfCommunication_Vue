<template>
  <div class="container">
    <div class="leftBOX">
      <p>主办单位：全国水产技术推广总站、中国水产学会
      <br>地址：北京市朝阳区麦子店街18号
      <br>邮编：100125
      <br>技术支持：博彦科技股份有限公司
      <br>京ICP备05039419号
      <br>
      <a target="_black" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502034743" style="display:inline-block;text-decoration:none;height:17px;line-height:20px;">
      <img src="../../../../../assets/images/home/W020180103413472631233.png" style="width:100%;float:left;margin-left:-1px;">
      </a>
      京公网安备11010502034743号</p>
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
export default {}
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
  margin-top: 18px;
}
.rightBOX {
  width: 30%;
  display: flex;
  justify-content: space-around;
}
.oneBOX img, .twoBOX img {
  margin-top: 18px;
  width: 100px;
  height: 100px;
}
.container p {
  font-size: 13px;
  color: white;
  margin-top: -6px;
  line-height: 23px;
  text-align: left;
  margin-left: 34%;
}
.leftBOX img {
  margin-left: 34%;
}
.rightBOX p {
  font-size: 13px;
  margin-top: 10px;
  margin-left: -1px;
}
</style>
