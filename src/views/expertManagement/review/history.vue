<template>
    <div class="layoutMargin layoutPadding">
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
                <a-col span="12">
					<a-form-item label="评审时间端" :label-col="{span:4}" :wrapper-col="{span:20}">
						<a-range-picker allowClear v-model="time" :format="dateFormat" style="width:100%" :placeholder="['请选择开始日期','请选择结束日期']"
						 @change="onDateChange" />
					</a-form-item>
				</a-col>
            </a-row>
            <a-row class="formItemLine">
                <a-col span="24" class="align-right">
                    <a-button @click="reset" html-type="submit">重置</a-button>
                    <a-button type="primary" @click="search" html-type="submit">搜索</a-button>
                </a-col>
            </a-row>
        </a-form>
        <p class="gayLine"></p>
        <a-row class="portalTableOperates">
            <a-button @click="$router.back()" type="primary" ghost>返回列表</a-button>
        </a-row>
        <a-row class="history-table">
            <div class="table-title">
                项目名称/系统名称
            </div>
            <div class="table-content">
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
            </div>
        </a-row>
        <a-row class="history-table">
            <div class="table-title">
                项目名称/系统名称
            </div>
            <div class="table-content">
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
            </div>
        </a-row>
        <a-row class="history-table">
            <div class="table-title">
                项目名称/系统名称
            </div>
            <div class="table-content">
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
                <a-row class="content-line">
                    <a-col span="18">申报单位名称申报单位名称</a-col>
                    <a-col span="6" class="align-right">2019-08-23 12:00</a-col>
                </a-row>
            </div>
        </a-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchForm:{},
            sysList:[],
            dateFormat: 'YYYY-MM-DD',
            time:[],
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
        reset(){},
        search(){},
        onDateChange(date, dateString) {
            this.searchForm.createTime_desc = dateString
        }
    }
}
</script>
<style scoped>
    .align-right{
        text-align: right;
    }
    .table-title{
        background-color: rgb(247, 247, 247);
        border-bottom:1px solid #e0e0e0;
        padding-left:20px;height: 50px;
        color: #000;
        font-weight: bold;line-height: 50px;
    }
    .table-content{
        padding-bottom:20px;
    }
    .content-line{
        padding:0px 20px;border-bottom:1px solid #e0e0e0;
        height:50px;line-height: 50px;
    }
</style>

