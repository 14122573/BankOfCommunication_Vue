<template>
<a-card class="extract-container">
  <a-row :gutter="6">
    <a-col :span="2" class="extract-btns">
      <a-icon @click="addFilter" type="plus-square" />
      <a-icon @click="deleteFilter" type="minus-square" />
    </a-col>
    <a-col :span="4">
      <a-select v-model="basic.type">
        <a-select-option v-for="option in typeOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-input v-model="basic.andValue"></a-input>
    </a-col>
    <a-col :span="2">
      <a-select v-model="basic.contain">
        <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-input v-model="basic.containValue"></a-input>
    </a-col>
    <a-col :span="2">
      <a-select v-model="basic.equals">
        <a-select-option v-for="option in equalsOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
      </a-select>
    </a-col>
  </a-row>
  <template v-if="filters.length > 0">
    <a-row v-for="(filter, index) in filters" :key="index" :gutter="6">
      <a-col :span="2">
        <a-select v-model="filter.and">
          <a-select-option v-for="option in andOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-select v-model="filter.type">
          <a-select-option v-for="option in typeOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-input v-model="filter.andValue"></a-input>
      </a-col>
      <a-col :span="2">
        <a-select v-model="filter.contain">
          <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-input v-model="filter.containValue"></a-input>
      </a-col>
      <a-col :span="2">
        <a-select v-model="filter.equals">
          <a-select-option v-for="option in equalsOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
    </a-row>
  </template>
  <a-row :gutter="6">
    <a-col :span="2"><div style="margin: 5px 0;text-align:right;">抽取人数：</div></a-col>
    <a-col :span="4">
      <a-input-number v-model="extractionNo" :min="1" style="width: 100%;"/>
    </a-col>
    <a-col :span="2" :offset="14">
      <a-button @click="handleReset" type="primary" block ghost>重置</a-button>
    </a-col>
    <a-col :span="2">
      <a-button @click="handleSearch" type="primary" block>筛选</a-button>
    </a-col>
  </a-row>
  <a-divider dashed style="margin: 10px 0"/>
  <a-tabs v-model="curTab" @change="handleTabChange">
    <a-tab-pane tab="筛选结果" key="1"/>
    <a-tab-pane :tab="tabText" key="2"/>
    <a-row slot="tabBarExtraContent">
      <a-button @click="handleSelect">{{selectBtn}}</a-button>
      <a-button @click="handleSave" type="primary">{{saveBtn}}</a-button>
    </a-row>
  </a-tabs>
  <a-table
    size="small"
    :rowSelection="curTab == '2' ? null : {selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    :columns="columns"
    :dataSource="data"
    :pagination="pagination"
    rowKey="id"
  >
    <template v-if="curTab == '2'" slot="operation" slot-scope="text, record">
      <a-popconfirm
        title="确认将此专家移出选中列表？"
        @confirm="handleDelete(record)"
        @cancel="cancel"
      ><a-button type="danger" size="small">移出</a-button></a-popconfirm>
      <!-- <a-button @click="handleView(record)" type="link">查看</a-button> -->
    </template>
  </a-table>
</a-card>
</template>

<script>
const base = 'http://47.100.45.230:30000/mock/185'
const POST_FILTER_LIST = base + '/service-expert/expert/extract' // 筛选专家
const POST_SELECT = base + '/service-expert/expert/extract/select' // 选中专家
const POST_CONFIRM = base + '/service-expert/extract/confirm' // 确认专家
export default {
  name: 'ActiveExtract',
  props: {
    searchParams: {
      type: Object,
      default() {
        return {}
      },
    },
    confirmParams: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      curTab: '1',
      typeOptions: [
        {name: '姓名', value: '1'},
        {name: '工作单位', value: '2'},
        {name: '单位性质', value: '3'},
        {name: '行政职务', value: '4'},
        {name: '职称', value: '5'},
        {name: '所学专业', value: '6'},
        {name: '最高学历', value: '7'},
        {name: '研究方向', value: '8'},
        {name: '主题词', value: '9'},
      ],
      andOptions: [
        {name: '并且', value: '1'},
        {name: '或者', value: '2'},
        {name: '不含', value: '3'},
      ],
      containOptions: [
        {name: '并含', value: '1'},
        {name: '或含', value: '2'},
        {name: '不含', value: '3'},
      ],
      equalsOptions: [
        {name: '精确', value: '1'},
        {name: '模糊', value: '2'},
      ],
      basic: {},
      filters: [],
      extractionNo: 100,
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
      selectedList: [],
    }
  },
  mounted() {
    this.handleReset()
  },
  methods: {
    getData() {
      const {pageNo, pageSize} = this.pagination
      const params = Object.assign({}, this.searchParams, {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        itemList: [this.basic, ...this.filters]
      })
      console.log('params', params)
      // this.$ajax.post({
      //   url: POST_FILTER_LIST,
      //   params,
      // }).then(res => {
      //   console.log(res)
      // })
      this.$ajax.get({
        url: this.$api.GET_EXPERT_LIST,
        params: {
          pageNo: this.pagination.pageNo,
          pageSize: this.pagination.pageSize,
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
      if (len >= this.typeOptions.length - 1) return
      this.filters.push({
        and: this.andOptions[0].value,
        contain: this.containOptions[0].value,
        equals: this.equalsOptions[0].value,
        type: this.typeOptions[len + 1].value,
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
        and: this.andOptions[0].value,
        type: this.typeOptions[0].value,
        contain: this.containOptions[0].value,
        equals: this.equalsOptions[0].value,
      }
    },
    handleTabChange(key) {
      if (key == '1') {
        this.getData()
      } else if (key == '2') {
        this.data = this.selectedList
      }
    },
    handleSearch() {
      this.getData()
    },
    // handleView(data) {
    //   console.log(data)
    // },
    handleDelete({id}) {
      const index = this.selectedList.findIndex(item => item.id == id)
      this.selectedList.splice(index, 1)
      this.$emit('selectedList', this.selectedList)
    },
    submitData(url) {
      const params = Object.assign({}, this.confirmParams, {
        expertList: this.selectedList.map(item => {
          return {id: item.id}
        })
      })
      this.$ajax.post({
        url,
        params,
      }).then(res => {
        console.log(res)
      })
    },
    handleSelect() { // 选中专家
      this.selectedList.push(...this.selectedRows)
      // 去重并提取
      const reducer = (arr, cur) => arr.indexOf(cur) >= 0 ? arr : [...arr, cur]
      this.selectedList = this.selectedList.reduce(reducer, [])
      this.selectedRowKeys = []
      this.selectedRows = []
      this.submitData(POST_SELECT)
      this.$emit('selectedList', this.selectedList)
    },
    handleSave() { // 确认专家
      this.submitData(POST_CONFIRM)
      this.$emit('savedList', this.selectedList)
    },
  },
  computed: {
    tabText() {
      const len = this.selectedList.length
      if (len > 0) {
        return `选中专家列表（已选中${len}项）`
      }
      return '选中专家列表'
    },
    selectBtn() {
      const len = this.selectedRowKeys.length
      if (len > 0) {
        return `选中（已勾选${len}项）`
      }
      return '选中'
    },
    saveBtn() {
      const len = this.selectedList.length
      if (len > 0) {
        return `确认（已选中${len}项）`
      }
      return '确认'
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
