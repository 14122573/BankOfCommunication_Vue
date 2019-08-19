<template>
     <div>
         <a-row>
             <a-form :form="searchForm">
                <a-col span="6">
                    <a-form-item
                        label="单位类型："
                        :label-col="{ span: 10 }"
                        :wrapper-col="{ span: 14 }"
                    >
                    <a-input
                        placeholder="请输入"
                        v-model="searchForm.type"
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="组织机构："
                        :label-col="{ span: 10 }"
                        :wrapper-col="{ span: 14 }"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="searchForm.name"
                        :options='nameOptions'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-form-item
                        label="行政区域："
                        :label-col="{ span: 10 }"
                        :wrapper-col="{ span: 14 }"
                    >
                    <a-select 
                        placeholder="请选择"
                        v-model="searchForm.space"
                        :options='spaceOptions'
                    />
                    </a-form-item>
                </a-col>
                <a-col span="6">
                    <a-button type="primary" ghost>搜索</a-button>
                    <a-button type="primary">搜索</a-button>
                </a-col>
             </a-form>
         </a-row>
     </div>
</template>
<script>
export default {
  name:'organization',
  data(){
    return{
      searchForm:{},
      nameOptions:[
        {label:'1',value:'1'}
      ],
      spaceOptions:[
        {label:'1',value:'1'}
      ]
    }
  }
}
</script>
