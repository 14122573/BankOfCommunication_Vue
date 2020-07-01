<template>
  <div class="container">
    <div class="InlineWrapper">
      <a-row>
        <!-- <a-col :span="12" style="background-color: red"> -->
        <a-col :span="12">
          <Notification />
        </a-col>
        <a-col :span="12">
          <Industry />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Notification from '../components/notification'
import Industry from '../components/industry'
export default {
  components: {
    Notification,
    Industry
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
}
.InlineWrapper {
  height: 550px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>