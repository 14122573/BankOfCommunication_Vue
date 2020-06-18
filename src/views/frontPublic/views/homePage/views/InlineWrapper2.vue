<template>
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
.InlineWrapper {
  height: 550px;
}
</style>