<template>
    <span class="user-status">
        <a-badge :status="$com.checkUserStatusTags(status).color" :text="$com.checkUserStatusTags(status).txt" />
    </span>
</template>
<script>
export default {
  props: {
    status: {
      type   : String,
      default: null
    }
  }
}
</script>
<style>
    .user-status .ant-badge-status-dot{
        width:9px;height:9px;
    }
</style>

