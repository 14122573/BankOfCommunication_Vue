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
          title   : '水产品加工产量',
          children: [
            {
              title    : '合计',
              dataIndex: 'aquaticRepqir',
              key      : 'aquaticRepqir',
              width    : 200
            },
            {
              title    : '淡水加工品',
              dataIndex: 'freshRepqir',
              key      : 'freshRepqir',
              width    : 200
            },
            {
              title    : '海水加工品',
              dataIndex: 'seaRepqir',
              key      : 'seaRepqir',
              width    : 200
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
              width    : 100
            },
            {
              title    : '冷冻品',
              dataIndex: 'frozen',
              key      : 'frozen',
              width    : 100
            },
            {
              title    : '冷冻加工品',
              dataIndex: 'frozenRepqir',
              key      : 'frozenRepqir',
              width    : 100
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
              width    : 100
            },
            {
              title    : '鱼糜制品',
              dataIndex: 'mincedFish',
              key      : 'mincedFish',
              width    : 100
            },
            {
              title    : '干腌制品',
              dataIndex: 'drySalted',
              key      : 'drySalted',
              width    : 100
            }
          ]
        },
        {
          title    : '藻类加工品',
          dataIndex: 'algaeRepqir',
          key      : 'algaeRepqir',
          width    : 150
        },
        {
          title    : '罐制品',
          dataIndex: 'tinProducts',
          key      : 'tinProducts',
          width    : 150
        },
        {
          title    : '鱼粉',
          dataIndex: 'fishMeal',
          key      : 'fishMeal',
          width    : 150
        },
        {
          title    : '鱼油制品',
          dataIndex: 'fishOilProducts',
          key      : 'fishOilProducts',
          width    : 150
        },
        {
          title   : '其他水产加工品',
          children: [
            {
              title    : '合计',
              dataIndex: 'otherAquaticProducts',
              key      : 'otherAquaticProducts',
              width    : 100
            },
            {
              title    : '其中：助剂和添加剂',
              dataIndex: 'additive',
              key      : 'additive',
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
          title   : '用于加工的水产品量',
          children: [
            {
              title    : '合计',
              dataIndex: 'processAquatic',
              key      : 'processAquatic',
              width    : 100
            },
            {
              title    : '淡水产品',
              dataIndex: 'freshProduct',
              key      : 'freshProduct',
              width    : 100
            },
            {
              title    : '海水产品',
              dataIndex: 'seaProduct',
              key      : 'seaProduct',
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


