<template>
    <!--    水产养殖面积-海水养殖面积-按养殖水域和养殖方式分-->
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
              title    : '海上',
              dataIndex: 'seaOn',
              key      : 'seaOn',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '滩涂',
              dataIndex: 'tidalFlats',
              key      : 'tidalFlats',
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
        },
        {
          title   : '按养殖方式分',
          children: [
            {
              title    : '池塘',
              dataIndex: 'pond',
              key      : 'pond',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '普通网箱',
              dataIndex: 'ordinaryCages',
              key      : 'ordinaryCages',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '深水网箱',
              dataIndex: 'deepWaterArea',
              key      : 'deepWaterArea',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '筏式',
              dataIndex: 'raft',
              key      : 'raft',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '吊笼',
              dataIndex: 'hoistingCage',
              key      : 'hoistingCage',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '底播',
              dataIndex: 'playDown',
              key      : 'playDown',
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
        url   : 'http://47.101.223.16:7066/aquacultureSeaAreaWay',
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
          seaOn        : '128,1544,129,31',//海上
          tidalFlats   : '35,358,584,13',//滩涂
          other        : '1,584,597,56',//其他
          pond         : '25,578,522,85',//池塘
          ordinaryCages: '25,578,522,85',//普通网箱
          deepWaterArea: '25,578,522,85',//深水网箱
          raft         : '25,578,522,85',//筏式
          hoistingCage : '25,578,522,85',//吊笼
          playDown     : '25,578,522,85',//底播
          factory      : '25,578,522,85'//工厂化
        })
      }
    }
  }
}
</script>
