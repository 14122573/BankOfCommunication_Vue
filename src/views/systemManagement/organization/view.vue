<template>
	<a-card :bordered='false' :style="{margin:'0 0 0 14px'}">
		<a-row type="flex" justify="space-between" slot="title" align="middle">
			<a-col>组织机构</a-col>
			<a-col>
				<a-button type="primary" ghost @click="$router.back()">
					返回
				</a-button>
				<a-button type="primary" @click="$router.push({name: '/systemManagement/organization/edit'})">
					修改
				</a-button>
				<a-button type="danger" ghost @click="handleDel">
					删除
				</a-button>
			</a-col>
		</a-row>
		<!-- <a-skeleton :loading="loading" :rows="30"> -->
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						组织机构名称：
					</a-col>
					<a-col span="17">
						{{detail.groupName|| "暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						联系人：
					</a-col>
					<a-col span="17">
						{{detail.contact|| "暂无"}}
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						联系电话：
					</a-col>
					<a-col span="17">
						{{detail.contactPhone|| "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						所属行政区域：
					</a-col>
					<a-col span="17">
						{{detail.areaName || "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						地址：
					</a-col>
					<a-col span="17">
						{{detail.addr|| "暂无"}}
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						地址微调：
					</a-col>
					<a-col span="17">
						<BMapComponent :height="250" :width="830" :keyWords="position" />
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<!-- </a-skeleton> -->
	</a-card>
</template>
<script>
import BMapComponent from '@/components/BaiduMap/BMapComponent.vue'
export default {
  components: {
    BMapComponent
  },
  data() {
    return {
      position: '',
      detail: {},
      loading: true
    }
  },
  methods: {
    handleDel() {
      this.$ajax.delete({
        url: this.$api.DELETE_ORGANIZATION_LIST.replace('{id}', this.$route.query.id)
      }).then(res => {
        if (res.code == '200') {
          this.$message.success('删除成功！')
          this.$router.push({
            name: '/systemManagement/organization'
          })
        } else {
          this.$message.success('删除失败！')
        }
      })
    },
    getDetail() {
      this.$ajax.get({
        url: this.$api.GET_ORGANIZATION_LIST_DETAIL.replace('{id}', this.$route.query.id)
      }).then(res => {
        this.loading = false
        this.detail = this.$com.confirm(res, 'data.content', {})
        this.position = this.$com.confirm(res, 'data.content.addr', '上海市')
      })
    }
  },
  mounted() {
    this.getDetail()
  }
}
</script>

<style scoped>
	.colMargin {
		margin-bottom: 20px;
	}

	.colLabel {
		text-align: right;
	}
</style>
