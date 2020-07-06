<template>
  <div class="old-user">
    <a-form class="protalForm" :form="searchForm">
      <a-row class="formItemLine" align="middle">
        <a-col :span="10">
          <a-form-item>
            <a-input
              v-decorator="['lunboName']"
              label="名称"
              placeholder="请输入轮播图名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" class="algin-right">
          <a-button @click="resetForm">重置</a-button>
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
      searchForm   : this.$form.createForm(this),
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
    /**
     * 清空表单
     */
    resetForm(){
      this.searchForm.resetFields()
      this.pagination.current = 1
      this.getList()
    },

    /**
     * 翻页方法
     * @params {number} current 当前点击页
     */
    onChange(current) {
      this.pagination.pageNo = current
      this.pagination.current = current
      this.getList()
    },

    /**
     * 获取轮播图列表数据
     */
    getList() {
      this.$ajax
        .get({
          url   : this.$api.GET_BANNER_LIST,
          params: {
            bannerName_l: this.searchForm.getFieldValue('lunboName') ? this.searchForm.getFieldValue('lunboName'):''
          }
        })
        .then(res => {
          if (res.code === '200') {
            console.log(res)
            
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
      console.log("值" + JSON.stringify(value));
      if(value.bannerGroup !== '0') {
        this.$message.success('该轮播图已被排序，无法删除')
      } else {
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
                that.getList()
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
}
</script>
