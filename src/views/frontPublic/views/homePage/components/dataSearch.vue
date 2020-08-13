<template>
  <div class="background">
    <div class="searchWrapper">
      <a-row
        align="middle"
        justify="start"
        type="flex"
        style="height: 100px; margin: 0px 56px 0px 36px;"
      >
        <a-col :span="24">
          <a-list :split=false>
            <a-list-item>
              <a-col style="font-weight:bold">数据查询</a-col>
            </a-list-item>
            <a-list-item style="text-align: left">
                  指标名称:
                  <a-cascader
                    :options="options"
                    placeholder="请选择指标名称"
                    @change="handleChange"
                    :display-render="displayRender"
                    :default-value="['fishProduction']"
                  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              请选择年份:
              <a-date-picker
                format="YYYY"
                :open="isopen"
                mode="year"
                :value="year"
                placeholder="请选择年份"
                @panelChange="handleYearPicker"
                @openChange="handleOpenChange"
                :allowClear="false"
              ><a-icon slot="suffixIcon" v-if="year != null" type="close-circle" @click.stop="reset" /></a-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a-button type="primary" icon="search" @click="jumpToPage">查询</a-button>
            </a-list-item>
          </a-list>
        </a-col>
        <!--<a-col :span="12">
          <a-list :split=false>
            <a-list-item>
              <a-col style="font-weight:bold">数据查询</a-col>
            </a-list-item>
            <a-list-item>
              请选择年份:
              <a-date-picker
                format="YYYY"
                mode="year"
                :value="year"
                placeholder="请选择年份"
                @panelChange="handleYearPicker"
                @openChange="handleOpenChange"
                :allowClear="false"
              />
              <a-button type="primary" icon="search" @click="jumpToPage">查询</a-button>
            </a-list-item>
          </a-list>
        </a-col>-->
      </a-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data(){
    return {
      options: [
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
                  value: 'aquaticFarmingSeaBeed',
                  label: '按养殖品种分'
                },
                {
                  value: 'aquaticFarmingSeaWay',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            },
            {
              value   : 'scpzcl-dsyz',
              label   : '养殖产品（淡水养殖）',
              children: [
                {
                  value: 'aquaticFarmingFreshBeed',
                  label: '按养殖品种分'
                },
                {
                  value: 'aquaticFarmingFreshWay',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            },
            {
              value   : 'scpzcl-hybl',
              label   : '捕捞产品（海洋捕捞）',
              children: [
                {
                  value: 'aquaticCatchSeaBeed',
                  label: '按捕捞品种分'
                },
                {
                  value: 'aquaticCatchSeaArea',
                  label: '按捕捞海域和捕捞渔具分'
                }
              ]
            },
            {
              value   : 'scpzcl-dsbl',
              label   : '捕捞产品（淡水捕捞）',
              children: [
                {
                  value: 'aquaticCatchFreshBeed',
                  label: '按捕捞品种分'
                }
              ]
            },
            {
              value: 'aquaticOcean',
              label: '捕捞产品（远洋渔业）'
            }
          ]
        },
        {
          value   : 'scyzmj',
          label   : '水产养殖面积',
          children: [
            {
              value: 'aquacultureFreshArea',
              label: '淡水养殖面积（按养殖水域和养殖方式分）'
            },
            {
              value   : 'scyzmj-hsyzmj',
              label   : '海水养殖面积',
              children: [
                {
                  value: 'aquacultureSeaAreaBeed',
                  label: '按养殖品种分'
                },
                {
                  value: 'aquacultureSeaAreaWay',
                  label: '按养殖水域和养殖方式分'
                }
              ]
            }
          ]
        },
        {
          value: 'waterFry',
          label: '水产苗种产量'
        },
        {
          value: 'familyInOut',
          label: '渔民家庭收支'
        },
        {
          value   : 'yyrkNcyry',
          label   : '渔业人口与从业人员',
          children: [
            {
              value: 'staff',
              label: '渔业人口与从业人员'
            },
            {
              value: 'seaStaff',
              label: '海洋渔业人口与从业人员'
            }
          ]
        },
        {
          value   : 'scpjg',
          label   : '水产品加工',
          children: [
            {
              value: 'aquaticRepairSum',
              label: '水产加工品总量'
            },
            {
              value: 'aquaticRepairStatus',
              label: '水产加工企业、冷库情况'
            }
          ]
        }
      ],
      indicators: 'fishProduction',
      year      : (new Date().getFullYear() - 1).toString(),
      labels    : [],
      isopen    : false,
    }
  },
  methods: {
    jumpToPage() {
      // this.labels = JSON.stringify(this.labels)
      console.log(this.labels)
      this.$router.push({
        name  : 'dataSearch',
        params: { indicators: this.indicators,year: this.year,labels: this.labels }
      })
    },
    handleChange(data) {
      // this.indicators = data
      this.indicators = data[data.length-1]
    },
    handleYearPicker(year) {
      this.year = moment(year).format('YYYY')
      this.isopen = false
    },
    reset(){
      this.year = null
    },
    displayRender({ labels }) {
      this.labels = labels
      return labels[labels.length-1]
    },
    handleOpenChange(status) {
      if (status) {
        this.isopen = true
      } else {
        this.isopen = false
      }
    },
  },
}
</script>

<style scoped>
.background {
  height: 100px;
  margin: 10px 0px 20px 0px;
}

.searchWrapper {
  height: 100px;
  max-width: 1000px;
  margin: 0 auto;
}

.background .right-content {
  text-align: left;
  margin: 0px;
}
</style>
