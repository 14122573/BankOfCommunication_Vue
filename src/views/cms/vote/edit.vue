<template>
  <div class="portalDetailWrapper">
    <div class="portalDetailTitle">
			<span class="title">{{voteId ? '修改投票' : '创建投票'}}</span>
			<div class="detailOperations">
				<a-button @click="$router.back()">取消</a-button>
				<a-button @click="saveData('0')" type="primary">保存</a-button>
				<a-button @click="saveData('1')" type="primary">保存并发布</a-button>
			</div>
		</div>
    <div class="portalDetailContentBody">
      <div class="portalDetailContentWapper">
        <div class="layoutMargin detailsPartSection">
          <ActiveForm ref="basicForm" :layout="layout" :label-width="150" :model="model">
            <p slot="title" class="detailsPartTitle">基本信息</p>
            <div class="votingRules" style="display:flex;height:64px;">
              <span class="formLabel" style="width:150px;text-align:right;line-height:34px;color:#333;">投票规则：</span>
              <a-radio-group v-model="ruleType" @change="handleChange">
                <a-radio value="0">
                  不限制投票次数
                </a-radio>
                <a-radio value="1">
                  限制投票次数
                  <template v-if="ruleType === '1'">最大为 
                    <a-input-number :precision="0" :min='1' :max="1000" v-model="ruleNum" placeholder="请输入"/> 次
                  </template>
                </a-radio>
              </a-radio-group>
            </div>
            <div style="display:flex;">
              <span class="formLabel" style="width:150px;text-align:right;color:#333;">正文：</span>
              <UeditorCompent ref="ue" :value="description" ></UeditorCompent>
            </div> 
          </ActiveForm>
        </div>
      </div>
      <div class="portalDetailContentWapper">
        <div class="layoutMargin detailsPartSection">
          <p class="detailsPartTitle" style="margin-bottom:0;">投票选项</p>
          <div style="padding: 0 20px;">
            <div v-for="(item, i) in questionList" :key="i" :class="item.isEditing ? 'section form' : 'section question'">
              <ActiveForm v-if="item.isEditing" ref="questionForm" :layout="questionLayout"  :label-width="100" :model="questionModel">
                <div style="display:flex;justify-content:space-between;">
                  <a-button @click="addNewOption(true)" type="dashed" block style="width: 65%; marginLeft: 10%;" >
                    添加新选项
                  </a-button>
                  <div>
                    <a-button @click="cancelNewQuestion(i)" type="primary" ghost>取消</a-button>
                    <a-button @click="saveQuestion(i)" type="primary">确定</a-button>
                  </div>
                </div>
              </ActiveForm>
              <template v-else>
                <p class="title">
                  {{`${i + 1}、${item.title} `}}
                  <span class="red" v-show="item.isRequired == '0'">*</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  {{`(${item.type == '0' ? '单选题' : '多选题'})`}}
                </p>
                <template v-if="item.options && item.options.length > 0">
                  <p v-for="(option, i) in item.options" :key="i + option.value">
                    {{`${$com.numToLetter(i)}、${option.value}`}}
                  </p>
                </template>
              </template>
              <div class="actions">
                <a-icon title="修改" @click="editQuestion(i)" type="edit" />
                <a-icon title="删除" @click="deleteQuestion(i)" type="delete" />
              </div>
            </div>
            <a-button @click="addNewQuestion" type="dashed" block style="margin-top: 20px;">添加新题目</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'

