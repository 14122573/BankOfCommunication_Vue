<template>
<a-card style="width: 300px; max-width: 300px;" title="用户登录">
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item class="form_item">
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入登陆ID' }] },
        ]"
        placeholder="登陆ID"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
      <div class="errorMsg" style="height: 10px"></div>
    <a-form-item class="form_item">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
      <div class="errorMsg" style="height: 10px"></div>
    <a-form-item class="form_item">
      <a class="login-form-forgot" href="">
        忘记密码
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登陆
      </a-button>
      <a-button type="default" html-type="submit" class="register-form-button" block>
        注册
      </a-button>
    </a-form-item>
  </a-form>
</a-card>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>
<style>
.form_item {
  margin: 5px 0px;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>