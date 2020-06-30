<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="main"> 
        <a-row>
          <a-col :span="4">&nbsp;</a-col>
          <a-col :span="16">
            <a-descriptions class="title" :title="list.name">
              <a-descriptions-item label="发稿人">{{
                list.creator
              }}</a-descriptions-item>
              <a-descriptions-item label="发布日期">{{
                list.startTime?list.startTime.slice(0, 10):''
              }}</a-descriptions-item>
              <a-descriptions-item label="来源">{{
                list.source
              }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :span="4">&nbsp;</a-col>
        </a-row>
        <a-divider type="horizontal"></a-divider>
        <a-card class="content" :bordered="false">
          {{ list.description }}
        </a-card>
      </div>
    </div>
    <div class="pageWrapper"> 
      <div class="main" style="padding-top:10px;">  
        <div style="height:40px;display:flex;align-items:center;padding-bottom:10px;margin-bottom:20px;border-bottom:1px solid #eee;">
            <img src="@/assets/images/home/tp_icon.png" alt=""><span class="votingTitle">投票</span> 
        </div>
        <div v-if="list.result=='0' || list.ruleNum>list.currentNum" :style="'text-align:left;background: url('+tp_bj+') #fff no-repeat right bottom;background-size:contain;'">
          <template v-for="(item, index) in list.subjects">
            <template v-if="item.type=='1'">
                <a-row :key="item.id" style="margin-bottom:20px;">
                  <a-col :span="24" class="radioTitle" >
                    <span v-if="item.isRequired === '0'" class="isMust">* </span>{{index+1}}.{{item.title}}<span> (多选)</span>
                  </a-col>
                  <!-- <a-col :span="24" v-for="v in item.options" :key="v.id" style="text-align:left;padding-bottom: 10px;"> -->
                    <!-- <img :src="dx2" alt="" style="width:16px"><span style="padding:0px 8px;">{{v.value}}</span> -->
                    <a-checkbox-group @change="(value)=>onCheckboxChange(value, item.id)" style="width:100%;">
                        <a-row>
                            <a-col v-for="v in item.options" :key="v.id" :span="24" style="padding-bottom: 10px;">
                                <a-checkbox  :value="v.id">
                                    <span class="radioItem">{{v.value}} </span>
                                </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
                  <!-- </a-col> -->
                </a-row>
            </template>
            <template v-else>
                <a-row :key="item.id" style="margin-bottom:20px;">
                  <a-col class="radioTitle" :span="24" >
                    <span v-if="item.isRequired === '0'" class="isMust">* </span>{{index+1}}.{{item.title}}<span> (单选)</span>
                  </a-col>
                  <a-col :span="24">
                    <a-radio-group v-model="value" @change="(e)=>onRadioChange(e, item.id)" style="display: flex;flex-direction: column;justify-content: space-between;">
                        <a-radio v-for="v in item.options" :key="v.id" :value="v.id" style="width:100%;padding-bottom: 10px;"> 
                            <span class="radioItem">{{v.value}} </span>
                        </a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
            </template>
          </template> 
          <a-button type="primary" @click="handleSubmit" style="">提交</a-button>
        </div>
        <div v-else class="votingCeiling">
          <img src="@/assets/images/home/tp_bg2.png" alt=""><span>您的投票次数已达上限</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'
import tp_bj from '@/assets/images/home/bg_tp.png' 

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      value : '',
      tp_bj, 
      params: {
        openId : '', //不传值
        results: [], //填写结果 
      },
      list: {
        id         : '334151729957199872',
        name       : '金正大董事长万连步代表：加强农业社会化服务业政策支持，促进乡村振兴',
        description: '随着我国工业化、城镇化的深度推进、农村劳动力的大量转移进城，我国第一产业劳动力占比已从1978年的70.5%，下降到2017年的27%，农业内部劳动力越来越少。2018年农民工数量超过2.88亿，且多以年轻劳动力为主，50岁及以下农民工所占比重超过75%。“大国小农”仍是相当长一段时间内我国的基本国情，如何把小农户生产引入现代农业发展轨道，提升农业生产效率，进而提升农产品竞争力，成为当前一个重要的时代命题。',
        startTime  : '2020-02-20',
        source     : '新闻网',
        creator    : '小明',
        sort       : '01',
        result     : '1',
        currentNum : 3,
        ruleNum    : 7,
        subjects   : [
          {
            description: null,
            id         : '111',
            isRequired : '0', //是否必填：0是，1否
            title      : '测试1',
            type       : '1', //0是单选，1是多选
            options    : [
              {
                id   : '111111',
                value: 'sssss',
              },
              {
                id   : '222222',
                value: 'fffff',
              },
            ] 
          },
          {
            description: null,
            id         : '333',
            isRequired : '0', //是否必填：0是，1否
            title      : '测试2',
            type       : '1', //0是单选，1是多选
            options    : [
              {
                id   : '333333',
                value: 'sssss',
              },
              {
                id   : '444444',
                value: 'fffff',
              },
            ] 
          },
          {
            description: null,
            id         : '222',
            isRequired : '1',
            title      : '测试3',
            type       : '0',
            options    : [
              {
                id   : '555555',
                value: 'sssss',
              },
              {
                id   : '666666',
                value: 'fffff',
              },
            ] 
          }, 
        ]
      }
    }
  },
  mounted(){
    this.$ajax.get({
      url: this.$api.GET_VOTE_INFO.replace('{id}', this.$route.query.id),
    }).then(res => {
      if(res.code == '200'){ 
        this.list = res.data.content
      }
    })
  },
  methods: {
    onCheckboxChange(value, id){   
      let arr = this.params.results
      if(arr.length==0){
        this.params.results.push({
          voteId   : this.list.id,
          subjectId: id,
          optionId : value[value.length-1]
        }) 
      }else{
        for(let i=0;i<this.params.results.length;i++){
          if(this.params.results[i].subjectId == id){
            this.params.results.splice(i, 1)
            i--
          }
        }  
        for(let j=0;j<value.length;j++){
          this.params.results.push({
            voteId   : this.list.id,
            subjectId: id,
            optionId : value[j]
          }) 
        }
      }  
    },
    onRadioChange(e, id){ 
      let arr = this.params.results
      if(arr.length==0){
        this.params.results.push({
          voteId   : this.list.id,
          subjectId: id,
          optionId : e.target.value
        }) 
      }else{
        let flag = false
        for(let i=0;i<arr.length;i++){
          if(arr[i].subjectId == id){
            arr[i].optionId = e.target.value
            flag = true
            break
          }
        } 
        if(!flag){
          this.params.results.push({
            voteId   : this.list.id,
            subjectId: id,
            optionId : e.target.value
          })  
        } 
      } 
    },  
    handleSubmit(){ 
      let subj = this.list.subjects
      for(let i=0;i<subj.length;i++){
        if(subj[i].isRequired == '0'){
          let flag = false
          for(let j=0;j<this.params.results.length;j++){ 
            if(this.params.results[j].subjectId == subj[i].id){ 
              flag = true
              break
            } 
          }
          if(!flag){
            return this.$modal.confirm({
              type   : 'error',
              icon   : 'exclamation-circle',
              title  : '警告',
              content: subj[i].title+'为必选项！', 
            })
          }
        }
      }
      this.$ajax.post({
        url   : this.$api.POST_VOTE.replace('{id}', this.list.id),
        params: this.params,
      }).then(res => {
        if(res.code == '200'){ 
          this.$modal.success({
            title  : '成功',
            content: '投票成功成功',
            okText : '确认',
          })
          this.$router.back()
        }
      })
    },
  },
}
</script>

<style scoped>
.pageWrapper {
  padding: 0px 180px 30px 180px;
  background-color: #f1f5f8;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .title {
  line-height: 30px;
}

.pageWrapper .main {
  background-color: #ffffff;
  padding: 50px 20px;
}

.pageWrapper .content {
  text-align: left;
  line-height: 30px;
}
</style>

<style lang="stylus">
// 主标题
.main[data-v-3d830607] .ant-descriptions-title {
  $megaFontSize()
}

// 标题下来源信息
.ant-row[data-v-3d830607] .ant-descriptions-item > span {
  $titleFontSize()
}

// 正文
.main[data-v-3d830607] .ant-card-body {
  $titleFontSize()
}
</style>
<style lang="stylus" scoped>
.votingTitle
  $titleFontSize()
  margin-left 20px
.radioItem
  $simpleFontSize()
.radioTitle
  $titleFontSize()   
  height 35px
  font-weight 600
.isMust
  color red
.votingCeiling
  height 200px
  display flex
  align-items center
  justify-content center
  font-size 18px
  color #999 
</style>