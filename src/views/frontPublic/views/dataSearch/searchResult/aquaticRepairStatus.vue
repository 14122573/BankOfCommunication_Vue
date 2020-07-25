<template>
<!--    水产加工企业，冷库情况-->
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
        // {
        //   title    : '总计',
        //   dataIndex: 'sum',
        //   key      : 'sum',
        //   width    : 150,
        //   fixed    : 'left',
        //   align    : 'center'
        // },
        {
          title   : '水产品加工产量',
          children: [
            {
              title    : '小计',
              dataIndex: 'subtotal',
              key      : 'subtotal',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水产品加工能力',
              dataIndex: 'aquaticProcessAbility',
              key      : 'aquaticProcessAbility',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：规模以上加工企业',
              dataIndex: 'scaleEnterprise',
              key      : 'scaleEnterprise',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '水产品冷库',
          children: [
            {
              title    : '数量',
              dataIndex: 'amount',
              key      : 'amount',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '冻结能力',
              dataIndex: 'freezingCapacity',
              key      : 'freezingCapacity',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '冷藏能力',
              dataIndex: 'coldStorageCapacity',
              key      : 'coldStorageCapacity',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '制冰能力',
              dataIndex: 'makingCapacity',
              key      : 'makingCapacity',
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
        url   : this.$api.GET_DATA_ARSTATUS_LIST,
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
          key                  : i,
          year                 : '2019',//年份
          area                 : this.province[i].name,//区域
          sum                  : '266,644,732,15',//总计
          subtotal             : '266,644,732,15',//小计
          aquaticProcessAbility: '128,1544,129,31',//水产品加工能力
          scaleEnterprise      : '35,358,584,13',//其中：规模以上加工企业
          amount               : '1,584,597,56',//数量
          freezingCapacity     : '25,578,522,85',//冻结能力
          coldStorageCapacity  : '25,578,522,85',//冷藏能力
          makingCapacity       : '25,578,522,85',//制冰能力
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
