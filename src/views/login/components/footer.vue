<template>
	<div class="footer">
    <p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
    <p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED | 沪ICP备13003917号</p>
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 0px; left: 0px; color: #cfd7f3; font-size: 14px;}
.footer p {	margin: 0; }
.footer p:last-of-type { 	color: #829bdc; }
</style>
