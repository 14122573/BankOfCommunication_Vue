<template>
	<div class="loginFrameTop">
    <a-row type="flex" justify="start" align="middle">
      <a-col span="6">
        <iframe style="margin-left:16px" scrolling="no" src="https://tianqiapi.com/api.php?style=tx&skin=grape" frameborder="0" width="380px" height="20" allowtransparency="true"></iframe>
      </a-col>
      <a-col span="4">
        <a-divider type="vertical" />
        <span class="loginFrameCalender" >
          <span class="calendarHandler" @mouseenter='show = true' @mouseleave='show = false'><a-icon type="calendar" /><span class="text">查看日历</span><a-icon type="down" /> </span>
          <a-card v-if="show" class="calendarBody" @mouseenter='show = true' @mouseleave='show = false'>
            <a-calendar style="width:300px" :fullscreen="false" > </a-calendar>
          </a-card>
        </span>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  components: {
  },
  beforeCreate() {
  },
  data() {
    return {
      show:false,
      // localConfig:{
      //   'lang': {
      //     'month': '月',
      //     'year': '年',
      //   },
      // }
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {

  },
  methods: {}
}
</script>

<style scoped>
.loginFrameTop { background-color: rgba(255,255,255,0.4); padding: 10px 0}
.loginFrameCalender{ position: relative; padding-left: 16px;}
.loginFrameCalender .calendarHandler { cursor: pointer; font-size: 16px; font-weight: bold}
.loginFrameCalender .calendarHandler .text{ padding: 0 5px;}
.loginFrameCalender .calendarBody{ position:absolute; left: 0; top:20px; z-index: 99}
</style>
