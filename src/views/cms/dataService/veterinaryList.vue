<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle" v-if="this.$route.name.indexOf('home') < 0">
			<span class="title">查询所有兽医</span>
			<div class="detailOperations">
				<a-button @click="backPage"> 返回 </a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <a-form class="veterinaryForm" :form="veterinaryForm">
          <a-row class="formItemLine" type="flex" :justify="simpleSearchForm?'end':'space-between'" align='top' :gutter="simpleSearchForm?18:0">
            <!-- 兽医类型选择框 -->
            <a-col span="4">
              <a-form-item :label='"类型"' class="formItem" :label-col="{span:7}" :wrapper-col="{span:17}">
                <a-select change="changeArea()" placeholder="请选择兽医类型" v-decorator="['type',  { initialValue:'3',rules: [{ message: 'Please input your note!' }] }]">
                  <a-select-option value="3">全部类型</a-select-option>
                  <a-select-option value="0">乡村兽医</a-select-option>
                  <a-select-option value="1">官方兽医</a-select-option>
                  <a-select-option value="2">执业兽医</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- 模糊搜索文字参数 info -->
            <a-col span="6">
              <a-form-item label="关键字" class="formItem" :label-col="{span:7}" :wrapper-col="{span:17}">
                <a-input placeholder="请输入查询内容" v-decorator="['info']" />
              </a-form-item>
            </a-col>
            <!-- 省市县区 -->
            <a-col span="8" v-show="!simpleSearchForm">
              <a-form-item label="区域选择" class="formItem" :label-col="{span:7}" :wrapper-col="{span:17}">
                <a-cascader
                  v-decorator="['area']"
                  :options="options.areas"
                  :loadData="getAreas"
                  placeholder="请选择地区"
                  changeOnSelect
                />
              </a-form-item>
            </a-col>
            <!-- 功能按钮区 -->
            <a-col span="5" class="algin-right">
              <a-button @click="reset">重置</a-button>
              <a-button type="primary" @click="search">搜索</a-button>
              <a-button type="primary" v-if='simpleSearchForm' @click="showMoreSearch">更多搜索</a-button>
              <a-button type="primary" v-if='!simpleSearchForm' @click="closeMoreSearch">简单搜索</a-button>
            </a-col>
          </a-row>
        </a-form>
        <p class="gayLine" ></p>
        <div class="formListShow" v-if="formList.length>0">
          <a-card size="small"  v-for="(item,i) in formList" :key="i" :title="item.name" style="width: 23%; float:left; margin:1% ">
            <a href="javascript:void(0)" slot="extra" @click.prevent="toView(item.publicInfoId,item.type)">查看</a>
            <p v-bind="colSpa">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:&nbsp;{{item.gender== 0 ? '男':'女'}}</p>
            <p>执业类别:&nbsp;{{item.profession}}</p>
            <p v-if="item.education==0">最高学历:&nbsp;小学</p>
            <p v-else-if="item.education==1">最高学历:&nbsp;初中</p>
            <p v-else-if="item.education==2">最高学历:&nbsp;中专/高中</p>
            <p v-else-if="item.education==3">最高学历:&nbsp;专科</p>
            <p v-else-if="item.education==4">最高学历:&nbsp;本科</p>
            <p v-else-if="item.education==5">最高学历:&nbsp;硕士研究生</p>
            <p v-else-if="item.education==6">最高学历:&nbsp;博士研究生</p>
            <p v-else-if="item.education==7">最高学历:&nbsp;博士后</p>
            <p v-else >最高学历:</p>
            <p>毕业院校:&nbsp;{{item.graduationSchool}}</p>
            <p>所学专业:&nbsp;{{item.speciality}}</p>
            <p>学校类别:&nbsp;{{item.schoolType}}</p>
            <p>工作单位:&nbsp;{{item.unit}}</p>
            <p>资格证号:&nbsp;{{item.qualificationNumber}}</p>
            <p>居住地&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{{item.address}}</p>
          </a-card>
        </div>
        <div class="NoformListShow" v-else>
          <img class="noImg" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K" alt="">
          <p>暂无数据</p>
        </div>
      </div>

    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      colSpa: {
        labelCol  : { span: 10 },
        wrapperCol: { span: 12 }
      },
      textSpa: {
        labelCol  : { span: 5 },
        wrapperCol: { span: 18 }
      },
      arr  : [],
      rules: {
        // 相关管理信息
        type: [
          { required: true, message: '请选择类型!' }
        ]
      },
      formList: [],
      options : {
        areas: [],
      },
      simpleSearchForm: true, //
      pagination      : {
      },
    }
  },
  computed: {
  },
  methods: {
    closeMoreSearch(){
      this.simpleSearchForm = true
    },
    showMoreSearch(){
      this.simpleSearchForm = false
    },
    // 切换地区
    changgArea(){
      this.arr = []
    },
    //去详情
    toView(id,type){
      if (typeof(this.$cookie.get('token')) == 'undefined') {
        this.$router.push({
          name : '/veterinary/view',
          query: {
            id,
            type,
          }
        })
      }else{
        this.$router.push({
          name : 'homeVeterinaryView',
          query: {
            id,
            type,
          }
        })
      }

    },
    // 返回前一页
    backPage() {
      this.$router.push({ name: 'home' })
      sessionStorage.removeItem('isReload')
    },
    async getAreas(selectedOptions) { // 初始化或者根据选择来获取省市区级联选择框的数据
      let targetOption = null
      if (selectedOptions) {
        targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
      }
      await this.$ajax.get({
        url   : this.$api.GET_PUBLIC_AREA_NEXT,
        params: {
          parentId: targetOption ? targetOption.value : '0',
        },
        hideLoading: true,
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        const result = datas.map(item => {
          return {
            label : item.areaName,
            value : item.id,
            isLeaf: item.lv > 3,
          }
        })
        if (targetOption) {
          targetOption.loading = false
          targetOption.children = result
        } else {
          this.options.areas = result
        }
        this.options.areas = [ ...this.options.areas ]
        // console.log(this.options.areas)
      })
    },
    async setAreaOptions(ids) { // 处理数据来回显省市区级联选择框的数据
      // console.log(ids)
      if (!ids || ids.length <= 0) return
      await this.$ajax.all(
        this.$ajax.get({
          url   : this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[0],
          },
          hideLoading: true,
        }),
        this.$ajax.get({
          url   : this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[1],
          },
          hideLoading: true,
        }),
        this.$ajax.get({
          url   : this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[2],
          },
          hideLoading: true,
        }),
      ).then(res => {
        const lv2 = this.$com.confirm(res[0], 'data.content', [])
        const lv3 = this.$com.confirm(res[1], 'data.content', [])
        const lv4 = this.$com.confirm(res[2], 'data.content', [])
        const result = [ ...this.options.areas ]
        result.forEach(l1 => {
          if (l1.value == ids[0]) {
            const children = []
            lv2.forEach(l2 => {
              if (l2.id == ids[1]) {
                const children = []
                lv3.forEach( l3 => {
                  if (l3.id == ids[2]) {
                    const children = []
                    l3.children = lv4.map(l3 => {
                      return {
                        label : l3.areaName,
                        value : l3.id,
                        isLeaf: l3.lv > 3,
                      }
                    })
                  }
                  children.push(l3)
                })
                l2.children = children.map(l2 => {
                  return {
                    label   : l2.areaName,
                    value   : l2.id,
                    isLeaf  : l2.lv > 3,
                    children: l2.children
                  }
                })
              }
              children.push(l2)
            })
            l1.children = children.map(l1 => {
              return {
                label   : l1.areaName,
                value   : l1.id,
                isLeaf  : l1.lv > 3,
                children: l1.children,
              }
            })
          }
        })
        this.options.areas = result

        // 表单的area赋值
        //   ???
        this.veterinaryForm.setFieldsValue({
          'area': ids,
        })
      })
    },
    // 查询按钮
    search() {
      sessionStorage.setItem('isReload', true)
      // 判断是否简单搜索,是则初始化省市县数据
      // console.log(!this.simpleSearchForm)
      if (!this.simpleSearchForm) {
        this.getList()
      } else {
        this.veterinaryForm.setFieldsValue({ 'area': [] })
        this.getList()
      }
    },
    // 重置按钮
    reset() {
      this.veterinaryForm.resetFields()
      this.formList=[]
      this.arr=[]
      sessionStorage.removeItem('isReload')
      // this.getList()
    },
    // 查询列表
    async getList() {
      let areas = this.veterinaryForm.getFieldValue('area') || this.arr || []
      let provinceId= areas[0] || ''
      let cityId= areas[1] || ''
      let countyId= areas[2] || ''
      let townId= areas[3] || ''
      // 将搜索条件拼接为一个对象
      let searchParams = Object.assign({},{
        // 兽医类型
        type      : !this.veterinaryForm.getFieldValue('type')?'3':this.veterinaryForm.getFieldValue('type'),
        // 文本搜索值
        info      : !this.veterinaryForm.getFieldValue('info')?'':this.veterinaryForm.getFieldValue('info'),
        // 省
        provinceId: !provinceId ? '' : provinceId,
        // 市
        cityId    : !cityId ? '' : cityId,
        // 县
        countyId  : !countyId ? '' : countyId,
        // 街道
        townId    : !townId ? '' : townId,
      })
      // console.log(searchParams)
      await this.$ajax.get({
        url   : this.$api.GET_VETERINARYALL,
        params: searchParams
      }).then(res => {

        if (res.code === '200') {
          this.formList = this.$com.confirm(res, 'data.content', [])
          // console.log(this.formList)

        } else {
          this.$message.error(res.msg)
        }
        //
        // 存储当前页面列表的搜索信息
        //
        this.$com.storeSearchParams(
          this.$route.name,
          '1',
          searchParams,
          Object.assign({},this.searchForm,{
            // 兽医类型
            type      : !searchParams.type?'':searchParams.type,
            // 文本搜索值
            info      : !searchParams.info?'':searchParams.info,
            // 省
            provinceId: !searchParams.provinceId?'':searchParams.provinceId,
            // 市
            cityId    : !searchParams.cityId?'':searchParams.cityId,
            // 县
            countyId  : !searchParams.countyId?'':searchParams.countyId,
            // 街道
            townId    : !searchParams.townId?'':searchParams.townId,
          })
        )
      })
    },

    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    getSearchParams(){
      let searchParams = !this.$store.state.listSearchParams?null:this.$store.state.listSearchParams[this.$route.name]
      if(!!searchParams && !!searchParams.routeName && (this.$route.name == searchParams.routeName)){
        if(!!searchParams.params){
          Object.keys(searchParams.params).forEach(elem=>{
            switch (elem) {
            case 'type':
              this.veterinaryForm.setFieldsValue({ 'type': searchParams.params[elem] })
              break
            case 'info':
              this.veterinaryForm.setFieldsValue({ 'info': searchParams.params[elem] })
              break
            case 'provinceId':
              this.arr.push(searchParams.params[elem])
              break
            case 'countyId':
              this.arr.push(searchParams.params[elem])
              break
            case 'cityId':
              this.arr.push(searchParams.params[elem])
              break
            case 'townId':
              this.arr.push(searchParams.params[elem])
              break
            default:
              break
            }
          })
        }
      }
      // console.log(this.$store.state.listSearchParams)
      // console.log(searchParams.params)
      // console.log(this.arr)
      this.setAreaOptions(this.arr)
      this.getList()
    },
  },
  beforeCreate() {
    this.veterinaryForm = this.$form.createForm(this)
  },
  async mounted() {
    await this.getAreas(null)
    if(sessionStorage.getItem('isReload')){
      if(this.$route.name == 'homeVeterinaryList' || this.$route.name == '/veterinary'){
        this.$nextTick(function () {
          this.getSearchParams()
        })
      }
    }
  },
}
</script>
<style scoped>
  .portalDetailWapper{
    position: relative;
    background-color: #fff;
    margin:16px;
    /* overflow-x:hidden; */
    height:auto;
  }
  .portalDetailContentWapper{
    padding: 20px;
  }
  .portalDetailContentBody{
    overflow: hidden;
    height:auto;
  }
  /* .veterinaryForm{
    margin-top: 50px;
    padding:20px;
    text-align: center;
  } */
	/* .page-row {
		margin-top: 20px;
  } */
  .formListShow p{
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .NoformListShow {
    position: relative;
  }
  .NoformListShow p{
      text-align: center;
      line-height:200px;
      color: #ccc;
      position: relative;
  }
  .noImg{
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%,-50%)
  }
  .algin-right {
    margin-right: 10px;
    margin-top: 4px;
  }
  .formListShow{
    /* height: auto; */
  }
</style>
