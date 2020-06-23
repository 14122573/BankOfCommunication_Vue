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
          title    : '渔民人均纯收入',
          dataIndex: 'PerCapitaIncome',
          key      : 'PerCapitaIncome',
          width    : 150,
          fixed    : 'left'
        },
        {
          title   : '家庭总收入',
          children: [
            {
              title    : '合计',
              dataIndex: 'familyIncome',
              key      : 'familyIncome',
              width    : 200
            },
            {
              title    : '家庭经营收入',
              dataIndex: 'familyBusinessIncome',
              key      : 'familyBusinessIncome',
              width    : 200
            },
            {
              title    : '其中：经营渔业',
              dataIndex: 'operateFishery',
              key      : 'operateFishery',
              width    : 100
            },
            {
              title    : '工资性收入',
              dataIndex: 'wageIncome',
              key      : 'wageIncome',
              width    : 100
            },
            {
              title    : '其中：渔业',
              dataIndex: 'fisheries',
              key      : 'fisheries',
              width    : 100
            },
            {
              title    : '财产性净收入',
              dataIndex: 'netPropertyIncome',
              key      : 'netPropertyIncome',
              width    : 100
            },
            {
              title    : '其中：红利',
              dataIndex: 'dividend',
              key      : 'dividend',
              width    : 100
            }
            ,
            {
              title    : '转让经营权租金收入',
              dataIndex: 'transferBusinessIncome',
              key      : 'transferBusinessIncome',
              width    : 100
            }
            ,
            {
              title    : '转移性收入',
              dataIndex: 'transferIncome',
              key      : 'transferIncome',
              width    : 100
            }
            ,
            {
              title    : '其中：社会救济或政策性生活补贴',
              dataIndex: 'livingAllowances',
              key      : 'livingAllowances',
              width    : 100
            }
            ,
            {
              title    : '其他转移性收入',
              dataIndex: 'otherTransferIncome',
              key      : 'otherTransferIncome',
              width    : 100
            }
            ,
            {
              title    : '生产补贴（惠农补贴）',
              dataIndex: 'productionSubsidies',
              key      : 'productionSubsidies',
              width    : 100
            }
            ,
            {
              title    : '其中：渔业补贴',
              dataIndex: 'fisheriesSubsidies',
              key      : 'fisheriesSubsidies',
              width    : 100
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
              width    : 100
            },
            {
              title    : '其中：经营渔业支出',
              dataIndex: 'operateFisherySpending',
              key      : 'operateFisherySpending',
              width    : 100
            },
            {
              title    : '燃料及冰费用',
              dataIndex: 'fuelSpending',
              key      : 'fuelSpending',
              width    : 100
            },
            {
              title    : '雇工费用',
              dataIndex: 'employeesSpending',
              key      : 'employeesSpending',
              width    : 100
            },
            {
              title    : '饲料及苗种费用',
              dataIndex: 'frySpending',
              key      : 'frySpending',
              width    : 100
            },
            {
              title    : '其他费用',
              dataIndex: 'otherSpending',
              key      : 'otherSpending',
              width    : 100
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
              width    : 100
            },
            {
              title    : '其中：渔业固定资产折旧',
              dataIndex: 'fisheriesDepreciation',
              key      : 'fisheriesDepreciation',
              width    : 100
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
              width    : 100
            },
            {
              title    : '其中：渔业税费支出',
              dataIndex: 'fisheriesTaxSpending',
              key      : 'fisheriesTaxSpending',
              width    : 100
            }
          ]
        }
        ,
        {
          title    : '转移性支出',
          dataIndex: 'transferSpending',
          key      : 'transferSpending',
          width    : 100
        },
        {
          title   : '纯收入',
          children: [
            {
              title    : '合计',
              dataIndex: 'netIncome',
              key      : 'netIncome',
              width    : 100
            },
            {
              title    : '其中：渔业收入',
              dataIndex: 'fisheryIncome',
              key      : 'fisheryIncome',
              width    : 100
            }
          ]
        },
        {
          title    : '可支配收入',
          dataIndex: 'disposableIncome',
          key      : 'disposableIncome',
          width    : 100
        },
        {
          title    : '生活消费支出',
          dataIndex: 'livingSpending',
          key      : 'livingSpending',
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
          key                   : i,
          year                  : '2019',//年份
          area                  : this.province[i].name,//区域
          sum                   : '266,644,732,15',//总计
          PerCapitaIncome       : '266,644,732,15',//渔民人均纯收入
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

