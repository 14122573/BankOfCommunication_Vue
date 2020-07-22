<template>
<!--    水产品加工-水产加工品总量-->
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
              title    : '合计',
              dataIndex: 'aquaticRepqir',
              key      : 'aquaticRepqir',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '淡水加工品',
              dataIndex: 'freshRepqir',
              key      : 'freshRepqir',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海水加工品',
              dataIndex: 'seaRepqir',
              key      : 'seaRepqir',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '水产冷冻品',
          children: [
            {
              title    : '合计',
              dataIndex: 'aquaticFrozen',
              key      : 'aquaticFrozen',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '冷冻品',
              dataIndex: 'frozen',
              key      : 'frozen',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '冷冻加工品',
              dataIndex: 'frozenRepqir',
              key      : 'frozenRepqir',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '鱼糜制品及干腌制品',
          children: [
            {
              title    : '合计',
              dataIndex: 'mincedFishAndDrySalted',
              key      : 'mincedFishAndDrySalted',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鱼糜制品',
              dataIndex: 'mincedFish',
              key      : 'mincedFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '干腌制品',
              dataIndex: 'drySalted',
              key      : 'drySalted',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title    : '藻类加工品',
          dataIndex: 'algaeRepqir',
          key      : 'algaeRepqir',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '罐制品',
          dataIndex: 'tinProducts',
          key      : 'tinProducts',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '鱼粉',
          dataIndex: 'fishMeal',
          key      : 'fishMeal',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '鱼油制品',
          dataIndex: 'fishOilProducts',
          key      : 'fishOilProducts',
          width    : 150,
          align    : 'center'
        },
        {
          title   : '其他水产加工品',
          children: [
            {
              title    : '合计',
              dataIndex: 'otherAquaticProducts',
              key      : 'otherAquaticProducts',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：助剂和添加剂',
              dataIndex: 'additive',
              key      : 'additive',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '珍珠',
              dataIndex: 'pearl',
              key      : 'pearl',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '用于加工的水产品量',
          children: [
            {
              title    : '合计',
              dataIndex: 'processAquatic',
              key      : 'processAquatic',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '淡水产品',
              dataIndex: 'freshProduct',
              key      : 'freshProduct',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海水产品',
              dataIndex: 'seaProduct',
              key      : 'seaProduct',
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
        url   : 'http://47.101.223.16:7066/aquaticRepairSum',
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
          aquaticRepqir         : '266,644,732,15',//水产品加工产量
          freshRepqir           : '128,1544,129,31',//淡水加工品
          seaRepqir             : '35,358,584,13',//海水加工品
          aquaticFrozen         : '1,584,597,56',//水产冷冻品
          frozen                : '25,578,522,85',//冷冻品
          frozenRepqir          : '25,578,522,85',//冷冻加工品
          mincedFishAndDrySalted: '25,578,522,85',//鱼糜制品及干腌制品
          mincedFish            : '25,578,522,85',//鱼糜制品
          drySalted             : '25,578,522,85',//干腌制品
          algaeRepqir           : '25,578,522,85',//藻类加工品
          tinProducts           : '25,578,522,85',//罐制品
          fishMeal              : '25,578,522,85',//鱼粉
          fishOilProducts       : '25,578,522,85',//鱼油制品
          otherAquaticProducts  : '25,578,522,85',//其他水产加工品
          additive              : '25,578,522,85',//其中：助剂和添加剂
          pearl                 : '25,578,522,85',//珍珠
          processAquatic        : '25,578,522,85',//用于加工的水产品量
          freshProduct          : '25,578,522,85',//淡水产品
          seaProduct            : '25,578,522,85',//海水产品

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

