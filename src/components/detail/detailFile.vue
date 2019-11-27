<template>
  <div>
    <a-row type="flex" justify="center" align="top" class="detailContent">
      <a-col v-if="label" :span="labelSpan" class="label">{{label}}：</a-col>
      <a-col :span="textSpan" class="text">
        <template v-for="(item,index) in fileList">
            <template v-if="'pic'==item.fileType">
              <p :key='index' @click="showOrgPic(item.url)" class="canload fileItem">{{item.name}}</p>
            </template>
            <template v-else-if="'file'==item.fileType">
              <p :key='index' class="canload fileItem"><a :href='item.url' target="_blank">{{item.name}}</a></p>
            </template>
            <template v-else="">
              <p :key='index' class="fileItem"><a :href='item.url' target="_blank">{{item.name}}</a></p>
            </template>
        </template>
      </a-col>
    </a-row>
      <a-modal
        :title='orgPic.name'
        v-model="visibleOrgPic"
        @ok="handleOk"
        :footer="null"
      >
      <p class="orgPicContent"><img :src='orgPic.url' /></p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'DetailFiles',
  props: {
    labelSpan:{
      type: Number,
      default:10
    },
    textSpan:{
      type: Number,
      default:14
    },
    label:{
      type: String,
      default: null,
    },
    /**
     * 需要展示的文件列表
     * [{name:文件名, url:文件链接}]
     */
    files:{
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 需要展示的网络视频列表
     */
    file:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      fileList:[],
      netList:[],
      visibleOrgPic:false,
      orgPic:{
        'url':'',
        'name':''
      },
      orgPicUrl:''
    }
  },
  computed: {
  },
  created(){
    if(Array.isArray(this.files)){
      for(let i=0;i<this.files.length;i++){
        this.fileList.push({
          'name':this.files[i].name,
          'fileType':this.getFileType(this.files[i].name),
          // 'uid':this.files[i].uid,
          'url':this.files[i].url,
        })
      }
    }
    if(Array.isArray(this.file)){
      for(let i=0;i<this.file.length;i++){
        this.netList.push({
          'name':this.file[i],
          'fileType':'',
          'url':this.file[i],
        })
      }
    }
    // console.log(this.file)
    // console.log(this.files)
    this.fileList = this.netList.concat(this.fileList)
    // console.log(this.fileList)

  },
  methods: {
    showOrgPic(url,name){
      if(!!url){
        this.orgPic.url = url
        this.orgPic.name = !name?'查看图片':name
        this.visibleOrgPic = true
      }
    },
    handleOk(){
      this.visibleOrgPic = false
      this.orgPic = {
        'url':'',
        'name':''
      }
    },
    /**
     * 获取文件后缀名，判别文件为图片（pic）或文件（file）
     * @param {String} name
     * @returns 图片（pic）或文件（file）;否则为空
     */
    getFileType(name){
      name = !name?'':name
      let arr = name.split('.')
      if(arr.length>0){
        let len = arr.length
        let suffix = arr[len-1].toLowerCase()
        if(this.$com.oneOf(suffix,['jpeg','jpg','gif','png'])){
          return 'pic'
        }else if(this.$com.oneOf(suffix,['pdf','txt','doc','docx','xlsx','xls','xlsm','ppt','pptx'])){
          return 'file'
        }else{
          return ''
        }
      }else{
        return ''
      }
    }
  }
}
</script>
<style>
.detailContent { font-size: 14px; line-height: 20px;}
.detailContent  .label { text-align: right; color:rgba(0, 0, 0, 0.45)}
.detailContent  .text { text-align: left; word-break:break-all;}
.detailContent  .fileItem { border-radius: 2px; margin-left: 5px; border: 1px solid #ccc; display:inline-block; padding:2px 5px; font-size: 12px; line-height: 20px}
.detailContent  .fileItem.canload { border-color: #1890ff; color: #1890ff; cursor: pointer;}
.orgPicContent { text-align: center}
.orgPicContent img{ width: 100%}
</style>
