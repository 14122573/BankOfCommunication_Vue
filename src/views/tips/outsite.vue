<template>
  <div class="errTips">
    <img class="img" src="@/assets/images/noauth.png" alt="noauth">
    <h1>已离开本站点</h1>
  </div>
</template>

<script>
export default {
  name: 'NoAuth',
}
</script>

<style>
.errTips { width: 300px; height:300px; margin: 150px 0 0 40%; text-align: center; line-height: 30px;}
.errTips .img {  margin-bottom: 30px }
</style>
