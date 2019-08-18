<template>  <div class="errTips">
    <img class="img" src="@/assets/images/networkerr.png" alt="networkerr">
    <h1>网络错误</h1>
    <h2>程序员正在处理中</h2>
  </div>
</template>

<script>
export default {
  name: 'NetworkError',
}
</script>

<style>
.errTips { width: 300px; margin: 150px auto 0; text-align: center; line-height: 30px;}
.errTips .img {  margin-bottom: 30px }
</style>
