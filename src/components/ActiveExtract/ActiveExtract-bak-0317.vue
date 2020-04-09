<template>
<a-card class="extract-container">
  <a-row :gutter="6">
    <a-col :span="2" class="extract-btns">
      <a-icon @click="addFilter" type="plus-square" />
      <a-icon @click="deleteFilter" type="minus-square" />
    </a-col>
    <a-col :span="4">
      <a-select @change="handleTypeChange($event, basic)" v-model="basic.type">
        <a-select-option v-for="option in typeOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-select v-show="needSelect(basic)" v-model="basic.andValue">
        <a-select-option v-for="option in needSelect(basic)" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
      </a-select>
      <a-input v-show="!needSelect(basic)" v-model="basic.andValue"/>
    </a-col>
    <a-col :span="2">
      <a-select v-model="basic.contain">
        <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="7">
      <a-select v-show="needSelect(basic)" v-model="basic.containValue">
        <a-select-option v-for="option in needSelect(basic)" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
      </a-select>
      <a-input v-show="!needSelect(basic)" v-model="basic.containValue"/>
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
        <a-select @change="handleTypeChange($event, filter)" v-model="filter.type">
          <a-select-option v-for="option in typeOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-select v-show="needSelect(filter)" v-model="filter.andValue">
          <a-select-option v-for="option in needSelect(filter)" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
        </a-select>
        <a-input v-show="!needSelect(filter)" v-model="filter.andValue"/>
      </a-col>
      <a-col :span="2">
        <a-select v-model="filter.contain">
          <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-select v-show="needSelect(filter)" v-model="filter.containValue">
          <a-select-option v-for="option in needSelect(filter)" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
        </a-select>
        <a-input v-show="!needSelect(filter)" v-model="filter.containValue"/>
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
    <a-row slot="tabBarExtraContent" v-show="!isView">
      <a-button @click="handleSelect">{{selectBtn}}</a-button>
      <!-- <a-button @click="handleConfirm" type="primary" v-if="isConfirm">{{saveBtn}}</a-button> -->
      <a-button @click="handleConfirm" type="primary">{{saveBtn}}</a-button>
    </a-row>
  </a-tabs>
  <a-table
  v-show="curTab == '1'"
  size="small"
  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
  :columns="columns.slice(0, columns.length - 1)"
  :dataSource="data"
  :pagination="pagination"
  rowKey="id"
  />
  <a-table
  v-show="curTab == '2'"
  size="small"
  :columns="isView?columns.slice(0, columns.length - 1):columns"
  :dataSource="data2"
  :pagination="pagination2"
  rowKey="id"
  >
    <template slot="operation" slot-scope="text, record">
      <a-popconfirm
        title="确认将此专家移出选中列表？"
        @confirm="handleDelete(record)"
      ><a-button type="danger" size="small">移出</a-button></a-popconfirm>
    </template>
  </a-table>
</a-card>
</template>

