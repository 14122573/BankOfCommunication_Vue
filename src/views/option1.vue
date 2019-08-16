<template>
<div>
  <h1>Option1 Page</h1>
  <a-button v-if="$permission('btn1')" type="primary">Btn1</a-button>
  <a-button v-permission="'btn2'">Btn2</a-button>
  <a-button type="dashed">Btn3</a-button>
  <a-button type="danger">Btn4</a-button>
</div>
</template>

<script>
export default {
  name: 'Option1',
  mounted() {
    this.$ajax.all(
      this.$ajax.get('/static/user-info.json'),
      this.$ajax.get('/static/permission.json')
    ).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
