<template>
  <div>
    <a-card
      class="welcome_panel"
      style="width: 300px; max-width: 300px;"
      title="欢迎登陆智能渔技！"
      :headStyle="{ padding: '20' }"
    >
      <div class="button_list">
        <a-row class="welcome_user">
          <div>您好，{{ nameprop }}</div>
        </a-row>
        <a-form class="welcome_form">
          <a-form-item class="form_item">
            <a-button
              type="primary"
              class="login-form-button"
              style="width: 100%"
              @click="enterCMS"
            >
              进入后台
            </a-button>
            <a-button type="default" class="register-form-button" block @click="handleLogout">
              退出登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
import Common from '@/util/common'
export default {
  data() {
    return {}
  },
  props: {
    nameprop: String
  },
  created() {
    console.log('NameProps' + this.nameprop)
    
  },
  methods: {
    enterCMS() {
      this.$router.push({
        name: 'home'
      })
    },
    handleLogout() {
      Common.handleLogOut()
      this.$emit('on-change', 'login')
    }
  }
}
</script>
<style scoped>
.welcome_user {
  margin: 50px 0px;
}

.welcome_panel {
  text-align: center;
}

.welcome_panel .welcome_title {
  font-size: 20px;
  font-weight: bold;
}
</style>
