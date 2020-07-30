<template>
<!--    渔业人口与从业人口-->
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
          title    : '渔业乡（个）',
          dataIndex: 'fisheriesTownship',
          key      : 'fisheriesTownship',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '渔业村（个）',
          dataIndex: 'fisheriesVillage',
          key      : 'fisheriesVillage',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '渔业户（户）',
          dataIndex: 'fisheriesHouseholds',
          key      : 'fisheriesHouseholds',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '渔业人口（人）',
          children: [
            {
              title    : '合计',
              dataIndex: 'fisheryPopulation',
              key      : 'fisheryPopulation',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：传统渔民',
              dataIndex: 'traditionalFishermen',
              key      : 'traditionalFishermen',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '渔业从业人员（人）',
          children: [
            {
              title    : '合计',
              dataIndex: 'fisheriesPractitioner',
              key      : 'fisheriesPractitioner',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '专业从业人员',
              dataIndex: 'professionalPractitioners',
              key      : 'professionalPractitioners',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：女性',
              dataIndex: 'women',
              key      : 'women',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '捕捞',
              dataIndex: 'fishing',
              key      : 'fishing',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '养殖',
              dataIndex: 'farming',
              key      : 'farming',
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
              title    : '兼业从业人员',
              dataIndex: 'longTimePer',
              key      : 'longTimePer',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '临时从业人员',
              dataIndex: 'temporaryPer',
              key      : 'temporaryPer',
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
        url   : this.$api.GET_DATA_STAFF_LIST,
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
          key                      : i,
          year                     : '2019',//年份
          area                     : this.province[i].name,//区域
          sum                      : '266,644,732,15',//总计
          fisheriesTownship        : '266,644,732,15',//渔业乡（个）
          fisheriesVillage         : '128,1544,129,31',//渔业村（个）
          fisheriesHouseholds      : '35,358,584,13',//渔业户（户）
          fisheryPopulation        : '1,584,597,56',//渔业人口（人）
          traditionalFishermen     : '25,578,522,85',//其中：传统渔民
          fisheriesPractitioner    : '25,578,522,85',//渔业从业人员（人）
          professionalPractitioners: '25,578,522,85',//专业从业人员
          women                    : '25,578,522,85',//其中：女性
          fishing                  : '25,578,522,85',//捕捞
          farming                  : '25,578,522,85',//养殖
          other                    : '25,578,522,85',//其他
          longTimePer              : '25,578,522,85',//兼业从业人员
          temporaryPer             : '25,578,522,85'//临时从业人员
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

