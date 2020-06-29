<template>
  <div class="routerWapper">
    <div
      class="layoutMargin layoutPadding"
      v-if="$route.name == '/cms/farmingtech'"
    >
      <a-form class="protalForm" :form="farmingSearchForm">
        <a-row
          class="formItemLine"
          type="flex"
          :justify="simpleSearchForm ? 'end' : 'space-between'"
          align="middle"
          :gutter="simpleSearchForm ? 16 : 0"
        >
          <a-col span="8">
            <a-form-item
              class="formItem"
              :label="simpleSearchForm ? '' : '标题'"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-input
                placeholder="请输入养殖技术标题"
                v-decorator="['title']"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item class='formItem' label="内容类型"  :label-col="formItemLabelCol" :wrapper-col="formItemWrapperCol">
              <a-checkbox-group :options="searchFormOption.type" :defaultValue="defaultSearchForm.type" @change="onTypeChange" />
            </a-form-item>
          </a-col> -->
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item
              class="formItem"
              label="发布日期"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-range-picker v-decorator="['startTime', {rules: [{ type: 'array', required: false, message: '请选择时间' }]}]" />
            </a-form-item>
          </a-col>
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item
              class="formItem"
              label="关键词"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-input
                placeholder="请输入关键词"
                v-decorator="['keywords']"
              />
            </a-form-item>
          </a-col>
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item
              class="formItem"
              label="正文"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-input
                placeholder="请输入正文"
                v-decorator="['content']"
              />
            </a-form-item>
          </a-col>
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item
              class="formItem"
              label="发稿人"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-input
                placeholder="请输入发稿人"
                v-decorator="['author']"
              />
            </a-form-item>
          </a-col>
          <a-col span="8" v-if="!simpleSearchForm">
            <a-form-item
              class="formItem"
              label="全部"
              :label-col="formItemLabelCol"
              :wrapper-col="formItemWrapperCol"
            >
              <a-input
                placeholder="请输入搜索内容"
                v-decorator="['allIn']"
              />
            </a-form-item>
          </a-col>
          <a-col span="6" class="algin-right">
            <a-button @click="reset">重置</a-button>
            <a-button type="primary" @click="getFarmingList">搜索</a-button>
            <a-button
              type="primary"
              v-if="simpleSearchForm"
              @click="showMoreSearch"
              >更多搜索</a-button
            >
            <a-button
              type="primary"
              v-if="!simpleSearchForm"
              @click="closeMoreSearch"
              >简单搜索</a-button
            >
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine"></p>
      <div class="portalTableOperates">
        <a-button
          icon="plus"
          v-if="$permission('P32001')"
          type="primary"
          @click="goTo('create')"
          >新建养殖技术</a-button
        >
      </div>
      <a-table
        size="small"
        class="portalTable"
        :columns="listColumns"
        :dataSource="knowledgeList"
        rowKey="id"
        :pagination="pagination"
      >
        <span slot="knowledgeType" slot-scope="text, record">
          <a-tag v-if="record.type == '1'" color="pink">PDF</a-tag>
          <a-tag v-if="record.type == '0'" color="purple">视频</a-tag>
        </span>
        <span slot="knowledgeStatus" slot-scope="text, record">
          <CMSDataStatus
            :cmsType="'knowledge'"
            :status="record.status"
          ></CMSDataStatus>
        </span>
        <span slot="operator" slot-scope="text, record">
          <DataOperatorInList
            :creator="!record.creator ? '' : record.creator"
            :lastOperator="!record.operator ? '' : record.operator"
          ></DataOperatorInList>
        </span>
        <span slot="action" slot-scope="text, record">
          <span
            class="actionBtn"
            v-if="$permission('P33003')"
            @click="goTo('detail', record.id)"
            >查看<a-divider
              v-if="$com.oneOf(record.status, ['0', '1'])"
              type="vertical"
          /></span>
          <template v-if="record.status == '0'">
            <span
              class="actionBtn"
              v-if="$permission('P32001')"
              @click="goTo('edit', record.id)"
              >修改<a-divider type="vertical"
            /></span>
            <a-dropdown>
              <span class="actionBtn"> 更多 <a-icon type="down" /> </span>
              <a-menu
                slot="overlay"
                @click="
                  event => {
                    doListOpeations(event.key, record);
                  }
                "
              >
                <a-menu-item
                  class="actionBtn"
                  key="publish"
                  v-if="$permission('P32004')"
                >
                  发布
                </a-menu-item>
                <a-menu-item
                  class="actionBtn"
                  key="delete"
                  v-if="$permission('P32002')"
                >
                  删除
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <span
            class="actionBtn"
            v-if="record.status == '1' && $permission('P32004')"
            @click="doListOpeations('recall', record)"
            >撤回</span
          >
        </span>
      </a-table>
    </div>
    <RouterWapper v-else></RouterWapper>
  </div>
