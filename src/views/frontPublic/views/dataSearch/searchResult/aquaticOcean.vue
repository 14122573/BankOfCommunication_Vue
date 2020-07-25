<template>
    <!--    水产品总产量-捕捞产品（远洋渔业）-->
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
          title    : '运回国内量',
          dataIndex: 'domesticQuantity',
          key      : 'domesticQuantity',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '境外出售量',
          dataIndex: 'overseasSalesVolume',
          key      : 'overseasSalesVolume',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '主要品种产量',
          children: [
            {
              title    : '金枪鱼',
              dataIndex: 'tuna',
              key      : 'tuna',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鱿鱼',
              dataIndex: 'squid',
              key      : 'squid',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '竹筴鱼',
              dataIndex: 'bambooJiaFish',
              key      : 'bambooJiaFish',
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
    setRowColor(record, index) {
      let className = index % 2 ? 'row_gray' : 'row_normal'
      return className
    },
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
        url   : this.$api.GET_DATA_AO_LIST,
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.total', 0)
        this.pagination.current = this.$com.confirm(res, 'data.current', 1)
        this.pagination.current = this.pagination.current
        this.dataList = this.$com.confirm(res, 'data.records', [])
        this.isReady = true
      })
    },
    fetchData() {
      for (let i = 0; i < 31; i++) {
        this.dataList.push({
          key                : i,
          year               : '2019',//年份
          area               : this.province[i].name,//区域
          sum                : '266,644,732,15',//总计
          domesticQuantity   : '128,1544,129,31',//运回国内量
          overseasSalesVolume: '35,358,584,13',//境外出售量
          tuna               : '1,584,597,56',//金枪鱼
          squid              : '25,578,522,85',//鱿鱼
          bambooJiaFish      : '25,578,522,85'//竹筴鱼
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
