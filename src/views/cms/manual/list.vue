<template>
<div class="routerWapper">
<div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/manual'">
  <ActiveForm :layout="layout" :label-width="70" :model="model">
    <div style="margin-bottom: 10px;">
      <a-button v-if="$permission('P34001')" @click="showCreateModal" type="primary">新增操作手册</a-button>
    </div>
  </ActiveForm>
  <ActiveTable
    rowKey="id"
    :columns="columns"
    :data="list"
    showPager
    @on-page-change="handlePageChange"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="total"
    class="portalTable"
  >
    <div slot="system" slot-scope="{text, record}">
      {{record.sysName}}
    </div>
    <div slot="operator" slot-scope="{text, record}">
      <DataOperatorInList :defaultFileList="uploadFileList" :creator='!record.creator?"":record.creator' :lastOperator='!record.operator?"":record.operator' />
    </div>
    <span slot="actions" slot-scope="{ text, record }">
      <span v-if="$permission('P34003')" @click="handleView(record)" class="actionBtn">查看附件<a-divider type="vertical"/></span>
      <span v-if="$permission('P34001')" @click="editManual(record)" class="actionBtn">编辑<a-divider type="vertical"/></span>
      <span v-if="$permission('P34002')" @click="handleDelete(record)" class="actionBtn">删除</span>
    </span>
  </ActiveTable>
  <a-modal v-model="showModal" :title="`${editId ? '编辑' : '新增'}操作手册`" :maskClosable="false" @ok="handleOk">
    <a-form v-if="showModal" :form="modalForm">
      <a-form-item label="名称" :label-col="{span:4}" :wrapper-col="{span:20}">
        <a-input v-decorator="['name',{validateTrigger: 'blur',rules:rules.name}]" placeholder="请输入操作手册名称"></a-input>
      </a-form-item>
      <a-form-item label="系统" :label-col="{span:4}" :wrapper-col="{span:20}">
        <a-select placeholder="请选择需要添加的系统" v-decorator="['system',{validateTrigger: 'blur',rules:rules.system}]" show-search>
          <a-select-option v-for="(item) in sysList" :key="item.sysCode" :value="item.sysName">
            {{ item.sysName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="附件" :label-col="{span:4}" :wrapper-col="{span:20}">
        <FileUpload v-decorator="['upload',{ valuePropName: 'defaultFileList', initialValue: uploadFileList, rules:rules.file}]" @change="handleUpload"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="1" :timestamp="Date.now()"/>
      </a-form-item>
    </a-form>
  </a-modal>
</div>
<RouterWapper v-else />
</div>
</template>

<script>
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
import FileUpload from '@/components/Upload/fileUpload'
export default {
  name      : 'ManualList',
  components: {
    DataOperatorInList,
    FileUpload,
  },
  data() {
    const validator = (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback()
      } else {
        callback()
      }
    }
    return {
      modalForm: this.$form.createForm(this),
      rules    : {
        system: [
          { required: true, whitespace: true, message: '请选择需要添加的系统!' },
        ],
        name: [
          { required: true, whitespace: true, message: '请输入操作手册名称!' },
        ],
        file: [
          { required: true, message: '请上传附件！' },
        ],
      },
      showModal     : false,
      editId        : null,
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 5*1024*1024,
        acceptTypesArray: [ 'pdf' ]
      },
      // oldSysList : [],
      // newSysList : [],
      sysList    : [], // 包含所有新老系统，不看用户权限
      model      : {},
      total      : 0,
      currentPage: 1,
      pageSize   : 10,
      columns    : [
        {
          title    : '名称',
          dataIndex: 'name',
          align    : 'left',
        },
        {
          title      : '所属系统',
          dataIndex  : 'system',
          scopedSlots: { customRender: 'system' },
        },
        {
          title      : '操作人',
          dataIndex  : 'operator',
          width      : 150,
          scopedSlots: { customRender: 'operator' },
        },
        {
          title      : '操作',
          dataIndex  : 'actions',
          width      : 200,
          scopedSlots: { customRender: 'actions' }
        },
      ],
      layout: [
        {
          name: {
            label      : '名称',
            type       : 'input',
            width      : 8,
            offset     : 12,
            placeholder: '请输入操作手册名称',
          },
          btns: {
            width : 4,
            custom: true,
            render: (h) => {
              return h('div', {
                style: {
                  paddingTop: '4px',
                }
              }, [
                h('a-button', {
                  props: {
                    type : 'primary',
                    ghost: true,
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => this.handleReset()
                  },
                }, '重置'),
                h('a-button', {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => this.getList()
                  },
                }, '搜索'),
              ])
            },
          },
        },
      ],
      list: [],
    }
  },
  mounted() {
    this.getList(),
    this.getSysList()
  },
  methods: {
    handleUpload(filelist) {
      this.uploadFileList = [].concat(filelist)
    },
    handleDelete({ id }) {
      this.$modal.confirm({
        title  : '删除操作手册',
        content: '是否确认删除该操作手册？',
        okType : 'danger',
        onOk   : () => {
          this.$ajax.post({
            url: this.$api.DELETE_MANUAL.replace('{id}', id)
          }).then(() => {
            this.$modal.success({
              title  : '成功',
              content: '删除成功',
              okText : '确认',
            })
            this.getList()
          })
        },
      })
    },
    handleView({ path }) {
      window.open(path, '_blank')
    },
    getSysList() {
      this.$ajax.get({
        url: this.$api.SYSTEM_LIST_ALL_GET
      }).then(res => {
        if(res.code === '200'){
          const data = this.$com.confirm(res, 'data.content', [])
          for(let i = 0; i < data.length; i ++) {
            this.sysList.push({ 'sysCode': data[i].sysCode, 'sysName': data[i].sysName })
          }
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getList() {
      const { name = null } = this.model
      const params = {
        name_l  : name,
        pageNo  : this.currentPage,
        pageSize: this.pageSize,
      }
      this.$ajax.get({
        url: this.$api.GET_NONPUBLIC_MN_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    handleReset() {
      this.model = {}
      this.currentPage = 1
      this.getList()
    },
    handlePageChange({ current }) {
      this.currentPage = current
      this.getList()
    },
    showCreateModal() {
      this.editId = null
      this.showModal = true
    },
    editManual({ id, name, fileName, path, sysCode, sysName }) {
      this.showModal = true
      this.editId = id
      console.log(sysName)
      this.$nextTick(() => {
        this.modalForm.setFieldsValue({
          name,
          upload: [ { name: fileName, url: path, uid: id } ],
          system: sysName
        })
      })
    },
    handleOk() {
      this.modalForm.validateFields(err => {
        if (err) {
          this.$com.getFormValidErrTips(this, err)
          return
        }
        // 根据sysName去查sysCode
        let selectedSysName = this.modalForm.getFieldValue('system')
        let selectedSysCode = ''
        
        for(let i = 0; i < this.sysList.length; i++) {
          if(this.sysList[i].sysName == selectedSysName) {
            selectedSysCode = this.sysList[i].sysCode
          }
        }
        console.log([ selectedSysCode, selectedSysName ])
        if (this.editId) {
          const params = {
            name    : this.modalForm.getFieldValue('name'),
            sysCode : selectedSysCode,
            sysName : selectedSysName,
            path    : this.modalForm.getFieldValue('upload').url,
            fileName: this.modalForm.getFieldValue('upload').name,
          }
          if (this.uploadFileList.length > 0) {
            params.path = this.uploadFileList[0].url
            params.fileId = this.uploadFileList[0].uid
            params.fileName = this.uploadFileList[0].name
          }
          this.$ajax.post({
            url: this.$api.PUT_EDIT_MANUAL.replace('{id}', this.editId),
            params,
          }).then(res => {
            this.$modal.success({
              title  : '成功',
              content: '编辑操作手册成功',
              okText : '确认',
            })
            this.showModal = false
            this.uploadFileList = []
            this.getList()
          })
          return
        }
        // // 根据sysName去查sysCode
        // let selectedSysName = this.modalForm.getFieldValue('system')
        // let selectedSysCode = ''
        // let allSysList = this.oldSysList.concat(this.newSysList)
        
        // for(let i = 0; i < allSysList.length; i++) {
        //   if(allSysList[i].sysName == selectedSysName) {
        //     selectedSysCode = allSysList[i].sysCode
        //   }
        // }
        
        this.$ajax.post({
          url   : this.$api.POST_ADD_MANUAL,
          params: {
            name    : this.modalForm.getFieldValue('name'),
            sysCode : selectedSysCode,
            sysName : selectedSysName,
            fileName: this.uploadFileList[0].name,
            path    : this.uploadFileList[0].url,
            fileId  : this.uploadFileList[0].uid,
          },
        }).then(res => {
          this.$modal.success({
            title  : '成功',
            content: '新增操作手册成功',
            okText : '确认',
          })
          this.showModal = false
          this.uploadFileList = []
          this.getList()
        })
      })
    }
  },
}
</script>
