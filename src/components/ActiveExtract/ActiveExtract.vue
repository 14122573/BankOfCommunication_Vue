<template>
  <a-card class="extract-container">
    <!-- <a-spin :spinning="spinning"></a-spin> -->
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
        <a-select v-show="needSelect(basic).type=='select'" v-model="basic.andValue">
          <a-select-option v-for="option in needSelect(basic).options" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
        </a-select>
        <a-cascader v-show="needSelect(basic).type=='cascader'" :options="needSelect(basic).options" placeholder='请选择' @change="(value, selectedOptions) => {onCascaderChange(value,selectedOptions,basic,'andValue')}" changeOnSelect />
        <a-input v-show="needSelect(basic).type=='input'" v-model="basic.andValue"/>
      </a-col>
      <a-col :span="2">
        <a-select v-model="basic.contain">
          <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <a-select v-show="needSelect(basic).type=='select'" v-model="basic.containValue">
          <a-select-option v-for="option in needSelect(basic).options" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
        </a-select>
        <a-cascader placeholder='请选择' v-show="needSelect(basic).type=='cascader'" :options="needSelect(basic).options" @change="(value, selectedOptions) => {onCascaderChange(value,selectedOptions,basic,'containValue')}" changeOnSelect />
        <a-input v-show="needSelect(basic).type=='input'" v-model="basic.containValue"/>
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
          <a-select v-show="needSelect(filter).type=='select'" v-model="filter.andValue">
            <a-select-option v-for="option in needSelect(filter).options" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
          </a-select>
          <a-cascader placeholder='请选择' v-show="needSelect(filter).type=='cascader'" :options="needSelect(basic).options" @change="(value, selectedOptions) => {onCascaderChange(value,selectedOptions,filter,'andValue')}" changeOnSelect />
          <a-input v-show="needSelect(filter).type=='input'" v-model="filter.andValue"/>
        </a-col>
        <a-col :span="2">
          <a-select v-model="filter.contain">
            <a-select-option v-for="option in containOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="7">
          <a-select v-show="needSelect(filter).type=='select'" v-model="filter.containValue">
            <a-select-option v-for="option in needSelect(filter).options" :key="option.id" :value="option.id">{{option.name}}</a-select-option>
          </a-select>
          <a-cascader placeholder='请选择' v-show="needSelect(filter).type=='cascader'" :options="needSelect(basic).options" @change="(value, selectedOptions) => {onCascaderChange(value,selectedOptions,filter,'containValue')}" changeOnSelect />
          <a-input v-show="!needSelect(filter).type=='input'" v-model="filter.containValue"/>
        </a-col>
        <a-col :span="2">
          <a-select v-model="filter.equals">
            <a-select-option v-for="option in equalsOptions" :key="option.name" :value="option.value">{{option.name}}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </template>
    <a-row :gutter="6" type="flex" justify="end">
      <a-col :span="2" >
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
      <a-tab-pane tab="确认专家列表" key="3"/>
      <a-row slot="tabBarExtraContent">
        <a-button @click="handleSelect" v-if="curTab=='1'" :disabled='!selectedRows.length>0'>{{selectBtn}}</a-button>
        <a-button @click="handleConfirm" type="primary" v-if="curTab=='2'">{{saveBtn}}</a-button>
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
    <a-table
      v-show="curTab == '3'"
      size="small"
      :columns="isView?columns.slice(0, columns.length - 1):columns"
      :dataSource="confirmedExpertData"
      :pagination="paginationConfirmedExpert"
      rowKey="id"
      />
  </a-card>
</template>

