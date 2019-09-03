<template>
    <div ref="create-talent" class="create-talent">
        <a-card>
            <a-row type="flex" slot="title" justify="space-between" align="middle">
                <a-col>
                    新增人才账号
                </a-col>
                <a-col>
                    <a-button type="primary" @click="back" ghost>取消</a-button>
                    <a-button type="primary" @click="save">保存</a-button>
                </a-col>
            </a-row>
        </a-card>
        <div class="content">
            <a-form :form="form">
            <a-card>
                <a-row type="flex" id="basic" slot="title" justify="space-between" align="middle">
                    <a-col>
                        基本信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-row>
                            <a-col span="12">
                                <a-form-item label="账号：" v-bind="colSpa">
                                    <a-input v-decorator="['name']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="登录密码：" v-bind="colSpa">
                                    <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="姓名：" v-bind="colSpa">
                                    <a-input v-decorator="['name']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="性别：" v-bind="colSpa">
                                    <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="民族：" v-bind="colSpa">
                                    <a-input v-decorator="['name']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="身份证号：" v-bind="colSpa">
                                    <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="工作单位：" v-bind="colSpa">
                                    <a-input v-decorator="['name']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="单位所在地：" v-bind="colSpa">
                                    <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="一寸照：" v-bind="colSpa">
                            <a-upload
                                listType="picture-card"
                                :fileList="fileList"
                                @preview="handlePreview"
                                @change="handleChange"
                                class="avatar-uploader"
                                >
                                <div v-if="fileList.length < 1">
                                    <a-icon type="cloud-upload" style="fontSize:24px" />
                                    <div class="ant-upload-text">上传照片</div>
                                    <div class="ant-upload-text">仅支持jpg格式</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="单位性质：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="所在系统：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="所在部门：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="职务：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="职称：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="主要社会兼职：" v-bind="textSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 工作学习经历 -->
            <a-card class="margin-card">
                <a-row id="job" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        工作学习经历
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="毕业院校：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="学历：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="学位：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="所学专业：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="所学专业：" v-bind="textSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 联系信息 -->
            <a-card class="margin-card">
                <a-row id="message" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        联系信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="通讯地址：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="联系电话：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="电子邮箱：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 工作领域信息 -->
            <a-card class="margin-card">
                <a-row id="space" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        工作领域信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="主要相关研究方向：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="主要工作业绩：" v-bind="textSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="获奖成果：" v-bind="textSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 相关管理信息 -->
            <a-card class="margin-card">
                <a-row id="management" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        相关管理信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="工作领域：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="专业组别：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="省级认定：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="部级认定：" v-bind="colSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="入库以来参加工作：" v-bind="textSpa">
                            <a-input v-decorator="['phone']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            </a-form>
        </div>
        <a-anchor :offsetTop="260" :getContainer="()=> this.$refs['create-talent']" class="talent-anchor" >
            <a-anchor-link href="#basic" title="基本信息" />
            <a-anchor-link href="#job" title="工作学习经历" />
            <a-anchor-link href="#message" title="联系信息" />
            <a-anchor-link href="#space" title="工作领域信息" />
            <a-anchor-link href="#management" title="相关管理信息" />
        </a-anchor>
    </div>
            
</template>
<script>
export default {
  name: 'talent-create',
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [],
      colSpa: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      textSpa: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      previewVisible: false,
      previewImage: ''
    }
  },
  methods: {
    //   一寸照方法
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    back() {},
    save() {}
  },
  mounted(){
      
  }
}
</script>
<style scoped>
.content {
  padding: 20px;
}
.margin-card{
    margin-top:20px;
}
.talent-anchor{
    position: absolute;
    right:21px;
    top:260px;
}
.create-talent{
    position: relative;
    overflow: auto;
    height: 100%;
}
</style>
<style>
.avatar-uploader > .ant-upload {
  width: 90%;
  height: 220px;
}
</style>


