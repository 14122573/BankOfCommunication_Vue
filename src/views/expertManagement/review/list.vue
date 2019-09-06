<template>
    <div class="routerWapper">
        <div v-if="$route.name == '/expertManagement/reiview'" class="layoutMargin layoutPadding">
            <a-form :form="searchForm">
                <a-row type="flex" justify="space-between" class="formItemLine">
                    <a-col span="6">
                        <a-form-item class='formItem' label="系统名称" v-bind="colSpe">
                            <a-select placeholder="请选择" :options="sysList" v-model="searchForm.sysId" />
                        </a-form-item>
                    </a-col>
                    <a-col span="6">
                        <a-form-item class='formItem' label="项目名称" v-bind="colSpe">
                            <a-input placeholder="请输入" v-model="searchForm.name_l" />
                        </a-form-item>
                    </a-col>
                    <a-col span="12" class="align-right">
                        <a-button @click="reset" html-type="submit">重置</a-button>
                        <a-button type="primary" @click="search" html-type="submit">搜索</a-button>
                    </a-col>
                </a-row>
            </a-form>
            <p class="gayLine"></p>
            <a-row class="portalTableOperates">
                <a-button @click="$router.push({name:'/expertManagement/reiview/history'})" type="primary">评审历史查询</a-button>
            </a-row>
            <div class="review-table">
                <div class="review-title">
                    <span class="review-project-name">项目名称</span>
                    <span class="review-sys-name">系统名称</span>
                    <span class="review-sup">
                        共有<span class="span-green">35</span>个待评审项，剩余
                        <span class="span-red">1</span>个
                    </span>
                </div>
                <a-row class="review-content" :gutter="16">
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div class="review-table">
                <div class="review-title">
                    <span class="review-project-name">项目名称</span>
                    <span class="review-sys-name">系统名称</span>
                    <span class="review-sup">
                        共有<span class="span-green">35</span>个待评审项，剩余
                        <span class="span-red">1</span>个
                    </span>
                </div>
                <a-row class="review-content" :gutter="16">
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                    <a-col span="6" class="content-card">
                        <div class="content-view">
                            <div class="view-title">申报名称</div>
                            <div class="view-des">单位名称单位名称</div>
                        </div>
                        <div class="content-ope">
                            <span>去评审</span>
                        </div>
                    </a-col>
                </a-row>
            </div>
            
        </div>
        <RouterWapper v-else></RouterWapper>
    </div>
</template>
<script>
export default {
  data(){
    return{
      searchForm:{},
      sysList:[],
      colSpe: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      },
    }
  },
  methods:{
    // 重置
    reset(){},
    // 查询
    search(){}
  }
}
</script>
<style scoped>
    .align-right{
        text-align: right;
    }
    .review-title{
        background-color: rgb(247, 247, 247);
        border-bottom:1px solid #e0e0e0;
        padding-left:20px;height: 50px;
        margin-bottom:20px;
    }
    .review-title>span{
        display: inline-block;
        margin-right:10px;
        line-height: 50px;
    }
    .review-project-name{
        color: #000;
        font-weight: bold;
    }
    .review-sys-name,.review-sup{
        font-size: 12px;
    }
    .review-sup span{display: inline-block;margin:0px 5px;}
    .span-green{color:green}
    .span-red{color:#f00}
    .review-content{padding:0px 0px;margin:0px;}
    .content-card{height:120px;margin-bottom:20px;}
    .content-view{
        height:80px;padding:20px 10px;
        vertical-align: middle;
        border-bottom:1px solid #e0e0e0;
        border:1px solid #e0e0e0
    }
    .content-ope{
        border:1px solid #e0e0e0;border-top: none;
        height: 38px;background-color: rgb(234, 244, 254);
        padding-right:20px;text-align: right;line-height: 38px;
    }
    .content-ope span{
         color:#1890ff; cursor: pointer;display: inline-block;
    }
    .view-title{color:#000;font-weight:bold;}
</style>


