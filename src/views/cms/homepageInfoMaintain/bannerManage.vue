<template>
  <div class="old-user">
    <a-form class="protalForm" :form="searchForm">
      <a-row class="formItemLine" align="middle">
        <a-col :span="10">
          <a-form-item>
            <a-input
              label="名称"
              placeholder="请输入轮播图名称"
              v-model="searchForm.username_l"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" class="algin-right">
          <a-button>重置</a-button>
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-row type="flex" align="bottom">
        <a-col :span="10">
          <a-button type="primary" @click="addBanner()"
            ><a-icon type="file-image" />新增轮播图</a-button
          >
          <a-button type="default" @click="bannerSort()"
            ><a-icon type="sort-ascending" />轮播图排序</a-button
          >
        </a-col>
        <a-col :span="14"></a-col>
      </a-row>
    </a-form>
    <p class="gayLine noline "></p>
    <a-table
      class="portalTable"
      size="small"
      :columns="columns"
      :pagination="pagination"
      rowKey="id"
      :dataSource="data"
    >
      <span slot="action" slot-scope="text, record">
        <span class="actionBtn" @click="bannerDetail(record)"
          >查看<a-divider type="vertical"
        /></span>
        <span class="actionBtn" @click="modifyBanner(record)"
          >修改<a-divider type="vertical"
        /></span>
        <span class="actionBtn" @click="deleteBanner(record)"
          >删除<a-divider type="vertical"
        /></span>
      </span>
    </a-table>

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
  name: 'banner-manage',
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
          title    : '轮播图名称',
          dataIndex: 'bannerName',
          key      : 'bannerName'
        },
        {
          title    : '创建人名称',
          dataIndex: 'creator',
          key      : 'creator'
        },
        {
          title    : '上次修改人员',
          dataIndex: 'operator',
          key      : 'operator'
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
      const searchParams = JSON.parse(JSON.stringify(this.searchForm))
      this.$ajax
        .get({
          url: this.$api.GET_BANNER_LIST
        })
        .then(res => {
          if (res.code === '200') {
            this.data = this.$com.confirm(res, 'data.content', [])
          } else {
            this.$message.error(res.msg)
          }
          // 存储当前页面列表的搜索添加和分页信息
          this.$com.storeSearchParams(
            this.$route.name + '/old',
            this.params,
            this.searchForm
          )
        })
    },
    handleResetOk() {
      this.resetData.validateFields(err => {
        if (!err) {
          this.$ajax
            .put({
              url:
                'http://yapi.omniview.pro/mock/267/service-release/titleManage/' +
                this.modifySection.idToIdentify,
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
    },
    search() {
      this.pagination.pageNo = 1
      this.pagination.current = 1
      this.getList()
    },
    addBanner() {
      this.$router.push({
        name: '/cms/homepageInfoMaintain/addBanner'
      })
    },
    modifyBanner(value) {
      this.$router.push({
        name  : '/cms/homepageInfoMaintain/modifyBanner',
        params: {
          id: value.id
        }
      })
    },
    bannerSort() {
      this.$router.push({
        name: '/cms/homepageInfoMaintain/bannerSort'
      })
    },
    bannerDetail(value) {
      this.$router.push({
        name  : '/cms/homepageInfoMaintain/bannerDetail',
        params: {
          id: value.id
        }
      })
    },
    deleteBanner(value) {
      let that = this
      this.$modal.confirm({
        title  : '您确认删除"' + value.bannerName + '"吗？',
        content: '删除后将无法找回!',
        onOk() {
          that.$ajax
            .delete({
              url: that.$api.DELETE_BANNER.replace('{id}', value.id)
            })
            .then(res => {
              console.log(res)
              
              if (res.code === '200') {
                that.$message.success('删除成功')
              } else {
                that.$message.error(res.msg)
              }
            })
        },
        onCancel() {}
      })
    }
  }
}
</script>
