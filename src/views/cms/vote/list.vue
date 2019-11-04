<template>
<div class="routerWapper">
<div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/vote'">
  <ActiveForm :layout="layout" :label-width="70" :model="model">
    <div style="display:flex;justify-content: space-between;">
      <a-button v-if="$permission('P33001')" @click="routerTo('/cms/vote/edit')" type="primary">新增</a-button>
      <div>
        <a-button @click="handleReset" type="primary" ghost>重置</a-button>
        <a-button @click="handleSearch" type="primary">搜索</a-button>
      </div>
    </div>
  </ActiveForm>
  <a-divider dashed />
  <ActiveTable
    rowKey="id"
    :columns="columns"
    :data="list"
    showPager
    @on-page-change="handlePageChange"
    :currentPage="currentPage"
    :total="total"
    class="portalTable"
  >
    <div slot="status" slot-scope="{ text, record }">
      <CMSDataStatus cmsType="vote" :status='record.status' />
    </div>
    <span slot="actions" slot-scope="{ text, record }">
      <span v-if="$permission('P33003')" @click="routerTo('/cms/vote/view', record)" class="actionBtn">查看<a-divider v-if="record.status != '3'" type="vertical"/></span>
      <template v-if="record.status=='0'">
        <span v-if="$permission('P33001')" @click="routerTo('/cms/vote/edit', record)" class="actionBtn">修改<a-divider type="vertical" /></span>
        <a-dropdown>
          <span class="actionBtn"> 更多 <a-icon type="down" /> </span>
            <a-menu slot="overlay">
              <a-menu-item v-if="$permission('P33004')" @click="changeStatus(record, '1')" class="actionBtn"> 发布 </a-menu-item>
              <a-menu-item v-if="$permission('P33002')" @click="deleteVote(record)" class="actionBtn"> 删除 </a-menu-item>
            </a-menu>
        </a-dropdown>
      </template>
      <template v-else-if="record.status == '1'">
        <span v-if="$permission('P33004')" @click="changeStatus(record, '2')"  class="actionBtn">关闭</span>
      </template>
      <template v-else-if="record.status == '2'">
        <span v-if="$permission('P33005')" @click="changeStatus(record, '3')" class="actionBtn">结果公示<a-divider type="vertical" /></span>
        <span v-if="$permission('P33003')" @click="routerTo('/cms/vote/result', record)" class="actionBtn">查看结果</span>
      </template>
    </span>
  </ActiveTable>
</div>
<RouterWapper v-else />
</div>
</template>

<script>
import CMSDataStatus from '@/views/cms/components/cmsStatus'
export default {
  name: 'VoteList',
  components: {
    CMSDataStatus,
  },
  data() {
    return {
      layout: [
        {
          name: {
            label: '名称',
            type: 'input',
            width: 10,
          },
          date: {
            label: '投票时间',
            type: 'daterange',
            width: 10,
          },
        },
        {
          status: {
            label: '发布状态',
            type: 'checkbox',
            width: 20,
            options: [
              {label: '全部', value: ''},
              {label: '草稿', value: '0'},
              {label: '已发布', value: '1'},
              {label: '结束', value: '2'},
              {label: '已结果公示', value: '3'},
            ],
          },
        }
      ],
      model: {},
      total: 0,
      currentPage: 1,
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'left',
          width: 300,
        },
        {
          title: '投票开始日期',
          type: 'date',
          dataIndex: 'startTime',
          align: 'center',
        },
        {
          title: '投票结束日期',
          type: 'date',
          dataIndex: 'endTime',
          align: 'center',
        },
        {
          title: '发布状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'actions',
          width: 200,
          scopedSlots: { customRender: 'actions' }
        },
      ],
      list: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    deleteVote({id}) {
      this.$model.confirm({
        title: '删除投票',
        content: '是否确认删除该草稿投票信息？删除后将不会出现在列表中',
        okType: 'danger',
        onOk: () => {
          this.$ajax.delete({
            url: this.$api.DELETE_VOTE.replace('{id}', id)
          }).then(() => {
            this.$message.success('删除成功')
            this.getList()
          })
        },
      })
    },
    changeStatus({id}, status) {
      let config = {
        title: '发布投票',
        content: '是否确认发布投票？',
        msg: '发布成功',
      }
      if (status == '2') {
        config = {
          title: '关闭投票',
          content: '是否确认关闭投票？关闭后，投票将被置为“结束”不能再进行用户投票',
          msg: '关闭成功',
        }
      } else if (status == '3') {
        config = {
          title: '公布投票结果',
          content: '是否确认公布投票结果？',
          msg: '公布成功',
        }
      }
      this.$model.confirm({
        title: config.title,
        content: config.content,
        onOk: () => {
          this.$ajax.put({
            url: this.$api.PUT_VOTE_STATUS.replace('{id}', id).replace('{status}', status)
          }).then(() => {
            this.$message.success(config.msg)
            this.getList()
          })
        },
      })
    },
    getList() {
      this.$ajax.get({
        url: this.$api.GET_VOTE_LIST,
      }).then(res => {
        this.list = res.data.content
        this.total = res.data.totalRows
      })
    },
    routerTo(name, data = null) {
      const config = {name: name}
      if (data) {
        config.query = {
          id: data.id
        }
      }
      this.$router.push(config)
    },
    handleSearch() {
      const {name, status, date} = this.model
      const params = {
        name,
        status,
        startTime: date[0],
        endTime: date[1],
      }
      // TODO 发请求搜索（暂无接口）
    },
    handleReset() {
      this.model = {}
      this.getList()
    },
    handlePageChange({current}) {
      this.currentPage = current
      // TODO 发请求获取数据（暂无接口）
    },
  }
}
</script>
