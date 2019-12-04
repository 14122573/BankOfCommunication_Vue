<template>
  <div class="veterinary">
    	<div class="portalDetailTitle">
			<span class="title">查询所有兽医</span>
			<div class="detailOperations">
				<a-button @click="backPage"> 返回 </a-button>
			</div>
		</div>
    <!-- <a-button class="backPage" type="danger" @click="backPage">返 回</a-button> -->
      <a-form class="veterinaryForm" :form="veterinaryForm">
        <a-row class="formItemLine" type="flex" :justify="simpleSearchForm?'end':'space-between'" align='top' :gutter="simpleSearchForm?18:0">
          <!-- 兽医类型选择框 -->
          <a-col span="4">
            <a-form-item :label="simpleSearchForm?'':'类型'" >
              <a-select change="changeArea()" placeholder="请选择兽医类型" v-decorator="['type',  { initialValue:'3',rules: [{ required: true, message: 'Please input your note!' }] }]">
                <a-select-option value="3">全部类型</a-select-option>
                <a-select-option value="0">乡村兽医</a-select-option>
                <a-select-option value="1">官方兽医</a-select-option>
                <a-select-option value="2">执业兽医</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- 模糊搜索文字参数 info -->
          <a-col span="6">
            <a-form-item :label="simpleSearchForm?'':'关键字'" class="formItem" >
              <a-input placeholder="请输入查询内容" v-decorator="['info']" />
            </a-form-item>
          </a-col>
          <!-- 省市县区 -->
          <a-col span="8">
            <a-form-item>
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
          </a-col>
        </a-row>
      </a-form>
      <p class="gayLine noline" ></p>
      <div class="formListShow" v-if="formList.length>0">
        <a-card  v-for="(item,i) in formList" :key="i" :title="item.name" style="width: 23%; float:left; margin:1% ">
          <a href="javascript:void(0)" slot="extra" @click.prevent="toView(item.publicInfoId,item.type)">查看</a>
          <p>性别:{{item.gender== 0 ? '男':'女'}}</p>
          <p>执业类别:{{item.profession}}</p>
          <p v-if="item.education==0">最高学历:小学</p>
          <p v-else-if="item.education==1">最高学历:初中</p>
          <p v-else-if="item.education==2">最高学历:中专/高中</p>
          <p v-else-if="item.education==3">最高学历:专科</p>
          <p v-else-if="item.education==4">最高学历:本科</p>
          <p v-else-if="item.education==5">最高学历:硕士研究生</p>
          <p v-else-if="item.education==6">最高学历:博士研究生</p>
          <p v-else-if="item.education==7">最高学历:博士后</p>
          <p>毕业院校:{{item.graduationSchool}}</p>
          <p>所学专业:{{item.speciality}}</p>
          <p>学校类别:{{item.schoolType}}</p>
          <p>工作单位:{{item.unit}}</p>
          <p>资格证号:{{item.qualificationNumber}}</p>
          <p>居住地:{{item.address}}</p>
        </a-card>
      </div>
      <div class="NoformListShow" v-else>
        <p>暂无数据</p>
      </div>

	</div>
