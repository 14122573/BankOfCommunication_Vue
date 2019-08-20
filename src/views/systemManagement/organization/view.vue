<template>
	<a-card :bordered='false'>
		<a-row type="flex" justify="space-between" slot="title" align="middle">
			<a-col>组织机构</a-col>
			<a-col>
				<a-button type="primary" ghost @click="handleReturn">
					返回
				</a-button>
				<a-button type="primary" ghost @click="handleEdit">
					修改
				</a-button>
				<a-button type="primary" ghost @click="handleSave">
					删除
				</a-button>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						组织机构名称：
					</a-col>
					<a-col span="17">
						组织机构名称
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						联系人：
					</a-col>
					<a-col span="17">
						联系人
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						联系电话：
					</a-col>
					<a-col span="17">
						联系电话
					</a-col>
				</a-row>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start">
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						单位类型：
					</a-col>
					<a-col span="17">
						单位类型
					</a-col>
				</a-row>
			</a-col>
			<a-col span="8">
				<a-row type="flex" justify="start" class="colMargin">
					<a-col span="7" class="colLabel">
						所属行政区域：
					</a-col>
					<a-col span="17">
						所属行政区域
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
						地址
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
						<BMapComponent :height="250" :width="830" :keyWords="position" @on-change="getNewAddress" />
					</a-col>
				</a-row>
			</a-col>
		</a-row>
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
      position: ''
    }
  },
  methods: {
    handleReturn() {
      this.$router.push({
        name: '/systemManagement/organization'
      })
    },
    handleSave() {

    },
    handleEdit() {
      this.$router.push({
        name: '/organization/edit'
      })
    }
  },
  mounted() {
    this.position = '上海市玉兰香苑'
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
