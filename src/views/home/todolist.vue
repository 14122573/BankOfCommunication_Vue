
<template>
  <div class="todolistWapper">
    <p class="todolistTitle">
      <span class="name">待办事项</span> <a-icon class="settingBtn" theme="filled" type="setting" />
    </p>
    <div class="odolistWapper">
      <a-skeleton :loading="loadingTodo">

      </a-skeleton>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Todolist',
  components: {
  },
  data() {
    return {
      loadingTodo:false
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

</style>
