<template>
	<div id="portal">
		<router-view />
	</div>
</template>

<script>
export default {
  // toChange : 组件name命名 改为与此子项目的微前端服务唯一名称
  name: 'Portal',
  // endChange
  created() {
    let token = this.$cookie.get('token')
    if (token !=undefined && token !=null && 'String'==typeof token) {
      this.$ajax.post({
        url:this.$api.CHECKTOKEN_POST
      })
    }
  }
}
</script>

<style>
  #portal {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #2c3e50;width: 100%;height: 100%;
  }
  #Layout { height: 100%; }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
</style>
