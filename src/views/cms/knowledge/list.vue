<template>
	<div class="routerWapper">
    <div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/knowledge'">
      <a-form class="protalForm" :form="knowledgeSearchForm">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col span="8">
            <a-form-item class='formItem' label="标题" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入知识文献标题" v-decorator="['title']"/>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item class='formItem' label="作者" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-input placeholder="请输入作者姓名" v-decorator="['author']"/>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item class='formItem' label="文献类型" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-checkbox-group :options="searchFormOption.type" :defaultValue="defaultSearchForm.type" @change="onTypeChange" />
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item class='formItem' label="文献状态" :label-col="{span:8}" :wrapper-col="{span:16}">
              <a-checkbox-group :options="searchFormOption.status" :defaultValue="defaultSearchForm.status" @change="onStatusChange" />
            </a-form-item>
          </a-col>
          <a-col span="6" class="algin-right" style="padding-right:8px">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="getKnowLedgeList">搜索</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
		<RouterWapper v-else></RouterWapper>
  </div>
</template>
<style scoped>

</style>

<script>
export default {
  components: {

  },
  data() {
    return {
      isReady:false,
      searchFormOption:{
        type:[{
          label: '视频',
          value: '0'
        },{
          label: 'PDF',
          value: '1'
        }],
        status:[{
          label: '草稿',
          value: '0'
        },{
          label: '发布中',
          value: '1'
        },{
          label: '已失效',
          value: '2'
        }]
      },
      defaultSearchForm:{
        type:['0','1'],
        status:['0','1']
      },
      searchForm:{},
    }
  },
  beforeCreate() {
    if(this.$route.name == '/cms/knowledge'){
      this.knowledgeSearchForm = this.$form.createForm(this)
    }

  },
  mounted() {
    if(this.$route.name == '/cms/knowledge'){

    }
  },
  watch:{

  },
  computed:{

  },
  methods: {
    onStatusChange(){},
    onTypeChange(){},
    reset(){},
    getKnowLedgeList(){
      let searchParms
      searchParms = Object.assign({},{
        title_l:this.knowledgeSearchForm.getFieldValue('title'),
        author_l:this.knowledgeSearchForm.getFieldValue('author'),
      })
      console.log(this.knowledgeSearchForm.getFieldValue('title'))
    }
  },
}
</script>


