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
          title   : '渔业产值',
          children: [
            {
              title    : '合计',
              dataIndex: 'yyczSum',
              key      : 'yyczSum',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海水养殖',
              dataIndex: 'seaRaise',
              key      : 'seaRaise',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '淡水养殖',
              dataIndex: 'freshRaise',
              key      : 'freshRaise',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '海洋捕捞',
              dataIndex: 'seaFishing',
              key      : 'seaFishing',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '淡水捕捞',
              dataIndex: 'freshFishing',
              key      : 'freshFishing',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水产苗种',
              dataIndex: 'waterFry',
              key      : 'waterFry',
              width    : 150,
              align    : 'center'
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
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水产品加工',
              dataIndex: 'waterProcessing',
              key      : 'waterProcessing',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '渔用机具制造',
              dataIndex: 'fishMachine',
              key      : 'fishMachine',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其中: 渔船渔机修造',
              dataIndex: 'fishRepair',
              key      : 'fishRepair',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '渔用绳网制造',
              dataIndex: 'fishRopeMake',
              key      : 'fishRopeMake',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '渔用饲料',
              dataIndex: 'fishFeed',
              key      : 'fishFeed',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '渔用药物',
              dataIndex: 'fishDrug',
              key      : 'fishDrug',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '建筑',
              dataIndex: 'build',
              key      : 'build',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他',
              dataIndex: 'yygyhjzyOther',
              key      : 'yygyhjzyOther',
              width    : 150,
              align    : 'center'
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
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水产流通',
              dataIndex: 'waterCirculation',
              key      : 'waterCirculation',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水产(仓储)运输',
              dataIndex: 'waterTransport',
              key      : 'waterTransport',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '休闲渔业',
              dataIndex: 'leisureFishery',
              key      : 'leisureFishery',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他',
              dataIndex: 'yylthfwyOther',
              key      : 'yylthfwyOther',
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
    setRowColor(record, index) {
      let className = index % 2 ? 'row_gray' : 'row_normal'
      return className
    },
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
        url   : 'http://47.101.223.16:7066/fishProduction',
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.total', 0)
        this.pagination.current = this.$com.confirm(res, 'data.current', 1)
        this.pagination.current = this.pagination.current
        this.dataList = this.$com.confirm(res, 'data.records', [])
        this.isReady = true
      })
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
          fishMachine     : '25,578,522,85',//yygyhjzy渔用机具制造
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