<script>
export default {
  name: 'ActiveExtract',
  data() {
    return {
      isConfirm  : false,
      isView     : false,
      curTab     : '1',
      typeOptions: [
        { name: '姓名', value: '1' },
        { name: '工作单位', value: '2' },
        { name: '单位性质', value: '3', requestType: '1', options: [] },
        { name: '行政职务', value: '4', requestType: '2', options: [] },
        { name: '职称', value: '5', requestType: '3', options: [] },
        { name: '所学专业', value: '6' },
        { name: '最高学历', value: '7', requestType: '4', options: [] },
        { name: '研究方向', value: '8', requestType: '8', options: [] },
        { name: '主题词', value: '9' },
      ],
      andOptions: [
        { name: '并且', value: '1' },
        { name: '或者', value: '2' },
        { name: '不含', value: '3' },
      ],
      containOptions: [
        { name: '并含', value: '1' },
        { name: '或含', value: '2' },
        { name: '不含', value: '3' },
      ],
      equalsOptions: [
        { name: '精确', value: '1' },
        { name: '模糊', value: '2' },
      ],
      basic       : {},
      filters     : [],
      extractionNo: 2,
      columns     : [
        {
          title    : '姓名',
          dataIndex: 'name',
        },
        {
          title    : '性别',
          dataIndex: 'sex',
        },
        {
          title    : '工作单位',
          dataIndex: 'workCompany',
        },
        {
          title    : '行政职务',
          dataIndex: 'positionName',
          width    : 100,
        },
        {
          title    : '职称',
          dataIndex: 'jobTitleName',
        },
        {
          title    : '研究方向',
          dataIndex: 'researchDirectionName',
        },
        {
          title    : '登录账号',
          dataIndex: 'phone',
        },
        {
          title      : '操作',
          dataIndex  : 'operation',
          align      : 'center',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange
      },
      data       : [],
      pagination2: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange2
      },
      data2          : [],
      selectedRowKeys: [],
      selectedRows   : [],
      selectedList   : [],
      url            : 'http://iftp.omniview.pro/api/service-expert/expert/dictionary/',
    }
  },
  mounted() {
    // this.handleCheck()
    this.getOptions()
    this.handleReset()
  },
  methods: {
    // 获取选择框下拉选项
    getOptions() {
      this.typeOptions.forEach(item => {
        if (!item.requestType) return
        this.$ajax.get({
          url: this.url + item.requestType,
        }).then(res => {
          item.options = (res.data && res.data.content) || []
        })
      })
    },
    // 主键值改变则清除行里的两个值
    handleTypeChange(val, row) {
      this.$delete(row, 'andValue')
      this.$delete(row, 'containValue')
    },
    // 判断需要用输入框则返回选项列表，否则返回false默认使用input
    needSelect(row) {
      const curType = this.typeOptions.find(item => item.value == row.type)
      if (curType && curType.requestType) {
        return curType.options
      }
      return false
    },
    handleSearch() {
      const { pageNo, pageSize } = this.pagination
      const params = {
        pageNo,
        pageSize,
        itemList    : [ this.basic, ...this.filters ],
        extractionNo: this.extractionNo,
      }
      this.$emit('search', params, this.initData)
    },
    initData(res) {
      this.curTab = '1'
      this.data = [ ...this.$com.confirm(res, 'data.content.expertList', []) ]
      this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
    },
    onPageChange(page) {
      this.pagination.pageNo = page
      this.handleSearch()
    },
    onPageChange2(page) {
      this.pagination2.pageNo = page
      this.handleCheck()
    },
    addFilter() {
      const len = this.filters.length
      if (len >= this.typeOptions.length - 1) return
      this.filters.push({
        and    : this.andOptions[0].value,
        contain: this.containOptions[0].value,
        equals : this.equalsOptions[0].value,
        type   : this.typeOptions[len + 1].value,
      })
    },
    deleteFilter() {
      this.filters.pop()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      // this.selectedRows.push(...selectedRows)
      this.selectedRows = [ ...selectedRows ]
    },
    handleReset() {
      this.pagination.pageNo = 1
      this.filters = []
      this.basic = {
        and     : this.andOptions[0].value,
        type    : this.typeOptions[0].value,
        contain : this.containOptions[1].value,
        equals  : this.equalsOptions[1].value,
        andValue: ''
      }
      this.extractionNo = 2
      // this.handleSearch()
    },
    handleTabChange(key) {
      if (key == '1') {
        // this.handleSearch()
      } else if (key == '2') {
        this.handleCheck()
        // this.data2 = this.selectedList
      }
    },
    handleCheck() {
      const { pageNo, pageSize } = this.pagination2
      const params = {
        pageNo,
        pageSize,
      }
      this.$emit('check', params, this.initData2)
    },
    initData2(res) {
      this.data2 = this.$com.confirm(res, 'data.content', [])
      this.pagination2.total = this.$com.confirm(res, 'data.totalRows', 0)
    },
    handleDelete({ id }) {
      const index = this.data2.findIndex(item => item.id == id)
      this.data2.splice(index, 1)
      this.$emit('select', this.data2)
    },
    handleSelect() {
      // 选中专家
      this.selectedList = []
      this.selectedList.push(...this.selectedRows)
      // 去重并提取
      const reducer = (arr, cur) => arr.indexOf(cur) >= 0 ? arr : [ ...arr, cur ]
      this.selectedList = this.selectedList.reduce(reducer, [])
      this.selectedRowKeys = []
      this.selectedRows = []
      const { pageNo, pageSize } = this.pagination2
      const params = {
        pageNo,
        pageSize,
      }
      this.$emit('check', params, (res) => {
        const data = this.$com.confirm(res, 'data.content', [])
        let result = this.selectedList
        if (data.length > 0) {
          result = [ ...data, ...this.selectedList ]
        }
        this.$emit('select', result)
      })
      this.curTab = '1'
    },
    handleConfirm() {
      // 确认专家
      this.$emit('confirm', this.selectedList)
      this.curTab = '1'
    },
  },
  computed: {
    tabText() {
      // const len = this.selectedList.length
      // if (len > 0) {
      //   return `选中专家列表（已选中${len}项）`
      // }
      return '选中专家列表'
    },
    selectBtn() {
      // const len = this.selectedRowKeys.length
      // if (len > 0) {
      //   return `选中（已勾选${len}项）`
      // }
      return '选中'
    },
    saveBtn() {
      // const len = this.selectedList.length
      // if (len > 0) {
      //   return `确认（已选中${len}项）`
      // }
      return '专家确认'
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
