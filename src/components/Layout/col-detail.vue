<template>
	<div>
		<a-row type="flex" :justify="justify" :align="align">
			<a-col :span="span">组织机构名称：组织机构名称</a-col>
			<a-col :span="span">联系人：联系人</a-col>
			<a-col :span="span">联系电话：联系电话</a-col>
			<a-col :span="span">单位类型：单位类型</a-col>
			<a-col :span="span">所属行政区域：所属行政区域</a-col>
			<a-col :span="span">地址：地址</a-col>
			<a-col>地址微调：地址</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:{
    span:{
      type:[String,Number],
      default:8
    },
    justify:{
      type:String,
      default:'space-between'
    },
    align:{
      type:String,
      default:'middle'
    }
  }
}
</script>

<style>
</style>
