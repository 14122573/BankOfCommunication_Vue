<template>
    <!--    水产养殖面积-淡水养殖面积（按养殖水域和养殖方式分）-->
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
          title   : '按养殖水域分',
          children: [
            {
              title    : '池塘',
              dataIndex: 'pond',
              key      : 'pond',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '湖泊',
              dataIndex: 'lakes',
              key      : 'lakes',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '水库',
              dataIndex: 'reservoir',
              key      : 'reservoir',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '河沟',
              dataIndex: 'county',
              key      : 'county',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '其他',
              dataIndex: 'other',
              key      : 'other',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '稻田',
              dataIndex: 'paddyFields',
              key      : 'paddyFields',
              width    : 150,
              align    : 'center'
            }
          ]
        },
        {
          title   : '按养殖方式分',
          children: [
            {
              title    : '围栏',
              dataIndex: 'fence',
              key      : 'fence',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '网箱',
              dataIndex: 'cages',
              key      : 'cages',
              width    : 150,
              align    : 'center'
            },
            {
              title    : '工厂化',
              dataIndex: 'factory',
              key      : 'factory',
              width    : 120,
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
        // pageNo  : this.pagination.current,
        // pageSize: this.pagination.pageSize,
      })

      this.$ajax.get({
        url   : this.$api.GET_DATA_AFA_LIST,
        params: searchParms
      }).then(res => {
        this.pagination.total = this.$com.confirm(res, 'data.total', 0)
        this.pagination.current = this.$com.confirm(res, 'data.current', 1)
        this.pagination.current = this.pagination.current
        this.dataList = this.$com.confirm(res, 'data.records', [])
        this.isReady = true
      })
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
