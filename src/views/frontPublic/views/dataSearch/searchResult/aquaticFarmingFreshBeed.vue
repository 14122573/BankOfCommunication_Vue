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
  mounted() {
    this.fetchData()
  },
  data() {
    return {
      dataList: [],
      province: [
        {
          name: '北京市',
          id  : '110000000000'
        },
        {
          name: '天津市',
          id  : '120000000000'
        },
        {
          name: '河北省',
          id  : '130000000000'
        },
        {
          name: '山西省',
          id  : '140000000000'
        },
        {
          name: '内蒙古自治区',
          id  : '150000000000'
        },
        {
          name: '辽宁省',
          id  : '210000000000'
        },
        {
          name: '吉林省',
          id  : '220000000000'
        },
        {
          name: '黑龙江省',
          id  : '230000000000'
        },
        {
          name: '上海市',
          id  : '310000000000'
        },
        {
          name: '江苏省',
          id  : '320000000000'
        },
        {
          name: '浙江省',
          id  : '330000000000'
        },
        {
          name: '安徽省',
          id  : '340000000000'
        },
        {
          name: '福建省',
          id  : '350000000000'
        },
        {
          name: '江西省',
          id  : '360000000000'
        },
        {
          name: '山东省',
          id  : '370000000000'
        },
        {
          name: '河南省',
          id  : '410000000000'
        },
        {
          name: '湖北省',
          id  : '420000000000'
        },
        {
          name: '湖南省',
          id  : '430000000000'
        },
        {
          name: '广东省',
          id  : '440000000000'
        },
        {
          name: '广西壮族自治区',
          id  : '450000000000'
        },
        {
          name: '海南省',
          id  : '460000000000'
        },
        {
          name: '重庆市',
          id  : '500000000000'
        },
        {
          name: '四川省',
          id  : '510000000000'
        },
        {
          name: '贵州省',
          id  : '520000000000'
        },
        {
          name: '云南省',
          id  : '530000000000'
        },
        {
          name: '西藏自治区',
          id  : '540000000000'
        },
        {
          name: '陕西省',
          id  : '610000000000'
        },
        {
          name: '甘肃省',
          id  : '620000000000'
        },
        {
          name: '青海省',
          id  : '630000000000'
        },
        {
          name: '宁夏回族自治区',
          id  : '640000000000'
        },
        {
          name: '新疆维吾尔自治区',
          id  : '650000000000'
        }
      ],
      columns: [
        {
          title    : '年份',
          dataIndex: 'year',
          key      : 'year',
          width    : 120,
          fixed    : 'left'
        },
        {
          title    : '区域',
          dataIndex: 'area',
          key      : 'area',
          width    : 100,
          fixed    : 'left'
        },
        {
          title    : '总计',
          dataIndex: 'sum',
          key      : 'sum',
          width    : 150,
          fixed    : 'left'
        },
        {
          title   : '鱼类',
          children: [
            {
              title    : '合计',
              dataIndex: 'fishSum',
              key      : 'fishSum',
              width    : 200
            },
            {
              title    : '青鱼',
              dataIndex: 'herring',
              key      : 'herring',
              width    : 200
            },
            {
              title    : '草鱼',
              dataIndex: 'grassCarp',
              key      : 'grassCarp',
              width    : 100
            },
            {
              title    : '鲢鱼',
              dataIndex: 'silverCarp',
              key      : 'silverCarp',
              width    : 100
            },
            {
              title    : '鳙鱼',
              dataIndex: 'aristichthysNobilis',
              key      : 'aristichthysNobilis',
              width    : 100
            },
            {
              title    : '鲤鱼',
              dataIndex: 'carp',
              key      : 'carp',
              width    : 100
            },
            {
              title    : '鲫鱼',
              dataIndex: 'crucianCarp',
              key      : 'crucianCarp',
              width    : 100
            }
            ,
            {
              title    : '鳊鲂',
              dataIndex: 'parabramisPut',
              key      : 'parabramisPut',
              width    : 100
            }
            ,
            {
              title    : '泥鳅',
              dataIndex: 'loach',
              key      : 'loach',
              width    : 100
            }
            ,
            {
              title    : '鲇鱼',
              dataIndex: 'catfish',
              key      : 'catfish',
              width    : 100
            }
            ,
            {
              title    : '鮰鱼',
              dataIndex: 'huifish',
              key      : 'huifish',
              width    : 100
            },
            {
              title    : '黄颡鱼',
              dataIndex: 'yellowSangFish',
              key      : 'yellowSangFish',
              width    : 200
            },
            {
              title    : '鲑鱼',
              dataIndex: 'salmon',
              key      : 'salmon',
              width    : 100
            },
            {
              title    : '鳟鱼',
              dataIndex: 'trout',
              key      : 'trout',
              width    : 100
            },
            {
              title    : '河鲀',
              dataIndex: 'pufferfish',
              key      : 'pufferfish',
              width    : 100
            },
            {
              title    : '短盖巨脂鲤',
              dataIndex: 'GiantTetraShortCover',
              key      : 'GiantTetraShortCover',
              width    : 100
            },
            {
              title    : '长吻鮠',
              dataIndex: 'longKissWei',
              key      : 'longKissWei',
              width    : 100
            }
            ,
            {
              title    : '黄鳝',
              dataIndex: 'eel',
              key      : 'eel',
              width    : 100
            }
            ,
            {
              title    : '鳜鱼',
              dataIndex: 'mandarinFish',
              key      : 'mandarinFish',
              width    : 100
            }
            ,
            {
              title    : '池沼公鱼',
              dataIndex: 'mereMaleFish',
              key      : 'mereMaleFish',
              width    : 100
            }
            ,
            {
              title    : '银鱼',
              dataIndex: 'whitebait',
              key      : 'whitebait',
              width    : 100
            },
            {
              title    : '鲈鱼',
              dataIndex: 'bass',
              key      : 'bass',
              width    : 100
            }
            ,
            {
              title    : '乌鳢',
              dataIndex: 'snakehead',
              key      : 'snakehead',
              width    : 100
            }
            ,
            {
              title    : '罗非鱼',
              dataIndex: 'tilapia',
              key      : 'tilapia',
              width    : 100
            }
            ,
            {
              title    : '鲟鱼',
              dataIndex: 'sturgeon',
              key      : 'sturgeon',
              width    : 100
            }
            ,
            {
              title    : '鳗鲡',
              dataIndex: 'eels',
              key      : 'eels',
              width    : 100
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
              width    : 100
            },
            {
              title   : '虾',
              children: [
                {
                  title    : '罗氏沼虾',
                  dataIndex: 'rocheSpermatogenesis',
                  key      : 'rocheSpermatogenesis',
                  width    : 150
                },
                {
                  title    : '青虾',
                  dataIndex: 'greenShrimp',
                  key      : 'greenShrimp',
                  width    : 120
                },
                {
                  title    : '克氏原螯虾',
                  dataIndex: 'procambarusClarkii',
                  key      : 'procambarusClarkii',
                  width    : 100
                },
                {
                  title    : '南美白对虾',
                  dataIndex: 'WhiteShrimp',
                  key      : 'WhiteShrimp',
                  width    : 100
                },
                {
                  title    : '蟹（河蟹）',
                  dataIndex: 'crabs',
                  key      : 'crabs',
                  width    : 100
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
              width    : 100
            },
            {
              title    : '河蚌',
              dataIndex: 'mussels',
              key      : 'mussels',
              width    : 100
            },
            {
              title    : '螺',
              dataIndex: 'screw',
              key      : 'screw',
              width    : 120
            },
            {
              title    : '蚬',
              dataIndex: 'clam',
              key      : 'clam',
              width    : 100
            }
          ]
        },
        {
          title    : '藻类',
          dataIndex: 'algaeSum',
          key      : 'algaeSum',
          width    : 100
        }
        ,
        {
          title   : '其他',
          children: [
            {
              title    : '合计',
              dataIndex: 'otherSum',
              key      : 'otherSum',
              width    : 100
            },
            {
              title    : '龟',
              dataIndex: 'turtle',
              key      : 'turtle',
              width    : 100
            },
            {
              title    : '鳖',
              dataIndex: 'bie',
              key      : 'bie',
              width    : 120
            },
            {
              title    : '蛙',
              dataIndex: 'frog',
              key      : 'frog',
              width    : 100
            },
            {
              title    : '珍珠',
              dataIndex: 'pearl',
              key      : 'pearl',
              width    : 100
            }
          ]
        },
        {
          title    : '观赏鱼',
          dataIndex: 'ornamentalFish',
          key      : 'ornamentalFish',
          width    : 100
        }
      ]
    }
  },
  methods: {
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
          GiantTetraShortCover: '25,578,522,85',//短盖巨脂鲤
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
          WhiteShrimp         : '25,578,522,85',//南美白对虾
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

