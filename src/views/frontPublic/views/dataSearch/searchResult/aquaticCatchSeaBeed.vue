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
              title    : '海鳗',
              dataIndex: 'eel',
              key      : 'eel',
              width    : 200
            },
            {
              title    : '鳓鱼',
              dataIndex: 'chineseHerring',
              key      : 'chineseHerring',
              width    : 100
            },
            {
              title    : '鳀鱼',
              dataIndex: 'anchovy',
              key      : 'anchovy',
              width    : 100
            },
            {
              title    : '沙丁鱼',
              dataIndex: 'sardines',
              key      : 'sardines',
              width    : 100
            },
            {
              title    : '鲱鱼',
              dataIndex: 'herring',
              key      : 'herring',
              width    : 100
            },
            {
              title    : '石斑鱼',
              dataIndex: 'grouper',
              key      : 'grouper',
              width    : 100
            }
            ,
            {
              title    : '鲷',
              dataIndex: 'bream',
              key      : 'bream',
              width    : 100
            }
            ,
            {
              title    : '蓝圆鲹',
              dataIndex: 'blueCircleTrevally',
              key      : 'blueCircleTrevally',
              width    : 100
            }
            ,
            {
              title    : '白姑鱼',
              dataIndex: 'whiteChineseCroaker',
              key      : 'whiteChineseCroaker',
              width    : 100
            }
            ,
            {
              title    : '黄姑鱼',
              dataIndex: 'spottedMaigre',
              key      : 'spottedMaigre',
              width    : 100
            },
            {
              title    : '鮸鱼',
              dataIndex: 'mianFish',
              key      : 'mianFish',
              width    : 200
            },
            {
              title    : '大黄鱼',
              dataIndex: 'bigYellowFish',
              key      : 'bigYellowFish',
              width    : 100
            },
            {
              title    : '小黄鱼',
              dataIndex: 'smallYellowFish',
              key      : 'smallYellowFish',
              width    : 100
            },
            {
              title    : '梅童鱼',
              dataIndex: 'babyCroaker',
              key      : 'babyCroaker',
              width    : 100
            },
            {
              title    : '方头鱼',
              dataIndex: 'tilefish',
              key      : 'tilefish',
              width    : 100
            },
            {
              title    : '玉筋鱼',
              dataIndex: 'yuJinFish',
              key      : 'yuJinFish',
              width    : 100
            }
            ,
            {
              title    : '带鱼',
              dataIndex: 'hairtail',
              key      : 'hairtail',
              width    : 100
            }
            ,
            {
              title    : '金线鱼',
              dataIndex: 'goldFish',
              key      : 'goldFish',
              width    : 100
            }
            ,
            {
              title    : '梭鱼',
              dataIndex: 'barracuda',
              key      : 'barracuda',
              width    : 100
            }
            ,
            {
              title    : '鲐鱼',
              dataIndex: 'taiFish',
              key      : 'taiFish',
              width    : 100
            },
            {
              title    : '鲅鱼',
              dataIndex: 'baFish',
              key      : 'baFish',
              width    : 100
            }
            ,
            {
              title    : '金枪鱼',
              dataIndex: 'tuna',
              key      : 'tuna',
              width    : 100
            }
            ,
            {
              title    : '鲳鱼',
              dataIndex: 'pomfret',
              key      : 'pomfret',
              width    : 100
            }
            ,
            {
              title    : '马面鲀',
              dataIndex: 'horseFaceFish',
              key      : 'horseFaceFish',
              width    : 100
            }
            ,
            {
              title    : '竹荚鱼',
              dataIndex: 'horseMackerel',
              key      : 'horseMackerel',
              width    : 100
            }
            ,
            {
              title    : '鲻鱼',
              dataIndex: 'mullet',
              key      : 'mullet',
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
                  title    : '毛虾',
                  dataIndex: 'maoShrimp',
                  key      : 'maoShrimp',
                  width    : 150
                },
                {
                  title    : '对虾',
                  dataIndex: 'duiShrimp',
                  key      : 'duiShrimp',
                  width    : 120
                },
                {
                  title    : '鹰抓虾',
                  dataIndex: 'eagleShrimp',
                  key      : 'eagleShrimp',
                  width    : 100
                },
                {
                  title    : '虾蛄',
                  dataIndex: 'mantisShrimp',
                  key      : 'mantisShrimp',
                  width    : 100
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
                  width    : 150
                },
                {
                  title    : '青蟹',
                  dataIndex: 'greenCrabs',
                  key      : 'greenCrabs',
                  width    : 120
                },
                {
                  title    : '蟳',
                  dataIndex: 'xunCrabs',
                  key      : 'xunCrabs',
                  width    : 100
                }
              ]
            }
          ]
        },
        {
          title    : '贝类',
          dataIndex: 'shellfishSum',
          key      : 'shellfishSum',
          width    : 100
        },
        {
          title    : '藻类',
          dataIndex: 'algaeSum',
          key      : 'algaeSum',
          width    : 100
        }
        ,
        {
          title   : '头足类',
          children: [
            {
              title    : '合计',
              dataIndex: 'cephalopodsSum',
              key      : 'cephalopodsSum',
              width    : 100
            },
            {
              title    : '乌贼',
              dataIndex: 'squid',
              key      : 'squid',
              width    : 100
            },
            {
              title    : '鱿鱼',
              dataIndex: 'youFish',
              key      : 'youFish',
              width    : 120
            },
            {
              title    : '章鱼',
              dataIndex: 'octopus',
              key      : 'octopus',
              width    : 100
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
              width    : 100
            },
            {
              title    : '海蜇',
              dataIndex: 'jellyfish',
              key      : 'jellyfish',
              width    : 100
            }
          ]
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

