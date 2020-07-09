<template>
<div class="routerWapper">
  <div class="layoutMargin layoutPadding" v-if="$route.name == '/cms/vote'">
    <ActiveForm :layout="layout" :label-width="70" :model="model">
      <div style="margin-bottom: 10px;">
        <a-button v-if="$permission('P33001')" @click="routerTo('/cms/vote/edit')" type="primary">新增投票</a-button>
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
      <div slot="status" slot-scope="{ text, record }">
        <CMSDataStatus cmsType="vote" :status='record.status' />
      </div>
      <div slot="operator" slot-scope="{text, record}">
        <DataOperatorInList :creator='!record.creator?"":record.creator' :lastOperator='!record.operator?"":record.operator' />
      </div>
      <span slot="actions" slot-scope="{ text, record }">
        <template v-if="record.status == '3'">
          <span v-if="$permission('P33003')" @click="routerTo('/cms/vote/result', record)" class="actionBtn">查看结果公示</span>
        </template>
        <template v-else>
          <span v-if="$permission('P33003')" @click="routerTo('/cms/vote/view', record)" class="actionBtn">查看<a-divider type="vertical"/></span>
        </template>
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
          <span v-if="$permission('P33003')" @click="routerTo('/cms/vote/result', record)" class="actionBtn">结果预览<a-divider type="vertical" /></span>
          <span v-if="$permission('P33005')" @click="publicResult(record)" class="actionBtn">结果公示</span>
        </template>
      </span>
    </ActiveTable>
  </div>
  <RouterWapper v-else />
</div>
</template>

