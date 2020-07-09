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
          title    : '渔业乡（个）',
          dataIndex: 'fisheriesTownship',
          key      : 'fisheriesTownship',
          width    : 150,
        },
        {
          title    : '渔业村（个）',
          dataIndex: 'fisheriesVillage',
          key      : 'fisheriesVillage',
          width    : 150,
        },
        {
          title    : '渔业户（户）',
          dataIndex: 'fisheriesHouseholds',
          key      : 'fisheriesHouseholds',
          width    : 150,
        },
        {
          title   : '渔业人口（人）',
          children: [
            {
              title    : '合计',
              dataIndex: 'fisheryPopulation',
              key      : 'fisheryPopulation',
              width    : 200
            },
            {
              title    : '其中：传统渔民',
              dataIndex: 'traditionalFishermen',
              key      : 'traditionalFishermen',
              width    : 200
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
              width    : 100
            },
            {
              title    : '专业从业人员',
              dataIndex: 'professionalPractitioners',
              key      : 'professionalPractitioners',
              width    : 100
            },
            {
              title    : '其中：女性',
              dataIndex: 'women',
              key      : 'women',
              width    : 100
            },
            {
              title    : '捕捞',
              dataIndex: 'fishing',
              key      : 'fishing',
              width    : 100
            },
            {
              title    : '养殖',
              dataIndex: 'farming',
              key      : 'farming',
              width    : 100
            },
            {
              title    : '其他',
              dataIndex: 'other',
              key      : 'other',
              width    : 100
            },
            {
              title    : '兼业从业人员',
              dataIndex: 'longTimePer',
              key      : 'longTimePer',
              width    : 100
            },
            {
              title    : '临时从业人员',
              dataIndex: 'temporaryPer',
              key      : 'temporaryPer',
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


