<template>
<div class="routerWapper">
<div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/vote'">
  <ActiveForm :layout="layout" :label-width="70" :model="model">
    <div style="display:flex;justify-content: space-between;">
      <a-button @click="routerTo('/cms/vote/edit')" type="primary">新增</a-button>
      <div>
        <a-button type="primary" ghost>重置</a-button>
        <a-button type="primary">搜索</a-button>
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
      <span class="actionBtn">查看<a-divider type="vertical"/></span>
      <template v-if="record.status=='0'">
        <span class="actionBtn" >修改<a-divider type="vertical" /></span>
        <a-dropdown>
          <span class="actionBtn"> 更多 <a-icon type="down" /> </span>
            <a-menu slot="overlay">
              <a-menu-item class="actionBtn" key="publish"> 发布 </a-menu-item>
              <a-menu-item class="actionBtn" key="delete"> 删除 </a-menu-item>
            </a-menu>
        </a-dropdown>
      </template>
      <span class="actionBtn" v-if="record.status=='1' && $permission('P32004')" @click="doListOpeations('recall',record)">撤回</span>
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
              {label: '全部', value: '全部'},
              {label: '草稿', value: '草稿'},
              {label: '已发布', value: '已发布'},
              {label: '结果', value: '结果'},
              {label: '已结果公示', value: '已结果公示'},
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
    getList() {
      this.$ajax.get({
        url: this.$api.GET_VOTE_LIST,
      }).then(res => {
        this.list = res.data.content
        this.total = res.data.totalRows
      })
    },
    routerTo(name) {
      this.$router.push({
        name,
      })
    },
    handlePageChange() {},
  }
}
</script>
