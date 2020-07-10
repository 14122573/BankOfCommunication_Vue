<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span class="title">轮播图排序</span>
      <div class="detailOperations">
        <a-button @click="$router.back()">取消</a-button>
        <a-button type="primary" @click="saveBanner()">保存</a-button>
      </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <div class="layoutMargin detailsPartSection">
          <p class="detailsPartTitle">轮播图信息</p>
          <div style="margin:0 16px;">
            <a-form :form="form">
              <a-table :columns="columns" :data-source="histortySortedData" rowKey="sort">
                <span slot="sort" slot-scope="text, record, index">
                  <span>{{ index + 1 }}</span>
                </span>
                <span slot="dropdown" slot-scope="text, record"> 
                  <template v-if="!!record.bannerName">
                    {{record.bannerName}} 
                  </template>
                  <template v-else> 
                    <a-form-item>
                      <a-select
                        @change="val => changeSort(val, record)"
                        placeholder="请选择需要排序的轮播图"
                      >
                        <a-select-option
                          v-for="(item) in sortedBanner"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.bannerName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </template> 
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button @click="deleteSort(record)" :disabled="!!record.bannerName?false:true">删除排序</a-button>
                </span>
              </a-table>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      columns  : [
        {
          title      : '序号',
          dataIndex  : 'sort',
          key        : 'sort',
          scopedSlots: {
            customRender: 'sort'
          }
        },
        {
          title      : '轮播图',
          dataIndex  : 'carousel',
          key        : 'carousel',
          scopedSlots: {
            customRender: 'dropdown'
          },
          width: 700
        },
        {
          title      : '操作',
          dataIndex  : 'action',
          key        : 'action',
          scopedSlots: {
            customRender: 'action'
          },
          width: 200
        }
      ],
      form              : this.$form.createForm(this),
      histortySortedData: [], // 已经拍过序的 包含8个包括空置的
      alreadySorted     : [], // 已暂时排序的
      bannerData        : [], // 所有的轮播图信息，包括排序和没排序的
      sortedBanner      : [], // 可供排序的轮播图
      bannerSort        : {}, // 已暂时排序的
      bannerTemp        : [], // 还没排序的
      bannerPingjie     : []  // 已选择的内容 
    }
  },
  mounted() {
    this.getCurrentBannerList()
    this.getAvailableSortList()
  },
  methods: {
    /**
     * @description 获取当前所有的banner图信息
     */
    getCurrentBannerList() {
      this.$ajax
        .get({
          url   : this.$api.GET_BANNER_LIST,
          params: {
            bannerGroup_nin: 0
          }
        })
        .then(res => { 
          if (res.code === '200') {
            this.bannerData = this.$com.confirm(res, 'data.content', [])
            this.histortySortedData= []
            for (let i = 1; i <= 8; i++) {
              let target = {}
              for(let j = 0; j < this.bannerData.length; j++){
                if(i==this.bannerData[j].bannerGroup){
                  target = Object.assign({},this.bannerData[j])
                }
              }
              this.histortySortedData.push({
                sort      : i.toString(),
                bannerName: !target.bannerName?'':target.bannerName,
                imgId     : !target.imgId?'':target.imgId,
                id        : !target.id?'':target.id
              })
            }

            for(let i = 0; i < this.bannerData.length; i++) {
              if(this.bannerData[i].bannerGroup !== '0') {
                this.alreadySorted.push({
                  id  : this.bannerData[i].id,
                  sort: this.bannerData[i].bannerGroup
                })
              }
            }
          } else {
            this.$message.error(res.msg)
          }
        })
    },

    /**
     * @description 获取当前可排序的banner图信息
     */
    getAvailableSortList() {
      let that = this
      this.$ajax
        .get({
          url   : this.$api.GET_BANNER_SORT,
          params: {
            bannerGroup: 0
          }
        })
        .then(res => {
          if (res.code === '200') {
            this.bannerTemp = this.$com.confirm(res, 'data.content', [])
            this.sortedBanner = [].concat(this.bannerTemp)
          } else {
            this.$message.error(res.msg)
          }
        })
    },

    /**
     * @description 在选中某个轮播图后，在其他选择框中不可再选中该轮播图
     * @param {String} value 轮播图对应的id
     * @param {Array} record 轮播图对应的暂时排序
     */
    changeSort(value, record) { 
      for(let i = 0; i < this.bannerPingjie.length; i++) {
        if(this.bannerPingjie[i].sort == record.sort) {
          this.bannerPingjie.splice(i,1)
        }
      }
      this.bannerPingjie.push(
        {
          'id'  : value, 
          'sort': record.sort
        }
      )
      this.bannerSort[record.sort] = value
      let temp= [].concat(this.bannerTemp)
      for(let i=0;i<temp.length;i++){
        for(let key in this.bannerSort){
          if(temp[i].id == this.bannerSort[key]){
            temp.splice(i, 1)
            i--
            break
          }
        }
      }
      this.sortedBanner = [].concat(temp)
    },

    /**
     * @description 删除某个已排过序的轮播图
     * @param {Array} value 删除的轮播图内容
     */
    deleteSort(value) { 
      this.$ajax
        .put({
          url   : this.$api.DELETE_BANNER.replace('{id}', value.id),
          params: {
            id: value.id
          }
        })
        .then(res=>{
          if(res.code=='200') {
            for(let i = 0; i < this.alreadySorted.length; i++) {
              if(this.alreadySorted[i].id == value.id) {
                this.alreadySorted.splice(i, 100)
              }
            } 
            // 将需要删除的banner图从bannerPingjie中删除
            this.$message.success('删除成功')
            this.getCurrentBannerList()
            this.getAvailableSortList()
            // this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
    },

    /**
     * @description 保存当前的轮播图设定
     */
    saveBanner() {
      // historySortedData -> 已经拍过序的 包含8个包括空置的
      // bannerPingjie     -> 已选择的内容 
      for(let i =0; i < this.alreadySorted.length; i++) {
        if(this.bannerPingjie.indexOf(this.alreadySorted[i]) == -1) {
          this.bannerPingjie.push(this.alreadySorted[i])
        }
      }

      this.$ajax
        .put({
          url   : this.$api.PUT_BANNER_SORT,
          params: this.bannerPingjie
        })
        .then(res => {
          if (res.code === '200') {
            this.$message.success('排序成功')
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
      
    }
  }
}
</script>

<style scoped>
.ant-form-item {
  margin: 0px
}
</style>