<template>
<a-card class="extract-container">
  <a-row :gutter="6">
    <a-col :span="2" class="extract-btns">
      <a-icon @click="addFilter" type="plus-square" />
      <a-icon @click="deleteFilter" type="minus-square" />
    </a-col>
    <a-col :span="4">
      <a-select v-model="basic.key">
        <a-select-option v-for="option in keyOptions" :key="option" :value="option">{{option}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-input v-model="basic.keyName"></a-input>
    </a-col>
    <a-col :span="2">
      <a-select v-model="basic.condition2">
        <a-select-option v-for="option in conditions2" :key="option" :value="option">{{option}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-input v-model="basic.conditionName"></a-input>
    </a-col>
    <a-col :span="2">
      <a-select v-model="basic.condition3">
        <a-select-option v-for="option in conditions3" :key="option" :value="option">{{option}}</a-select-option>
      </a-select>
    </a-col>
  </a-row>
  <template v-if="filters.length > 0">
    <a-row v-for="(filter, index) in filters" :key="index" :gutter="6">
      <a-col :span="2">
        <a-select v-model="filter.condition1">
          <a-select-option v-for="option in conditions1" :key="option" :value="option">{{option}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-select v-model="filter.key">
          <a-select-option v-for="option in keyOptions" :key="option" :value="option">{{option}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-input v-model="filter.keyName"></a-input>
      </a-col>
      <a-col :span="2">
        <a-select v-model="filter.condition2">
          <a-select-option v-for="option in conditions2" :key="option" :value="option">{{option}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-input v-model="filter.conditionName"></a-input>
      </a-col>
      <a-col :span="2">
        <a-select v-model="filter.condition3">
          <a-select-option v-for="option in conditions3" :key="option" :value="option">{{option}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </template>
  <a-row :gutter="6">
    <a-col :span="2" :offset="20">
      <a-button @click="handleReset" type="primary" block ghost>重置</a-button>
    </a-col>
    <a-col :span="2">
      <a-button @click="handleSearch" type="primary" block>检索</a-button>
    </a-col>
  </a-row>
  <a-divider dashed style="margin: 10px 0"/>
  <a-row>
    <a-button @click="handleExtract" type="dashed">{{extractBtn}}</a-button>
    <a-button @click="handleSave">{{saveBtn}}</a-button>
    <a-button @click="handleExport" type="primary">{{exportBtn}}</a-button>
  </a-row>
  <a-table
    size="small"
    :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    :columns="columns"
    :dataSource="data"
    :pagination="pagination"
    rowKey="id"
  >
    <template slot="operation" slot-scope="text, record">
      <a-button @click="handleView(record)" type="link">查看</a-button>
    </template>
  </a-table>
</a-card>
</template>

<script>
export default {
  name: 'ActiveExtract',
  data() {
    return {
      keyOptions: ['姓名', '工作单位', '单位性质', '行政职务', '职称', '所学专业', '最高学历', '研究方向', '主题词'],
      conditions1: ['并且', '或者', '不含'],
      conditions2: ['并含', '或含', '不含'],
      conditions3: ['精确', '模糊'],
      basic: {},
      filters: [],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '性别',
          dataIndex: 'sex',
        },
        {
          title: '工作单位',
          dataIndex: 'workCompany',
        },
        {
          title: '行政职务',
          dataIndex: 'positionName',
          width: 100,
        },
        {
          title: '职称',
          dataIndex: 'jobTitleName',
        },
        {
          title: '研究方向',
          dataIndex: 'researchDirectionName',
        },
        {
          title: '登录账号',
          dataIndex: 'phone',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onPageChange
      },
      data: [],
      selectedRowKeys: [],
      selectedRows: [],
      extractedRows: [],
    }
  },
  mounted() {
    this.handleReset()
  },
  methods: {
    getData() {
      const {pageNo, pageSize} = this.pagination
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST,
        params: {
          pageNo,
          pageSize,
        },
      }).then(res => {
        this.data = this.$com.confirm(res, 'data.content', [])
        this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      })
    },
    onPageChange(page) {
      this.pagination.pageNo = page
      this.getData()
    },
    addFilter() {
      const len = this.filters.length
      if (len >= this.keyOptions.length - 1) return
      this.filters.push({
        condition1: this.conditions1[0],
        condition2: this.conditions2[0],
        condition3: this.conditions3[0],
        key: this.keyOptions[len + 1],
      })
    },
    deleteFilter() {
      this.filters.pop()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows.push(...selectedRows)
    },
    handleReset() {
      this.pageNo = 1
      this.filters = []
      this.basic = {
        key: this.keyOptions[0],
        condition2: this.conditions2[0],
        condition3: this.conditions3[0],
      }
      this.getData()
    },
    handleSearch() {
      console.log(this.basic, this.filters)
    },
    handleView({id}) {
      console.log(id)
    },
    handleExtract() {
      this.extractedRows.push(...this.selectedRows)
      // 去重并提取
      const reducer = (arr, cur) => arr.indexOf(cur) >= 0 ? arr : [...arr, cur]
      this.extractedRows = this.extractedRows.reduce(reducer, [])
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    handleSave() {},
    handleExport() {},
  },
  computed: {
    extractBtn() {
      const len = this.selectedRowKeys.length
      if (len > 0) {
        return `抽取（已选${len}项）`
      }
      return '抽取'
    },
    saveBtn() {
      const len = this.extractedRows.length
      if (len > 0) {
        return `提交（已抽取${len}项）`
      }
      return '提交'
    },
    exportBtn() {
      const len = this.extractedRows.length
      if (len > 0) {
        return `导出（已抽取${len}项）`
      }
      return '导出'
    },
  },
}
</script>

<style scoped>
.extract-container .ant-row {
  margin-bottom: 6px;
}
.extract-container .ant-select {
  width: 100%;
}
.extract-btns {
  display: flex;
  align-items: center;
  justify-content: center;
}
.extract-btns i {
  font-size: 22px;
  margin: 4px 6px;
  cursor: pointer;
  transition: all 0.5s;
}
.extract-btns i:hover {
  transform: scale(1.1);
}
.extract-btns i:first-child {
  color: #1890ff;
}
.extract-btns i:last-child {
  color: red;
}
</style>
