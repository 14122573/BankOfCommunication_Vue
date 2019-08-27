<template>
	<a-card :bordered="false" :style="{margin:'0 0 0 14px'}">
		<a-row type="flex" slot="title" justify="space-between" align="middle">
			<a-col>
				导入组织机构
			</a-col>
			<a-col>
				<a-button type="primary" @click="$router.back();" ghost>返回</a-button>
			</a-col>
		</a-row>
		<a-row type="flex" align="middle" :gutter="16">
			<a-col span="10">
				<a-input-group compact>
					<span class="upload-text">导入文件：</span>
					<a-input read-only :value="fileName" style="width:60%;" />
					<a-upload accept=".jpg,.jpeg,.png" :showUploadList="false" style="width:20%;" name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					 :headers="headers" :beforeUpload="beforeUpload">
						<a-button type="primary">
							选择文件
						</a-button>
					</a-upload>
				</a-input-group>
			</a-col>
			<a-col span="8">
				<a-button type="primary" @click="handleUpload" :style="{'min-width':'88px'}" :disabled="fileList.length === 0"
				 :loading="uploading">
					{{uploading ? '导入中' : '导入' }}
				</a-button>
			</a-col>
		</a-row>
		<a-row :style="{'margin-top':'10px'}">
			<a-col span="6" >
				<a-icon type="link" class="download-icon" /><a @click="downloadTemplate">下载导入模板</a>
			</a-col>
		</a-row>
		<a-row :style="{'margin-top':'10px'}">
			<a-col>
				<a-tag v-for="(item,index) in  fileList" :key="index" closable @close="handleRemove(index)">{{item.name}}</a-tag>
			</a-col>
		</a-row>
		<a-row :style="{'margin-top':'10px'}">
			<a-col span="14">
				<a-alert type="error" showIcon closable class="errorTips">
					<div slot="message">
						导入失败,共导入数据125条,成功导入数据125条,导入失败25条,<a @click="downloadErrorDatas">下载导入失败数据&nbsp;<a-icon type="link" /></a>
					</div>
				</a-alert>
			</a-col>
			<br />
			<a-col span="11">
				<a-alert type="info" showIcon closable class="successTips">
					<a-icon slot="icon" type="check-circle" :size="16" />
					<div slot="message">
						导入成功,共导入数据125条
					</div>
				</a-alert>
			</a-col>
		</a-row>

	</a-card>
</template>
<script>
export default {
  name: 'organization-upload',
  data() {
    return {
      headers: {},
      fileList: [],
      uploading: false,
      fileName: ''
    }
  },
  methods: {
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      this.fileName = file.name
      // 				const isLt2M = file.size / 1024 / 1024 < 2
      // 				if (!isLt2M) {
      // 					this.$message.error('Image must smaller than 2MB!')
      // 				}
      console.log(this.fileList, file)
      return false
    },
    handleUpload() {
      const {
        fileList
      } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true
      reqwest({
        url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.fileList = []
          this.uploading = false
          this.$message.success('upload successfully.')
        },
        error: () => {
          this.uploading = false
          this.$message.error('upload failed.')
        }
      })
    },
    handleRemove(index) {
      this.fileList.splice(index, 1)
      console.log(this.fileList, '232')
    },
    //下载错误数据
    downloadErrorDatas(){
				
    },
    downloadTemplate(){
    }
  }
}
</script>
<style scoped>
	.upload-text {
		line-height: 32px;
		width: 20%;
		text-align: right;
	}

	.download-icon {
		color: #1890ff;
		font-size: 14px;
		margin-right: 5px;
		cursor: pointer;
	}

	.errorTips {
		color: #f5222d;
	}

	.successTips {
		color: #1890ff;
	}

	.successTips i {
		position: absolute;
	}
</style>
