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
              title    : '鲈鱼',
              dataIndex: 'bass',
              key      : 'bass',
              width    : 200
            },
            {
              title    : '鲆鱼',
              dataIndex: 'bastardHalibut',
              key      : 'bastardHalibut',
              width    : 100
            },
            {
              title    : '大黄鱼',
              dataIndex: 'yellowFish',
              key      : 'yellowFish',
              width    : 100
            },
            {
              title    : '军曹鱼',
              dataIndex: 'cobia',
              key      : 'cobia',
              width    : 100
            },
            {
              title    : '鰤鱼',
              dataIndex: 'shad',
              key      : 'shad',
              width    : 100
            },
            {
              title    : '鲷鱼',
              dataIndex: 'snapper',
              key      : 'snapper',
              width    : 100
            }
            ,
            {
              title    : '美国红鱼',
              dataIndex: 'redFish',
              key      : 'redFish',
              width    : 100
            }
            ,
            {
              title    : '河鲀',
              dataIndex: 'pufferfish',
              key      : 'pufferfish',
              width    : 100
            }
            ,
            {
              title    : '石斑鱼',
              dataIndex: 'grouper',
              key      : 'grouper',
              width    : 100
            }
            ,
            {
              title    : '鲽鱼',
              dataIndex: 'flatfish',
              key      : 'flatfish',
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
                  title    : '其中：南美白对虾',
                  dataIndex: 'southAmericanShrimp',
                  key      : 'southAmericanShrimp',
                  width    : 150
                },
                {
                  title    : '斑节对虾',
                  dataIndex: 'spotSectionPrawns',
                  key      : 'spotSectionPrawns',
                  width    : 120
                },
                {
                  title    : '中国对虾',
                  dataIndex: 'penaeusChinensis',
                  key      : 'penaeusChinensis',
                  width    : 100
                },
                {
                  title    : '日本对虾',
                  dataIndex: 'JapPrawn',
                  key      : 'JapPrawn',
                  width    : 100
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
                  width    : 150
                },
                {
                  title    : '青蟹',
                  dataIndex: 'greenCrab',
                  key      : 'greenCrab',
                  width    : 120
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
              title    : '其中：牡蛎',
              dataIndex: 'oysters',
              key      : 'oysters',
              width    : 100
            },
            {
              title    : '鲍',
              dataIndex: 'bao',
              key      : 'bao',
              width    : 120
            },
            {
              title    : '螺',
              dataIndex: 'screw',
              key      : 'screw',
              width    : 100
            },
            {
              title    : '蚶',
              dataIndex: 'cockle',
              key      : 'cockle',
              width    : 100
            }
            ,
            {
              title    : '贻贝',
              dataIndex: 'mussels',
              key      : 'mussels',
              width    : 120
            },
            {
              title    : '江珧',
              dataIndex: 'jiangYao',
              key      : 'jiangYao',
              width    : 100
            },
            {
              title    : '扇贝',
              dataIndex: 'scallops',
              key      : 'scallops',
              width    : 100
            }
            ,
            {
              title    : '蛤',
              dataIndex: 'clam',
              key      : 'clam',
              width    : 100
            },
            {
              title    : '蛏',
              dataIndex: 'respectively',
              key      : 'respectively',
              width    : 100
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
              width    : 100
            },
            {
              title    : '其中：海带',
              dataIndex: 'kelp',
              key      : 'kelp',
              width    : 100
            },
            {
              title    : '紫菜',
              dataIndex: 'nori',
              key      : 'nori',
              width    : 120
            },
            {
              title    : '江蓠',
              dataIndex: 'gracilaria',
              key      : 'gracilaria',
              width    : 100
            },
            {
              title    : '麒麟菜',
              dataIndex: 'eucheuma',
              key      : 'eucheuma',
              width    : 100
            }
            ,
            {
              title    : '石花菜',
              dataIndex: 'agarWeed',
              key      : 'agarWeed',
              width    : 120
            },
            {
              title    : '羊栖菜',
              dataIndex: 'sheepFood',
              key      : 'sheepFood',
              width    : 100
            },
            {
              title    : '苔菜',
              dataIndex: 'greenMoss',
              key      : 'greenMoss',
              width    : 100
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
              width    : 100
            },
            {
              title    : '其中：海参',
              dataIndex: 'seaCucumber',
              key      : 'seaCucumber',
              width    : 100
            },
            {
              title    : '海胆',
              dataIndex: 'seaUrchin',
              key      : 'seaUrchin',
              width    : 120
            },
            {
              title    : '海水珍珠',
              dataIndex: 'seawaterPearl',
              key      : 'seawaterPearl',
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
          JapPrawn           : '25,578,522,85',//日本对虾
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
