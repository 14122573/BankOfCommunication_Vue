<template>
  <div>
    <a-list class="nav" bordered v-for="(item, index) in childroute" :key="index">
      <a-list-item class="nav_title">
        <img src="@/assets/images/home/arrow.png" width= "10px" height="10px" alt="" srcset="">
        <router-link :to="item.path">{{item.meta.title}}</router-link>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.childroute)
  },
  methods: {
    
  },
  props: {
    childroute: Array
  }
}
</script>

<style scoped>
  .nav {
    background-color: #FFFFFF;
    text-align: left;
  }

  .nav_title a {
    color: grey;
  }
</style>