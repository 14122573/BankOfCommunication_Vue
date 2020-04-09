<template>
<a-modal :maskClosable="false" @ok="handleSubmit" @cancel="handleCancel" :width="465" title="修改手机号" :visible="value">
  <ActiveForm v-if="value" :layout="layout" :label-width="90" ref="form" :model="model"/>
</a-modal>
</template>

<script>
export default {
  name : 'ChangePhone',
  props: {
    value: {
      type   : Boolean,
      default: false,
    },
  },
  data() {
    const phoneValidator = (rule, val, callback) => {
      if (!val || !val.trim()) {
        this.resetForm()
        callback('请输入新手机号')
      } else if (!this.$com.checkPhone(val)) {
        this.resetForm()
        callback('手机号码不合法!')
      } else {
        this.disableBtn = false
        callback()
      }
    }
    const codeValidator = (rule, val, callback) => {
      const value = this.model.phoneCode
      if (!value || !value.trim()) {
        callback('请输入验证码')
      } else {
        callback()
      }
    }
    return {
      disableBtn  : true,
      disableInput: true,
      timer       : null,
      btnTxt      : '获取验证码',
      layout      : [
        {
          newPhone: {
            label   : '新手机号',
            type    : 'input',
            width   : 24,
            validate: {
              rules: [ { required: true, validator: phoneValidator } ]
            }
          },
          phoneCode: {
            label   : '验证码',
            width   : 24,
            validate: {
              rules: [ { required: true, validator: codeValidator } ],
            },
            render: (h) => {
              return h('a-row', [
                h('a-input', {
                  props: {
                    placeholder: '验证码',
                    disabled   : this.disableInput,
                  },
                  on: {
                    change: ({ target }) => {
                      const { value } = target
                      this.model.phoneCode = value
                    }
                  },
                  style: 'width: 60%'
                }),
                h('a-button', {
                  props: {
                    disabled: this.disableBtn,
                  },
                  on: {
                    click: ()=> {
                      this.$ajax.post({
                        url: this.$api.GET_PHONE_CODE.replace('{type}', 'phone').replace('{phone}', this.model.newPhone),
                      }).then(res => {
                        this.disableInput = false
                        let num = 60
                        const interval = () => {
                          this.timer = setInterval(() => {
                            if (num <= 0) {
                              this.clearTimer()
                              return
                            }
                            this.btnTxt = (num -= 1) + 's'
                          }, 1000)
                        }
                        interval()
                      })
                    }
                  },
                  style: {
                    marginLeft: '10px',
                  }
                }, this.btnTxt)
              ])
            },
          },
        },
      ],
      model: {},
    }
  },
  methods: {
    clearTimer() {
      clearInterval(this.timer)
      this.btnTxt = '获取验证码'
    },
    handleSubmit() {
      this.$refs.form.validate(err => {
        if (err) return
        const { newPhone, phoneCode } = this.model
        this.$ajax.put({
          url: this.$api.PUT_USER_PHONE.replace('{phone}', newPhone).replace('{code}', phoneCode)
        }).then(res => {
          this.$modal.success({
            title  : '成功',
            content: '修改成功',
            okText : '确认',
          })
          this.handleCancel()
          this.$emit('success')
        })
      })
    },
    handleCancel() {
      this.resetForm()
      this.model = {}
      this.$emit('input', false)
    },
    resetForm() {
      this.disableBtn = true
      this.disableInput = true
      this.clearTimer()
    }
  },
}
</script>
