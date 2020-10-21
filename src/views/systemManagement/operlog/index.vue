<template>
  <div class="routerWapper">
    <div v-if="$route.name == '/systemManagement/operlog'" class="layoutMargin layoutPadding">
      <a-form-model
        class="ant-advanced-search-form"
        ref="queryForm"
        :border="false"
        :form="queryParams"
        :label-col=" { span: 7 }"
        :style="{ padding: '0',border:'none' }"
      >
        <a-row :gutter="12">
          <a-col :span="4">
            <a-form-item label="模块名称">
              <a-input placeholder="请输入系统模块" v-model="queryParams.modName_l" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="系统名称">
              <a-input placeholder="请输入操作人员" v-model="queryParams.sysName_l" />
            </a-form-item>
          </a-col>

          <a-col :span="4">
            <a-form-item label="请求方式">
              <a-input placeholder="请求方式" v-model="queryParams.method_l" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="响应编码">
              <a-input placeholder="响应编码" v-model="queryParams.statusCode" />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="操作时间">
              <a-range-picker
                :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                :value="dataTimeSelect"
                @change="onChange"
                style="width:100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3" :style="{ textAlign: 'right' ,marginTop:'4px'}">
            <a-button :style="{ marginLeft: '4px' }" @click="resetQuery">重置</a-button>
            <a-button type="primary" html-type="submit" @click="getList">搜索</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <p class="gayLine"></p>
      <div class="portalTableOperates">
        <a-button icon="delete" type="danger" :disabled="!hasSelected" @click="deleteIds">批量删除</a-button>
        <a-button icon="delete" type="danger" @click="deleteAll">清空</a-button>
      </div>
      <ActiveTable
        rowKey="id"
        :columns="columns"
        :data="list"
        showPager
        :currentPage="queryParams.pageNo"
        :pageSize="queryParams.pageSize"
        :total="total"
        :multiSelect="true"
        @on-page-change="handlePageChange"
        @on-select-change="handleSelectChange"
        class="portalTable"
      >
        <span slot="actions" slot-scope="{ text, record }">
          <a-button
            icon="eye"
            type="link"
            @click="()=>{
              $router.push({
                name : '/systemManagement/operlog/particulars',
                query: {
                   id: record.id
                }
             })
            }"
          >详细</a-button>
        </span>
      </ActiveTable>
    </div>
    <RouterWapper v-else />
  </div>
</template>
<script>
const columns = [
  {
    title: "模块名称",
    dataIndex: "modName",
    align: "center",
    width: 120
  },
  {
    title: "功能点描述",
    dataIndex: "desPoint",
    align: "center"
  },
  {
    title: "请求方式",
    dataIndex: "method",
    align: "center"
  },
  // {
  //   title: "操作人员",
  //   dataIndex: "opeName",
  //   align: "center"
  // },
  // {
  //   title: "操作账户",
  //   dataIndex: "opeUser",
  //   align: "center"
  // },
  {
    title: "请求ip",
    dataIndex: "reqIp",
    align: "center"
  },
  {
    title: "系统名称",
    dataIndex: "sysName",
    align: "center"
  },
  {
    title: "响应编码",
    dataIndex: "statusCode",
    align: "center"
    // scopedSlots: { customRender: "status" }
  },
  {
    title: "操作日期",
    dataIndex: "opeTime",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "actions",
    width: 100,
    align: "center",
    scopedSlots: { customRender: "actions" }
  }
];
// import particularsModal from "./modal/particularsModal";
import moment from "moment";
import { FormModel } from "ant-design-vue";
export default {
  components: {
    "a-form-model": FormModel
  },
  data() {
    return {
      // 多选的选项
      selectedRowKeys: [],
      //表头
      columns: columns,
      //数据
      list: [],
      //查询日期范围
      dateRange: [],
      total: 0,
      //查询参数
      queryParams: {},
      //时间参数
      dataTimeSelect: []
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  watch: {
    $route(to, from) {
      //当监听到路由返回时候刷新列表
      if (to.path == "/systemManagement/operlog") {
        this.getList();
      }
    }
  },
  created() {
    this.resetQuery();
  },
  methods: {
    //moment
    moment,
    //初始化
    resetQuery() {
      this.queryParams = {
        pageNo: 1,
        pageSize: 10,
        modName_l: undefined,
        opeName_l: undefined,
        method_l: undefined,
        statusCode: undefined,
        opeTime_gt: undefined,
        opeTime_lt: undefined
      };
      this.dataTimeSelect = [];
      this.total = 0;
      this.getList();
    },
    openModal(record) {
      this.$refs.particulars.showModal(record);
    },
    //获取列表
    getList() {
      this.$ajax
        .get({
          url: this.$api.GET_OPERLOG_LIST,
          params: this.queryParams
        })
        .then(res => {
          if (res.code === "200") {
            this.total = res.data.totalRows || 0;
            this.list = res.data.content || [];
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    //多选
    handleSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys.map(ele=>{
        return {id:ele}
      });
      console.log(this.selectedRowKeys);
      
    },
    //日期选择
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.dataTimeSelect = date;
      this.queryParams.opeTime_gt = dateString[0] || undefined;
      this.queryParams.opeTime_lt = dateString[1] || undefined;
    },
    //查看详情
    handelSee(record) {
      console.log(record);
    },
    //选择分页
    handlePageChange({ current }) {
      this.queryParams.pageNo = current;
      this.getList();
    },
    //全部删除
    deleteAll(){
      const _this = this;
      this.$modal.confirm({
        title: "是否确认删除这些数据？",
        content: "此操作不可撤销",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$ajax
            .post({
              url: _this.$api.POST_OPERLOG_ALL_DELECT,
            })
            .then(res => {
              _this.getList();
            });
        }
      });
    },
    //批量删除
    deleteIds() {
      const _this = this;
      this.$modal.confirm({
        title: "是否确认删除这些数据？",
        content: "此操作不可撤销",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this.$ajax
            .post({
              url: _this.$api.POST_OPERLOG_IDS_DELECT,
              params: _this.selectedRowKeys
            })
            .then(res => {
              _this.getList();
            });
        }
      });
    }
  }
};
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 100px;
  text-align: center;
  padding-top: 80px;
}
</style>