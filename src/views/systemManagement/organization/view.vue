<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot="title" align="middle">
			<a-col>组织机构</a-col>
			<a-col>
				<a-button type="primary" ghost @click="handleReturn">
					返回
				</a-button>
				<a-button type="primary" ghost @click="handleReturn">
					修改
				</a-button>
				<a-button type="primary" ghost @click="handleSave">
					删除
				</a-button>
			</a-col>
		</a-row>
		<detail></detail>
	</a-card>
</template>

<script>
import detail from '@/components/Layout/col-detail' 
export default{
  components:{
    detail
  },
  data(){
    return{
				
    }
  }
}
</script>

<style>
</style>
