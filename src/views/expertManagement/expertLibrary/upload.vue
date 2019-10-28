<template>
<div class="portalDetailWapper upload-talent-root">
    <div class="portalDetailTitle">
			<span class="title">导入人才账号</span>
			<div class="detailOperations">
				<a-button type="primary" @click="$router.back();" ghost>返回</a-button>
			</div>
		</div>
		<div class="portalDetailContentWapper upload-talent-content">
          <div style="background:#fff;padding:0px 10px">
            <div class="upload-talent-detail">
                <a-row type="flex" align="middle" :gutter="16">
                    <a-col span="10">
                        <a-input-group compact>
                            <span class="upload-text">导入文件：</span>
                            <a-input read-only :value="fileName" style="width:60%;" />
                            <a-upload
                                accept=".xsl,.xlsx"
                                :showUploadList="false"
                                style="width:20%;"
                                name="file"
                                :multiple="true"
                                :headers="headers"
                                :beforeUpload="beforeUpload"
                            >
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
                <a-row :style="{'margin-top':'20px'}">
                    <a-col span="6" >
                        <a-icon type="link" class="download-icon" /><a @click="downloadTemplate">下载导入模板</a>
                    </a-col>
                </a-row>
                <!-- <a-row :style="{'margin-top':'20px'}" v-if="fileList.length>0">
                    <a-col>
                        <a-tag v-for="(item,index) in  fileList" :key="index" closable @close="handleRemove(index)">{{item.name}}</a-tag>
                    </a-col>
                </a-row> -->
                <a-row :style="{'margin-top':'20px'}" v-if="result.error === 0">
                    <a-col span="11">
                        <a-alert type="info" showIcon closable class="successTips">
                            <a-icon slot="icon" type="check-circle" :size="16" />
                            <div slot="message">
                                导入成功,共导入数据{{result.success}}条
                            </div>
                        </a-alert>
                    </a-col>
                </a-row>
                <a-row :style="{marginTop:'20px'}" v-if="result.error > 0">
                    <a-col span="14">
                        <a-alert type="error" showIcon closable class="errorTips">
                            <div slot="message">
                                导入失败,共导入数据{{result.success + result.error}}条,成功导入数据{{result.success}}条,导入失败{{result.error}}条,<a @click="downloadErrorDatas">下载导入失败数据&nbsp;<a-icon type="link" /></a>
                                <!-- <p>失败数据：</p> -->
                            </div>
                        </a-alert>
                    </a-col>
                </a-row>

        </div>
        <a-divider dashed />
          <a-alert message="导入流程步骤：" banner type="info" id="uplod-alert" showIcon >
              <a-steps direction="vertical" size="small" id="upload-steps" slot="description" :current="-1">
                  <a-step title="点击链接，下载可导入的文本模板" />
                  <a-step title="从系统选择文件进行导入，支持xsl和xlsx的文件格式" />
                  <a-step title="点击页面的“导入”按钮完成导入" />
                  <a-step title="根据导入提示，进行错误数据排查" />
              </a-steps>
          </a-alert>
          </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'expertLibrary-upload',
  data() {
    return {
      headers: {},
      fileList: [],
      uploading: false,
      fileName: '',
      result:{},
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt200M = file.size / 1024 / 1024 < 200
      if (!isLt200M) {
        this.$message.error('上传文件不能大于200M')
      }else{
        this.fileList=[]
        this.fileList = [...this.fileList, file]
      		this.fileName = file.name
      }
      return false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.uploading = true
      this.result={}
	  this.$ajax.post(
		  {
			  url:this.$api.IMPORT_EXPERT_ALL,
			  params:formData
		  }
	  ).then((res)=>{
        if(res.code == '200'){
          this.result=res.data.content
          this.uploading=false
          this.fileList=[]
          this.fileName=''
        }
	  })
    },
    handleRemove(index) {
      this.fileList.splice(index, 1)
    },
    //下载错误数据
    downloadErrorDatas() {
      window.open(this.result.path)
    },
    downloadTemplate() {
      window.open(this.$api.TEMPLAT_DOWNLOAD_EXPERT_AND_TALENT.replace('/api',''))
    }
  }
}
</script>
<style scoped>
.upload-text {
  line-height: 32px;
  /* width: 20%; */
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
.title-step {
  font-size: 14px;
}
#uplod-alert {
  background-color: #fff;
  padding-left: 84px;
}
.upload-talent-root{
  overflow: hidden;
}
.upload-talent-content{
  overflow-x: hidden;
  overflow-y: auto;
  padding:20px;
}
.upload-talent-detail{
  padding-left:50px;
  padding-top: 20px;
  background: #fff;
}
.line-upload{
  background:#fff;
}
</style>
<style>
#uplod-alert .ant-alert-icon {
  position: absolute;
  top: 18px;
  left: 50px;
  font-size: 18px;
}
#uplod-alert .ant-alert-message {
  font-size: 14px;
}
#upload-steps {
  margin-top: 20px;
}
#upload-steps .ant-steps-item-icon {
  height: 18px;
  width: 18px;
  line-height: 18px;
  background-color: rgb(204, 204, 204);
  color: #fff;
}
#upload-steps .ant-steps-item-tail {
  position: absolute;
  left: 2px;
  top: 0;
  padding: 18px 0px 0 6px;
}
#upload-steps .ant-steps-item-title {
  line-height: 18px;
}
#upload-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
  color: rgba(250, 250, 250, 1);
}
#upload-steps .ant-steps-item-icon {
  border: none;
}
#upload-steps .ant-steps-item-content {
  min-height: 35px;
}
</style>