</template>
<style scoped></style>

<script>
import CMSDataStatus from '@/views/cms/components/cmsStatus'
import DataOperatorInList from '@/views/systemManagement/components/dataOperatorInList'

export default {
  components: {
    CMSDataStatus,
    DataOperatorInList
  },
  data() {
    return {
      isReady          : false,
      simpleSearchForm : true, // 展示、收取简单搜索开关，true为简单搜索
      defaultSearchForm: {
        // type:['0','1'],
        status   : [ '0', '1' ],
        anonymous: [ '0', '1' ]
      },
      searchForm       : {},
      knowledgeList    : [],
      farmingSearchForm: this.$form.createForm(this),
      listColumns      : [
        {
          title    : '标题',
          dataIndex: 'title',
          key      : 'title'
        },
        {
          title    : '栏目',
          dataIndex: 'id',
          key      : 'id'
        },
        {
          title    : '发布时间',
          dataIndex: 'startTime',
          key      : 'startTime',
          width    : 80
        },
        {
          title    : '发稿人',
          dataIndex: 'author',
          key      : 'author',
          width    : 80
        },
        // {
        //   title: '内容类型',
        //   dataIndex: 'type',
        //   key: 'type',
        //   width: 100,
        //   scopedSlots: {
        //     customRender: 'knowledgeType'
        //   }
        // },
        {
          title      : '状态',
          dataIndex  : 'status',
          key        : 'status',
          width      : 140,
          scopedSlots: {
            customRender: 'knowledgeStatus'
          }
        },
        {
          title      : '操作',
          key        : 'operation',
          width      : 180,
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      // listColumns  : [
      //   {
      //     title    : '标题',
      //     dataIndex: 'title',
      //     key      : 'title'
      //   },
      //   {
      //     title    : '作者',
      //     dataIndex: 'author',
      //     key      : 'author'
      //   },
      //   {
      //     title    : '发表年份',
      //     dataIndex: 'years',
      //     key      : 'years',
      //     width    : 80
      //   },
      //   // {
      //   //   title: '内容类型',
      //   //   dataIndex: 'type',
      //   //   key: 'type',
      //   //   width: 100,
      //   //   scopedSlots: {
      //   //     customRender: 'knowledgeType'
      //   //   }
      //   // },
      //   {
      //     title      : '状态',
      //     dataIndex  : 'status',
      //     key        : 'status',
      //     width      : 140,
      //     scopedSlots: {
      //       customRender: 'knowledgeStatus'
      //     }
      //   },
      //   {
      //     title      : '操作人',
      //     width      : 150,
      //     dataIndex  : 'creator',
      //     key        : 'creator',
      //     scopedSlots: {
      //       customRender: 'operator'
      //     }
      //   },
      //   {
      //     title      : '操作',
      //     key        : 'operation',
      //     width      : 180,
      //     scopedSlots: {
      //       customRender: 'action'
      //     }
      //   }
      // ],
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange
      }
    }
  },
  beforeCreate() {
    if (this.$route.name == '/cms/farmingtech') {
      this.farmingSearchForm = this.$form.createForm(this)
    }
  },
  mounted() {
    // if (this.$route.name == '/cms/farmingtech') {
    //   this.searchForm.status_in = this.toKeyString(
    //     this.defaultSearchForm.status,
    //     ','
    //   )
    //   // this.searchForm.type_in = this.toKeyString(this.defaultSearchForm.type,',')
    //   this.searchForm.anonymous_in = this.toKeyString(
    //     this.defaultSearchForm.anonymous,
    //     ','
    //   )
    //   this.getFarmingList()
    // }

    this.getList()
  },
  watch   : {},
  computed: {
    formItemLabelCol() {
      let labelCol = {}
      if (this.simpleSearchForm) {
        labelCol = { span: 0 }
      } else {
        labelCol = { span: 8 }
      }
      return labelCol
    },
    formItemWrapperCol() {
      let wrapperCol = {}
      if (this.simpleSearchForm) {
        wrapperCol = { span: 24 }
      } else {
        wrapperCol = { span: 16 }
      }
      return wrapperCol
    }
  },
  methods: {
    getList() {
      this.$ajax
        .get({
          url   : this.$api.MOCK_URL + this.$api.GET_ANNOUNCE_LIST,
          params: {
            titleManageId: '1'
          }
        })
        .then(res => {
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
          this.pagination.current = this.pagination.pageNo
          this.knowledgeList = this.$com.confirm(res, 'data.content', [])
          
          this.isReady = true
          // console.log(this.knowledgeList)
        })
    },
    closeMoreSearch() {
      this.simpleSearchForm = true
    },
    showMoreSearch() {
      this.simpleSearchForm = false
    },

    /**
     * 根据列表操作类型，弹窗用户确认后执行相应操作或请求
     * @param {String} eventKey 操作类型，发布：publish；删除：delete；撤回：recall
     * @param {Object} data 被操作数据的详情信息
     */
    doListOpeations(eventKey, data) {
      const opeation = {
        title: '',
        tips : ''
      }
      let toStatus = ''
      switch (eventKey) {
      case 'publish':
        opeation.title = '您确认发布“' + data.title + '”吗？'
        opeation.tips =
            '发布后即可被本平台用户浏览。可使用【撤回】取消发布。'
        toStatus = '1'
        break
      case 'delete':
        opeation.title = '您确认删除“' + data.title + '”吗？'
        opeation.tips = '删除后将无法找回！'
        break
      case 'recall':
        opeation.title = '您确认撤销“' + data.title + '”的发布状态吗？'
        opeation.tips = '撤回后将无法再次编辑、发布或删除！'
        toStatus = '2'
        break
      default:
        break
      }
      if (this.$com.oneOf(eventKey, [ 'publish', 'delete', 'recall' ])) {
        const vm = this
        this.$modal.confirm({
          title     : opeation.title,
          content   : opeation.tips,
          okText    : '确认',
          okType    : 'danger',
          cancelText: '取消',
          onOk() {
            if (eventKey == 'delete') {
              vm.toDoDelete(data.id)
            } else {
              vm.toChangeStatus(data.id, toStatus)
            }
          }
        })
      }
    },

    /**
     * 删除指定数据
     * @param {String} id 被删除数据key
     */
    toDoDelete(id) {
      this.$ajax
        .delete({
          url: this.$api.DELETE_ANNOUNCE.replace('{id}', id)
        })
        .then(res => {
          if (res.code == '200') {
            this.$message.success('删除成功')
            this.getFarmingList()
          }
        })
    },

    /**
     * 更改指定数据发布状态
     * @param {String} id 被操作数据key
     * @param {String} status 目标状态Key ，发布：1；失效：2
     */
    toChangeStatus(id, status) { 
      this.$ajax
        .put({
          url: this.$api.PUT_CMS_KNOWLEDGE_STATUS.replace('{id}', id).replace(
            '{status}',
            status
          )
        })
        .then(res => {
          if (res.code == '200') {
            const successMsg = status == '1' ? '发布成功' : '撤回成功'
            this.$message.success(successMsg)
            this.getFarmingList()
          }
        })
    },

    /**
     * 将一维数据键值数组，转为指定字串串链接的字符串
     * @param {Array} keyArray 包含数据key的一维数组
     * @param {String} splitStr key转为字符串后，每个key的链接符
     * @returns {String} keyString 拼接后的字串串
     */
    toKeyString(keyArray, splitStr) {
      let keyString = ''
      if (Array.isArray(keyArray) && keyArray.length > 0) {
        keyArray.forEach(element => {
          keyString += element + splitStr
        })
        keyString = keyString.substring(0, keyString.length - 1)
      }
      return keyString
    },

    /**
     * 监听搜索表单中文库状态选项勾选内容变更，并暂存勾选结果
     * @param {Array} selecteds 已勾选项的key
     */
    onStatusChange(selecteds) {
      this.searchForm.status_in = this.toKeyString(selecteds, ',')
    },

    /**
     * 监听搜索表单中文库类型选项勾选内容变更，并暂存勾选结果
     * @param {Array} selecteds 已勾选项的key
     */
    onTypeChange(selecteds) {
      this.searchForm.type_in = this.toKeyString(selecteds, ',')
    },

    /**
     * 监听搜索表单中文库是否允许匿名查看选项勾选内容变更，并暂存勾选结果
     * @param {Array} selecteds 已勾选项的key
     */
    onAnonymousChange(selecteds) {
      this.searchForm.anonymous_in = this.toKeyString(selecteds, ',')
    },

    /**
     * 进入数据操作页面
     * @param {String} type 页面类型， 创建：create；修改：edit；详情：detail
     * @param {String} id 数据key
     */
    goTo(type, id) {
      console.log(type)
      type = !type ? 'create' : type.toLowerCase()
      id = !id ? '' : id
      switch (type) {
      case 'create':
        this.$router.push({
          name: '/cms/farmingtech/create'
        })
        break
      case 'detail':
        this.$router.push({
          name  : '/cms/farmingtech/detail',
          params: {
            id: id
          }
        })
        break
      case 'edit':
        this.$router.push({
          name  : '/cms/farmingtech/edit',
          params: {
            id: id
          }
        })
        break
      default:
        break
      }
    },

    /**
     * 重置列表表单项内容，并重获取数据
     */
    reset() {
      // this.searchForm = {
      //   status_in   : this.toKeyString(this.defaultSearchForm.status, ','),
      //   // type_in:this.toKeyString(this.defaultSearchForm.type,','),
      //   anonymous_in: this.toKeyString(this.defaultSearchForm.anonymous, ',')
      // }
      this.pagination.current = 1
      this.pagination.pageNo = 1
      this.farmingSearchForm.setFieldsValue({
        title    : '',
        startTime: [],
        keywords : '',
        content  : '',
        author   : '',
        allIn    : ''
      })
      this.getFarmingList()
    },

    /**
     * 记录翻页，并获取当前页的数据
     * @param {Number} current 当前页码
     */
    onPageChange(current) {
      this.pagination.current = current
      this.pagination.pageNo = current
      this.getFarmingList()
    },

    /**
     * 调用结构，查询表单要求的知识文库资料
     */
    getFarmingList() {
      let searchParms
      searchParms = Object.assign(
        {},
        this.searchForm,
        {
          title: !this.farmingSearchForm.getFieldValue('title')
            ? ''
            : this.farmingSearchForm.getFieldValue('title'),
          startTime: !this.farmingSearchForm.getFieldValue('startTime')
            ? ''
            : this.farmingSearchForm.getFieldValue('startTime'),
          keywords: !this.farmingSearchForm.getFieldValue('keywords')
            ? ''
            : this.farmingSearchForm.getFieldValue('keywords'),
          content: !this.farmingSearchForm.getFieldValue('content')
            ? ''
            : this.farmingSearchForm.getFieldValue('content'),
          author: !this.farmingSearchForm.getFieldValue('author')
            ? ''
            : this.farmingSearchForm.getFieldValue('author'),
          allIn_l: !this.farmingSearchForm.getFieldValue('allIn')
            ? ''
            : this.farmingSearchForm.getFieldValue('allIn'),
        },
        {
          pageNo  : this.pagination.pageNo,
          pageSize: this.pagination.pageSize
        }
      )
      this.$ajax
        .get({
          url   : this.$api.GET_CMS_KNOWLEDGE_LIST,
          params: searchParms
        })
        .then(res => {
          this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
          this.pagination.pageNo = this.$com.confirm(res, 'data.page', 1)
          this.pagination.current = this.pagination.pageNo
          this.knowledgeList = this.$com.confirm(res, 'data.content', [])
          this.isReady = true
          // console.log(this.knowledgeList)
        })
    }
  }
}
</script>
