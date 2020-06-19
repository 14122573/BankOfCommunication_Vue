<template>
  <div>
    <div class="background">
      <div class="pageWrapper">
        <Navbar class="navbar" />
        <div class="content">
          <a-row style="background-color: #FFF">
            <a-col :span="9">
              指标名称:
              <a-cascader
                :options="options"
                placeholder="请选择指标名称"
                @change="handleChange"
              />
            </a-col>
            <a-col :span="9">
              请选择年份：
              <a-date-picker
                :open="isopen"
                :value="yearPickerValue"
                mode="year"
                format="YYYY"
                placeholder="请选择年份"
                @panelChange="handleYearPicker"
                @openChange="handleOpenChange"
              />
            </a-col>
            <a-col :span="6">
              <a-row type="flex" justify="end">
                <a-col :span="24">
                  <a-button type="primary" @click="showResult"
                    >提交</a-button
                  >
                  <a-button type="default">重置</a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row style="height: 20px"/>
          <a-row style="background-color: #FFF">
  <!--          <SearchResult :query="query"/>-->
            <component :is="zhibiaoValue" :query="query"></component>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'
import moment from 'moment'
import fishProduction from '@/views/frontPublic/views/dataSearch/searchResult/fishProduction.vue'
import waterProductionSpecies from '@/views/frontPublic/views/dataSearch/searchResult/waterProductionSpecies.vue'
import waterProductionWay from '@/views/frontPublic/views/dataSearch/searchResult/waterProductionWay.vue'
export default {
  components: {
    Navbar,
    fishProduction,
    waterProductionSpecies,
    waterProductionWay
  },
  methods: {
    showResult() {
      let query = this.query
      let zhibiao = this.zhibiaoValue
      let yearpicker = moment(this.yearPickerValue).format('YYYY')
      if (!!zhibiao && !!yearpicker) {
        query.splice(0,1)
        query.push({ '指标': zhibiao, '年份': yearpicker })
      }
    },
    handleChange(data) {
      this.zhibiaoValue = data.pop()
    },
    handleYearPicker(year) {
      this.yearPickerValue = year
      this.isopen = false
    },
    handleOpenChange(status) {
      if (status) {
        this.isopen = true
      } else {
        this.isopen = false
      }
    }
  },
  data() {
    return {
      yearPickerValue: null,
      zhibiaoValue   : 'fishProduction',
      isopen         : false,
      query          : [],
      options        : [
        {
          value: 'fishProduction',
          label: '渔业经济总产值'
        },
        {
          value   : 'scpzcl',
          label   : '水产品总产量',
          children: [
            {
              value   : 'scpzcl-hsyz',
              label   : '养殖产品（海水养殖）',
              children: [
                {
                  value: 'waterProductionSpecies',
                  label: '按养殖品种分'
                },
                {
                  value: 'waterProductionWay',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            },
            {
              value   : 'scpzcl-dsyz',
              label   : '养殖产品（淡水养殖）',
              children: [
                {
                  value: '04',
                  label: '按养殖品种分'
                },
                {
                  value: '05',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            },
            {
              value   : 'scpzcl-hybl',
              label   : '捕捞产品（海洋捕捞）',
              children: [
                {
                  value: '06',
                  label: '按捕捞品种分'
                },
                {
                  value: '07',
                  label: '按捕捞海域和捕捞渔具分'
                }
              ]
            },
            {
              value   : 'scpzcl-dsbl',
              label   : '捕捞产品（淡水捕捞）',
              children: [
                {
                  value: '08',
                  label: '按捕捞品种分'
                }
              ]
            },
            {
              value: '09',
              label: '捕捞产品（远洋渔业）'
            }
          ]
        },
        {
          value   : 'scyzmj',
          label   : '水产养殖面积',
          children: [
            {
              value: '10',
              label: '淡水养殖面积（按养殖水域和养殖方式分）'
            },
            {
              value   : 'scyzmj-hsyzmj',
              label   : '海水养殖面积',
              children: [
                {
                  value: '11',
                  label: '按养殖品种分'
                },
                {
                  value: '12',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            }
          ]
        },
        {
          value: '13',
          label: '水产苗种产量'
        },
        {
          value: '14',
          label: '渔民家庭收支'
        },
        {
          value   : 'yyrkNcyry',
          label   : '渔业人口与从业人员',
          children: [
            {
              value: '15',
              label: '渔业人口与从业人员'
            },
            {
              value: '16',
              label: '海洋渔业人口与从业人员'
            }
          ]
        },
        {
          value   : 'scpjg',
          label   : '水产品加工',
          children: [
            {
              value: '17',
              label: '水产加工品总量'
            },
            {
              value: '18',
              label: '水产加工企业、冷库情况'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  background-color: #F1F5F8;
}

.pageWrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .content {
  background-color: #f1f5f8;
}
</style>
