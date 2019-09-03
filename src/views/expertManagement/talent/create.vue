<template>
    <a-card :bordered='false' :style="{margin:'0 0 0 14px'}">
        <a-row type="flex" justify="space-between" slot='title'>
			<a-col>
				新增人才账号
			</a-col>
			<a-col>
				<a-button type="primary" ghost @click='back'>取消</a-button>
				<a-button type="primary" @click='save'>保存</a-button>
			</a-col>
		</a-row>
        <a-card :bordered='false'>
            <a-row type="flex" justify="space-between" slot='title'>
                <a-col>
                    基本信息
                </a-col>
            </a-row>
        </a-card>
    </a-card>
</template>
<script>
export default {
  name:'talent-create',
  data(){
    return{
            
    }
  },
  methods:{
      back(){},
      save(){}
  }
}
</script>
