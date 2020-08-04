<template>
<!--    水产苗种产量-->
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
        // {
        //   title    : '总计',
        //   dataIndex: 'sum',
        //   key      : 'sum',
        //   width    : 150,
        //   fixed    : 'left',
        //   align    : 'center'
        // },
        {
          title    : '淡水鱼苗',
          dataIndex: 'freshFish',
          key      : 'freshFish',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '其中：罗非鱼',
          dataIndex: 'tilapia',
          key      : 'tilapia',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '淡水鱼种',
          dataIndex: 'freshFishSpeice',
          key      : 'freshFishSpeice',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '投放鱼种',
          dataIndex: 'putFish',
          key      : 'putFish',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '河蟹育苗',
          dataIndex: 'riverCrabSeed',
          key      : 'riverCrabSeed',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '扣蟹',
          dataIndex: 'claspCrab',
          key      : 'claspCrab',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '稚鳖',
          dataIndex: 'youngTurtle',
          key      : 'youngTurtle',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '稚龟',
          dataIndex: 'youngGui',
          key      : 'youngGui',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '鳗苗捕捞',
          dataIndex: 'pufferfish',
          key      : 'pufferfish',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '海水鱼苗',
          dataIndex: 'eelSeedlingFish',
          key      : 'eelSeedlingFish',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '其中：大黄鱼',
          dataIndex: 'bigYellowFish',
          key      : 'bigYellowFish',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '鲆鱼',
          dataIndex: 'bastardHalibut',
          key      : 'bastardHalibut',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '虾类育苗',
          dataIndex: 'shrimpNursery',
          key      : 'shrimpNursery',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '其中：南美白对虾',
          dataIndex: 'whiteShrimp',
          key      : 'whiteShrimp',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '贝类育苗',
          dataIndex: 'shellfishSeedling',
          key      : 'shellfishSeedling',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '其中：鲍鱼',
          dataIndex: 'abalone',
          key      : 'abalone',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '海带',
          dataIndex: 'kelp',
          key      : 'kelp',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '紫菜',
          dataIndex: 'nori',
          key      : 'nori',
          width    : 150,
          align    : 'center'
        },
        {
          title    : '海参',
          dataIndex: 'seaCucumber',
          key      : 'seaCucumber',
          width    : 150,
          align    : 'center'
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
        url   : this.$api.GET_DATA_WF_LIST,
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
          key              : i,
          year             : '2019',//年份
          area             : this.province[i].name,//区域
          sum              : '266,644,732,15',//总计
          freshFish        : '128,1544,129,31',//淡水鱼苗
          tilapia          : '35,358,584,13',//其中：罗非鱼
          freshFishSpeice  : '1,584,597,56',//淡水鱼种
          putFish          : '25,578,522,85',//投放鱼种
          riverCrabSeed    : '25,578,522,85',//河蟹育苗
          claspCrab        : '25,578,522,85',//扣蟹
          youngTurtle      : '25,578,522,85',//稚鳖
          youngGui         : '25,578,522,85',//稚龟
          pufferfish       : '25,578,522,85',//鳗苗捕捞
          eelSeedlingFish  : '25,578,522,85',//海水鱼苗
          bigYellowFish    : '25,578,522,85',//其中：大黄鱼
          bastardHalibut   : '25,578,522,85',//鲆鱼
          shrimpNursery    : '25,578,522,85',//虾类育苗
          whiteShrimp      : '25,578,522,85',//其中：南美白对虾
          shellfishSeedling: '25,578,522,85',//贝类育苗
          abalone          : '25,578,522,85',//其中：鲍鱼
          kelp             : '25,578,522,85',//海带
          nori             : '25,578,522,85',//紫菜
          seaCucumber      : '25,578,522,85'//海参
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
