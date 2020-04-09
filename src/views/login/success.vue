<template>
	<div class="formWarning">
		<a-row type="flex" justify="center" class="row">
			<a-col span="24">
				<a-icon type="check-circle" class="Icon" />
			</a-col>
			<a-col span="24">{{successText}}</a-col>
			<a-col span="24">
				<a-button type="primary" @click="handleLogin" style="min-width:100px">
					立即登录
				</a-button>
			</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
  props: [ 'successText' ],
  data() {
    return {
      tips: '操作成功'
    }
  },
  methods: {
    handleLogin() {
      this.$emit('on-change','login')
    }
  }
}
</script>

<style scoped>
	.formWarning {
		height:100%;
		top: 0px!important;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
	}

	.Icon {
		font-size: 50px;
		color: #40a9ff;
	}
	.row>div{
		margin-bottom: 20px;
		text-align: center;
	}
</style>