<script>
import CMSDataStatus from '@/views/cms/components/cmsStatus'
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'
export default {
  name      : 'VoteList',
  components: {
    CMSDataStatus,
    DataOperatorInList,
  },
  data() {
    return {
      expand: false,
      model : {
        status: [ '0', '1', '2', '3' ],
      },
      total      : 0,
      currentPage: 1,
      pageSize   : 10,
      columns    : [
        {
          title    : '名称',
          dataIndex: 'name',
          align    : 'left',
          width    : 300,
        },
        {
          title    : '投票开始日期',
          type     : 'date',
          dataIndex: 'startTime',
          align    : 'center',
        },
        {
          title    : '投票结束日期',
          type     : 'date',
          dataIndex: 'endTime',
          align    : 'center',
        },
        {
          title      : '发布状态',
          dataIndex  : 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title      : '操作人',
          dataIndex  : 'operator',
          scopedSlots: { customRender: 'operator' }
        },
        {
          title      : '操作',
          dataIndex  : 'actions',
          width      : 200,
          scopedSlots: { customRender: 'actions' }
        },
      ],
      list: [],
    }
  },
  watch: {
    $route(to, from) {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    layout() {
      return [
        {
          name: {
            label      : '名称',
            type       : 'input',
            width      : this.expand ? 12 : 8,
            offset     : this.expand ? 0 : 10,
            placeholder: '请输入投票名称',
          },
          date: {
            label : '投票时间',
            type  : 'daterange',
            width : 12,
            hidden: !this.expand,
          },
          status: {
            label  : '发布状态',
            type   : 'checkbox',
            width  : 18,
            options: [
              { label: '草稿', value: '0' },
              { label: '已发布', value: '1' },
              { label: '结束', value: '2' },
              { label: '已结果公示', value: '3' },
            ],
            hidden: !this.expand,
          },
          btns: {
            width : 6,
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
                h('a-button', {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click: () => this.handleExpand()
                  },
                }, `${this.expand ? '简单' : '更多'}搜索`),
              ])
            },
          },
        },
      ]
    }
  },
  mounted(){
    this.$ajax.get({
      url   : this.$api.GET_VOTE_LIST,
      params: {
        status_in: '0,1,2,3',
        pageNo   : this.currentPage,
        pageSize : this.pageSize,
        id_desc  : 1
      }
    })
      .then(res => { 
      
        if (res.code === '200') {
          this.list = this.$com.confirm(res, 'data.content', [])
          this.total = this.$com.confirm(res, 'data.totalRows', 0)
        } else {
          this.$message.error(res.msg)
        }
      })
  },
  methods: {
    handleExpand() {
      this.expand = !this.expand
    },
    deleteVote({ id }) {
      this.$modal.confirm({
        title  : '删除投票',
        content: '是否确认删除该草稿投票信息？删除后将不会出现在列表中',
        okType : 'danger',
        onOk   : () => {
          this.$ajax.delete({
            url: this.$api.DELETE_VOTE.replace('{id}', id)
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
    changeStatus({ id }, status) {
      let config = {
        title  : '发布投票',
        content: '是否确认发布投票？',
        msg    : '发布成功',
      }
      if (status == '2') {
        config = {
          title  : '关闭投票',
          content: '是否确认关闭投票？关闭后，投票将被置为“结束”不能再进行用户投票',
          msg    : '关闭成功',
        }
      }
      this.$modal.confirm({
        title  : config.title,
        content: config.content,
        onOk   : () => {
          this.$ajax.put({
            url: this.$api.PUT_VOTE_STATUS.replace('{id}', id).replace('{status}', status)
          }).then(() => {
            this.$modal.success({
              title  : '成功',
              content: config.msg,
              okText : '确认',
            })
            this.getList()
          })
        },
      })
    },
    calcPercent(total, option) {
      if (!option) {
        return 0
      }
      return Math.floor((option / total) * 100)
    },
    publicResult({ id, name, description, startTime, endTime, introduction }) {
      const config = {
        title  : '公布投票结果',
        content: '是否确认公布投票结果？',
        msg    : '公布成功',
      }
      this.$modal.confirm({
        title  : config.title,
        content: config.content,
        onOk   : () => {
          this.$ajax.get({
            url: this.$api.GET_VOTE_RESULT.replace('{id}', id),
          }).then(res => {
            const subjects = this.$com.confirm(res, 'data.content.subjects', [])
            let content = `
              <h2 style="text-align: center">${name}</h2>
              <p style="text-align: center">投票日期：${startTime.split(' ')[0]} ~ ${endTime.split(' ')}</p>
            `
            subjects.forEach((item, index) => {
              let options = ''
              if (item.options && item.options.length > 0) {
                item.options.forEach((option, i) => {
                  options += `
                    <p>${this.$com.numToLetter(i)}、${option.value || ''}&nbsp;&nbsp;&nbsp;&nbsp;(${option.count || 0}人 / ${this.calcPercent(item.count, option.count)}%)</p>
                  `
                })
              }
              content += `
                <div style="padding-left: 200px">
                  <p>
                    <b>${index + 1}、${item.title}</b>
                    <span style="color:red">${item.isRequired == '0' ? '*' : ''}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    (${item.type == '0' ? '单选题' : '多选题'})&nbsp;&nbsp;&nbsp;&nbsp;参与投票人数：${item.count || 0}人
                  </p>
                  ${options}
                </div>
              `
            })
            this.$ajax.post({
              url   : this.$api.POST_CMS_NOTICE,
              params: {
                title        : name,
                startTime,
                endTime,
                introduction,
                content,
                isTop        : '0',
                isVote       : '0',
                status       : '1',
                voteId       : id,
                titleManageId: this.$titleId.notificationId
              }
            }).then(() => {
              this.$ajax.put({
                url: this.$api.PUT_VOTE_STATUS.replace('{id}', id).replace('{status}', '3')
              }).then(() => {
                this.$modal.success({
                  title  : '成功',
                  content: config.msg,
                  okText : '确认',
                })
                this.getList()
              })
            })
          })
        },
      })
    },
    getList() {
      const { name = null, status, date = [] } = this.model
      if(date && date[1]){
        var arr = date[1].split('-')
        arr[2] = Number(arr[2])+1
        var startTime_lte = arr.join('-')
      }
      const params = {
        name_l       : name,
        status_in    : status.join(','),
        startTime_gte: date[0] || null,
        startTime_lte: startTime_lte || null,
        pageNo       : this.currentPage,
        pageSize     : this.pageSize,
        id_desc      : 1
      }
      this.$ajax.get({
        url: this.$api.GET_VOTE_LIST,
        params,
      }).then(res => {
        this.list = this.$com.confirm(res, 'data.content', [])
        this.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    routerTo(name, data = null) {
      const config = { name: name }
      if (data) {
        config.query = {
          id: data.id
        }
      }
      this.$router.push(config)
    },
    handleReset() {
      this.model = {
        status: [ '0', '1', '2', '3' ],
      }
      this.currentPage = 1
      this.getList()
    },
    handlePageChange({ current }) {
      this.currentPage = current
      this.getList()
    }
  }
}
</script>
