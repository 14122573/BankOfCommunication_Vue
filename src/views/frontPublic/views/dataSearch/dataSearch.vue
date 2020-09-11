<template>
  <div>
    <div class="background">
      <div class="pageWrapper">
        <Navbar class="navbar" />
        <div class="content">
          <a-row class="row_style">
            <a-col :span="12">
              指标名称：
              <a-cascader
                :options="options"
                placeholder="请选择指标名称"
                @change="handleChange"
                :display-render="displayRender"
                :allow-clear="false"
                :default-value="[queryParams.zhibiaoValue]"
              />
            </a-col>
            <a-col :span="12">
              <contrast :year.sync="queryParams.year" :yearList="yearList"></contrast>
            </a-col>
          </a-row>
          <a-row style="height: 20px"/>
          <a-row style="background-color: #FFF">
            <component :is="queryParams.zhibiaoValue" :queryParams="queryParams"></component>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'

import contrast from '@/components/Cockpit/contrast'

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
    aquaticRepairStatus,
    contrast
  },
  created() {
    this.$ajax.get({
      url: this.$api.GET_DATA_FP_YEAR,
    }).then(res => {
      this.yearList = res.data
    })
    if(this.$route.params.indicators){
      this.queryParams.zhibiaoValue = this.$route.params.indicators
      this.queryParams.year = this.$route.params.year
    }else {
      this.queryParams.year = (new Date().getFullYear() - 1).toString()
    }
  },
  watch: {
    'queryParams.zhibiaoValue': {
      handler: function(val) {
        // eslint-disable-next-line default-case
        switch (val) {
        case 'fishProduction' :
          this.$ajax.get({
            url: this.$api.GET_DATA_FP_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticFarmingSeaBeed' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AFSB_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticFarmingSeaWay' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AFSW_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticFarmingFreshBeed' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AFFB_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticFarmingFreshWay' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AFFW_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticCatchSeaBeed' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ACSB_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticCatchSeaArea' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ACSA_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticCatchFreshBeed' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ACFB_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticOcean' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AO_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquacultureFreshArea' :
          this.$ajax.get({
            url: this.$api.GET_DATA_AFA_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquacultureSeaAreaBeed' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ASAB_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquacultureSeaAreaWay' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ASAW_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'waterFry' :
          this.$ajax.get({
            url: this.$api.GET_DATA_WF_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'familyInOut' :
          this.$ajax.get({
            url: this.$api.GET_DATA_FIO_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'staff' :
          this.$ajax.get({
            url: this.$api.GET_DATA_STAFF_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'seaStaff' :
          this.$ajax.get({
            url: this.$api.GET_DATA_SEASTAFF_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticRepairSum' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ARSUM_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        case 'aquaticRepairStatus' :
          this.$ajax.get({
            url: this.$api.GET_DATA_ARSTATUS_YEAR,
          }).then(res => {
            this.yearList = res.data
          })
          break
        }
      }
    }
  },
  methods: {
    handleChange(data) {
      this.queryParams.zhibiaoValue = data[data.length-1]
    },
    displayRender({ labels }) {
      if (labels.length){
        return labels[labels.length-1]
      }
      return this.$route.params.labels[this.$route.params.labels.length-1]
    }
  },
  data() {
    return {
      yearList   : [],
      queryParams: {
        zhibiaoValue: 'fishProduction',
        year        : (new Date().getFullYear() - 1).toString()
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


