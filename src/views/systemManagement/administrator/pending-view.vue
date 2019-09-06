<template>
    <div class="portalDetailWapper">
      <div class="portalDetailTitle">
        <span class="title">查看</span>
        <div class="detailOperations">
          <a-button @click="$router.back()">返回</a-button>
          <a-button type="primary" v-if="$permission('P03102')" @click="toDistribution">权限分配</a-button>
        </div>
      </div>
      <div class="portalDetailContentWapper">
        <div class="portalDetailContentBody">
          <div class="layoutMargin detailsPartSection pending-view">
            <UserDetail :id="$route.query.id" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import UserDetail from './user-detail'
export default {
  name: 'pendingPermissions-view',
  components:{UserDetail},
  methods:{
    toDistribution(){
      this.$router.push({
        name:'/systemManagement/administrator/distribution',
        query:{
          id:this.$route.query.id
        }
      })
    }
  }
}
</script>
<style scoped>
  .pending-view{
    padding-top: 20px;
  }
</style>

