<template>
    <!--    水产品总产量-捕捞产品（海洋捕捞）-按捕捞海域和捕捞渔具分-->
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
          title   : '按捕捞海域分',
          children: [
            {
              title    : '渤海',
              dataIndex: 'bohai',
              key      : 'bohai',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '黄海',
              dataIndex: 'yellowSea',
              key      : 'yellowSea',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '东海',
              dataIndex: 'eastSea',
              key      : 'eastSea',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '南海',
              dataIndex: 'southSea',
              key      : 'southSea',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '按捕捞渔具分',
          children: [
            {
              title    : '拖网',
              dataIndex: 'trawling',
              key      : 'trawling',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '围网',
              dataIndex: 'seine',
              key      : 'seine',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '刺网',
              dataIndex: 'gillnet',
              key      : 'gillnet',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '张网',
              dataIndex: 'net',
              key      : 'net',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '钓具',
              dataIndex: 'fishingTackle',
              key      : 'fishingTackle',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他',
              dataIndex: 'other',
              key      : 'other',
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
        url   : this.$api.GET_DATA_ACSA_LIST,
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
          key          : i,
          year         : '2019',//年份
          area         : this.province[i].name,//区域
          sum          : '266,644,732,15',//总计
          bohai        : '128,1544,129,31',//渤海
          yellowSea    : '35,358,584,13',//黄海
          eastSea      : '1,584,597,56',//东海
          southSea     : '25,578,522,85',//南海
          trawling     : '25,578,522,85',//拖网
          seine        : '25,578,522,85',//围网
          gillnet      : '25,578,522,85',//刺网
          net          : '25,578,522,85',//张网
          fishingTackle: '25,578,522,85',//钓具
          other        : '25,578,522,85'//其他
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
