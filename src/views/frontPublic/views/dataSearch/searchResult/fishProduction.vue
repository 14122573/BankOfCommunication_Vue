<template>
<!--    渔业经济总产值-->
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
          title   : '渔业产值',
          children: [
            {
              title    : '合计',
              dataIndex: 'yyczSum',
              key      : 'yyczSum',
              width    : 200
            },
            {
              title    : '海水养殖',
              dataIndex: 'seaRaise',
              key      : 'seaRaise',
              width    : 200
            },
            {
              title    : '淡水养殖',
              dataIndex: 'freshRaise',
              key      : 'freshRaise',
              width    : 100
            },
            {
              title    : '海洋捕捞',
              dataIndex: 'seaFishing',
              key      : 'seaFishing',
              width    : 100
            },
            {
              title    : '淡水捕捞',
              dataIndex: 'freshFishing',
              key      : 'freshFishing',
              width    : 100
            },
            {
              title    : '水产苗种',
              dataIndex: 'waterFry',
              key      : 'waterFry',
              width    : 100
            }
          ]
        },
        {
          title   : '渔业工业和建筑业',
          children: [
            {
              title    : '合计',
              dataIndex: 'yygyhjzySum',
              key      : 'yygyhjzySum',
              width    : 100
            },
            {
              title    : '水产品加工',
              dataIndex: 'waterProcessing',
              key      : 'waterProcessing',
              width    : 100
            },
            {
              title   : '渔用机具制造',
              children: [
                {
                  title    : '其中: 渔船渔机修造',
                  dataIndex: 'fishRepair',
                  key      : 'fishRepair',
                  width    : 150
                },
                {
                  title    : '渔用绳网制造',
                  dataIndex: 'fishRopeMake',
                  key      : 'fishRopeMake',
                  width    : 120
                },
                {
                  title    : '渔用饲料',
                  dataIndex: 'fishFeed',
                  key      : 'fishFeed',
                  width    : 100
                },
                {
                  title    : '渔用药物',
                  dataIndex: 'fishDrug',
                  key      : 'fishDrug',
                  width    : 100
                },
                {
                  title    : '建筑',
                  dataIndex: 'build',
                  key      : 'build',
                  width    : 100
                },
                {
                  title    : '其他',
                  dataIndex: 'yygyhjzyOther',
                  key      : 'yygyhjzyOther',
                  width    : 100
                }
              ]
            }
          ]
        },
        {
          title   : '渔业流通和服务业',
          children: [
            {
              title    : '合计',
              dataIndex: 'yylthfwySum',
              key      : 'yylthfwySum',
              width    : 100
            },
            {
              title    : '水产流通',
              dataIndex: 'waterCirculation',
              key      : 'waterCirculation',
              width    : 100
            },
            {
              title    : '水产(仓储)运输',
              dataIndex: 'waterTransport',
              key      : 'waterTransport',
              width    : 120
            },
            {
              title    : '休闲渔业',
              dataIndex: 'leisureFishery',
              key      : 'leisureFishery',
              width    : 100
            },
            {
              title    : '其他',
              dataIndex: 'yylthfwyOther',
              key      : 'yylthfwyOther',
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
          key             : i,
          year            : '2019',//年份
          area            : this.province[i].name,//区域
          sum             : '266,644,732,15',//总计
          yyczSum         : '128,1544,129,31',//yycz合计
          seaRaise        : '35,358,584,13',//yycz海水养殖
          freshRaise      : '1,584,597,56',//yycz淡水养殖
          seaFishing      : '25,578,522,85',//yycz海洋捕捞
          freshFishing    : '25,578,522,85',//yycz淡水捕捞
          waterFry        : '25,578,522,85',//yycz水产苗种
          yygyhjzySum     : '25,578,522,85',//yygyhjzy合计
          waterProcessing : '25,578,522,85',//yygyhjzy水产品加工
          fishRepair      : '25,578,522,85',//yygyhjzy渔船渔机修造
          fishRopeMake    : '25,578,522,85',//yygyhjzy渔用绳网制造
          fishFeed        : '25,578,522,85',//yygyhjzy渔用饲料
          fishDrug        : '25,578,522,85',//yygyhjzy渔用药物
          build           : '25,578,522,85',//yygyhjzy建筑
          yygyhjzyOther   : '25,578,522,85',//yygyhjzy其他
          yylthfwySum     : '25,578,522,85',//yylthfwy合计
          waterCirculation: '25,578,522,85',//yylthfwy水产流通
          waterTransport  : '25,578,522,85',//yylthfwy水产仓储运输
          leisureFishery  : '25,578,522,85',//yylthfwy休闲渔业
          yylthfwyOther   : '25,578,522,85'//yylthfwy其他
        })
      }
    }
  }
}
</script>
<style lang="stylus">
  .searchResult th
    background-color #2a93f5 !important
    color #fff !important
    text-align center !important
</style>
