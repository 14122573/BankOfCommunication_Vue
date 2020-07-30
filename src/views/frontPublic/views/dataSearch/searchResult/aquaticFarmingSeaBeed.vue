<template>
    <!--    水产品总产量-养殖产品（海水养殖）-按养殖品种分-->
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
          title   : '鱼类',
          children: [
            {
              title    : '合计',
              dataIndex: 'fishSum',
              key      : 'fishSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲈鱼',
              dataIndex: 'bass',
              key      : 'bass',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲆鱼',
              dataIndex: 'bastardHalibut',
              key      : 'bastardHalibut',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '大黄鱼',
              dataIndex: 'yellowFish',
              key      : 'yellowFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '军曹鱼',
              dataIndex: 'cobia',
              key      : 'cobia',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鰤鱼',
              dataIndex: 'shad',
              key      : 'shad',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲷鱼',
              dataIndex: 'snapper',
              key      : 'snapper',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '美国红鱼',
              dataIndex: 'redFish',
              key      : 'redFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '河鲀',
              dataIndex: 'pufferfish',
              key      : 'pufferfish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '石斑鱼',
              dataIndex: 'grouper',
              key      : 'grouper',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲽鱼',
              dataIndex: 'flatfish',
              key      : 'flatfish',
              width    : 150,
              align    : 'center'
            }
          ]
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
              title   : '虾',
              children: [
                {
                  title    : '其中：南美白对虾',
                  dataIndex: 'southAmericanShrimp',
                  key      : 'southAmericanShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '斑节对虾',
                  dataIndex: 'spotSectionPrawns',
                  key      : 'spotSectionPrawns',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '中国对虾',
                  dataIndex: 'penaeusChinensis',
                  key      : 'penaeusChinensis',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '日本对虾',
                  dataIndex: 'japprawn',
                  key      : 'japprawn',
                  width    : 150,
                  align    : 'center'
                }
              ]
            },
            {
              title   : '蟹',
              children: [
                {
                  title    : '其中：梭子蟹',
                  dataIndex: 'swimmingCrab',
                  key      : 'swimmingCrab',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '青蟹',
                  dataIndex: 'greenCrab',
                  key      : 'greenCrab',
                  width    : 150,
                  align    : 'center'
                }
              ]
            }
          ]
        },
        {
          title   : '贝类',
          children: [
            {
              title    : '合计',
              dataIndex: 'shellfishSum',
              key      : 'shellfishSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：牡蛎',
              dataIndex: 'oysters',
              key      : 'oysters',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲍',
              dataIndex: 'bao',
              key      : 'bao',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '螺',
              dataIndex: 'screw',
              key      : 'screw',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '蚶',
              dataIndex: 'cockle',
              key      : 'cockle',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '贻贝',
              dataIndex: 'mussels',
              key      : 'mussels',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '江珧',
              dataIndex: 'jiangYao',
              key      : 'jiangYao',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '扇贝',
              dataIndex: 'scallops',
              key      : 'scallops',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '蛤',
              dataIndex: 'clam',
              key      : 'clam',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '蛏',
              dataIndex: 'respectively',
              key      : 'respectively',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '藻类',
          children: [
            {
              title    : '合计',
              dataIndex: 'algaeSum',
              key      : 'algaeSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：海带',
              dataIndex: 'kelp',
              key      : 'kelp',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '裙带菜',
              dataIndex: 'wakame',
              key      : 'wakame',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '紫菜',
              dataIndex: 'nori',
              key      : 'nori',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '江蓠',
              dataIndex: 'gracilaria',
              key      : 'gracilaria',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '麒麟菜',
              dataIndex: 'eucheuma',
              key      : 'eucheuma',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '石花菜',
              dataIndex: 'agarWeed',
              key      : 'agarWeed',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '羊栖菜',
              dataIndex: 'sheepFood',
              key      : 'sheepFood',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '苔菜',
              dataIndex: 'greenMoss',
              key      : 'greenMoss',
              width    : 150,
              align    : 'center'
            }
          ]
        }
        ,
        {
          title   : '其他',
          children: [
            {
              title    : '合计',
              dataIndex: 'otherSum',
              key      : 'otherSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中：海参',
              dataIndex: 'seaCucumber',
              key      : 'seaCucumber',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海胆',
              dataIndex: 'seaUrchin',
              key      : 'seaUrchin',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海水珍珠',
              dataIndex: 'seawaterPearl',
              key      : 'seawaterPearl',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海蜇',
              dataIndex: 'jellyfish',
              key      : 'jellyfish',
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
        url   : this.$api.GET_DATA_AFSB_LIST,
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
          fishSum            : '128,1544,129,31',//鱼类合计
          bass               : '35,358,584,13',//鲈鱼
          bastardHalibut     : '1,584,597,56',//鲆鱼
          yellowFish         : '25,578,522,85',//大黄鱼
          cobia              : '25,578,522,85',//军曹鱼
          shad               : '25,578,522,85',//鰤鱼
          snapper            : '25,578,522,85',//鲷鱼
          redFish            : '25,578,522,85',//美国红鱼
          pufferfish         : '25,578,522,85',//河鲀
          grouper            : '25,578,522,85',//石斑鱼
          flatfish           : '25,578,522,85',//鲽鱼
          crustaceansSum     : '25,578,522,85',//甲壳类合计
          southAmericanShrimp: '25,578,522,85',//南美白对虾
          spotSectionPrawns  : '25,578,522,85',//斑节对虾
          penaeusChinensis   : '25,578,522,85',//中国对虾
          japprawn           : '25,578,522,85',//日本对虾
          swimmingCrab       : '25,578,522,85',//梭子蟹
          greenCrab          : '25,578,522,85',//青蟹
          shellfishSum       : '25,578,522,85',//贝类合计
          oysters            : '25,578,522,85',//牡蛎
          bao                : '25,578,522,85',//鲍
          screw              : '25,578,522,85',//螺
          cockle             : '25,578,522,85',//蚶
          mussels            : '25,578,522,85',//贻贝
          jiangYao           : '25,578,522,85',//江珧
          scallops           : '25,578,522,85',//扇贝
          clam               : '25,578,522,85',//蛤
          respectively       : '25,578,522,85',//蛏
          algaeSum           : '25,578,522,85',//藻类合计
          kelp               : '25,578,522,85',//海带
          wakame             : '25,578,522,85',//裙带菜
          nori               : '25,578,522,85',//紫菜
          gracilaria         : '25,578,522,85',//江蓠
          eucheuma           : '25,578,522,85',//麒麟菜
          agarWeed           : '25,578,522,85',//石花菜
          sheepFood          : '25,578,522,85',//羊栖菜
          greenMoss          : '25,578,522,85',//苔菜
          otherSum           : '25,578,522,85',//其他合计
          seaCucumber        : '25,578,522,85',//海参
          seaUrchin          : '25,578,522,85',//海胆
          seawaterPearl      : '25,578,522,85',//海水珍珠
          jellyfish          : '25,578,522,85'//海蜇
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