<script>
export default {
  name: 'ActiveExtract',
  data() {
    return {
      // spinning:false,
      isConfirm  : false,
      isView     : false,
      curTab     : '1',
      typeOptions: [
        { name: '姓名', value: '1' },
        { name: '工作单位', value: '2' },
        { name: '单位性质', value: '3', requestType: '1', options: [] },
        { name: '职务', value: '4', requestType: '2', options: [] },
        { name: '职称', value: '5', requestType: '3', options: [] },
        { name: '所学专业', value: '6' },
        { name: '最高学历', value: '7', requestType: '4', options: [] },
        { name: '研究方向', value: '8', requestType: '8', options: [] },
        { name: '关键词', value: '9' },
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
      basic  : {},
      filters: [],
      // extractionNo: 2,
      columns: [
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
          title    : '职务',
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
      data2                    : [],
      paginationConfirmedExpert: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChangeConfirmedExperts
      },
      confirmedExpertData: [],
      selectedRowKeys    : [],
      selectedRows       : [],
      selectedList       : [],
      url                : {
        dictionary: 'http://znyj.nftec.agri.cn/api/service-expert/expert/dictionary/',
        profTree  : 'http://znyj.nftec.agri.cn/api/service-expert/expert/prof/tree'
      },
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
        let ajaxUrl = this.url.dictionary + item.requestType
        if(item.requestType=='3'){
          //职称要换另一个接口
          ajaxUrl = this.url.profTree
        }
        this.$ajax.get({
          url: ajaxUrl,
        }).then(res => {
          if(item.requestType=='3'){
            //需要按级联选择组件options的结构重组内容
            const optionDatas = (res.data && res.data.content) || {}
            item.options = []
            for(const key in optionDatas){
              const optionChildren = []
              optionDatas[key].forEach(item => {
                optionChildren.push({
                  value: item.id,
                  label: item.name
                })
              })
              item.options.push({
                value   : key,
                label   : key,
                children: [].concat(optionChildren),
              })
            }
          }else{
            item.options = (res.data && res.data.content) || []
          }
        })
      })
    },
    // 主键值改变则清除行里的两个值
    handleTypeChange(val, row) {
      this.$delete(row, 'andValue')
      this.$delete(row, 'containValue')
    },

    /**
     * 判断需要用的表单组件
     * @param {Object} row 当前设置使用的抽取条件对象
     * @returns {Object} {
     *                    type:'cascader/select/input',需要使用的组件类型
     *                    options:[] 当type为cascader/select时，此项为可选范围
     *                    }
     */
    needSelect(row) {
      const curType = this.typeOptions.find(item => item.value == row.type)
      if (curType && curType.requestType) {
        if(curType.requestType=='3'){
          return {
            type   : 'cascader',
            options: curType.options
          }
        }else{
          return {
            type   : 'select',
            options: curType.options
          }
        }
        return curType.options
      }
      return {
        type: 'input'
      }
    },

    /**
     * 监听级联的change事件，将选中value重组后，赋值obj[path]
     * @param {Array} value 级联已选中的value数组
     * @param {Object} selectedOptions 级联已选中的option对象数组 { value:'',lable:'',options:[...]}
     * @param {Object} obj 当前操作的筛选条件对象
     * @param {String} path 当前操作筛选条件对象，需要存放已选级联内容的key值
     */
    onCascaderChange(value, selectedOptions, obj, path){
      obj[path] = ''
      selectedOptions.forEach((element, index) => {
        if(index>0){
          obj[path] += ','
        }
        obj[path] += element.label
      })
    },
    filteringSearchParams(){
      const org = [].concat([ this.basic, ...this.filters ])
      const filtering = []
      org.forEach(oneFilter => {
        if((!!oneFilter.containValue && oneFilter.containValue=='') ){
          delete oneFilter.containValue
        }
        if((!!oneFilter.andValue && oneFilter.andValue=='') ){
          delete oneFilter.andValue
        }
        if(!!oneFilter.andValue || !!oneFilter.containValue){
          filtering.push(oneFilter)
        }
      })
      return filtering
    },
    handleSearch() {
      const { pageNo, pageSize } = this.pagination
      const filteredItemList = this.filteringSearchParams()
      const params = {
        pageNo,
        pageSize,
        itemList    : filteredItemList,
        extractionNo: 100000,
      }
      this.filteringSearchParams()
      // 开启loading层
      this.$store.commit('SET_LOADING', true)
      this.$emit('search', params, this.initData)
    },
    initData(res) {
      this.curTab = '1'
      this.data = [ ...this.$com.confirm(res, 'data.content.expertList', []) ]
      this.pagination.total = this.$com.confirm(res, 'data.totalRows', 0)
      // 关闭loading层
      this.$store.commit('SET_LOADING', false)
    },
    onPageChange(page) {
      this.pagination.pageNo = page
      this.handleSearch()
    },
    onPageChange2(page) {
      this.pagination2.pageNo = page
      this.handleCheck()
    },
    onPageChangeConfirmedExperts(page) {
      this.paginationConfirmedExpert.pageNo = page
      this.handleConfirmed()
    },
    addFilter() {
      const len = this.filters.length
      if (len >= this.typeOptions.length - 1) return
      this.filters.push({
        and    : this.andOptions[0].value,
        contain: this.containOptions[1].value,
        equals : this.equalsOptions[1].value,
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
      this.data = []
      this.selectedRowKeys=[]
      this.selectedRows=[]
      this.selectedList=[]
      // this.extractionNo = 2
      // this.handleSearch()
    },

    /**
     * 根据tab页切换，调用对应的方法，加载对应列表数据
     * @param {String} key tab的key标识
     */
    handleTabChange(key) {
      switch (key) {
      case '1':
      // 显示“筛选结果”
        break
      case '2':
      // 显示“选中专家”
        this.handleCheck()
        break
      case '3':
      // 显示“确认专家”
        this.handleConfirmed()
        break
      default:
        break
      }
    },
    handleConfirmed(){
      const { pageNo, pageSize } = this.paginationConfirmedExpert
      const params = {
        pageNo,
        pageSize,
      }
      this.$emit('viewConfirmed', params, this.initConfirmedExpertData)
    },
    initConfirmedExpertData(res){
      this.confirmedExpertData = this.$com.confirm(res, 'data.content', [])
      this.paginationConfirmedExpert.total = this.$com.confirm(res, 'data.totalRows', 0)
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
      this.handleReset()
    },
    handleDelete({ id }) {
      const index = this.data2.findIndex(item => item.id == id)
      this.data2.splice(index, 1)
      this.$emit('select', this.data2, (res) => {
        //关闭loading层
        this.$store.commit('SET_LOADING', false)
      })
    },
    // 选中专家
    handleSelect() {
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
      //开启loading层
      this.$store.commit('SET_LOADING', true)

      this.$emit('check', params, (res) => {
        const data = this.$com.confirm(res, 'data.content', [])
        let result = this.selectedList
        if (data.length > 0) {
          result = [ ...data, ...this.selectedList ]
        }
        this.$emit('select', result, (res) => {
          //关闭loading层
          this.$store.commit('SET_LOADING', false)
        })
      })
    },
    // 确认专家
    handleConfirm() {
      //开启loading层
      this.$store.commit('SET_LOADING', true)
      this.$emit('confirm', this.selectedList)
      //关闭loading层
      this.$store.commit('SET_LOADING', false)
      this.curTab = '3'
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
.extract-container .ant-select, .extract-container .ant-cascader-picker {
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
