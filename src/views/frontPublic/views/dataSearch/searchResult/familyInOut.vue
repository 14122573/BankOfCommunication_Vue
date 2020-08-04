<template>
<!--    渔民家庭收支-->
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
          title    : '渔民人均纯收入',
          dataIndex: 'perCapitaIncome',
          key      : 'perCapitaIncome',
          width    : 150,
          fixed    : 'left',
          align    : 'center'
        },
        {
          title   : '家庭总收入',
          children: [
            {
              title    : '合计',
              dataIndex: 'familyIncome',
              key      : 'familyIncome',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '家庭经营收入',
              dataIndex: 'familyBusinessIncome',
              key      : 'familyBusinessIncome',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：经营渔业',
              dataIndex: 'operateFishery',
              key      : 'operateFishery',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '工资性收入',
              dataIndex: 'wageIncome',
              key      : 'wageIncome',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：渔业',
              dataIndex: 'fisheries',
              key      : 'fisheries',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '财产性净收入',
              dataIndex: 'netPropertyIncome',
              key      : 'netPropertyIncome',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：红利',
              dataIndex: 'dividend',
              key      : 'dividend',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '转让经营权租金收入',
              dataIndex: 'transferBusinessIncome',
              key      : 'transferBusinessIncome',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '转移性收入',
              dataIndex: 'transferIncome',
              key      : 'transferIncome',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '其中：社会救济或政策性生活补贴',
              dataIndex: 'livingAllowances',
              key      : 'livingAllowances',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '其他转移性收入',
              dataIndex: 'otherTransferIncome',
              key      : 'otherTransferIncome',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '生产补贴（惠农补贴）',
              dataIndex: 'productionSubsidies',
              key      : 'productionSubsidies',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '其中：渔业补贴',
              dataIndex: 'fisheriesSubsidies',
              key      : 'fisheriesSubsidies',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '家庭经营费用支出',
          children: [
            {
              title    : '合计',
              dataIndex: 'familySpending',
              key      : 'familySpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：经营渔业支出',
              dataIndex: 'operateFisherySpending',
              key      : 'operateFisherySpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '燃料及冰费用',
              dataIndex: 'fuelSpending',
              key      : 'fuelSpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '雇工费用',
              dataIndex: 'employeesSpending',
              key      : 'employeesSpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '饲料及苗种费用',
              dataIndex: 'frySpending',
              key      : 'frySpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他费用',
              dataIndex: 'otherSpending',
              key      : 'otherSpending',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '生产性固定资产折旧',
          children: [
            {
              title    : '合计',
              dataIndex: 'productionDepreciation',
              key      : 'productionDepreciation',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：渔业固定资产折旧',
              dataIndex: 'fisheriesDepreciation',
              key      : 'fisheriesDepreciation',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '税费支出',
          children: [
            {
              title    : '合计',
              dataIndex: 'taxSpending',
              key      : 'taxSpending',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：渔业税费支出',
              dataIndex: 'fisheriesTaxSpending',
              key      : 'fisheriesTaxSpending',
              width    : 150,
              align    : 'center'
            }
          ]
        }
        ,
        {
          title    : '转移性支出',
          dataIndex: 'transferSpending',
          key      : 'transferSpending',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '纯收入',
          children: [
            {
              title    : '合计',
              dataIndex: 'netIncome',
              key      : 'netIncome',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：渔业收入',
              dataIndex: 'fisheryIncome',
              key      : 'fisheryIncome',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title    : '可支配收入',
          dataIndex: 'disposableIncome',
          key      : 'disposableIncome',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '生活消费支出',
          dataIndex: 'livingSpending',
          key      : 'livingSpending',
          width    : 150,
          align    : 'center'
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
  mounted() {
    console.log(2323)
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
        url   : this.$api.GET_DATA_FIO_LIST,
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
          key                   : i,
          year                  : '2019',//年份
          area                  : this.province[i].name,//区域
          sum                   : '266,644,732,15',//总计
          perCapitaIncome       : '266,644,732,15',//渔民人均纯收入
          familyIncome          : '128,1544,129,31',//家庭总收入
          familyBusinessIncome  : '35,358,584,13',//家庭经营收入
          operateFishery        : '1,584,597,56',//其中：经营渔业
          wageIncome            : '25,578,522,85',//工资性收入
          fisheries             : '25,578,522,85',//其中：渔业
          netPropertyIncome     : '25,578,522,85',//财产性净收入
          dividend              : '25,578,522,85',//其中：红利
          transferBusinessIncome: '25,578,522,85',//转让经营权租金收入
          transferIncome        : '25,578,522,85',//转移性收入
          livingAllowances      : '25,578,522,85',//其中：社会救济或政策性生活补贴
          otherTransferIncome   : '25,578,522,85',//其他转移性收入
          productionSubsidies   : '25,578,522,85',//生产补贴（惠农补贴）
          fisheriesSubsidies    : '25,578,522,85',//其中：渔业补贴
          familySpending        : '25,578,522,85',//家庭经营费用支出
          operateFisherySpending: '25,578,522,85',//其中：经营渔业支出
          fuelSpending          : '25,578,522,85',//燃料及冰费用
          employeesSpending     : '25,578,522,85',//雇工费用
          frySpending           : '25,578,522,85',//饲料及苗种费用
          otherSpending         : '25,578,522,85',//其他费用
          productionDepreciation: '25,578,522,85',//生产性固定资产折旧
          fisheriesDepreciation : '25,578,522,85',//其中：渔业固定资产折旧
          taxSpending           : '25,578,522,85',//税费支出
          fisheriesTaxSpending  : '25,578,522,85',//其中：渔业税费支出
          transferSpending      : '25,578,522,85',//转移性支出
          netIncome             : '25,578,522,85',//纯收入
          fisheryIncome         : '25,578,522,85',//其中：渔业收入
          disposableIncome      : '25,578,522,85',//可支配收入
          livingSpending        : '25,578,522,85',//生活消费支出
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
