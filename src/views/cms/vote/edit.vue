<template>
  <div class="portalDetailWrapper">
    <div class="portalDetailTitle">
			<span class="title">创建投票</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button @click="saveData('0')" type="primary">保存</a-button>
				<a-button @click="saveData('1')" type="primary">保存并发布</a-button>
			</div>
		</div>
    <div class="portalDetailContentBody">
      <div class="portalDetailContentWapper">
        <div class="layoutMargin detailsPartSection">
          <ActiveForm ref="basicForm" :layout="layout" :label-width="150" :model="model">
            <p slot="title" class="detailsPartTitle">基本信息</p>
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
                  {{`${i + 1}、${item.title}? `}}
                  <span class="red" v-show="item.isRequired == '0'">*</span>
                  {{`(${item.type == '0'? '单选题' : '多选题'})`}}
                </p>
                <template v-if="item.options && item.options.length > 0">
                  <p v-for="option in item.options" :key="option.value">
                    {{`${option.value}、${option.label}`}}
                  </p>
                </template>
              </template>
              <div class="actions">
                <a-icon @click="editQuestion(i)" type="edit" />
                <a-icon @click="deleteQuestion(i)" type="delete" />
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
export default {
  name: 'VoteEdit',
  data() {
    return {
      layout: [
        {
          name: {
            label: '名称',
            type: 'input',
            width: 20,
            validate: {
              rules: [{required: true, message: '请输入名称'}]
            }
          },
        },
        {
          description: {
            label: '简介',
            type: 'textarea',
            width: 20,
            validate: {
              rules: [{required: true, message: '请输入简介'}]
            }
          }
        },
        {
          date: {
            label: '投票起止时间',
            type: 'daterange',
            width: 20,
            validate: {
              rules: [{required: true, message: '请选择投票起止时间'}]
            }
          }
        },
      ],
      model: {},
      questionList: [],
      questionLayout: [
        {
          title: {
            label: '题目',
            type: 'input',
            width: 20,
            validate: {
              rules: [{required: true, message: '请输入题目'}]
            }
          },
        },
        {
          description: {
            label: '备注',
            type: 'input',
            width: 20,
          },
        },
        {
          type: {
            label: '题目类型',
            type: 'radio',
            width: 20,
            options: [
              {label: '单选题', value: '0'},
              {label: '多选题', value: '1'},
            ],
            validate: {
              rules: [{required: true, message: '请选择题目类型'}]
            }
          }
        },
        {
          isRequired: {
            label: '是否必填',
            type: 'radio',
            width: 20,
            options: [
              {label: '是', value: '0'},
              {label: '否', value: '1'},
            ],
            validate: {
              rules: [{required: true, message: '请选择是否必填'}]
            }
          }
        },
      ],
      questionModel: {},
      questionOptions: [],
      isEditing: false,
    }
  },
  methods: {
    addNewQuestion() {
      const index = this.questionList.findIndex(item => item.isEditing)
      // 如果有未保存的题目则提示先保存
      if (index >= 0) {
        this.$message.error('请先保存编辑中的题目')
        return
      }
      this.questionList.push({isEditing: true})
    },
    cancelNewQuestion(i) {
      if (this.isEditing) {
        this.questionList[i].options = [...this.questionModel.options]
        this.$delete(this.questionList[i], 'isEditing')
      } else {
        this.questionList.splice(i, 1)
      }
      this.initQuestion()
    },
    editQuestion(i) {
      const index = this.questionList.findIndex(item => item.isEditing)
      // 如果有未保存的题目则提示先保存
      if (index >= 0) {
        this.$message.error('请先保存编辑中的题目')
        return
      }
      this.isEditing = true
      this.questionOptions = this.questionList[i].options
      this.addNewOption(false)
      this.questionModel = JSON.parse(JSON.stringify(this.questionList[i])) // 防止对questionModel的修改影响到voteList
      this.$set(this.questionList[i], 'isEditing', true)
    },
    deleteQuestion(i) {
      this.$model.confirm({
        title: '提示',
        content: '确定删除此问题吗？',
        okType: 'danger',
        onOk: () => {
          this.questionList.splice(i, 1)
        },
      })
    },
    saveQuestion(i) {
      this.$refs.questionForm[0].validate(err => { // 这里不知是否是if的关系，需要加上[0]，原本正常的form不需要
        if (err) return
        const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
        const options = this.questionOptions.map((option, index) => {
          return {
            value: arr[index],
            label: option.label,
          }
        })
        const result = Object.assign(
          this.questionModel,
          {options: options},
        )
        this.$delete(this.questionList[i], 'isEditing')
        this.questionList[i] = result
        this.initQuestion()
      })
    },
    addNewOption(isNew) {
      // isNew为true则新增一条选项
      if (isNew) {
        this.questionOptions.push({label: ''})
      }
      const options = this.questionOptions.map((item, index) => {
        return {
          ['opt' + (index + 1)]: {
            label: '选项' + (index + 1),
            width: 24,
            render:(h) => {
              return h('a-row', [
                h('a-input', {
                  props: {
                    placeholder: '请输入',
                    value: this.questionOptions[index].label,
                  },
                  on: {
                    change:({target}) => {
                      const {value} = target
                      this.questionOptions[index].label = value
                    }
                  },
                  style: 'width: 80%'
                }),
                h('a-button', {
                  props: {
                    type: 'danger',
                    shape: 'circle',
                    icon: 'close',
                    size: 'small',
                  },
                  on: {
                    click: ()=> {
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
      let layout = [...this.questionLayout]
      layout = layout.slice(0, 4)
      layout.push(...options)
      this.questionLayout = layout
    },
    initQuestion() {
      // 清空Question模板等
      this.questionOptions = []
      this.questionModel = {}
      this.questionLayout = this.questionLayout.slice(0, 4)
      this.isEditing = false
    },
    saveData(status) {
      this.$refs.basicForm.validate(err => {
        if (err) return
        const {name, description, date} = this.model
        const params = {
          name,
          description,
          startTime: date[0],
          endTime: date[1],
          status,
          subjects: this.questionList,
        }
        this.$ajax.post({
          url: this.$api.POST_ADD_VOTE,
          params,
        }).then(res => {
          if (status == '1') {
            this.$message.success('保存并发布成功')
          } else {
            this.$message.success('保存成功')
          }
          this.$nextTick(() => this.$router.back())
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
  .actions > i:hover {
    color: #1890ff;
  }
</style>
