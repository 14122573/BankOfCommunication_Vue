<template>
    <!--    水产品总产量-养殖产品（淡水养殖）-按养殖水域和养殖方式分-->
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
          title   : '按养殖水域分',
          children: [
            {
              title    : '池塘',
              dataIndex: 'pond',
              key      : 'pond',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '湖泊',
              dataIndex: 'lakes',
              key      : 'lakes',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水库',
              dataIndex: 'reservoir',
              key      : 'reservoir',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '河沟',
              dataIndex: 'county',
              key      : 'county',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他',
              dataIndex: 'other',
              key      : 'other',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '稻田',
              dataIndex: 'paddyFields',
              key      : 'paddyFields',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '按养殖方式分',
          children: [
            {
              title    : '围栏',
              dataIndex: 'fence',
              key      : 'fence',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '网箱',
              dataIndex: 'cages',
              key      : 'cages',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '工厂化',
              dataIndex: 'factory',
              key      : 'factory',
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
        url   : 'http://47.101.223.16:7066/aquaticFarmingFreshWay',
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
          key        : i,
          year       : '2019',//年份
          area       : this.province[i].name,//区域
          sum        : '266,644,732,15',//总计
          pond       : '128,1544,129,31',//池塘
          lakes      : '35,358,584,13',//湖泊
          reservoir  : '1,584,597,56',//水库
          county     : '25,578,522,85',//河沟
          other      : '25,578,522,85',//其他
          paddyFields: '25,578,522,85',//稻田
          fence      : '25,578,522,85',//围栏
          cages      : '25,578,522,85',//网箱
          factory    : '25,578,522,85'//工厂化
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
