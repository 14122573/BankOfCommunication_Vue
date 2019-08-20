
<template>
  <div class="todolistWapper">
    <p class="todolistTitle">
      <span class="name">通知</span>
    </p>
    <div class="todolistCont">
      <a-skeleton :loading="loadingTodo">
        <div>
          <div class='todolist'>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
            <p><span class="sysname">[新品种审定]</span><a href="#">XXXXXXXXXXXXXXXXXXXXXXX录入形式审查结果</a></p>
          </div>
          <div style="text-align:right"><a-pagination class="" v-model="page.cur" :total="2" /></div>
        </div>
      </a-skeleton>

    </div>
  </div>
</template>
<script>

export default {
  name: 'MyMessages',
  components: {
  },
  data() {
    return {
      loadingTodo:false,
      page:{
        cur:2
      }
    }
  },
  created() {

  },
  watch:{


  },
  computed: {

  },
  methods: {
  }
}
</script>

<style>
.todolistWapper { background-color: #fff; padding:1rem;}
.todolistTitle { font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 0.8rem}
.todolistTitle .name{ border-bottom: 3px solid #3391FF; padding-bottom: 0.8rem}
.todolist p { line-height: 30px}
.todolist .sysname{ padding-right:5px; }
.todolist a { color:#4D4D4D; }
.todolist a:hover { color: #3391FF}
</style>
