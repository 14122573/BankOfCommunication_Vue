<template>
  <div id="portalApp">
    <a-config-provider :locale="zh_CN">
      <!-- <Loader /> -->
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Loader from '@/components/Layout/loader'
import { mapMutations } from 'vuex'
export default {
  name      : 'portalApp',
  components: {
    Loader,
  },
  data() {
    return {
      zh_CN,
    }
  },
  props: {
    content: String,
    loading: Boolean,
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setLoading',
    ])
  },
  mounted() {
    // /** 持久化存储vuex 使其页面刷新后数据不丢失 */
    // //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('VuexStore')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('VuexStore'))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    // })

    const addRoutes = (data) => {
      const { routes } = this.$router.options
      const parent = routes.find(item => item.name === 'Layout')
      parent.children.push(...data)
      this.$router.addRoutes([ parent ])
    }

    if(this.$store.state.routes.length > 0) {
      addRoutes(this.$store.state.routes)
      return
    }

  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', () => {
      sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    })
  },
  watch: {
    content(cur) {
      this.setContent(cur)
    },
    loading(cur) {
      this.setLoading(cur)
    }
  }
}
</script>

<style>
#portalApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
