<template>
  <div>
    {{query}}
  </div>
</template>

<script>
export default {
  props: {
    query: Array
  },
  mounted() {
    console.log(this.query);
  }
}
</script>

<style scoped>

</style>