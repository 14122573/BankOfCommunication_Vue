<template>
  <div class="old-user">
    <p class="gayLine noline "></p>
    <div class="wrapper-roles">
        <div class="box" v-for="(item,index) in data" :key="index">
          <div class="inner">
            <div class="content">
              <p class="roleName" :title='item.titleName'>{{item.titleName}} </p>
            </div>
            <div class="operate">
              <template>
                <span @click="modifyInfo(item)">修改</span>
              </template>
            </div>
          </div>
        </div>
      </div>

    <a-modal
      :maskClosable="false"
      cancelText="取消"
      okText="确认"
      @ok="handleResetOk"
      @cancel="handleCancel"
      :width="465"
      title="修改栏目"
      :visible="modifyVisible"
    >
      <a-form :form="resetData">
        <a-row>
          <a-col span="24">
            <a-form-item
              label="栏目名称"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input
                type="text"
                placeholder="请输入新的栏目名称"
                autocomplete="off"
                v-decorator="[
                  'newSectionName',
                  {
                    validateTrigger: 'blur',
                    rules: [{ required: true, message: '请输入新的栏目名称' }]
                  }
                ]"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'title-manage',
  mounted() {
    if (this.$route.name == '/cms/homepageInfoMaintain') {
      this.getList()
    }
  },
  data() {
    return {
      searchForm: {
        title: ''
      },
      modifyVisible: false,
      pagination   : {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onChange
      },
      data         : [],
      resetData    : this.$form.createForm(this),
      modifySection: [
        {
          idToIdentify : null,
          renameSection: null
        }
      ],
      columns: [
        {
          title    : '已关联模块',
          dataIndex: 'id',
          key      : 'id'
        },
        {
          title    : '栏目名称',
          dataIndex: 'titleName',
          key      : 'titleName'
        },
        {
          title      : '操作',
          dataIndex  : 'action',
          key        : 'action',
          width      : 200,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
    }
  },
  methods: {
    modifyInfo(item) {
      this.modifySection.idToIdentify = item.id
      this.modifyVisible = true
    },
    getSearchParams() {
      if (!!searchParams.params) {
        Object.keys(searchParams.params).forEach(elem => {
          this.searchForm[elem] = searchParams.params[elem]
        })
      }
      if (!!searchParams.pagination) {
        if (
          !!searchParams.pagination.pageNo &&
          searchParams.pagination.pageNo != 1
        ) {
          this.pagination.pageNo = searchParams.pagination.pageNo
        }
      }
      this.getList()
    },
    onChange(current) {
      this.pagination.pageNo = current
      this.pagination.current = current
      this.getList()
    },
    getList() {
      let query = this.$api.GET_TITLE_MANAGE
      this.$ajax.get({
        url: this.$api.GET_TITLE_MANAGE
      })
        .then(res => {
          if (res.code === '200') {
            this.data = this.$com.confirm(res, 'data.content', [])
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    handleResetOk() {
      this.resetData.validateFields(err => {
        if (!err) {
          this.$ajax
            .put({
              url:
                this.$api.PUT_TITLE_MANAGE.replace('{id}', '/' + this.modifySection.idToIdentify,),
              params: {
                titleName: this.resetData.getFieldValue('newSectionName')
              }
            })
            .then(res => {
              if (res.code === '200') {
                this.$message.success('修改栏目名称成功')
                this.handleCancel()
                this.getList()
              }
            })
        } else {
          this.$com.getFormValidErrTips(this, err)
        }
      })
    },
    handleCancel() {
      this.modifyVisible = false
    }
  }
}
</script>

<style scoped>
.wrapper-roles { display: flex; flex-wrap: wrap;}
.box { width: 20%; padding: 0 8px 16px 8px;}
.inner {height: 100px; display: flex; flex-direction: column; border: 1px solid #e8eaec;}
.content { display: flex; flex: 1; flex-direction: column; justify-content: center; align-items: start; padding:0px 20px;}
.content .roleName{ font-weight: bold; margin-bottom: 5px; word-break: break-all; display: inline-block; width: 100%; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}

.operate { border-top: 1px solid #e8eaec; height: 40px; text-align: center; line-height: 40px; }
.operate span { cursor: pointer; color: #1890ff}
.inner.add-btn { background: #e8eaec; border: none; }
.inner.add-btn > button {  width: 100%; height: 100%; font-size: 16px; color: #1890ff;}
.center-p{ text-align: center;}
</style>