</template>
<script>
export default {
  data() {
    return {
      arr:[],
      rules:{
        // 相关管理信息
        type:[
          { required: true, message: '请选择类型!' }
        ]
      },
      formList:[
      ],
      options: {
        areas: [],
      },
      simpleSearchForm:true, //
      pagination: {
      },
    }
  },
  computed:{
  },
  methods: {
    // 切换地区
    changgArea(){
      this.arr = []
    },
    //去详情
    toView(id,type){
      this.$router.push({
        name: '/veterinary/view',
        query: {
          id,
          type,
        }
      })
    },
    // 返回前一页
    backPage() {
      this.$router.push({name:'home'})
      sessionStorage.removeItem('isReload')
    },
    async getAreas(selectedOptions) { // 初始化或者根据选择来获取省市区级联选择框的数据
      let targetOption = null
      if (selectedOptions) {
        targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
      }
      await this.$ajax.get({
        url: this.$api.GET_PUBLIC_AREA_NEXT,
        params: {
          parentId: targetOption ? targetOption.value : '999999',
        },
        hideLoading: true,
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        const result = datas.map(item => {
          return {
            label: item.areaName,
            value: item.id,
            isLeaf: item.lv > 3,
          }
        })
        if (targetOption) {
          targetOption.loading = false
          targetOption.children = result
        } else {
          this.options.areas = result
        }
        this.options.areas = [...this.options.areas]
        // console.log(this.options.areas)
      })
    },
    async setAreaOptions(ids) { // 处理数据来回显省市区级联选择框的数据
      // console.log(ids)
      if (!ids || ids.length <= 0) return
      await this.$ajax.all(
        this.$ajax.get({
          url: this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[0],
          },
          hideLoading: true,
        }),
        this.$ajax.get({
          url: this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[1],
          },
          hideLoading: true,
        }),
        this.$ajax.get({
          url: this.$api.GET_PUBLIC_AREA_NEXT,
          params: {
            parentId: ids[2],
          },
          hideLoading: true,
        }),
      ).then(res => {
        const lv2 = this.$com.confirm(res[0], 'data.content', [])
        const lv3 = this.$com.confirm(res[1], 'data.content', [])
        const lv4 = this.$com.confirm(res[2], 'data.content', [])
        const result = [...this.options.areas]
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
                        label: l3.areaName,
                        value: l3.id,
                        isLeaf: l3.lv > 3,
                      }
                    })
                  }
                  children.push(l3)
                })
                l2.children = children.map(l2 => {
                  return {
                    label: l2.areaName,
                    value: l2.id,
                    isLeaf: l2.lv > 3,
                    children:l2.children
                  }
                })
              }
              children.push(l2)
            })
            l1.children = children.map(l1 => {
              return {
                label: l1.areaName,
                value: l1.id,
                isLeaf: l1.lv > 3,
                children: l1.children,
              }
            })
          }
        })
        this.options.areas = result
        // 表单的area赋值
        this.veterinaryForm.setFieldsValue({
          area: ids,
        })
      })
    },
    // 查询按钮
    search() {
      sessionStorage.setItem('isReload', true)
      this.getList()
      this.arr = this.veterinaryForm.getFieldValue('area') || []
      // console.log(this.arr)
    },
    // 重置按钮
    reset() {
      this.veterinaryForm.resetFields()
      this.formList=[]
      // this.arr = []
    },
    // 查询列表
    async getList() {
      let areas = this.veterinaryForm.getFieldValue('area') || this.arr || []
      let provinceId= areas[0] || ''
      let cityId= areas[1] || ''
      let countyId= areas[2] || ''
      let townId= areas[3] || ''
      //判断是否选择省市县区 并赋值给对应的省市县的key
      if(this.veterinaryForm.getFieldValue('area')){
        let i = this.veterinaryForm.getFieldValue('area').length> 0 ? this.veterinaryForm.getFieldValue('area').length :0
        if (i == 4) {
          provinceId = this.veterinaryForm.getFieldValue('area')[0].split('#')[0]
          cityId = this.veterinaryForm.getFieldValue('area')[1].split('#')[0]
          countyId = this.veterinaryForm.getFieldValue('area')[2].split('#')[0]
          townId = this.veterinaryForm.getFieldValue('area')[3].split('#')[0]
        } else if(i==3){
          provinceId = this.veterinaryForm.getFieldValue('area')[0].split('#')[0]
          cityId = this.veterinaryForm.getFieldValue('area')[1].split('#')[0]
          countyId = this.veterinaryForm.getFieldValue('area')[2].split('#')[0]
        } else if (i==2) {
          provinceId = this.veterinaryForm.getFieldValue('area')[0].split('#')[0]
          cityId = this.veterinaryForm.getFieldValue('area')[1].split('#')[0]
        } else if (i==1) {
          provinceId = this.veterinaryForm.getFieldValue('area')[0].split('#')[0]
        }
      }
      // 将搜索条件拼接为一个对象
      let searchParams = Object.assign({},{
        // 兽医类型
        type: !this.veterinaryForm.getFieldValue('type')?'3':this.veterinaryForm.getFieldValue('type'),
        // 文本搜索值
        info: !this.veterinaryForm.getFieldValue('info')?'':this.veterinaryForm.getFieldValue('info'),
        // 省
        provinceId: !provinceId ? '' : provinceId,
        // 市
        cityId:!cityId ? '' : cityId,
        // 县
        countyId:!countyId ? '' : countyId,
        // 街道
        townId: !townId ? '' : townId,
      })
      // console.log(searchParams)
      await this.$ajax.get({
        url: this.$api.GET_VETERINARYALL,
        params: searchParams
      }).then(res => {
        if (res.code === '200') {
          this.formList = this.$com.confirm(res, 'data.content', [])
        } else {
          this.$message.error(res.msg)
        }
        // 存储当前页面列表的搜索信息
        this.$com.storeSearchParams(
          this.$route.name,
          '1',
          Object.assign({},{
            // 兽医类型
            type: !searchParams.type?'':searchParams.type,
            // 文本搜索值
            info: !searchParams.info?'':searchParams.info,
            // 省
            provinceId: !searchParams.provinceId?'':searchParams.provinceId,
            // 市
            cityId: !searchParams.cityId?'':searchParams.cityId,
            // 县
            countyId: !searchParams.countyId?'':searchParams.countyId,
            // 街道
            townId: !searchParams.townId?'':searchParams.townId,
          })
        )
      })
    },
    /**
     * 从vuex中或已存储的搜索条件，判断此条件是否为当前路由的 。如果是则使用
     */
    async getSearchParams(){
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
      await this.setAreaOptions(this.arr)
      this.getList()
    },
  },
  beforeCreate() {
    this.veterinaryForm = this.$form.createForm(this)
  },
  async mounted() {
    await this.getAreas(null)
    if(sessionStorage.getItem('isReload')){
      if(this.$route.name == '/veterinary'){
        this.$nextTick(function () {
          this.getSearchParams()
        })
      }
    }
  },
}
</script>
<style scoped>
  .veterinary{
    width: 100%;
    position: relative;
    background-color: #fff;
    overflow-x:hidden;
  }
  .veterinaryForm{
    margin-top: 50px;
    text-align: center;
  }
	.page-row {
		margin-top: 20px;
  }

  .noline{
    background-color: #f0f2f5;
    height: 20px;
  }
  .formListShow p{
    width:100%;
    /* height:30px; */
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .NoformListShow p{
      text-align: center;
      line-height:330px;
      /* background-color: #fff; */
      color: #ccc;
  }
  .algin-right {
    margin-right: 4px;
  }
</style>
