<template>
  <div>
    <a-card
      class="welcome_panel"
      title="欢迎登录智能渔技！"
      :headStyle="{ padding: '20' }"
    >
      <div class="button_list">
        <a-row class="welcome_user">
          <div>您好，{{ nameprop.username }}</div>
        </a-row>
        <a-form class="welcome_form">
          <a-form-item class="form_item">
            <a-button
              type="primary"
              class="login-form-button"
              style="width: 100%;"
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
  props: {
    nameprop: Object
  },
  methods: {
    enterCMS() {
      switch (this.nameprop.isOldSys) {
      case true:
        this.$router.push({
          name: 'bindPhone'
        })
        break

      case false:
        this.$router.push({
          name: 'home'
        })
        break

      default:
        break
      }
    },

    /**
     * @description 登出账户，将isLogin状态修改为登出, 同时通知给父组件lunbo
     */
    handleLogout() {
      this.$store.commit('SET_ISLOGIN', false)

      Common.handleLogOut()
      this.$emit('on-change', 'login')
    }
  }
}
</script>
<style scoped>
.welcome_panel {
  width: 300px;
  max-width: 300px;
  height: 346px;
}

.welcome_user {
  margin: 70px 0px;
}

.welcome_panel {
  text-align: center;
}

.welcome_panel .welcome_title {
  font-size: 20px;
  font-weight: bold;
}
</style>
