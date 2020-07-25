<template>
    <!--    水产品总产量-捕捞产品（淡水捕捞）-按捕捞品种分-->
  <a-row class="tableWrapper searchResult">
    <a-col :span="24">
      <a-table
        :columns="columns"
        :data-source="dataList"
        bordered
        size="small"
        :scroll="{ x: 'calc(700px + 50%)' }"
        :rowClassName="setRowColor"
        :pagination='pagination'
        rowKey='id'
      />
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    queryParams: {
      type    : Object,
      required: false,
      default : function () {
        return {}
      }
    }
  },
  data() {
    return {
      dataList  : [],
      pagination: {
        pageNo         : 1,
        pageSize       : 10,
        total          : 0,
        current        : 1,
        defaultCurrent : 1,
        showQuickJumper: true,
        onChange       : this.onPageChange
      },
      columns: [
        {
          title    : '年份',
          dataIndex: 'year',
          key      : 'year',
          width    : 150,
          fixed    : 'left',
          align    : 'center'
        },
        {
          title    : '区域',
          dataIndex: 'area',
          key      : 'area',
          width    : 150,
          fixed    : 'left',
          align    : 'center'
        },
        {
          title    : '总计',
          dataIndex: 'sum',
          key      : 'sum',
          width    : 150,
          fixed    : 'left',
          align    : 'center'
        },
        {
          title    : '鱼类',
          dataIndex: 'fishSum',
          key      : 'fishSum',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '甲壳类',
          children: [
            {
              title    : '合计',
              dataIndex: 'crustaceansSum',
              key      : 'crustaceansSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '虾',
              dataIndex: 'shrimp',
              key      : 'shrimp',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '蟹',
              dataIndex: 'crab',
              key      : 'crab',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title    : '贝类',
          dataIndex: 'shellfishSum',
          key      : 'shellfishSum',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '藻类',
          dataIndex: 'algaeSum',
          key      : 'algaeSum',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '其他类',
          children: [
            {
              title    : '合计',
              dataIndex: 'otherSum',
              key      : 'otherSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '丰年虫',
              dataIndex: 'fairyShrimp',
              key      : 'fairyShrimp',
              width    : 150,
              align    : 'center'
            }
          ]
        }
      ]
    }
  },
  watch: {
    queryParams: {
      handler(val, oldVal) {
        console.log(this.queryParams)
        this.getList()
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onPageChange(current) {
      this.pagination.current = current
      // this.pagination.pageNo = current
      this.getList()
    },
    getList(){
      let searchParms = Object.assign({}, this.queryParams, {}, {
        current: this.pagination.current,
        size   : this.pagination.pageSize,
      })

      this.$ajax.get({
        url   : this.$api.GET_DATA_ACFB_LIST,
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.total', 0)
        this.pagination.current = this.$com.confirm(res, 'data.current', 1)
        this.pagination.current = this.pagination.current
        this.dataList = this.$com.confirm(res, 'data.records', [])
        this.isReady = true
      })
    },
    setRowColor(record, index) {
      let className = index % 2 ? 'row_gray' : 'row_normal'
      return className
    },
    fetchData() {
      for (let i = 0; i < 31; i++) {
        this.dataList.push({
          key           : i,
          year          : '2019',//年份
          area          : this.province[i].name,//区域
          sum           : '266,644,732,15',//总计
          fishSum       : '128,1544,129,31',//鱼类
          crustaceansSum: '35,358,584,13',//甲壳类合计
          shrimp        : '1,584,597,56',//虾
          crab          : '25,578,522,85',//蟹
          shellfishSum  : '25,578,522,85',//贝类合计
          algaeSum      : '25,578,522,85',//藻类合计
          otherSum      : '25,578,522,85',//其他类合计
          fairyShrimp   : '25,578,522,85'//丰年虫
        })
      }
    }
  }
}
</script>
<style lang="stylus">
  .row_gray {
    background-color: #F2F6FC;
  }

  .row_normal {
    background-color: white;
  }
  .searchResult th
    background-color #2a93f5 !important
    color #fff !important
    text-align center !important
</style>
