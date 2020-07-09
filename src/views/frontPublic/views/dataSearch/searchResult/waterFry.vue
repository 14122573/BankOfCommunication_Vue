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
          title    : '淡水鱼苗',
          dataIndex: 'freshFish',
          key      : 'freshFish',
          width    : 100
        },
        {
          title    : '其中：罗非鱼',
          dataIndex: 'tilapia',
          key      : 'tilapia',
          width    : 100
        },
        {
          title    : '淡水鱼种',
          dataIndex: 'freshFishSpeice',
          key      : 'freshFishSpeice',
          width    : 100
        },
        {
          title    : '投放鱼种',
          dataIndex: 'putFish',
          key      : 'putFish',
          width    : 100
        },
        {
          title    : '河蟹育苗',
          dataIndex: 'riverCrabSeed',
          key      : 'riverCrabSeed',
          width    : 100
        },
        {
          title    : '扣蟹',
          dataIndex: 'claspCrab',
          key      : 'claspCrab',
          width    : 100
        },
        {
          title    : '稚鳖',
          dataIndex: 'youngTurtle',
          key      : 'youngTurtle',
          width    : 100
        },
        {
          title    : '稚龟',
          dataIndex: 'youngGui',
          key      : 'youngGui',
          width    : 100
        },
        {
          title    : '鳗苗捕捞',
          dataIndex: 'pufferfish',
          key      : 'pufferfish',
          width    : 100
        },
        {
          title    : '海水鱼苗',
          dataIndex: 'eelSeedlingFish',
          key      : 'eelSeedlingFish',
          width    : 100
        },
        {
          title    : '其中：大黄鱼',
          dataIndex: 'bigYellowFish',
          key      : 'bigYellowFish',
          width    : 100
        },
        {
          title    : '鲆鱼',
          dataIndex: 'bastardHalibut',
          key      : 'bastardHalibut',
          width    : 100
        },
        {
          title    : '虾类育苗',
          dataIndex: 'shrimpNursery',
          key      : 'shrimpNursery',
          width    : 100
        },
        {
          title    : '其中：南美白对虾',
          dataIndex: 'whiteShrimp',
          key      : 'whiteShrimp',
          width    : 100
        },
        {
          title    : '贝类育苗',
          dataIndex: 'shellfishSeedling',
          key      : 'shellfishSeedling',
          width    : 100
        },
        {
          title    : '其中：鲍鱼',
          dataIndex: 'abalone',
          key      : 'abalone',
          width    : 100
        },
        {
          title    : '海带',
          dataIndex: 'kelp',
          key      : 'kelp',
          width    : 100
        },
        {
          title    : '紫菜',
          dataIndex: 'nori',
          key      : 'nori',
          width    : 100
        },
        {
          title    : '海参',
          dataIndex: 'seaCucumber',
          key      : 'seaCucumber',
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
