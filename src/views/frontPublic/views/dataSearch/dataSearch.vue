<template>
  <div>
    <div class="background">
      <div class="pageWrapper">
        <Navbar class="navbar" />
        <div class="content">
          <a-row class="row_style">
            <a-col :span="12">
              指标名称:
              <a-cascader
                :options="options"
                placeholder="请选择指标名称"
                @change="handleChange"
                :display-render="displayRender"
                :default-value="[queryParams.zhibiaoValue]"
              />
            </a-col>
            <a-col :span="12">
              请选择年份：
              <a-date-picker
                :open="isopen"
                :value="queryParams.year"
                mode="year"
                format="YYYY"
                placeholder="请选择年份"
                @panelChange="handleYearPicker"
                @openChange="handleOpenChange"
                :allowClear="false"
              ><a-icon slot="suffixIcon" v-if="queryParams.year != null" type="close-circle" @click.stop="reset" /></a-date-picker>
            </a-col>
            <!--<a-col :span="6">
              <a-row type="flex" justify="end">
                <a-col :span="24">
                  <a-button type="primary" @click="showResult"
                    >提交</a-button
                  >
                  <a-button type="default">重置</a-button>
                </a-col>
              </a-row>
            </a-col>-->
          </a-row>
          <a-row style="height: 20px"/>
          <a-row style="background-color: #FFF">
  <!--          <SearchResult :query="query"/>-->
            <component :is="queryParams.zhibiaoValue" :queryParams="queryParams"></component>
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
import aquaticFarmingSeaBeed from '@/views/frontPublic/views/dataSearch/searchResult/aquaticFarmingSeaBeed.vue'
import aquaticFarmingSeaWay from '@/views/frontPublic/views/dataSearch/searchResult/aquaticFarmingSeaWay.vue'
import aquaticFarmingFreshBeed from '@/views/frontPublic/views/dataSearch/searchResult/aquaticFarmingFreshBeed.vue'
import aquaticFarmingFreshWay from '@/views/frontPublic/views/dataSearch/searchResult/aquaticFarmingFreshWay.vue'

import aquaticCatchSeaBeed from '@/views/frontPublic/views/dataSearch/searchResult/aquaticCatchSeaBeed.vue'
import aquaticCatchSeaArea from '@/views/frontPublic/views/dataSearch/searchResult/aquaticCatchSeaArea.vue'
import aquaticCatchFreshBeed from '@/views/frontPublic/views/dataSearch/searchResult/aquaticCatchFreshBeed.vue'

import aquaticOcean from '@/views/frontPublic/views/dataSearch/searchResult/aquaticOcean.vue'

import aquacultureFreshArea from '@/views/frontPublic/views/dataSearch/searchResult/aquacultureFreshArea.vue'
import aquacultureSeaAreaBeed from '@/views/frontPublic/views/dataSearch/searchResult/aquacultureSeaAreaBeed.vue'
import aquacultureSeaAreaWay from '@/views/frontPublic/views/dataSearch/searchResult/aquacultureSeaAreaWay.vue'

import waterFry from '@/views/frontPublic/views/dataSearch/searchResult/waterFry.vue'

import familyInOut from '@/views/frontPublic/views/dataSearch/searchResult/familyInOut.vue'

import staff from '@/views/frontPublic/views/dataSearch/searchResult/staff.vue'
import seaStaff from '@/views/frontPublic/views/dataSearch/searchResult/seaStaff.vue'

import aquaticRepairSum from '@/views/frontPublic/views/dataSearch/searchResult/aquaticRepairSum.vue'
import aquaticRepairStatus from '@/views/frontPublic/views/dataSearch/searchResult/aquaticRepairStatus.vue'

export default {
  components: {
    Navbar,
    fishProduction,
    aquaticFarmingSeaBeed,
    aquaticFarmingSeaWay,
    aquaticFarmingFreshBeed,
    aquaticFarmingFreshWay,
    aquaticCatchSeaBeed,
    aquaticCatchSeaArea,
    aquaticCatchFreshBeed,
    aquaticOcean,
    aquacultureFreshArea,
    aquacultureSeaAreaBeed,
    aquacultureSeaAreaWay,
    waterFry,
    familyInOut,
    staff,
    seaStaff,
    aquaticRepairSum,
    aquaticRepairStatus
  },
  created() {
    if(this.$route.params.indicators){
      this.queryParams.zhibiaoValue = this.$route.params.indicators
    }
    if(this.queryParams.zhibiaoValue){
      this.queryParams.year = this.$route.params.year
    }
    // console.log(this.$route.params.indicators)
    // console.log(this.queryParams.zhibiaoValue)
  },
  methods: {
    handleChange(data) {
      // console.log(data[data.length-1])
      this.queryParams.zhibiaoValue = data[data.length-1]
      // console.log(typeof this.queryParams.zhibiaoValue)
    },
    handleYearPicker(year) {
      this.queryParams.year = moment(year).format('YYYY')
      // console.log(typeof(this.queryParams.year))
      this.isopen = false
    },
    handleOpenChange(status) {
      if (status) {
        this.isopen = true
      } else {
        this.isopen = false
      }
    },
    displayRender({ labels }) {
      if (labels.length){
        return labels[labels.length-1]
      }
      return this.$route.params.labels[this.$route.params.labels.length-1]
    },
    reset(){
      this.queryParams.year = null
    }
  },
  data() {
    return {
      // yearPickerValue: null,
      // zhibiaoValue   : 'fishProduction',
      searchResult: [],
      isopen      : false,
      queryParams : {
        zhibiaoValue: 'fishProduction',
        year        : null
      },
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

.row_style {
  background-color: #FFF;
  line-height: 120px
}

.pageWrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0px 0px 50px 0px;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .content {
  background-color: #f1f5f8;
}
</style>