export default {
  components: {
    UeditorCompent
  },
  name: 'VoteEdit',
  data() {
    return {
      voteId      : null, // null为新增模式，有值为修改模式
      ruleType    : '0',
      ruleNum     : 1,
      creator     : '',
      introduction: '',
      description : '',
      layout      : [
        {
          name: {
            label   : '名称',
            type    : 'input',
            width   : 16,
            validate: {
              rules: [ { required: true, message: '请输入名称' } ]
            }
          },
        }, 
        {
          source: {
            label   : '来源',
            type    : 'input',
            width   : 16,
            validate: {
              rules: [ { required: true, message: '请输入来源' } ]
            }
          }
        },
        {
          creator: {
            label   : '发布人',
            type    : 'input',
            width   : 16,
            validate: {
              rules: [ { required: true, message: '请输入发布人' } ]
            }
          }
        },
        {
          date: {
            label       : '投票起止时间',
            type        : 'daterange',
            width       : 16,
            disabledDate: (current) => {
              return current && this.$moment(current, 'YYYY-MM-DD').isBefore(this.$moment().format('YYYY-MM-DD'))
            },
            validate: {
              rules: [ { required: true, message: '请选择投票起止时间' } ]
            }
          }
        },
        {
          introduction: {
            label   : '简介',
            type    : 'textarea',
            width   : 16,
            validate: {
              rules: [ 
                { required: true, message: '请输入简介' },
                { max: 250, message: '简介内容不可超过250字' },
              ]
            }
          }
        },
      ],
      model         : {},
      questionList  : [],
      questionLayout: [
        {
          title: {
            label   : '题目',
            type    : 'input',
            width   : 20,
            validate: {
              rules: [ { required: true, message: '请输入题目' } ]
            }
          },
        },
        {
          description: {
            label: '备注',
            type : 'input',
            width: 20,
          },
        },
        {
          type: {
            label  : '题目类型',
            type   : 'radio',
            width  : 20,
            options: [
              { label: '单选题', value: '0' },
              { label: '多选题', value: '1' },
            ],
            validate: {
              rules: [ { required: true, message: '请选择题目类型' } ]
            }
          }
        },
        {
          isRequired: {
            label  : '是否必填',
            type   : 'radio',
            width  : 20,
            options: [
              { label: '是', value: '0' },
              { label: '否', value: '1' },
            ],
            validate: {
              rules: [ { required: true, message: '请选择是否必填' } ]
            }
          }
        },
      ],
      questionModel  : {},
      questionOptions: [],
      isEditing      : false, // question是编辑模式还是完成模式的依据
    }
  },
  watch: {
    '$store.state.userInfos': {
      handler: function(val) {
        if(!!val){
          this.creator = '111'//!val.username?'':val.username
        }
      },
      deep: true
    },
  },
  mounted() {
    const { query } = this.$route
    if (query && query.id) {
      this.voteId = query.id
      this.getDetail()
    }
  },
  methods: {
    getDetail() { //修改的时候获取数据
      this.$ajax.get({
        url: this.$api.GET_VOTE_DETAIL.replace('{id}', this.voteId)
      }).then(res => { 
        console.log(res)
        const { name, creator, introduction, ruleType, ruleNum, source, startTime, endTime, description, subjects } = res.data.content
        this.description = description
        this.creator = creator
        this.introduction = introduction
        this.ruleType = ruleType?ruleType:'0'
        if(ruleType == '1'){ 
          this.ruleNum = ruleNum 
        }
        this.model = {
          name, 
          source,
          date: [ startTime, endTime ],
        }
        this.questionList = subjects
      })
    },
    handleChange(e){
      // console.log('radio checked', e.target.value)
      // this.result = e.target.value
      // console.log(this.result)
    },
    addNewQuestion() {
      if (this.checkIsEditing()) return
      this.questionList.push({ isEditing: true })
    },
    cancelNewQuestion(i) {
      if (this.isEditing) {
        this.questionList[i].options = [ ...this.questionModel.options ]
        this.$delete(this.questionList[i], 'isEditing')
      } else {
        this.questionList.splice(i, 1)
      }
      this.initQuestion()
    },
    editQuestion(i) {
      if (this.checkIsEditing()) return
      this.isEditing = true
      this.questionOptions = this.questionList[i].options
      this.addNewOption(false)
      this.questionModel = JSON.parse(JSON.stringify(this.questionList[i])) // 防止对questionModel的修改影响到voteList
      this.$set(this.questionList[i], 'isEditing', true)
    },
    deleteQuestion(i) {
      this.$modal.confirm({
        title  : '提示',
        content: '确定删除此问题吗？',
        okType : 'danger',
        onOk   : () => {
          this.questionList.splice(i, 1)
        },
      })
    },
    saveQuestion(i) {
      this.$refs.questionForm[0].validate(err => { // 这里不知是否是if的关系，需要加上[0]，原本正常的form不需要
        if (err) return
        if (this.questionOptions.length <= 1) {
          this.$modal.error({
            title  : '提示',
            content: '请至少添加两个选项',
            okText : '确认',
          })
          return
        }
        const options = this.questionOptions.map((option, index) => {
          return {
            value: option.value,
          }
        })
        const result = Object.assign(
          this.questionModel,
          { options: options },
        )
        this.$delete(this.questionList[i], 'isEditing')
        this.questionList[i] = result
        this.initQuestion()
      })
    },
    addNewOption(isNew) {
      // isNew为true则新增一条选项
      if (isNew) {
        this.questionOptions.push({ value: '' })
      }
      const options = this.questionOptions.map((item, index) => {
        return {
          ['opt' + (index + 1)]: {
            label : '选项' + (index + 1),
            width : 24,
            render: (h) => {
              return h('a-row', [
                h('a-input', {
                  props: {
                    placeholder: '请输入',
                    value      : this.questionOptions[index].value,
                  },
                  on: {
                    change: ({ target }) => {
                      const { value } = target
                      this.questionOptions[index].value = value
                    }
                  },
                  style: 'width: 80%'
                }),
                h('a-button', {
                  props: {
                    type : 'danger',
                    shape: 'circle',
                    icon : 'close',
                    size : 'small',
                  },
                  on: {
                    click: () => {
                      this.questionOptions.splice(index, 1)
                      this.addNewOption(false) // 参数为false就是不用新增，只重排一下voteLayout中选项顺序
                    }
                  },
                  style: {
                    marginLeft: '10px',
                  }
                })
              ])
            },
          }
        }
      })
      let layout = [ ...this.questionLayout ]
      layout = layout.slice(0, 4)
      layout.push(...options)
      this.questionLayout = layout
    },
    initQuestion() { // 清空question模板等
      this.questionOptions = []
      this.questionModel = {}
      this.questionLayout = this.questionLayout.slice(0, 4)
      this.isEditing = false
    },
    checkIsEditing() { // 检查是否存在正在编辑的题目，有则返回true
      const index = this.questionList.findIndex(item => item.isEditing)
      // 如果有未保存的题目则提示先保存
      if (index >= 0) {
        this.$modal.error({
          title  : '提示',
          content: '请先保存编辑中的题目',
          okText : '确认',
        })
        return true
      }
      return false
    },
    saveData(status) {
      if (this.checkIsEditing()) return
      this.$refs.basicForm.validate(err => {
        console.log(this.$refs.basicForm);
        
        if (err) return

        this.model.description = this.$refs.ue.value2
        if (!this.model.description || this.model.description=='') {
          this.$modal.error({
            title  : '提示',
            content: '请填写投票正文',
            okText : '确认',
          })
          return
        }
        this.model.ruleType = this.ruleType
        this.model.ruleNum = this.ruleNum
        if (this.model.ruleType == '1' && !this.model.ruleNum) {
          this.$modal.error({
            title  : '提示',
            content: '请填写最大投票次数',
            okText : '确认',
          })
          return
        }
        if (this.questionList.length == 0) {
          this.$modal.error({
            title  : '提示',
            content: '请至少添加一个投票题目',
            okText : '确认',
          })
          return
        }
        let method = 'post'
        let url = this.$api.POST_ADD_VOTE
        if (this.voteId) {
          // 如果是修改模式则改变请求方式和url
          method = 'put'
          url = this.$api.PUT_EDIT_VOTE.replace('{id}', this.voteId)
        }
        const { name, source, creator,introduction, ruleType, ruleNum, description, date } = this.model
        const params = {
          name,
          source,
          creator,
          introduction,
          ruleType,
          ruleNum,
          description,
          startTime: date[0],
          endTime  : date[1],
          status,
          subjects : this.questionList,
        } 
        console.log(params)
        this.$ajax[method]({
          url,
          params,
        }).then(res => {
          if( res.code == '200'){
            if (status == '1') {
              // this.$modal.success({
              //   title  : '成功',
              //   content: '保存并发布成功',
              //   okText : '确认',
              // }) 
              this.$message.success('保存并发布成功', 5)
              this.$router.push({ path: '/cms/vote' })
            } else {
              // this.$modal.success({
              //   title  : '成功',
              //   content: '保存成功',
              //   okText : '确认',
              // })
              this.$message.success('保存成功', 5)
              this.$router.push({ path: '/cms/vote' })
            }
          }
          
          // this.$nextTick(() => this.$router.push({ path: '/cms/vote' }))
        })
      })
    },
  }
}
</script>

<style scoped>
  .section {
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    position: relative;
  }
  .section.form {
    background: #fafafa;
  }
  .section .title {
    font-weight: bold;
  }
  .red {
    font-weight: bold;
    color: red;
  }
  .section.question:hover >.actions {
    display: flex;
  }
  .actions {
    display: none;
    position: absolute;
    width: 5%;
    right: 0;
    top: 0;
    bottom: 0;
    background: #e0e0e0;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .actions > i {
    cursor: pointer;
    font-size: 18px;
  }
  .actions > i:first-child:hover {
    color: #1890ff;
  }
  .actions > i:last-child:hover {
    color: red;
  }
  .formLabel::before {
    display: inline-block;
    margin-right: 4px;
    color: #f5222d;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
</style>
<style lang="stylus">
.votingRules 
  .ant-radio-wrapper
    line-height 34px

</style>