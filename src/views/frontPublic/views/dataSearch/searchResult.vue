<template>
  <div>
    <a-row class="tableWrapper">
      <a-table
        :columns="columns"
        :data-source="dataList"
        bordered
        size="small"
        :scroll="{ x: 'calc(700px + 50%)' }"
        :rowClassName="setRowColor"
        :customHeaderRow="clearHover"
      />
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    query: Array
  },
  mounted() {
    this.fetchData()
    console.log(this.query)
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
          dataIndex: '年份',
          key      : '年份',
          width    : 120,
          fixed    : 'left'
        },
        {
          title    : '区域',
          dataIndex: '区域',
          key      : '区域',
          width    : 100,
          fixed    : 'left'
        },
        {
          title    : '总计',
          dataIndex: '总计',
          key      : '总计',
          width    : 150,
          fixed    : 'left'
        },
        {
          title   : '渔业产值',
          children: [
            {
              title    : '合计',
              dataIndex: 'yycz合计',
              key      : 'yycz合计',
              width    : 200
            },
            {
              title    : '海水养殖',
              dataIndex: 'yycz海水养殖',
              key      : 'yycz海水养殖',
              width    : 200
            },
            {
              title    : '淡水养殖',
              dataIndex: 'yycz淡水养殖',
              key      : 'yycz淡水养殖',
              width    : 100
            },
            {
              title    : '海洋捕捞',
              dataIndex: 'yycz海洋捕捞',
              key      : 'yycz海洋捕捞',
              width    : 100
            },
            {
              title    : '淡水捕捞',
              dataIndex: 'yycz淡水捕捞',
              key      : 'yycz淡水捕捞',
              width    : 100
            },
            {
              title    : '水产苗种',
              dataIndex: 'yycz水产苗种',
              key      : 'yycz水产苗种',
              width    : 100
            }
          ]
        },
        {
          title   : '渔业工业和建筑业',
          children: [
            {
              title    : '合计',
              dataIndex: 'yygyhjzy合计',
              key      : 'yygyhjzy合计',
              width    : 100
            },
            {
              title    : '水产品加工',
              dataIndex: 'yygyhjzy水产品加工',
              key      : 'yygyhjzy水产品加工',
              width    : 100
            },
            {
              title   : '渔用机具制造',
              children: [
                {
                  title    : '其中: 渔船渔机修造',
                  dataIndex: 'yygyhjzy渔船渔机修造',
                  key      : 'yygyhjzy渔船渔机修造',
                  width    : 150
                },
                {
                  title    : '渔用绳网制造',
                  dataIndex: 'yygyhjzy渔用绳网制造',
                  key      : 'yygyhjzy渔用绳网制造',
                  width    : 120
                },
                {
                  title    : '渔用饲料',
                  dataIndex: 'yygyhjzy渔用饲料',
                  key      : 'yygyhjzy渔用饲料',
                  width    : 100
                },
                {
                  title    : '渔用药物',
                  dataIndex: 'yygyhjzy渔用药物',
                  key      : 'yygyhjzy渔用药物',
                  width    : 100
                },
                {
                  title    : '建筑',
                  dataIndex: 'yygyhjzy建筑',
                  key      : 'yygyhjzy建筑',
                  width    : 100
                },
                {
                  title    : '其他',
                  dataIndex: 'yygyhjzy其他',
                  key      : 'yygyhjzy其他',
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
              dataIndex: 'yylthfwy合计',
              key      : 'yylthfwy合计',
              width    : 100
            },
            {
              title    : '水产流通',
              dataIndex: 'yylthfwy水产流通',
              key      : 'yylthfwy水产流通',
              width    : 100
            },
            {
              title    : '水产(仓储)运输',
              dataIndex: 'yylthfwy水产仓储运输',
              key      : 'yylthfwy水产仓储运输',
              width    : 120
            },
            {
              title    : '休闲渔业',
              dataIndex: 'yylthfwy休闲渔业',
              key      : 'yylthfwy休闲渔业',
              width    : 100
            },
            {
              title    : '其他',
              dataIndex: 'yylthfwy其他',
              key      : 'yylthfwy其他',
              width    : 100
            }
          ]
        }
      ]
    }
  },
  methods: {
    clearHover(record) {
      return {
        on: {
          mouseenter: (event) => {
            console.log(event);
            let chooseTool = event.srcElement.lastChild;
            console.log(chooseTool);
            
            return document.getElementsByClassName(chooseTool).style.backgroundColor = '#2a93f5'
            
            // return event.srcElement.lastChild.style.backgroundColor = "#2a93f5"
          }
        }
      }
    },
    setRowColor(record, index) {
      let className = index % 2 ? 'row_gray' : 'row_normal'
      return className
    },
    fetchData() {
      for (let i = 0; i < 31; i++) {
        this.dataList.push({
          key           : i,
          年份            : '2019',
          区域            : this.province[i].name,
          总计            : '266,644,732,15',
          yycz合计        : '128,1544,129,31',
          yycz海水养殖      : '35,358,584,13',
          yycz淡水养殖      : '1,584,597,56',
          yycz海洋捕捞      : '25,578,522,85',
          yycz淡水捕捞      : '25,578,522,85',
          yycz水产苗种      : '25,578,522,85',
          yygyhjzy合计    : '25,578,522,85',
          yygyhjzy水产品加工 : '25,578,522,85',
          yygyhjzy渔船渔机修造: '25,578,522,85',
          yygyhjzy渔用绳网制造: '25,578,522,85',
          yygyhjzy渔用饲料  : '25,578,522,85',
          yygyhjzy渔用药物  : '25,578,522,85',
          yygyhjzy建筑    : '25,578,522,85',
          yygyhjzy其他    : '25,578,522,85',
          yylthfwy合计    : '25,578,522,85',
          yylthfwy水产流通  : '25,578,522,85',
          yylthfwy水产仓储运输: '25,578,522,85',
          yylthfwy休闲渔业  : '25,578,522,85',
          yylthfwy其他    : '25,578,522,85'
        })
      }
    }
  }
}
</script>

<style>
.tableWrapper {
  padding: 30px
}

.ant-table-thead > tr {
  background-color: #2a93f5;
}

.ant-table-thead :hover > tr {
  background-color: #2a93f5;
}

.ant-table-thead > tr > th {
  color: #ffffff;
  text-align: center;
}

.row_gray {
  background-color: #E8E9EA;
}

.row_normal {
  background-color: white;
}
</style>
