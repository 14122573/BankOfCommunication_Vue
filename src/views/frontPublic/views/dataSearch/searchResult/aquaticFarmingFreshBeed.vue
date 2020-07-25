<template>
    <!--    水产品总产量-养殖产品（淡水养殖）-按养殖品种分-->
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
              title    : '青鱼',
              dataIndex: 'herring',
              key      : 'herring',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '草鱼',
              dataIndex: 'grassCarp',
              key      : 'grassCarp',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲢鱼',
              dataIndex: 'silverCarp',
              key      : 'silverCarp',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鳙鱼',
              dataIndex: 'aristichthysNobilis',
              key      : 'aristichthysNobilis',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲤鱼',
              dataIndex: 'carp',
              key      : 'carp',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲫鱼',
              dataIndex: 'crucianCarp',
              key      : 'crucianCarp',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鳊鲂',
              dataIndex: 'parabramisPut',
              key      : 'parabramisPut',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '泥鳅',
              dataIndex: 'loach',
              key      : 'loach',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲇鱼',
              dataIndex: 'catfish',
              key      : 'catfish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鮰鱼',
              dataIndex: 'huifish',
              key      : 'huifish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '黄颡鱼',
              dataIndex: 'yellowSangFish',
              key      : 'yellowSangFish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲑鱼',
              dataIndex: 'salmon',
              key      : 'salmon',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鳟鱼',
              dataIndex: 'trout',
              key      : 'trout',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '河鲀',
              dataIndex: 'pufferfish',
              key      : 'pufferfish',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '短盖巨脂鲤',
              dataIndex: 'giantTetraShortCover',
              key      : 'giantTetraShortCover',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '长吻鮠',
              dataIndex: 'longKissWei',
              key      : 'longKissWei',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '黄鳝',
              dataIndex: 'eel',
              key      : 'eel',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鳜鱼',
              dataIndex: 'mandarinFish',
              key      : 'mandarinFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '池沼公鱼',
              dataIndex: 'mereMaleFish',
              key      : 'mereMaleFish',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '银鱼',
              dataIndex: 'whitebait',
              key      : 'whitebait',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鲈鱼',
              dataIndex: 'bass',
              key      : 'bass',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '乌鳢',
              dataIndex: 'snakehead',
              key      : 'snakehead',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '罗非鱼',
              dataIndex: 'tilapia',
              key      : 'tilapia',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鲟鱼',
              dataIndex: 'sturgeon',
              key      : 'sturgeon',
              width    : 150,
              align    : 'center'
            }
            ,
            {
              title    : '鳗鲡',
              dataIndex: 'eels',
              key      : 'eels',
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
                  title    : '罗氏沼虾',
                  dataIndex: 'rocheSpermatogenesis',
                  key      : 'rocheSpermatogenesis',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '青虾',
                  dataIndex: 'greenShrimp',
                  key      : 'greenShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '克氏原螯虾',
                  dataIndex: 'procambarusClarkii',
                  key      : 'procambarusClarkii',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '南美白对虾',
                  dataIndex: 'whiteShrimp',
                  key      : 'whiteShrimp',
                  width    : 150,
                  align    : 'center'
                },
                {
                  title    : '蟹（河蟹）',
                  dataIndex: 'crabs',
                  key      : 'crabs',
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
              title    : '河蚌',
              dataIndex: 'mussels',
              key      : 'mussels',
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
              title    : '蚬',
              dataIndex: 'clam',
              key      : 'clam',
              width    : 150,
              align    : 'center'
            }
          ]
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
              title    : '龟',
              dataIndex: 'turtle',
              key      : 'turtle',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '鳖',
              dataIndex: 'bie',
              key      : 'bie',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '蛙',
              dataIndex: 'frog',
              key      : 'frog',
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
          title    : '观赏鱼',
          dataIndex: 'ornamentalFish',
          key      : 'ornamentalFish',
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
        url   : this.$api.GET_DATA_AFFB_LIST,
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
          key                 : i,
          year                : '2019',//年份
          area                : this.province[i].name,//区域
          sum                 : '266,644,732,15',//总计
          fishSum             : '128,1544,129,31',//鱼类合计
          herring             : '35,358,584,13',//青鱼
          grassCarp           : '1,584,597,56',//草鱼
          silverCarp          : '25,578,522,85',//鲢鱼
          aristichthysNobilis : '25,578,522,85',//鳙鱼
          carp                : '25,578,522,85',//鲤鱼
          crucianCarp         : '25,578,522,85',//鲫鱼
          parabramisPut       : '25,578,522,85',//鳊鲂
          loach               : '25,578,522,85',//泥鳅
          catfish             : '25,578,522,85',//鲇鱼
          huifish             : '25,578,522,85',//鮰鱼
          yellowSangFish      : '25,578,522,85',//黄颡鱼
          salmon              : '25,578,522,85',//鲑鱼
          trout               : '25,578,522,85',//鳟鱼
          pufferfish          : '25,578,522,85',//河鲀
          giantTetraShortCover: '25,578,522,85',//短盖巨脂鲤
          longKissWei         : '25,578,522,85',//长吻鮠
          eel                 : '25,578,522,85',//黄鳝
          mandarinFish        : '25,578,522,85',//鳜鱼
          mereMaleFish        : '25,578,522,85',//池沼公鱼
          whitebait           : '25,578,522,85',//银鱼
          bass                : '25,578,522,85',//鲈鱼
          snakehead           : '25,578,522,85',//乌鳢
          tilapia             : '25,578,522,85',//罗非鱼
          sturgeon            : '25,578,522,85',//鲟鱼
          eels                : '25,578,522,85',//鳗鲡
          crustaceansSum      : '25,578,522,85',//甲壳类合计
          shrimp              : '25,578,522,85',//虾
          rocheSpermatogenesis: '25,578,522,85',//罗氏沼虾
          greenShrimp         : '25,578,522,85',//青虾
          procambarusClarkii  : '25,578,522,85',//克氏原螯虾
          whiteShrimp         : '25,578,522,85',//南美白对虾
          crabs               : '25,578,522,85',//蟹（河蟹）
          shellfishSum        : '25,578,522,85',//贝类总计
          mussels             : '25,578,522,85',//河蚌
          screw               : '25,578,522,85',//螺
          clam                : '25,578,522,85',//蚬
          algaeSum            : '25,578,522,85',//藻类（螺旋藻）总计
          otherSum            : '25,578,522,85',//其他类总计
          turtle              : '25,578,522,85',//龟
          bie                 : '25,578,522,85',//鳖
          frog                : '25,578,522,85',//蛙
          pearl               : '25,578,522,85',//珍珠
          ornamentalFish      : '25,578,522,85'//观赏鱼总计
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
