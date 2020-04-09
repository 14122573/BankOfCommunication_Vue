<template>
	<div class="loginFrame" :style="'background-image: url(' + require('@/assets/images/bg.jpg') + ')'">
    <div class="cmsPublishFrame">
      <div class="cmsPublishFrameTitle">
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="4"><span class="titleName">操作手册列表</span></a-col>
          <a-col :span="2"> <a-button type="primary" @click="$router.push({name:'login'})" ghost> 返回 </a-button> </a-col>
        </a-row>
      </div>
      <div class="container">
        <template v-if="list.length > 0">
          <div class="card" v-for="item in list" :key="item.id" @click="handleView(item.path)">
            <img src="@/assets/images/word.png" />
            <p>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
                {{item.name | formatter}}
              </a-tooltip>
            </p>
          </div>
        </template>
        <template v-else>
          <div style="padding: 50px 0;">
            <a-divider>暂无操作手册</a-divider>
          </div>
        </template>
      </div>
      <div style="text-align:right; padding: 16px 16px 0;">
        <a-pagination
          showQuickJumper
          v-model="pageNo"
          :total="total"
          :defaultPageSize="pageSize"
          @change="onChange"
          size="small"/>
      </div>
    </div>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>
<style scoped>
.loginFrame { width: 100%; height: 100%; min-width: 1000px;  min-height: 700px; margin: 0px; padding: 0px; position: relative; background-size: cover; }
.cmsPublishFrame{ width: 1000px; background-color: #fff;  min-height: 600px; height: 80%; position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;}
.cmsPublishFrameTitle { margin: 16px;  border-bottom: 1px solid #E0E0E0; padding-bottom: 10px;}
.cmsPublishFrameTitle .titleName{ font-size: 18px; color: rgba(0, 0, 0, 0.7);}
.knowledge{ font-size: 14px; padding:10px 16px; line-height:1em; color:rgba(0,0,0,0.7); cursor: pointer;}
.knowledge.hasBg{ background-color: #F3F8FA}
.knowledge:hover,.knowledge.hasBg:hover{ background-color: #E8F8FF}
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 0px; left: 0px; color: #cfd7f3; font-size: 14px;}
.footer p {	margin: 0; }
.footer p:last-of-type { 	color: #829bdc; }
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 16px;
}
.container > .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #eff7ff;
  width: 135px;
  height: 170px;
  text-align: center;
  margin: 8px;
  cursor: pointer;
  box-shadow: 0 0 3px 1px #eff7ff;
}
.container > .card:hover {
  box-shadow: 0 0 10px 6px #eff7ff;
}
.container > .card > img {
  width: 40px;
}
.container > .card > p {
  margin: 10px 0 0;
}
</style>
<script>
export default {
  name: 'ManualView',
  data() {
    return {
      list    : [],
      total   : 0,
      pageNo  : 1,
      pageSize: 10,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        pageNo  : this.pageNo,
        pageSize: this.pageSize,
      }
      this.$ajax.get({
        url: this.$api.GET_MANUAL_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    onChange(page) {
      this.pageNo = page
      this.getList()
    },
    handleView(path) {
      window.open(path, '_blank')
    },
  },
  filters: {
    formatter(value) {
      if (!value) return ''
      if (value.length >= 15) {
        value = value.split('')
        return (value.splice(0, 15)).join('') + '...'
      }
      return value
    }
  }
}
</script>
