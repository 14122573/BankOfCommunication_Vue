<template>
    <!--    水产品总产量-捕捞产品（海洋捕捞）-按捕捞品种分-->
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
              title    : '海鳗',
              dataIndex: 'eel',
              key      : 'eel',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鳓鱼',
              dataIndex: 'chineseHerring',
              key      : 'chineseHerring',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鳀鱼',
              dataIndex: 'anchovy',
              key      : 'anchovy',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '沙丁鱼',
              dataIndex: 'sardines',
              key      : 'sardines',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲱鱼',
              dataIndex: 'herring',
              key      : 'herring',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '石斑鱼',
              dataIndex: 'grouper',
              key      : 'grouper',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲷',
              dataIndex: 'bream',
              key      : 'bream',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '蓝圆鲹',
              dataIndex: 'blueCircleTrevally',
              key      : 'blueCircleTrevally',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '白姑鱼',
              dataIndex: 'whiteChineseCroaker',
              key      : 'whiteChineseCroaker',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '黄姑鱼',
              dataIndex: 'spottedMaigre',
              key      : 'spottedMaigre',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鮸鱼',
              dataIndex: 'mianFish',
              key      : 'mianFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '大黄鱼',
              dataIndex: 'bigYellowFish',
              key      : 'bigYellowFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '小黄鱼',
              dataIndex: 'smallYellowFish',
              key      : 'smallYellowFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '梅童鱼',
              dataIndex: 'babyCroaker',
              key      : 'babyCroaker',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '方头鱼',
              dataIndex: 'tilefish',
              key      : 'tilefish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '玉筋鱼',
              dataIndex: 'yuJinFish',
              key      : 'yuJinFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '带鱼',
              dataIndex: 'hairtail',
              key      : 'hairtail',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '金线鱼',
              dataIndex: 'goldFish',
              key      : 'goldFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '梭鱼',
              dataIndex: 'barracuda',
              key      : 'barracuda',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲐鱼',
              dataIndex: 'taiFish',
              key      : 'taiFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲅鱼',
              dataIndex: 'baFish',
              key      : 'baFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '金枪鱼',
              dataIndex: 'tuna',
              key      : 'tuna',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲳鱼',
              dataIndex: 'pomfret',
              key      : 'pomfret',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '马面鲀',
              dataIndex: 'horseFaceFish',
              key      : 'horseFaceFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '竹荚鱼',
              dataIndex: 'horseMackerel',
              key      : 'horseMackerel',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲻鱼',
              dataIndex: 'mullet',
              key      : 'mullet',
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
                  title    : '毛虾',
                  dataIndex: 'maoShrimp',
                  key      : 'maoShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '对虾',
                  dataIndex: 'duiShrimp',
                  key      : 'duiShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '鹰抓虾',
                  dataIndex: 'eagleShrimp',
                  key      : 'eagleShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '虾蛄',
                  dataIndex: 'mantisShrimp',
                  key      : 'mantisShrimp',
                  width    : 150,
                  align    : 'center'
                }
              ]
            },
            {
              title   : '蟹',
              children: [
                {
                  title    : '梭子蟹',
                  dataIndex: 'swimmingCrab',
                  key      : 'swimmingCrab',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '青蟹',
                  dataIndex: 'greenCrabs',
                  key      : 'greenCrabs',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '蟳',
                  dataIndex: 'xunCrabs',
                  key      : 'xunCrabs',
                  width    : 150,
                  align    : 'center'
                }
              ]
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
        }
        ,
        {
          title   : '头足类',
          children: [
            {
              title    : '合计',
              dataIndex: 'cephalopodsSum',
              key      : 'cephalopodsSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '乌贼',
              dataIndex: 'squid',
              key      : 'squid',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鱿鱼',
              dataIndex: 'youFish',
              key      : 'youFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '章鱼',
              dataIndex: 'octopus',
              key      : 'octopus',
              width    : 150,
              align    : 'center'
            }
          ]
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
        url   : this.$api.GET_DATA_ACSB_LIST,
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
          key                : i,
          year               : '2019',//年份
          area               : this.province[i].name,//区域
          sum                : '266,644,732,15',//总计
          fishSum            : '128,1544,129,31',//鱼类合计
          eel                : '35,358,584,13',//海鳗
          chineseHerring     : '1,584,597,56',//鳓鱼
          anchovy            : '25,578,522,85',//鳀鱼
          sardines           : '25,578,522,85',//沙丁鱼
          herring            : '25,578,522,85',//鲱鱼
          grouper            : '25,578,522,85',//石斑鱼
          bream              : '25,578,522,85',//鲷
          blueCircleTrevally : '25,578,522,85',//蓝圆鲹
          whiteChineseCroaker: '25,578,522,85',//白姑鱼
          spottedMaigre      : '25,578,522,85',//黄姑鱼
          mianFish           : '25,578,522,85',//鮸鱼
          bigYellowFish      : '25,578,522,85',//大黄鱼
          smallYellowFish    : '25,578,522,85',//小黄鱼
          babyCroaker        : '25,578,522,85',//梅童鱼
          tilefish           : '25,578,522,85',//方头鱼
          yuJinFish          : '25,578,522,85',//玉筋鱼
          hairtail           : '25,578,522,85',//带鱼
          goldFish           : '25,578,522,85',//金线鱼
          barracuda          : '25,578,522,85',//梭鱼
          taiFish            : '25,578,522,85',//鲐鱼
          baFish             : '25,578,522,85',//鲅鱼
          tuna               : '25,578,522,85',//金枪鱼
          pomfret            : '25,578,522,85',//鲳鱼
          horseFaceFish      : '25,578,522,85',//马面鲀
          horseMackerel      : '25,578,522,85',//竹荚鱼
          mullet             : '25,578,522,85',//鲻鱼
          crustaceansSum     : '25,578,522,85',//甲壳类合计

          shrimp      : '25,578,522,85',//虾
          maoShrimp   : '25,578,522,85',//毛虾
          duiShrimp   : '25,578,522,85',//对虾
          eagleShrimp : '25,578,522,85',//鹰抓虾
          mantisShrimp: '25,578,522,85',//虾蛄

          crabs       : '25,578,522,85',//蟹（河蟹）
          swimmingCrab: '25,578,522,85',//梭子蟹
          greenCrabs  : '25,578,522,85',//青蟹
          xunCrabs    : '25,578,522,85',//蟳

          shellfishSum: '25,578,522,85',//贝类总计

          algaeSum: '25,578,522,85',//藻类

          cephalopodsSum: '25,578,522,85',//头足类总计
          squid         : '25,578,522,85',//乌贼
          youFish       : '25,578,522,85',//鱿鱼
          octopus       : '25,578,522,85',//章鱼

          otherSum : '25,578,522,85',//其他类总计
          jellyfish: '25,578,522,85',//海蜇
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
